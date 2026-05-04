"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function OrdenSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ordenActual = searchParams.get("orden") || "recomendado";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "recomendado") {
      params.delete("orden");
    } else {
      params.set("orden", value);
    }

    router.push(`/productos?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-600">Ordenar por</span>

      <select
        value={ordenActual}
        onChange={(e) => handleChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
      >
        <option value="recomendado">Recomendado</option>
        <option value="alfabetico">Orden alfabético</option>
        <option value="precio-asc">Menor precio</option>
        <option value="precio-desc">Mayor precio</option>
      </select>
    </div>
  );
}