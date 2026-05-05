import Link from "next/link";

export default function ProductoCard({ p }: { p: any }) {
  return (
    <article className="card overflow-hidden flex flex-row md:flex-col h-full">
      <Link href={`/producto/${p.slug}`} className="flex md:block flex-1">
        <div className="w-32 shrink-0 bg-white flex items-center justify-center md:w-full md:aspect-square">
          {p.imagen ? (
            <img
              src={p.imagen}
              alt={p.nombre}
              className="h-28 w-28 md:h-full md:w-full object-contain p-3 md:p-4"
            />
          ) : (
            <span className="text-slate-400 text-sm">Sin imagen</span>
          )}
        </div>

        <div className="p-3 md:p-4 flex-1 flex flex-col">
          <p className="text-xs text-cyan-700 font-semibold">
            {p.subcategoria || p.categoria}
          </p>

          <h2 className="mt-1 font-bold text-slate-900 text-sm md:text-base line-clamp-2">
            {p.nombre}
          </h2>

          {p.precio && (
            <p className="mt-2 font-bold text-slate-900">
              ${Number(p.precio).toLocaleString("es-AR")}
            </p>
          )}

          <p className="mt-2 text-xs md:text-sm text-slate-600 line-clamp-2">
  {p.descripcion}
</p>
        </div>
      </Link>

      <div className="hidden md:block px-4 pb-4 mt-auto">
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