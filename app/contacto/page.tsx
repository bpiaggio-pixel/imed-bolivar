"use client";
import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";

export default function ContactoPage() {
 const [enviado, setEnviado] = useState(false); 
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="text-sm text-teal-700 font-semibold">
          ← Volver al inicio
        </Link>

        <section className="mt-10">
          <p className="text-sm font-bold uppercase tracking-wide text-teal-600">
            Contacto
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            Comunicate con nosotros
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Consultanos por productos, disponibilidad o asesoramiento. Estamos
            para ayudarte.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                Información de contacto
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex gap-4">
                  <MapPin className="w-7 h-7 text-teal-600 shrink-0" />
                  <div>
                    <p className="font-bold">Ubicación</p>
<p className="text-slate-500">
                      Av San Martín 1359
                    </p>
                    <p className="text-slate-500">
                      Bolívar, Buenos Aires
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MessageCircle className="w-7 h-7 text-teal-600 shrink-0" />
                  <div>
                    <p className="font-bold">WhatsApp</p>
                    <p className="text-slate-500">
                      Escribinos para recibir asesoramiento.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Phone className="w-7 h-7 text-teal-600 shrink-0" />
                  <div>
                    <p className="font-bold">Teléfono</p>
                    <p className="text-slate-500">
                     02314-424494.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Clock className="w-7 h-7 text-teal-600 shrink-0" />
                  <div>
                    <p className="font-bold">Horarios</p>
                    <p className="text-slate-500">
                      Lunes a viernes. 08:30 a 12:30hs y 16:00 a 19:30hs
                    </p>
<p className="text-slate-500">
                      Sábados. 09:00 a 13:00hs
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/5492314000000"
                target="_blank"
                className="mt-8 inline-flex rounded-full bg-teal-600 px-6 py-3 text-white font-bold hover:bg-teal-700 transition"
              >
                Consultar por WhatsApp
              </a>
<form
  action="https://formsubmit.co/adelinaimed@hotmail.com"
  method="POST"
  target="hidden_iframe"
  onSubmit={() => {
    setTimeout(() => setEnviado(true), 500);
  }}
  className="mt-8 space-y-4"
>
  <input type="hidden" name="_captcha" value="false" />

  <h3 className="text-xl font-bold text-slate-900">
    Enviar consulta
  </h3>

  <input
    type="text"
    name="nombre"
    placeholder="Nombre"
    required
    className="w-full border border-slate-300 rounded-lg px-4 py-2"
  />

  <input
    type="email"
    name="email"
    placeholder="Email"
    required
    className="w-full border border-slate-300 rounded-lg px-4 py-2"
  />

  <textarea
    name="mensaje"
    placeholder="Mensaje"
    required
    rows={4}
    className="w-full border border-slate-300 rounded-lg px-4 py-2"
  />

  <button
    type="submit"
    className="w-full bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
  >
    Enviar mensaje
  </button>

  {enviado && (
    <p className="text-green-600 font-semibold">
      ✔ Mensaje enviado correctamente
    </p>
  )}
</form>

<iframe name="hidden_iframe" style={{ display: "none" }} />
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[360px]">
              <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3218.5406231356387!2d-61.119704500000005!3d-36.226359099999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bfe3b284e73bf5%3A0x2b02b472b169f877!2sIMED%20-%20Bol%C3%ADvar!5e0!3m2!1ses-419!2sar!4v1777909676292!5m2!1ses-419!2sar"
  className="w-full h-full min-h-[360px]"
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