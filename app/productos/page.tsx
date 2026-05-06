import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductoCard from "@/components/ProductoCard";
import OrdenSelect from "@/components/OrdenSelect";

export default async function ProductosPage({
  searchParams,
}: {
  searchParams: Promise<{
    categoria?: string;
    subcategoria?: string;
    marca?: string;
    orden?: string;
  q?: string;
page?: string;
  }>;
}) {
  const params = await searchParams;
  console.log("PARAMS:", params);
  const categoria = params.categoria;
  const subcategoria = params.subcategoria;
  const marca = params.marca;
  const orden = params.orden;
console.log("ORDEN ACTUAL:", orden);
const q = params.q;
const page = Math.max(1, Number(params.page || 1));
const productosPorPagina = 12;

  let query = supabase
    .from("productos")
    .select("*")
    .eq("activo", true);

  if (categoria) query = query.eq("categoria", categoria);
  if (subcategoria) query = query.eq("subcategoria", subcategoria);
  if (marca) query = query.eq("marca", marca);
if (q) query = query.ilike("nombre", `%${q}%`);

const { data: productos, error } = await query;

const limpiarNombre = (nombre: string) =>
  String(nombre || "")
    .replace(/^[^a-zA-ZáéíóúÁÉÍÓÚñÑ0-9]+/, "")
    .trim()
    .toLowerCase();

const getPrecio = (precio: any) => {
  const numero = Number(precio);
  return Number.isFinite(numero) ? numero : null;
};

const productosOrdenados = [...(productos || [])].sort((a, b) => {
  const nombreA = limpiarNombre(a.nombre);
  const nombreB = limpiarNombre(b.nombre);

  if (orden === "alfabetico") {
    return nombreA.localeCompare(nombreB, "es");
  }

  if (orden === "precio-asc") {
    const precioA = getPrecio(a.precio);
    const precioB = getPrecio(b.precio);

    if (precioA === null && precioB === null) {
      return nombreA.localeCompare(nombreB, "es");
    }

    if (precioA === null) return 1;
    if (precioB === null) return -1;

    return precioA - precioB;
  }

  if (orden === "precio-desc") {
    const precioA = getPrecio(a.precio);
    const precioB = getPrecio(b.precio);

    if (precioA === null && precioB === null) {
      return nombreA.localeCompare(nombreB, "es");
    }

    if (precioA === null) return 1;
    if (precioB === null) return -1;

    return precioB - precioA;
  }

  const destacadoA = a.destacado ? 1 : 0;
  const destacadoB = b.destacado ? 1 : 0;

  if (destacadoA !== destacadoB) {
    return destacadoB - destacadoA;
  }

  return nombreA.localeCompare(nombreB, "es");
});
const totalProductos = productosOrdenados.length;
const totalPaginas = Math.ceil(totalProductos / productosPorPagina);

const inicio = (page - 1) * productosPorPagina;
const fin = inicio + productosPorPagina;

const productosPagina = productosOrdenados.slice(inicio, fin);

if (error) {
  console.log("ERROR SUPABASE:", JSON.stringify(error, null, 2));
}

  const { data: filtros } = await supabase
    .from("productos")
    .select("categoria, subcategoria, marca")
    .eq("activo", true);

  const categorias = [...new Set(filtros?.map((p) => p.categoria).filter(Boolean))];
  const subcategorias = [
  ...new Set(
    filtros
      ?.filter((p) => !categoria || p.categoria === categoria)
      .map((p) => p.subcategoria)
      .filter(Boolean)
  ),
];
  const marcas = [
  ...new Set(
    filtros
      ?.filter(
        (p) =>
          (!categoria || p.categoria === categoria) &&
          (!subcategoria || p.subcategoria === subcategoria)
      )
      .map((p) => p.marca)
      .filter(Boolean)
  ),
];

  const buildHref = (params: Record<string, string | undefined>) => {
    const qs = new URLSearchParams();

    if (params.categoria) qs.set("categoria", params.categoria);
    if (params.subcategoria) qs.set("subcategoria", params.subcategoria);
    if (params.marca) qs.set("marca", params.marca);
    if (params.orden) qs.set("orden", params.orden);
if (params.page) qs.set("page", params.page);

    return `/productos${qs.toString() ? `?${qs.toString()}` : ""}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 md:px-6 py-8 md:py-10">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm text-cyan-700 font-semibold">
          ← Volver al inicio
        </Link>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">Productos</h1>

        <p className="mt-2 text-slate-600">
          Catálogo de productos ortopédicos de IMED Bolívar.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
         <>
  {/* 📱 FILTROS MOBILE */}
  <details className="group lg:hidden bg-white rounded-2xl shadow-sm border border-slate-200">
    <summary className="flex items-center justify-between p-5 cursor-pointer">
      <h2 className="font-bold text-slate-900">Filtros</h2>
      <span className="text-sm text-cyan-700 font-semibold">
  <span className="group-open:hidden">Abrir</span>
  <span className="hidden group-open:inline">Cerrar</span>
</span>
    </summary>

    <div className="px-5 pb-5">
      <Link href="/productos" className="text-sm text-cyan-700 font-semibold">
        Limpiar
      </Link>

      {/* CATEGORIA */}
      <div className="mt-6">
        <h3 className="text-base font-bold text-green-600">Categoría</h3>

        <div className="mt-3 space-y-2">
          {categorias.map((c) => (
            <Link
              key={c}
              href={buildHref({ categoria: c, subcategoria: undefined, marca, orden })}
              className={`block px-3 py-2 rounded-lg text-sm transition ${
                categoria === c
                  ? "bg-green-100 text-green-800 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      {/* SUBCATEGORIA */}
      {categoria && (
        <div className="mt-6">
          <h3 className="text-base font-bold text-green-600">Subcategoría</h3>

          <div className="mt-3 space-y-2">
            {subcategorias.map((s) => (
              <Link
                key={s}
                href={buildHref({ categoria, subcategoria: s, marca, orden })}
                className={`block px-3 py-2 rounded-lg text-sm transition ${
                  subcategoria === s
                    ? "bg-green-100 text-green-800 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MARCA */}
      {categoria && (
        <div className="mt-6">
          <h3 className="text-base font-bold text-green-600">Marca</h3>

          <div className="mt-3 space-y-2">
            {marcas.map((m) => (
              <Link
                key={m}
                href={buildHref({ categoria, subcategoria, marca: m, orden })}
                className={`block px-3 py-2 rounded-lg text-sm transition ${
                  marca === m
                    ? "bg-green-100 text-green-800 font-semibold"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {m}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  </details>

  {/* 💻 FILTROS DESKTOP */}
  <aside className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 p-5 h-fit lg:sticky lg:top-24">
    <div className="flex items-center justify-between">
      <h2 className="font-bold text-slate-900">Filtros</h2>

      <Link href="/productos" className="text-sm text-cyan-700 font-semibold">
        Limpiar
      </Link>
    </div>

    {/* CATEGORIA */}
    <div className="mt-6">
      <h3 className="text-base font-bold text-green-600">Categoría</h3>

      <div className="mt-3 space-y-2">
        {categorias.map((c) => (
          <Link
            key={c}
            href={buildHref({ categoria: c, subcategoria: undefined, marca, orden })}
            className={`block px-3 py-2 rounded-lg text-sm transition ${
              categoria === c
                ? "bg-green-100 text-green-800 font-semibold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {c}
          </Link>
        ))}
      </div>
    </div>

    {/* SUBCATEGORIA */}
    {categoria && (
      <div className="mt-6">
        <h3 className="text-base font-bold text-green-600">Subcategoría</h3>

        <div className="mt-3 space-y-2">
          {subcategorias.map((s) => (
            <Link
              key={s}
              href={buildHref({ categoria, subcategoria: s, marca, orden })}
              className={`block px-3 py-2 rounded-lg text-sm transition ${
                subcategoria === s
                  ? "bg-green-100 text-green-800 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {s}
            </Link>
          ))}
        </div>
      </div>
    )}

    {/* MARCA */}
    {categoria && (
      <div className="mt-6">
        <h3 className="text-base font-bold text-green-600">Marca</h3>

        <div className="mt-3 space-y-2">
          {marcas.map((m) => (
            <Link
              key={m}
              href={buildHref({ categoria, subcategoria, marca: m, orden })}
              className={`block px-3 py-2 rounded-lg text-sm transition ${
                marca === m
                  ? "bg-green-100 text-green-800 font-semibold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {m}
            </Link>
          ))}
        </div>
      </div>
    )}
  </aside>
</>

          <section>
            <div className="mb-4 flex items-center justify-between gap-4">
  <p className="text-sm text-slate-600">
    {totalProductos} productos encontrados
  </p>

  <OrdenSelect />

</div>


<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
  {productosPagina.map((p) => (
  <ProductoCard key={p.id} p={p} />
))}
</div>
{totalPaginas > 1 && (
  <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
    {page > 1 && (
      <Link
        href={buildHref({ categoria, subcategoria, marca, orden, page: "1" })}
        className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
      >
        Primera
      </Link>
    )}

    {page > 1 && (
      <Link
        href={buildHref({
          categoria,
          subcategoria,
          marca,
          orden,
          page: String(page - 1),
        })}
        className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
      >
        Anterior
      </Link>
    )}

    <span className="px-3 py-2 text-sm text-slate-600">
      Página {page} de {totalPaginas}
    </span>

    {page < totalPaginas && (
      <Link
        href={buildHref({
          categoria,
          subcategoria,
          marca,
          orden,
          page: String(page + 1),
        })}
        className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
      >
        Siguiente
      </Link>
    )}

    {page < totalPaginas && (
      <Link
        href={buildHref({
          categoria,
          subcategoria,
          marca,
          orden,
          page: String(totalPaginas),
        })}
        className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
      >
        Última
      </Link>
    )}
  </div>
)}
          </section>
        </div>
      </div>
    </main>
  );
}