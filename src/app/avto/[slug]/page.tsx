// app/avto/[slug]/page.tsx
import StandardPageAllPosts from "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts";
import { categoriesAuto } from "@src/data/categoriesAuto";
import { regionsFull } from "@src/data/regions";
import { notFound, redirect } from "next/navigation";
import Script from "next/script";

export const revalidate = 60; // ISR: обновлять каждые 5 минут

type ServerPayload = {
    cars: any[];
    meta: { page: number; per_page: number; total: number; pages: number };
};

const VALID_REGIONS = new Set(
    regionsFull.filter(r => r.name && r.name.trim() !== "").map(r => r.name)
);

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentavtokavkaz.ru";

const REGION_RU: Record<string, string> = {
    ingushetia: "Ингушетия",
    chechnya: "Чечня",
    dagestan: "Дагестан",
    "north-ossetia": "Северная Осетия",
    "kabardino-balkaria": "Кабардино-Балкария",
    "karachay-cherkessia": "Карачаево-Черкесия",
    stavropol: "Ставрополь",
};

const CAT_RU: Record<string, string> = {
    all: "автомобили",
    mid: "авто среднего класса",
    russian: "отечественные авто",
    jeep: "внедорожники",
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
    params: { region?: string; slug: string };
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const { region, slug } = params;
    const category = categoriesAuto.find(c => c.slug === slug);
    if (!category) return {};

    const catText = CAT_RU[slug] ?? "автомобили";
    const regionRu = region ? REGION_RU[region] ?? region : null;

    const path = region ? `/${region}/avto/${slug}` : `/avto/${slug}`;
    const hasSearch = Boolean(searchParams?.search);

    const title = regionRu
        ? `Аренда ${catText} в ${regionRu} — фото и цены`
        : `Аренда ${catText} — фото и цены`;

    const description = regionRu
        ? `Список предложений по аренде: ${catText} в ${regionRu}. Реальные фото, актуальные цены, контакты.`
        : `Список предложений по аренде: ${catText}. Реальные фото, актуальные цены, контакты.`;

    return {
        title,
        description,
        alternates: {
            canonical: `${baseUrl}${path}`, // canonical без search
        },
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
    region,
    category,
    page,
    perPage,
    search,
}: {
    region?: string;
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

    if (region) qs.set("region", region);
    if (search && search.trim()) qs.set("search", search.trim());
    const url =
        category === "all"
            ? `${base}/cars?${qs.toString()}`
            : `${base}/cars?category=${encodeURIComponent(category)}&${qs.toString()}`;

    const res = await fetch(url, { next: { revalidate } });

    if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
    return res.json();
}

function ItemListJsonLd({
    initial,
    region,
}: {
    initial: ServerPayload | null;
    region?: string;
}) {
    if (!initial?.cars?.length) return null;
    const prefix = region ? `/${region}` : "";
    const items = initial.cars.slice(0, 10).map((car, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${baseUrl}${prefix}/avto/car/${car.id}`,
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

function BreadcrumbsJsonLd({ region, slug }: { region?: string; slug: string }) {
    const trail = [
        { "@type": "ListItem", position: 1, name: "Главная", item: `${baseUrl}/` },
        {
            "@type": "ListItem",
            position: 2,
            name: "Аренда авто",
            item: `${baseUrl}/avto`,
        },
    ];

    const regionPart = region
        ? [
              {
                  "@type": "ListItem",
                  position: 3,
                  name: REGION_RU[region] ?? region,
                  item: `${baseUrl}/${region}/avto`,
              },
              {
                  "@type": "ListItem",
                  position: 4,
                  name: CAT_RU[slug] ?? slug,
                  item: `${baseUrl}/${region}/avto/${slug}`,
              },
          ]
        : [
              {
                  "@type": "ListItem",
                  position: 3,
                  name: CAT_RU[slug] ?? slug,
                  item: `${baseUrl}/avto/${slug}`,
              },
          ];

    const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [...trail, ...regionPart],
    };

    return (
        <Script
            id="ld-breadcrumbs"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default async function CategoryPage({
    params,
    searchParams,
}: {
    params: { region?: string; slug: string };
    searchParams: { page?: string; search?: string };
}) {
    const { region, slug } = params;

    const category = categoriesAuto.find(c => c.slug === slug);
    if (!category) return notFound();

    if (region && !VALID_REGIONS.has(region)) {
        redirect(`/avto/${category.slug}`);
    }

    const page = Number(searchParams?.page ?? 1) || 1;
    const search =
        typeof searchParams?.search === "string" ? searchParams.search : undefined;
    const perPage = 12;

    let initial: ServerPayload | null = null;
    try {
        initial = await fetchPageOnServer({
            region,
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
            <BreadcrumbsJsonLd region={region} slug={slug} />
            <ItemListJsonLd initial={initial} region={region} />
            <StandardPageAllPosts
                category={category.slug}
                region={region}
                initial={initial ?? undefined}
            />
        </>
    );
}
