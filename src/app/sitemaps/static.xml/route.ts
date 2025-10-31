import { NextResponse } from "next/server";

export const revalidate = 20;

const SITE =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

const now = new Date().toISOString();

const STATIC_PATHS = [
    "/avto/all", // Главная «логическая» страница
    "/avto",
    "/about",
    "/sdat",
    "cherny-spisok",
    // '/news'...
    // '/blog'...
];

export async function GET() {
    const urlsXml = STATIC_PATHS.map(u => {
        const priority = u === "/avto/all" ? 1.0 : 0.9;
        return `<url>
  <loc>${SITE}${u}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>daily</changefreq>
  <priority>${priority}</priority>
</url>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "content-type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
        },
    });
}
