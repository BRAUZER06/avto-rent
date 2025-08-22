// src/app/sitemaps/static.xml/route.ts
export const revalidate = 3600;

const SITE =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

const now = new Date().toISOString();

const STATIC = [
    "/", // Главная
    "/avto", // Лента/каталог (если есть отдельная)
    "/about", // если есть
].map(path => `${SITE}${path}`);

export async function GET() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC.map(
    u => `  <url>
    <loc>${u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
  </url>`
).join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}
