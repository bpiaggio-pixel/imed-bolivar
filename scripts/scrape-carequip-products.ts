import "dotenv/config";
import fs from "fs";
import path from "path";
import * as XLSX from "xlsx";
import { chromium } from "playwright";

const START_URL = "https://care-quip.com.ar/ortopedia";

const EXCEL_PATH = path.join(process.cwd(), "data", "productos.xlsx");
const IMAGE_DIR = path.join(process.cwd(), "public", "products", "carequip");
const IMAGE_PUBLIC_PREFIX = "/products/carequip";

type ProductRow = {
  slug: string;
  nombre: string;
  descripcion: string;
  categoria: string;
  subcategoria: string;
  precio: number;
  stock: number;
  sku: string;
  marca: string;
  imagen: string;
  tags: string;
  destacado: boolean;
  activo: boolean;
};
type CategoryTarget = {
  url: string;
  categoria: string;
  subcategoria: string;
};

function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanText(v: unknown) {
  return String(v ?? "").replace(/\s+/g, " ").trim();
}

function slugify(input: string) {
  return cleanText(input)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 120);
}

function getCategoryFromUrl(url: string) {
  const match = url.match(/categoria-producto\/([^/]+)/);
  if (!match) return "DEMA";

  return match[1]
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

function absoluteUrl(url: string, base: string) {
  try {
    return new URL(url, base).toString();
  } catch {
    return "";
  }
}

function imageExt(url: string) {
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    return [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
  } catch {
    return ".jpg";
  }
}

async function downloadImage(context: any, url: string, target: string) {
  if (!url || fs.existsSync(target)) return;

  const res = await context.request.get(url);

  if (!res.ok()) {
    console.warn(`⚠️ Imagen falló: ${url}`);
    return;
  }

  fs.writeFileSync(target, Buffer.from(await res.body()));
}

function readExistingRows(): ProductRow[] {
  if (!fs.existsSync(EXCEL_PATH)) return [];

  const workbook = XLSX.readFile(EXCEL_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  return XLSX.utils.sheet_to_json<ProductRow>(sheet, { defval: "" });
}

function writeRows(rows: ProductRow[]) {
  const header = [
    "slug",
    "nombre",
    "descripcion",
    "categoria",
    "subcategoria",
    "precio",
    "stock",
    "sku",
    "marca",
    "imagen",
    "tags",
    "destacado",
    "activo",
  ];

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.json_to_sheet(rows, { header });

  XLSX.utils.book_append_sheet(workbook, sheet, "productos");
  XLSX.writeFile(workbook, EXCEL_PATH);
}

async function getCategoryLinks(page: any): Promise<CategoryTarget[]> {
  await page.goto(START_URL, { waitUntil: "networkidle", timeout: 120000 });
  await page.waitForTimeout(4000);

  const links = await page.$$eval("a", (anchors: HTMLAnchorElement[]) =>
    anchors.map((a) => ({
      href: a.href,
      text: (a.textContent || "").replace(/\s+/g, " ").trim(),
    }))
  );

  const unique = [
    ...new Map(
      links
        .filter((l) => l.href.includes("/ortopedia/category/"))
        .map((l) => [l.href.split("?")[0], l])
    ).values(),
  ];

  return unique.map((l) => ({
    url: l.href.split("?")[0],
    categoria: cleanText(l.text) || "Care-Quip",
    subcategoria: cleanText(l.text) || "General",
  }));
}

async function getProductLinksFromCategory(page: any, categoryUrl: string) {
  const found = new Set<string>();

  await page.goto(categoryUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForTimeout(5000);

  for (let pageNum = 1; pageNum <= 10; pageNum++) {
    console.log(`   📄 Página visible ${pageNum}`);

  const hasProducts = await page
  .waitForSelector('a[href*="/ortopedia/product/"]', {
    timeout: 30000,
  })
  .then(() => true)
  .catch(() => false);

if (!hasProducts) {
  console.log("      ⚠️ No cargaron productos, salteo esta categoría");
  break;
}

    const productLinks = await page.$$eval(
      'a[href*="/ortopedia/product/"]',
      (anchors: HTMLAnchorElement[]) =>
        anchors
          .filter((a) => {
            const rect = a.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })
          .map((a) => a.href.split("?")[0])
    );

    const uniqueProductLinks = [...new Set(productLinks)];

    const before = found.size;
    uniqueProductLinks.forEach((href) => found.add(href));
    const added = found.size - before;

    console.log(`      🔗 Productos leídos: ${uniqueProductLinks.length}`);
    console.log(`      ➕ Nuevos productos: ${added}`);

    // bajar hasta el paginador
    await page.mouse.wheel(0, 5000);
    await page.waitForTimeout(1000);

    const nextButton = page
      .locator("button")
      .filter({ hasText: "" })
      .last();

    const disabled = await nextButton
      .getAttribute("disabled")
      .catch(() => null);

    if (disabled !== null) break;

    const oldFirst = uniqueProductLinks[0];

    await nextButton.click({ timeout: 5000 }).catch(() => null);
    await page.waitForTimeout(4000);

    const newFirst = await page
      .locator('a[href*="/ortopedia/product/"]')
      .first()
      .getAttribute("href")
      .catch(() => "");

    if (!newFirst || newFirst.split("?")[0] === oldFirst) {
      console.log("      ⚠️ No cambió la grilla, corto acá");
      break;
    }
  }

  return [...found];
}

async function scrapeProduct(
  context: any,
  page: any,
  productUrl: string,
  categoria: string,
  subcategoria: string
): Promise<ProductRow | null> {
  try {
  await page.goto(productUrl, {
    waitUntil: "load",
    timeout: 60000,
  });
} catch {
  await page.goto(productUrl, {
    waitUntil: "domcontentloaded",
    timeout: 60000,
  });
}

await page.waitForTimeout(2500);
if (productUrl.includes("S027_soporte-de-clavicula")) {
  const html = await page.content();
  fs.writeFileSync(
    path.join(process.cwd(), "data", "debug-dema-s027.html"),
    html,
    "utf8"
  );

  console.log("🧪 Guardé debug HTML en data/debug-dema-s027.html");
}

 const data = await page.evaluate(() => {
  const h1 = (document.querySelector("h1")?.textContent || "")
    .replace(/\s+/g, " ")
    .trim();

  const pageText = document.body.innerText
    .replace(/\s+/g, " ")
    .trim();

const crumbMatch = pageText.match(
  /(CONTENCIÓN|AYUDAS DIARIAS|IN MOTION|MEDIAS DEMA|ENTRENAMIENTO)\s*\/\s*([A-ZÁÉÍÓÚÑ,\s]+?)\s+[A-Z]{1,5}[0-9]{1,4}/i
);

  const categoria = (crumbMatch?.[1] || "")
    .replace(/\s+/g, " ")
    .trim();

  const subcategoria = (crumbMatch?.[2] || "")
    .replace(/\s+/g, " ")
    .trim();

  const skuText =
    document.querySelector(".sku")?.textContent ||
    pageText.match(/\b[A-Z]{1,5}[0-9]{1,4}[A-Z0-9*_\-]*\b/)?.[0] ||
    "";

  const sku = skuText.replace(/\s+/g, " ").trim();

const descriptionMatch = pageText.match(
  /(?:Funcionalidad|Descripción)\s+([\s\S]*?)(?:\s+Confección|\s+Medidas|\s+¿Cómo se utiliza\?|\s+También puede interesarte|$)/i
);

let descripcion =
  document.querySelector("#descrp")?.textContent ||
  document.querySelector(".funcionalidades2XG #descrp")?.textContent ||
  "";

descripcion = descripcion.replace(/\s+/g, " ").trim();
  const image =
    document.querySelector("meta[property='og:image']")?.getAttribute("content") ||
    (document.querySelector(".woocommerce-product-gallery img") as HTMLImageElement | null)?.src ||
    (document.querySelector("img") as HTMLImageElement | null)?.src ||
    "";

  return {
    nombre: h1,
    descripcion,
    image,
    categoria,
    subcategoria,
    sku,
  };
});

  const nombre = cleanText(data.nombre);
  if (!nombre) return null;

  const slug = slugify(nombre);
  const imageUrl = absoluteUrl(data.image, productUrl);

  let imagen = "";

  if (imageUrl) {
    const ext = imageExt(imageUrl);
    const filename = `${slug}${ext}`;
    const target = path.join(IMAGE_DIR, filename);

    await downloadImage(context, imageUrl, target);

    if (fs.existsSync(target)) {
      imagen = `${IMAGE_PUBLIC_PREFIX}/${filename}`;
    }
  }

  return {
    slug,
    nombre,
    descripcion: cleanText(data.descripcion),
    categoria: cleanText(data.categoria || categoria),
    subcategoria: cleanText(data.subcategoria || subcategoria),
    precio: 0,
    stock: 0,
    sku: cleanText(data.sku),
    marca: "Care-Quip",
    imagen,
    tags: "care-quip, ortopedia",
    destacado: false,
    activo: true,
  };
}
async function main() {
  ensureDir(path.dirname(EXCEL_PATH));
  ensureDir(IMAGE_DIR);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
  const page = await context.newPage();

  const existing = readExistingRows();
  const bySlug = new Map<string, ProductRow>();

  for (const row of existing) {
    if (row.slug) bySlug.set(String(row.slug), row);
  }

 console.log("📂 Buscando categorías Care-Quip...");

const categories = await getCategoryLinks(page);

console.log(`📂 Categorías encontradas: ${categories.length}`);

const productUrls = new Set<string>();

let catIndex = 0;

for (const category of categories) {
  catIndex++;

  console.log(
    `\n📂 [${catIndex}/${categories.length}] ${category.categoria}`
  );

  const links = await getProductLinksFromCategory(page, category.url);

  console.log(`   🔗 Productos encontrados: ${links.length}`);

  for (const link of links) {
    productUrls.add(
      JSON.stringify({
        url: link,
        categoria: category.categoria,
        subcategoria: category.subcategoria,
      })
    );
  }
}

const products = [...productUrls].map((x) => JSON.parse(x));

  console.log(`\n📦 Total productos únicos: ${products.length}`);

let added = 0;
let updated = 0;
let skipped = 0;
let processed = 0;


for (const item of products) {


  const productUrl = item.url;
  processed++;

  console.log(`\n[${processed}/${products.length}] ${productUrl}`);

  try {
    const product = await scrapeProduct(
      context,
      page,
      productUrl,
      item.categoria,
      item.subcategoria
    );

    if (!product?.slug) {
      skipped++;
      console.log("⏭ Omitido");
      continue;
    }

    if (bySlug.has(product.slug)) {
      const existing = bySlug.get(product.slug)!;

      bySlug.set(product.slug, {
        ...existing,
        descripcion: product.descripcion,
        categoria: product.categoria,
        subcategoria: product.subcategoria,
        imagen: product.imagen || existing.imagen,
        tags: product.tags,
        marca: product.marca,
      });

      updated++;
      console.log(
        `🔄 Actualizado: ${product.nombre} | ${product.categoria} > ${product.subcategoria} | desc: ${product.descripcion.length}`
      );
      continue;
    }

    bySlug.set(product.slug, product);
    added++;

    console.log(`✅ Agregado: ${product.nombre}`);
    console.log(`🖼 Imagen: ${product.imagen || "sin imagen"}`);
  } catch (err) {
    skipped++;
    console.warn("⚠️ Error:", err);
  }
}
  writeRows([...bySlug.values()].sort((a, b) => a.nombre.localeCompare(b.nombre)));

  await browser.close();

  console.log("\n✅ Scrape terminado");
  console.log(`➕ Agregados: ${added}`);
  console.log(`⏭ Omitidos: ${skipped}`);
  console.log(`📄 Excel: ${EXCEL_PATH}`);
  console.log(`🖼 Imágenes: ${IMAGE_DIR}`);
}

main().catch((err) => {
  console.error("\nSCRAPE ERROR:", err);
  process.exit(1);
});