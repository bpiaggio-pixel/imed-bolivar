import Link from "next/link";
import { ShieldCheck, HeartHandshake, MapPin, Star } from "lucide-react";

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="text-sm text-teal-700 font-semibold">
          ← Volver al inicio
        </Link>
<div className="mt-8">
  <div className="w-full h-[380px] md:h-[500px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
    <img
      src="/local.jpg"
      alt="Local IMed Bolívar"
      className="w-full h-full object-cover"
    />
  </div>
</div>
        <section className="mt-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-teal-600">
              Sobre nosotros
            </p>

            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
              IMed Bolívar
            </h1>

            <p className="mt-5 text-lg text-slate-600 leading-relaxed">
              Somos una ortopedia ubicada en Bolívar, dedicada a brindar
              soluciones para la movilidad, el cuidado diario, la recuperación y
              el bienestar de nuestros clientes.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Trabajamos con productos ortopédicos, ayudas para la movilidad,
              medias de compresión, artículos para el hogar, equipos de
              diagnóstico y accesorios pensados para mejorar la calidad de vida.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Nuestro compromiso
            </h2>

            <div className="mt-6 space-y-5">
              <div className="flex gap-4">
                <ShieldCheck className="w-8 h-8 text-teal-600 shrink-0" />
                <div>
                  <p className="font-bold">Productos de calidad</p>
                  <p className="text-sm text-slate-500">
                    Trabajamos con marcas confiables y productos seleccionados.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <HeartHandshake className="w-8 h-8 text-teal-600 shrink-0" />
                <div>
                  <p className="font-bold">Atención personalizada</p>
                  <p className="text-sm text-slate-500">
                    Te asesoramos para ayudarte a elegir la mejor opción.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin className="w-8 h-8 text-teal-600 shrink-0" />
                <div>
                  <p className="font-bold">Estamos en Bolívar</p>
                  <p className="text-sm text-slate-500">
                    Podés visitarnos y recibir atención directa en nuestro local.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Star className="w-8 h-8 text-teal-600 shrink-0" />
                <div>
                  <p className="font-bold">Experiencia</p>
                  <p className="text-sm text-slate-500">
                    Más de 30 años acompañando a nuestros clientes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
<section className="mt-12">
  <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
    <div className="p-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Dónde estamos
      </h2>
      <p className="text-slate-500 mt-1">
        Visitá nuestro local en Bolívar
      </p>
    </div>

    <div className="w-full h-[400px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3218.5406231356387!2d-61.119704500000005!3d-36.226359099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bfe3b284e73bf5%3A0x2b02b472b169f877!2sIMED%20-%20Bol%C3%ADvar!5e0!3m2!1ses-419!2sar!4v1777909676292!5m2!1ses-419!2sar"
        className="w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</section>
      </div>
    </main>
  );
}