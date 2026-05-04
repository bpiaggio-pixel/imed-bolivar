import Link from "next/link";

export default function ProductoCard({ p }: { p: any }) {
  return (
    <article className="card overflow-hidden flex flex-col h-full">
      <Link href={`/producto/${p.slug}`} className="block">
        <div className="aspect-square bg-white flex items-center justify-center">
          {p.imagen ? (
            <img
              src={p.imagen}
              alt={p.nombre}
              className="h-full w-full object-contain p-4"
            />
          ) : (
            <span className="text-slate-400 text-sm">Sin imagen</span>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-cyan-700 font-semibold">
            {p.subcategoria || p.categoria}
          </p>

          <h2 className="mt-1 font-bold text-slate-900">{p.nombre}</h2>

          {p.precio && (
            <p className="mt-2 font-bold text-slate-900">
              ${Number(p.precio).toLocaleString("es-AR")}
            </p>
          )}

          <p className="mt-2 text-sm text-slate-600 line-clamp-2">
            {p.descripcion}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4 mt-auto">
        <a
  href={`https://wa.me/5492314629704?text=${encodeURIComponent(
    `Hola, consulto por ${p.nombre}`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="btn-primary block text-center text-sm"
>
  Consultar
</a>
      </div>
    </article>
  );
}