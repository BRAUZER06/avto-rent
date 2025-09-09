// src/app/sitemaps/categories.xml/route.ts
import { NextResponse } from "next/server";

export const revalidate = 20; // Актуальность кэша - 1 час

const SITE =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

// Определяем категории с их приоритетами
const CATEGORIES = [
    { slug: "all", name: "Все автомобили", priority: 0.8 },
    { slug: "mid", name: "Средний класс", priority: 0.7 },
    { slug: "russian", name: "Российские авто", priority: 0.7 },
    { slug: "jeep", name: "Внедорожники", priority: 0.8 },
    { slug: "cabrio", name: "Кабриолеты", priority: 0.7 },
    { slug: "sport", name: "Спортивные авто", priority: 0.7 },
    { slug: "premium", name: "Премиум класс", priority: 0.8 },
    { slug: "electric", name: "Электромобили", priority: 0.7 },
    { slug: "minivan", name: "Минивэны", priority: 0.7 },
    { slug: "bike", name: "Мотоциклы", priority: 0.7 },
];

export async function GET() {
    const now = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CATEGORIES.map(
    category => `
  <url>
    <loc>${SITE}/avto/${encodeURIComponent(category.slug)}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${category.priority}</priority>
  </url>
`
).join("")}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=400",
        },
    });
}
