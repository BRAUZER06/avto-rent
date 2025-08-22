// src/app/sitemaps/brands.xml/route.ts
import { NextResponse } from "next/server";

export const revalidate = 3600;

type CompanyNameDTO = { id: number; company_name: string };
type ApiResponse = { companies: CompanyNameDTO[] };

function trimTrailingSlash(s: string) {
    return s.replace(/\/+$/, "");
}

function slugFromCompanyName(name: string) {
    const cleaned = name.trim().replace(/\s+/g, "-");
    return encodeURIComponent(cleaned);
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

    const res = await fetch(`${API_URL}/company_names`, {
        headers,
    });

    if (!res.ok) {
        // отдаём пустую карту, чтобы не падать
        const empty = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>`;
        return new NextResponse(empty, {
            headers: { "content-type": "application/xml" },
        });
    }

    const data = (await res.json()) as ApiResponse;
    const companies = Array.isArray(data?.companies) ? data.companies : [];

    const used = new Set<string>();
    const urls = companies
        .map(c => {
            const raw = (c.company_name || "").trim();
            if (!raw) return null;

            let slug = slugFromCompanyName(raw);

            // если такой slug уже был (дубли имён), добавим -id
            if (used.has(slug)) slug = `${slug}-${c.id}`;
            used.add(slug);

            const loc = `${SITE_URL}/brands/${slug}`;
            return `<url><loc>${loc}</loc><changefreq>weekly</changefreq><priority>0.6</priority></url>`;
        })
        .filter(Boolean)
        .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls}
</urlset>`;

    return new NextResponse(xml, { headers: { "content-type": "application/xml" } });
}
