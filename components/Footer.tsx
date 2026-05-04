import Link from "next/link";
import { MessageCircle, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* CTA */}
      <section className="bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 text-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center text-2xl">
              <div className="flex items-center justify-center">
  <MessageCircle className="w-8 h-8 text-teal-600" />
</div>
            </div>
            <div>
              <p className="text-xl font-bold">¿Tenés dudas?</p>
              <p className="text-slate-600 font-medium">
                Escribinos por WhatsApp y te ayudamos a encontrar lo que necesitás.
              </p>
            </div>
          </div>

          <a
  href="https://wa.me/5492314629704?text=Hola%20quiero%20consultar%20por%20productos"
  target="_blank"
  className="bg-teal-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-teal-600 transition flex items-center gap-2"
>
  <img
    src="/whatsapp.png"
    alt="WhatsApp"
    className="w-5 h-5 object-contain"
  />
  Consultar por WhatsApp
</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-b from-slate-800 via-slate-800 to-slate-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

          {/* LOGO */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center font-bold">
                <img
    src="/logo-chico-imed.png"
    alt="IMED Bolívar"
    className="w-8 h-8 object-contain"
  />

              </div>
              <div>
                <p className="font-bold text-lg">IMed</p>
                <p className="text-sm text-slate-200">Bolívar</p>
              </div>
            </div>

            <p className="mt-4 text-slate-400 text-sm">
              Tu ortopedia de confianza en Bolívar.
            </p>
          </div>

          {/* NAV */}
          <div>
            <p className="font-semibold mb-4">Navegación</p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/productos">Productos</Link></li>
              <li><Link href="/categorias">Categorías</Link></li>
              <li><Link href="/nosotros">Nosotros</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="space-y-3 text-sm">
  <div className="flex items-center gap-2 text-slate-300">
    <Phone className="w-4 h-4 text-emerald-300 " />
    2314 424494
  </div>

<a
  href="https://wa.me/5492314629704?text=Hola%20quiero%20consultar%20por%20productos"
  target="_blank"
  className="flex items-center gap-2 text-slate-300 hover:text-white transition"
>
  <MessageCircle className="w-4 h-4 text-green-400" />
  WhatsApp
</a>

  <div className="flex items-center gap-2 text-slate-300">
    <MapPin className="w-4 h-4 text-green-400" />
    Av San Martín 1359 Bolívar, Bs As, Argentina
  </div>
<div className="pt-4">
  <p className="text-sm font-semibold text-white mb-2">
    Seguinos en Redes
  </p>

  <a
    href="https://instagram.com/imedbolivar" //     target="_blank"
    className="flex items-center gap-2 text-slate-300 hover:text-white transition"
  >
    <img
      src="/instagram.png"
      alt="Instagram"
      className="w-5 h-5 object-contain"
    />
    Instagram
  </a>
</div>
</div>
</div>

        <div className="border-t border-slate-700 text-center text-sm text-slate-200 py-4">
          © 2024 IMed Bolívar. Todos los derechos reservados.
        </div>
      </footer>
    </>
  );
}