// app/avto/[slug]/page.tsx
import StandardPageAllPosts from "@src/components/pages/StandardPage/StandardPageAllPosts/StandardPageAllPosts";
import { categoriesAuto } from "@src/data/categoriesAuto";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 20; // ISR

type ServerPayload = {
    cars: any[];
    meta: { page: number; per_page: number; total: number; pages: number };
};

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

// Баннеры OG на категорию: /public/og/categories/<slug>.svg (+ default.svg)
const ogByCategory = (slug: string) => `/og/categories/${slug}.svg`;

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

    const catRu = CAT_RU[slug] ?? "аренда авто";
    const path = `/avto/${slug}`;
    const hasSearch = Boolean(searchParams?.search);

    // ✅ Бренд в начале и только русский текст категории
    const title = `Rent Avto Kavkaz — ${catRu} | с водителем и без`;
    const description =
        "Все аренды в одном месте: с водителем и без, посуточно, под такси и с выкупом. Эконом, комфорт, премиум — удобно и без посредников.";

    const images = [
        { url: ogByCategory(slug), width: 1200, height: 630, alt: title },
        {
            url: "/og/categories/default.png",
            width: 1200,
            height: 630,
            alt: "Rent Avto Kavkaz",
        },
    ];

    return {
        title,
        description,
        keywords: [
            "аренда авто",
            "аренда авто без водителя",
            "аренда авто с водителем",
            "аренда авто посуточно",
            "аренда авто под такси",
            "аренда авто с выкупом",
            "взять авто в аренду",
            "сдать авто в аренду",
            catRu,
            "Rent Avto Kavkaz",
            "RentAvtoKavkaz",
            "РентАвтоКавказ",
        ],
        alternates: { canonical: path },
        robots: hasSearch ? { index: false, follow: true } : undefined,
        openGraph: {
            title,
            description,
            url: path,
            type: "website",
            locale: "ru_RU",
            images,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: images.map(i => i.url),
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
        url: `/avto/car/${car.id}`,
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

function BreadcrumbsJsonLd({ slug }: { slug: string }) {
    const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
            { "@type": "ListItem", position: 2, name: "Аренда авто", item: "/avto" },
            {
                "@type": "ListItem",
                position: 3,
                name: "Категория",
                item: `/avto/${slug}`,
            },
        ],
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

    
    // H1 — по-русски
   function capitalize(str: string) {
       return str.charAt(0).toUpperCase() + str.slice(1);
   }

   const h1Ru = "аренда авто";
   const h1 = `${capitalize(h1Ru)}. С водителем и без. Все аренды в одном месте.`;


    return (
        <>
            <BreadcrumbsJsonLd slug={slug} />
            <ItemListJsonLd initial={initial} />

            <div className="max-w-6xl mx-auto px-4 pt-6">
                <h1 className=" text-2xl md:text-2xl font-bold mb-4">
                    {h1}
                </h1>
            </div>

            <StandardPageAllPosts
                category={category.slug}
                initial={initial ?? undefined}
            />
        </>
    );
}
