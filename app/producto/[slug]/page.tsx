import { supabase } from "@/lib/supabase";
import ProductoCard from "@/components/ProductoCard";

export default async function Producto({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: producto, error } = await supabase
    .from("productos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !producto) {
    return (
      <main className="p-10">
        <p>Producto no encontrado</p>
        <pre>{JSON.stringify({ slug, error }, null, 2)}</pre>
      </main>
    );
  }

const { data: relacionados } = await supabase
  .from("productos")
  .select("*")
  .eq("activo", true)
  .eq("categoria", producto.categoria)
  .neq("id", producto.id)
  .limit(4);

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center min-h-[400px]">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-contain p-6"
          />
        </div>

        <div>
  <div className="flex flex-wrap gap-2 mb-3">
    <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">
      {producto.categoria}
    </span>

    {producto.subcategoria && (
      <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
        {producto.subcategoria}
      </span>
    )}
  </div>

  <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
    {producto.nombre}
  </h1>

          <p className="mt-4 text-slate-600">
            {producto.descripcion}
          </p>

          <a
             href={`https://wa.me/5492314629704?text=${encodeURIComponent(
    `Hola, consulto por ${producto.nombre}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
            className="btn-primary mt-6 inline-block px-6 py-3"
          >
            Consultar por WhatsApp
          </a>
        </div>
            </div>

      {relacionados && relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900">
            Productos relacionados
          </h2>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {relacionados.map((p) => (
              <ProductoCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}