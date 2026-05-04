import "dotenv/config";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
  ssl: {
    rejectUnauthorized: false,
  },
});

const prisma = new PrismaClient({ adapter });
const text = (v: unknown) => String(v ?? "").trim();

const normalize = (v: unknown) =>
  String(v ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const bool = (v: unknown, defaultValue = false) => {
  const s = normalize(v);
  if (["si", "sí", "yes", "true", "1"].includes(s)) return true;
  if (["no", "false", "0"].includes(s)) return false;
  return defaultValue;
};

const number = (v: unknown) => {
  if (typeof v === "number") return v;
  const s = String(v ?? "").replace(/\./g, "").replace(",", ".").trim();
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
};

const slugify = (v: unknown) =>
  String(v ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function main() {
  console.log("📦 Importando productos...");

  const filePath = path.join(process.cwd(), "data", "productos.xlsx");

  if (!fs.existsSync(filePath)) {
    throw new Error(`No existe el archivo: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const rows = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName], {
    defval: "",
  });

  console.log(`📄 Hoja: ${sheetName}`);
  console.log(`🔢 Filas: ${rows.length}`);

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const r of rows) {
    const nombre = text(r.Nombre ?? r.nombre);
    const slug = text(r.slug ?? r.Slug) || slugify(nombre);

    if (!slug || !nombre) {
      skipped++;
      continue;
    }

    const precio = number(r.Precio ?? r.precio);

await prisma.product.upsert({
  where: { slug },
      update: {
        nombre,
        descripcion: text(r.Descripción ?? r.descripcion) || null,
        categoria: text(r.Categoria ?? r.categoria),
        subcategoria: text(r.Subcategoria ?? r.subcategoria) || null,
        priceCents: Math.round(precio * 100),
        stock: Math.max(0, Math.floor(number(r.Stock ?? r.stock))),
        sku: text(r.sku ?? r.SKU ?? r.codigo ?? r.Codigo) || null,
        tags: text(r.Tags ?? r.tags) || null,
        marca: text(r.Marca ?? r.marca) || null,
        imagen: text(r.Imagen ?? r.imagen ?? r.image) || null,
        destacado: bool(r.Destacado ?? r.destacado, false),
        activo: bool(r.Activo ?? r.activo, true),
      },
      create: {
        slug,
        nombre,
        descripcion: text(r.Descripción ?? r.descripcion) || null,
        categoria: text(r.Categoria ?? r.categoria),
        subcategoria: text(r.Subcategoria ?? r.subcategoria) || null,
        priceCents: Math.round(precio * 100),
        stock: Math.max(0, Math.floor(number(r.Stock ?? r.stock))),
        sku: text(r.sku ?? r.SKU ?? r.codigo ?? r.Codigo) || null,
        tags: text(r.Tags ?? r.tags) || null,
        marca: text(r.Marca ?? r.marca) || null,
        imagen: text(r.Imagen ?? r.imagen ?? r.image) || null,
        destacado: bool(r.Destacado ?? r.destacado, false),
        activo: bool(r.Activo ?? r.activo, true),
      },
    });

    created++;
  }

  console.log("\n✅ Import terminado");
  console.log("Creados/actualizados:", created);
  console.log("Omitidos:", skipped);
}

main()
  .catch((e) => {
    console.error("IMPORT ERROR:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });