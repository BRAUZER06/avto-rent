// app/brands/[name]/page.tsx
import BrandPage from "@src/components/pages/BrandPage/BrandPage";
import Script from "next/script";
import { notFound } from "next/navigation";
import { apiUrlHelper } from "@src/lib/helpers/getApiUrl";
import { CompanyDTO } from "@src/lib/api/companies";

export const revalidate = 60; // ISR: 10 минут

function absolutize(url?: string | null) {
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    const media = process.env.NEXT_PUBLIC_MEDIA_URL || "";
    return media ? `${media}${url}` : url;
}

async function fetchCompanyByNameServer(name: string): Promise<CompanyDTO | null> {
    const base = apiUrlHelper();
    const res = await fetch(`${base}/companies/${encodeURIComponent(name)}`, {
        next: { revalidate },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch company: ${res.status}`);
    return res.json();
}

// --------- SEO metadata ---------
export async function generateMetadata({ params }: { params: { name: string } }) {
    const raw = params?.name ?? "";
    const name = raw ? decodeURIComponent(raw) : "";
    if (!name) {
        return {
            title: "Бренд — аренда авто",
            description: "Профиль бренда на платформе аренды авто.",
            alternates: { canonical: `/brands/${encodeURIComponent(raw)}` },
        };
    }

    let company: CompanyDTO | null = null;
    try {
        company = await fetchCompanyByNameServer(name);
    } catch {}

    const displayName = company?.company_name || name;
    const title = `Аренда авто у «${displayName}» — цены, фото, контакты`;
    const description = `Профиль «${displayName}»: автомобили в аренду, реальные фото и актуальные цены.`;

    return {
        title,
        description,
        alternates: { canonical: `/brands/${encodeURIComponent(raw)}` },
        openGraph: {
            title,
            description,
            url: `/brands/${encodeURIComponent(raw)}`,
            type: "website",
            locale: "ru_RU",
            images: company?.logo_url?.length
                ? company.logo_url.slice(0, 1).map(u => ({
                      url: absolutize(u)!,
                      width: 1200,
                      height: 630,
                      alt: displayName,
                  }))
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

// --------- JSON-LD ---------
function BrandSeoJsonLd({
    company,
    slugName,
}: {
    company: CompanyDTO;
    slugName: string;
}) {
    const displayName = company.company_name || slugName;

    const orgLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: displayName,
        url: `/brands/${encodeURIComponent(slugName)}`,
        logo: absolutize(company.logo_url?.[0]),
        image: (company.logo_url || []).slice(0, 3).map(absolutize).filter(Boolean),
        areaServed: company.region || undefined,
        sameAs: [
            company.instagram ? `https://instagram.com/${company.instagram}` : undefined,
            company.telegram ? `https://t.me/${company.telegram}` : undefined,
        ].filter(Boolean),
    };

    const items = (company.cars || []).slice(0, 10).map((car: any, idx: number) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `/avto/car/${car.id}`,
        name: car?.title || `Автомобиль #${car.id}`,
        image: absolutize(car?.car_images?.[0]?.url),
    }));

    const itemListLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: items,
    };

    const breadcrumbsLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "/" },
            { "@type": "ListItem", position: 2, name: "Бренды", item: "/brands" },
            {
                "@type": "ListItem",
                position: 3,
                name: displayName,
                item: `/brands/${encodeURIComponent(slugName)}`,
            },
        ],
    };

    return (
        <>
            <Script
                id="ld-org-brand"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
            />
            {items.length > 0 && (
                <Script
                    id="ld-itemlist-brand"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
                />
            )}
            <Script
                id="ld-breadcrumbs-brand"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsLd) }}
            />
        </>
    );
}

// --------- Page (SSR первого экрана) ---------
export default async function Page({ params }: { params: { name: string } }) {
    const raw = params?.name ?? "";
    const name = raw ? decodeURIComponent(raw) : "";
    if (!name) return notFound();

    const company = await fetchCompanyByNameServer(name);
    if (!company) return notFound();

    return (
        <>
            <BrandSeoJsonLd company={company} slugName={name} />
            <BrandPage name={name} initial={company} />
        </>
    );
}
