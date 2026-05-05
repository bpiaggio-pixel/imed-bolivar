"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import CategoriasMenu from "@/components/CategoriasMenu";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (path: string) =>
    `pb-1 border-b-2 ${
      pathname === path
        ? "text-teal-600 border-teal-600"
        : "border-transparent hover:text-teal-600"
    }`;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo-imed2.png"
              alt="IMed Ortopedia"
              className="h-7 md:h-9 w-auto object-contain"
            />
          </Link>

          <form action="/productos" className="flex-1 mx-2">
  <input
    type="search"
    name="q"
    placeholder="Buscar productos..."
    className="w-full rounded-full border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
  />
</form>
        </div>

        <div className="hidden md:flex items-center gap-7 shrink-0">
          <nav className="flex items-center gap-7 text-sm font-semibold tracking-tight">
            <Link href="/" className={linkClass("/")}>Inicio</Link>
            <Link href="/productos" className={linkClass("/productos")}>Productos</Link>

            <div className="relative">
              <CategoriasMenu className={linkClass("/categorias")} />
            </div>

            <Link href="/nosotros" className={linkClass("/nosotros")}>Nosotros</Link>
            <Link href="/contacto" className={linkClass("/contacto")}>Contacto</Link>
          </nav>

          <a
            href="https://wa.me/5492314629704?text=Hola%20quiero%20consultar%20por%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary px-4 py-2 text-sm"
          >
            Consultar
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>



      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-4">
          <form action="/productos">
            <input
              type="search"
              name="q"
              placeholder="Buscar productos..."
              className="w-full rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-teal-600"
            />
          </form>

          <nav className="flex flex-col gap-3 text-sm font-semibold">
            <Link href="/" onClick={() => setOpen(false)}>Inicio</Link>
            <Link href="/productos" onClick={() => setOpen(false)}>Productos</Link>
            <Link href="/productos" onClick={() => setOpen(false)}>Categorías</Link>
            <Link href="/nosotros" onClick={() => setOpen(false)}>Nosotros</Link>
            <Link href="/contacto" onClick={() => setOpen(false)}>Contacto</Link>
          </nav>

          <a
            href="https://wa.me/5492314629704?text=Hola%20quiero%20consultar%20por%20productos"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary block text-center px-4 py-2 text-sm"
          >
            Consultar
          </a>
        </div>
      )}
    </header>
  );
}