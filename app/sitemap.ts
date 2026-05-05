import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://www.imedbolivar.com.ar";

  const { data: productos } = await supabase
    .from("productos")
    .select("slug, updatedAt, createdAt")
    .eq("activo", true);

  const productosUrls =
    productos?.map((p) => ({
      url: `${baseUrl}/producto/${p.slug}`,
      lastModified: p.updatedAt || p.createdAt || new Date(),
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/productos`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/categorias`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ortopedia-bolivar`,
      lastModified: new Date(),
    },
    ...productosUrls,
  ];
}