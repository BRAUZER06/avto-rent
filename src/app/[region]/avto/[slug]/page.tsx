// app/[region]/avto/[slug]/page.tsx
import StandardPageAllPosts from "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts";
import { categoriesAuto } from "@src/data/categoriesAuto";
import { regionsFull } from "@src/data/regions";
import { notFound, redirect } from "next/navigation";
import Script from "next/script";
import { buildSeoBundle, resolveRegion } from "@src/lib/seo/generators";

export const revalidate = 20;

type ServerPayload = {
    cars: any[];
    meta: { page: number; per_page: number; total: number; pages: number };
};

const VALID_REGIONS = new Set(
    regionsFull.filter(r => r.name && r.name.trim() !== "").map(r => r.name)
);

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentavtokavkaz.ru";

// Баннер OG для категории
const ogByCategory = (slug: string) => `/og/categories/${slug}.svg`;

// Русские названия категорий
const CAT_RU: Record<string, string> = {
    all: "аренда авто",
    mid: "аренда авто среднего класса",
    russian: "аренда отечественных авто",
    suv: "аренда внедорожников",
    cabrio: "аренда кабриолетов",
    sport: "аренда спорткаров",
    premium: "аренда авто премиум-класса",
    electric: "аренда электрокаров",
    minivan: "аренда минивэнов",
    bike: "аренда мотоциклов",
};

// функция для капитализации первой буквы
function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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

    const r = resolveRegion(region);
    const catRu = CAT_RU[slug] ?? "аренда авто";

    // ✅ бренд в начале, основной русский текст
    const title = r.ruNom
        ? `Rent Avto Kavkaz — ${capitalize(catRu)} в ${r.ruNom} | с водителем и без`
        : `Rent Avto Kavkaz — ${capitalize(catRu)} | с водителем и без`;

    const seo = buildSeoBundle({ slug, region });
    const path = region ? `/${region}/avto/${slug}` : `/avto/${slug}`;
    const hasSearch = Boolean(searchParams?.search);

    const images = [
        { url: ogByCategory(slug), width: 1200, height: 630, alt: title },
        {
            url: "/og/categories/default.png",
            width: 1200,
            height: 630,
            alt: "RentAvtoKavkaz",
        },
    ];

    return {
        title,
        description: seo.description,
        keywords: seo.keywords,
        alternates: { canonical: path },
        robots: hasSearch ? { index: false, follow: true } : undefined,
        openGraph: {
            title,
            description: seo.description,
            url: path,
            type: "website",
            locale: "ru_RU",
            images,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: seo.description,
            images: images.map(i => i.url),
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

    const r = resolveRegion(region);
    const regionPart = region
        ? [
              {
                  "@type": "ListItem",
                  position: 3,
                  name: r.ruNom || region,
                  item: `${baseUrl}/${region}/avto`,
              },
              {
                  "@type": "ListItem",
                  position: 4,
                  name: "Категория",
                  item: `${baseUrl}/${region}/avto/${slug}`,
              },
          ]
        : [
              {
                  "@type": "ListItem",
                  position: 3,
                  name: "Категория",
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

    // ✅ H1 по-русски с большой буквы (регион в предложном)
    const r = resolveRegion(region);
    const catRu = CAT_RU[slug] ?? "аренда авто";
    const baseH1 = r.ruPrep
        ? `${catRu} в ${r.ruPrep}. С водителем и без. Все аренды региона в одном месте.`
        : `${catRu}. С водителем и без. Все аренды в одном месте.`;
    const h1 = capitalize(baseH1);

    return (
        <>
            <BreadcrumbsJsonLd region={region} slug={slug} />
            <ItemListJsonLd initial={initial} region={region} />

            <div className="max-w-6xl mx-auto px-4 pt-6">
                <h1 className="text-2xl md:text-2xl font-bold mb-4">{h1}</h1>
            </div>

            <StandardPageAllPosts
                category={category.slug}
                region={region}
                initial={initial ?? undefined}
            />
        </>
    );
}
