"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CategoriasMenu({
  className = "",
}: {
  className?: string;
}) {
  const [categorias, setCategorias] = useState<Record<string, string[]>>({});

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("productos")
        .select("categoria, subcategoria")
        .eq("activo", true);

      const map: Record<string, Set<string>> = {};

      data?.forEach((p) => {
        if (!p.categoria) return;
        if (!map[p.categoria]) map[p.categoria] = new Set();
        if (p.subcategoria) map[p.categoria].add(p.subcategoria);
      });

      const result: Record<string, string[]> = {};
      Object.entries(map).forEach(([cat, subs]) => {
        result[cat] = Array.from(subs).sort();
      });

      setCategorias(result);
    }

    load();
  }, []);

 return (
  <div className="relative group">
    <button className={className}>Categorías</button>

    <div className="absolute top-full left-0 hidden group-hover:block z-50 pt-3">
      <div className="w-72 rounded-xl border border-slate-200 bg-white shadow-lg p-3">
        {Object.entries(categorias).map(([categoria, subs]) => (
          <div key={categoria} className="relative group/cat">
            <Link
              href={`/productos?categoria=${encodeURIComponent(categoria)}`}
              className="flex items-center justify-between rounded-lg px-3 py-2 font-semibold text-slate-900 hover:bg-slate-50 hover:text-teal-600"
            >
              <span>{categoria}</span>
              {subs.length > 0 && <span>›</span>}
            </Link>

            {subs.length > 0 && (
              <div className="absolute left-full top-0 hidden group-hover/cat:block pl-2">
                <div className="w-72 rounded-xl border border-slate-200 bg-white shadow-lg p-3">
                  {subs.map((sub) => (
                    <Link
                      key={sub}
                      href={`/productos?categoria=${encodeURIComponent(
                        categoria
                      )}&subcategoria=${encodeURIComponent(sub)}`}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-teal-600"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
}