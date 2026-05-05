export const metadata = {
  title: "Ortopedia en Bolívar | IMed Bolívar",
  description:
    "Venta de productos ortopédicos en Bolívar. Fajas, medias de compresión, ortopedia, movilidad y más. Consultá por WhatsApp.",
};

export default function OrtopediaBolivar() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Ortopedia en Bolívar
      </h1>

      <p className="mt-4 text-slate-700">
        En IMed Bolívar ofrecemos una amplia variedad de productos ortopédicos
        para el cuidado de la salud y la movilidad. Contamos con fajas, medias
        de compresión, andadores, sillas de ruedas, ortopedia para rehabilitación
        y más.
      </p>

      <p className="mt-4 text-slate-700">
        Si estás buscando una ortopedia en Bolívar, podés consultar nuestro
        catálogo online o comunicarte directamente por WhatsApp para recibir
        asesoramiento personalizado.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">
        Productos ortopédicos en Bolívar
      </h2>

      <ul className="mt-4 list-disc pl-6 text-slate-700 space-y-1">
        <li>Fajas y ortopedia de contención</li>
        <li>Medias de compresión</li>
        <li>Andadores y movilidad</li>
        <li>Sillas de ruedas</li>
        <li>Equipos de diagnóstico</li>
      </ul>

      <div className="mt-8">
        <a
          href="https://wa.me/5492314629704"
          target="_blank"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </main>
  );
}