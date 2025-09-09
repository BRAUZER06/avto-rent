// src/app/sitemap.xml/route.ts
export const revalidate = 20; // 1 час

const SITE =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

const API =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ||
    "https://rentavtokavkaz.ru/api";

const CHUNK_SIZE = 5000; // до 50k на файл по стандарту (оставим запасом)

async function calcCarsChunks(): Promise<number> {
    try {
        const r = await fetch(`${API}/cars?page=1&per_page=1`, { next: { revalidate } });
        if (!r.ok) throw new Error("cars meta failed");
        const data = await r.json();
        const total: number = data?.meta?.total ?? 0;
        return Math.max(1, Math.ceil(total / CHUNK_SIZE));
    } catch {
        // если не смогли узнать total — хотя бы 1 чанк
        return 1;
    }
}

export async function GET() {
    const chunks = await calcCarsChunks();

    const children = [
        `${SITE}/sitemaps/static.xml`,
        `${SITE}/sitemaps/categories.xml`,
        `${SITE}/sitemaps/regions.xml`,
        `${SITE}/sitemaps/brands.xml`,
        `${SITE}/sitemaps/cars.xml`,
        // если будет 5к+ оавтомобилей разделить логику на chunk
        // ...Array.from({ length: chunks }, (_, i) => `${SITE}/sitemaps/cars/${i + 1}.xml`),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${children.map(u => `  <sitemap><loc>${u}</loc></sitemap>`).join("\n")}
</sitemapindex>`;

    return new Response(xml, {
        headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
}
