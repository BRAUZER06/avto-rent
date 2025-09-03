// src/app/sitemaps/brands.xml/route.ts
import { formatImageUrl } from "@src/lib/helpers/formatImageUrl";
import { NextResponse } from "next/server";

export const revalidate = 3600; // 1 час

type CompanyDTO = {
    id: number;
    company_name: string;
    company_avatar_url?: string | null;
    updated_at?: string | null;
};

type ApiResponse = { companies: CompanyDTO[] };

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

    let companies: CompanyDTO[] = [];

    try {
        const res = await fetch(`${API_URL}/company_names`, { headers });
        if (!res.ok) throw new Error("Failed to fetch companies");
        const data = (await res.json()) as ApiResponse;
        companies = Array.isArray(data?.companies) ? data.companies : [];
    } catch {
        const empty = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        return new NextResponse(empty, {
            headers: { "content-type": "application/xml" },
        });
    }

    const used = new Set<string>();
    const urlsXml = companies
        .map(c => {
            const rawName = (c.company_name || "").trim();
            if (!rawName) return null;

            // Делаем уникальное имя для URL, если совпадения
            let uniqueName = rawName;
            if (used.has(uniqueName)) uniqueName = `${rawName}-${c.id}`;
            used.add(uniqueName);

            const loc = `${SITE_URL}/brands/${encodeURIComponent(uniqueName)}`;
            const lastmod = c.updated_at
                ? new Date(c.updated_at).toISOString()
                : new Date().toISOString();

            const imageUrl = c.company_avatar_url
                ? formatImageUrl(c.company_avatar_url)
                : `${SITE_URL}/og/default.jpeg`;

            return `<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
  <image:image>
    <image:loc>${imageUrl}</image:loc>
    <image:caption>Аренда авто у ${rawName}</image:caption>
  </image:image>
</url>`;
        })
        .filter(Boolean)
        .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlsXml}
</urlset>`;

    return new NextResponse(xml, { headers: { "content-type": "application/xml" } });
}
