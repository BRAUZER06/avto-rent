// src/app/sitemaps/categories.xml/route.ts
export const revalidate = 3600;

const SITE =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

const CATEGORIES = [
    "all",
    "mid",
    "russian",
    "suv",
    "cabrio",
    "sport",
    "premium",
    "electric",
    "minivan",
    "bike",
];

export async function GET() {
    const now = new Date().toISOString();

    const urls = CATEGORIES.map(c => `${SITE}/avto/${encodeURIComponent(c)}`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
        u => `  <url>
    <loc>${u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
  </url>`
    )
    .join("\n")}
</urlset>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}
