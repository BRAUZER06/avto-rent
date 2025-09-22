// app/avto/[slug]/page.tsx
import StandardPageAllPosts from "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts";
import { categoriesAuto } from "@src/data/categoriesAuto";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 20; // ISR: обновлять каждые 20 секунд

type ServerPayload = {
    cars: any[];
    meta: { page: number; per_page: number; total: number; pages: number };
};

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentavtokavkaz.ru";

const CAT_RU: Record<string, string> = {
    all: "автомобили",
    mid: "авто среднего класса",
    russian: "отечественные авто",
    suv: "внедорожники",
    cabrio: "кабриолеты",
    sport: "спорткары",
    premium: "авто премиум-класса",
    electric: "электрокары",
    minivan: "минивэны",
    bike: "мотоциклы",
};

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const { slug } = params;
    const category = categoriesAuto.find(c => c.slug === slug);
    if (!category) return {};

    const catText = CAT_RU[slug] ?? "автомобили";
    const path = `/avto/${slug}`;
    const hasSearch = Boolean(searchParams?.search);

    const title = `Аренда ${catText} — фото и цены`;
    const description = `Список предложений по аренде: ${catText}. Реальные фото, актуальные цены, контакты.`;

    return {
        title,
        description,
        alternates: { canonical: `${baseUrl}${path}` },
        robots: hasSearch ? { index: false, follow: true } : undefined,
        openGraph: {
            title,
            description,
            url: `${baseUrl}${path}`,
            type: "website",
        },
    };
}

async function fetchPageOnServer({
    category,
    page,
    perPage,
    search,
}: {
    category: string;
    page: number;
    perPage: number;
    search?: string;
}): Promise<ServerPayload> {
    const base = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;

    const qs = new URLSearchParams({
        page: String(page),
        per_page: String(perPage),
    });

    if (search && search.trim()) qs.set("search", search.trim());

    const url =
        category === "all"
            ? `${base}/cars?${qs.toString()}`
            : `${base}/cars?category=${encodeURIComponent(category)}&${qs.toString()}`;

    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
}

function ItemListJsonLd({ initial }: { initial: ServerPayload | null }) {
    if (!initial?.cars?.length) return null;
    const items = initial.cars.slice(0, 10).map((car, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${baseUrl}/avto/car/${car.id}`,
        name: car.title,
        image: car?.car_images?.[0]?.url || undefined,
    }));
    const data = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items,
    };

    return (
        <Script
            id="ld-itemlist"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: { slug: string };
    searchParams: { page?: string; search?: string };
}) {
    const { slug } = params;

    const category = categoriesAuto.find(c => c.slug === slug);
    if (!category) return notFound();

    const page = Number(searchParams?.page ?? 1) || 1;
    const search =
        typeof searchParams?.search === "string" ? searchParams.search : undefined;
    const perPage = 12;

    let initial: ServerPayload | null = null;
    try {
        initial = await fetchPageOnServer({
            category: category.slug,
            page,
            perPage,
            search,
        });
    } catch {
        initial = null;
    }

    return (
        <>
            <ItemListJsonLd initial={initial} />
            <StandardPageAllPosts
                category={category.slug}
                initial={initial ?? undefined}
            />
        </>
    );
}
