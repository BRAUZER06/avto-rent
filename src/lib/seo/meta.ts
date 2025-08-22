// src/lib/seo/meta.ts
export function buildCanonical(path: string) {
    const base = (
        process.env.NEXT_PUBLIC_SITE_URL || "https://rentavtokavkaz.ru"
    ).replace(/\/+$/, "");
    return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function truncate(s = "", n = 160) {
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
}

// Примеры шаблонов:
export function carMeta({
    title,
    location,
    price,
    id,
}: {
    title?: string;
    location?: string;
    price?: string | number;
    id: string | number;
}) {
    const t = [title, location].filter(Boolean).join(" — ");
    const d = [
        title,
        location && `Локация: ${location}`,
        price && `Цена от ${String(price).replace(/[^\d,\.]/g, "")} ₽/сутки`,
    ]
        .filter(Boolean)
        .join(". ");
    return {
        title: `${t} | Аренда авто Кавказ`,
        description: truncate(d),
        canonical: buildCanonical(`/avto/car/${id}`),
    };
}

export function companyMeta({ name }: { name?: string }) {
    return {
        title: `${name} — аренда авто | Кавказ`,
        description: truncate(`${name}: контакты, авто, условия аренды.`),
        canonical: buildCanonical(`/brands/${encodeURIComponent(String(name || ""))}`),
    };
}

export function listMeta({ category, region }: { category?: string; region?: string }) {
    const t = [`Аренда`, category, region && `в ${region}`].filter(Boolean).join(" ");
    return {
        title: `${t} — цены и предложения | Аренда авто Кавказ`,
        description: truncate(
            `Выбирайте ${category || "авто"}${region ? ` в регионе ${region}` : ""}. Фильтры, фото, условия, контактные данные.`
        ),
        canonical: buildCanonical(
            region ? `/${region}/avto/${category || "all"}` : `/avto/${category || "all"}`
        ),
    };
}
