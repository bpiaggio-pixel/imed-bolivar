export default function sitemap() {
  const baseUrl = "https://imedbolivar.com.ar";

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
  ];
}