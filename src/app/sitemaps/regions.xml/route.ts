import { NextResponse } from "next/server";

export const revalidate = 0;

const SITE =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

const REGIONS = [
    "ingushetia",
    "chechnya",
    "dagestan",
    "north-ossetia",
    "kabardino-balkaria",
    "karachay-cherkessia",
    "stavropol",
];

const CATEGORIES = [
    "all",
    "mid",
    "russian",
    "jeep",
    "cabrio",
    "sport",
    "premium",
    "electric",
    "minivan",
    "bike",
];

export async function GET() {
    const now = new Date().toISOString();

    const urlsXml = REGIONS.flatMap(region =>
        CATEGORIES.map(category => {
            const loc = `${SITE}/${encodeURIComponent(region)}/avto/${encodeURIComponent(category)}`;
            return `<url>
  <loc>${loc}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>`;
        })
    ).join("\n");

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
