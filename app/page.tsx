import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductoCard from "@/components/ProductoCard";
import {
  Accessibility,
  Footprints,
  Home as HomeIcon,
  Activity,
  Droplet,
  HeartPulse,
  MoreHorizontal,
  ShieldCheck,
  User,
  Truck,
Star,
  PersonStanding,
Bath,
ArrowRight,
} from "lucide-react";


const Icon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactNode> = {
body: <PersonStanding size={42} />,
wheelchair: <Accessibility size={42} />,
sock: <Footprints size={42} />,
home: <HomeIcon size={42} />,
intestine: <Activity size={42} />,
drop: <Droplet size={42} />,
pulse: <HeartPulse size={42} />,
bath: <Bath size={42} />,
    shield: <ShieldCheck size={20} />,
    user: <User size={20} />,
    truck: <Truck size={20} />,
  };

  return <div className="transition-colors">{icons[name]}</div>;
};
const categorias = [
  { nombre: "Contención", icono: "body" },
  { nombre: "Movilidad", icono: "wheelchair" },
  { nombre: "Medias y Plantillas", icono: "sock" },
  { nombre: "Ayuda en Casa", icono: "home" },
  { nombre: "Productos Hospitalarios", icono: "intestine" },
  { nombre: "Incontinencia", icono: "drop" },
  { nombre: "Equipos Diagnóstico", icono: "pulse" },
  { nombre: "Ayudas para el baño", icono: "bath" },
];

export default async function Home() {
  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .eq("destacado", true)
    .order("createdAt", { ascending: false })
.limit(8);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* HERO */}
      <section className="bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-[46%_54%] gap-8 items-stretch">
{/* 📱 HERO IMAGE MOBILE */}
    <div className="block md:hidden mb-6">
      <img
        src="/imed-ortopedia.webp"
        alt="Ortopedia IMed Bolívar"
        className="w-full h-56 object-cover rounded-2xl"
      />
    </div>
    <div className="py-6 md:py-16">
      <p className="text-sm font-bold uppercase tracking-wide text-teal-600">
        Ortopedia en Bolívar
      </p>

      <h1 className="mt-4 text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
  IMed{" "}
  <span className="text-slate-500 font-medium">
    Bolívar
  </span>
</h1>

      <p className="mt-5 max-w-xl text-lg text-slate-600">
        Productos ortopédicos, movilidad, medias de compresión y artículos
        para el cuidado diario.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="https://wa.me/5492314629704?text=Hola%20quiero%20consultar%20por%20productos"
  target="_blank" className="btn-primary px-6 py-3">
          Consultar por WhatsApp
        </a>

        <Link href="/productos" className="btn-outline px-6 py-3">
          Ver productos →
        </Link>
      </div>

      <div className="mt-10 grid sm:grid-cols-3 gap-5 text-sm">
  
  {/* CALIDAD */}
  <div className="flex gap-3 items-start">
    <div className="w-12 h-12 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0">
      <Icon name="shield" />
    </div>
    <div>
      <p className="font-bold text-slate-900">Calidad garantizada</p>
      <p className="text-slate-500">Primeras marcas</p>
    </div>
  </div>

  {/* ASESORAMIENTO */}
  <div className="flex gap-3 items-start">
    <div className="w-12 h-12 rounded-full bg-green-200 text-green-700 flex items-center justify-center shrink-0">
      <Icon name="user" />
    </div>
    <div>
      <p className="font-bold text-slate-900">Asesoramiento</p>
      <p className="text-slate-500">Atención personalizada</p>
    </div>
  </div>

  {/* EXPERIENCIA */}
  <div className="flex gap-3 items-start">
    <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
      <Star size={18} />
    </div>
    <div>
      <p className="font-bold text-slate-900">En Bolívar</p>
      <p className="text-base text-slate-500 leading-tight">
        <span className="font-semibold text-orange-500 tracking-tight">
          + de 30 años
        </span>{" "}
        de experiencia
      </p>
    </div>
  </div>

</div>
    </div>

    <div
  className="hidden md:block bg-cover bg-center"
  style={{ backgroundImage: "url('/imed-ortopedia.webp')" }}
/>
  </div>
</section>

      {/* CATEGORÍAS */}
      <section id="categorias" className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Categorías principales</h2>

        </div>

        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categorias.map((cat) => (
<Link
  key={cat.nombre}
  href={`/productos?categoria=${encodeURIComponent(cat.nombre)}`}
  className="card h-38 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition group"
>
<div className="mb-3 flex items-center justify-center text-teal-600 group-hover:text-green-500 transition">
  <Icon name={cat.icono} />
</div>

    <p className="font-bold text-sm">{cat.nombre}</p>
  </Link>
))}
        </div>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-6 pb-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Productos destacados</h2>
<Link
  href="/productos"
  className="text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all group"
>
  Ver todos los productos
  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
</Link>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {productos?.map((p) => (
  <ProductoCard key={p.id} p={p} />
))}
        </div>
      </section>

      {/* CONFIANZA */}
<section className="bg-slate-50 mt-16 pt-1 pb-16">
  <div className="max-w-7xl mx-auto px-6">
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
      <div className="p-6 flex gap-4 items-start">
        <div className="text-teal-600 shrink-0">
          <svg className="w-13 h-13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 21s-6-5.5-6-10a6 6 0 1112 0c0 4.5-6 10-6 10z" />
            <circle cx="12" cy="11" r="2" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Estamos en Bolívar</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Visitanos en nuestro local y recibí la mejor atención.
          </p>
        </div>
      </div>

      <div className="p-6 flex gap-4 items-start">
        <div className="text-teal-600 shrink-0">
          <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4z" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Consultá por WhatsApp</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Escribinos y te asesoramos en todo lo que necesites.
          </p>
        </div>
      </div>

      <div className="p-6 flex gap-4 items-start">
       <div className="text-teal-600 shrink-0">
  <ShieldCheck className="w-11 h-11" strokeWidth={2} />
</div>
        <div>
          <p className="font-semibold text-slate-900">Productos de calidad</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Trabajamos con las mejores marcas del mercado.
          </p>
        </div>
      </div>

      <div className="p-6 flex gap-4 items-start">
        <div className="text-teal-600 shrink-0">
          <svg className="w-11 h-11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Medios de pago</p>
          <p className="text-sm text-slate-500 leading-relaxed">
            Efectivo, tarjetas y transferencias.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}