// src/app/sitemaps/cars.xml/route.ts
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { NextResponse } from "next/server";

export const revalidate = 3600; // Актуальность кэша - 1 час

type CarSitemapDTO = {
    id: number;
    slug: string;
    title: string;
    updated_at: string;
    main_image_url?: string | null;
    location?: string;
};

type ApiResponse = { cars: CarSitemapDTO[] };

function trimTrailingSlash(s: string) {
    return s.replace(/\/+$/, "");
}

export async function GET() {
    const SITE_URL = trimTrailingSlash(
        process.env.NEXT_PUBLIC_SITE_URL || "https://rentavtokavkaz.ru"
    );
    const API_URL = trimTrailingSlash(
        process.env.NEXT_PUBLIC_API_URL || "https://rentavtokavkaz.ru/api"
    );

    const AUTH = process.env.SITEMAP_BEARER;
    const headers: HeadersInit = AUTH ? { Authorization: AUTH } : {};

    let cars: CarSitemapDTO[] = [];

    try {
        // !!! ЗАМЕНИТЕ ЭТОТ URL НА СПЕЦИАЛЬНЫЙ ЛЕГКИЙ ЭНДПОИНТ ДЛЯ SITEMAP !!!
        const res = await fetch(`${API_URL}/cars_for_sitemap`, {
            headers,
            next: { revalidate: 3600 },
        });
        if (!res.ok) throw new Error(`Failed to fetch cars: ${res.statusText}`);
        const data = (await res.json()) as ApiResponse;
        cars = Array.isArray(data?.cars) ? data.cars : [];
    } catch (error) {
        console.error("Sitemap cars error:", error);
        // В случае ошибки возвращаем пустой urlset, чтобы не ломать всю выдачу
        const empty = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        return new NextResponse(empty, {
            headers: { "content-type": "application/xml" },
        });
    }

    const urlsXml = cars
        .map(car => {
            const loc = `${SITE_URL}/cars/${encodeURIComponent(car.slug)}`;
            const lastmod = new Date(car.updated_at).toISOString();

            let imageXml = "";
            if (car.main_image_url) {
                const imageUrl = formatImageUrl(car.main_image_url);
                const imageCaption = `Аренда ${car.title}${car.location ? ` в ${car.location}` : ""}`;
                imageXml = `
  <image:image>
    <image:loc>${imageUrl}</image:loc>
    <image:caption>${imageCaption}</image:caption>
  </image:image>`;
            }

            return `<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>${imageXml}
</url>`;
        })
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlsXml}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            "content-type": "application/xml",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
        },
    });
}
