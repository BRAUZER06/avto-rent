// app/[[region]]/avto/car/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import StandardPageID from "@src/components/pages/StandardPage/StandardPageID/StandardPageID";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

const API_BASE_URL =
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://rentavtokavkaz.ru";

function absMedia(url?: string | null): string | null {
    if (!url) return null;
    if (/^https?:\/\//i.test(url)) return url;
    if (!API_BASE_URL) return url;
    return `${API_BASE_URL}${url}`;
}

function extractImages(car: any): string[] {
    return (car?.car_images ?? [])
        .slice()
        .sort(
            (a: any, b: any) =>
                (a?.position ?? Number.MAX_SAFE_INTEGER) -
                (b?.position ?? Number.MAX_SAFE_INTEGER)
        )
        .map((i: any) => absMedia(i?.url))
        .filter(Boolean)
        .slice(0, 10) as string[];
}

function priceText(car: any): string | null {
    const cfVal = car?.custom_fields?.find((f: any) =>
        String(f?.key ?? "")
            .toLowerCase()
            .includes("аренда авто на день")
    )?.value;
    const src = cfVal ?? car?.price;
    if (src == null || src === "") return null;
    const str = String(src);
    if (str.includes("₽")) return str;
    const num = Number(str.replace(/[^\d.,]/g, "").replace(",", "."));
    if (Number.isFinite(num)) return `${num.toLocaleString("ru-RU")} ₽`;
    return str;
}

function buildTitle(car: any): string {
    const city = car?.location ? ` — ${car.location}` : "";
    return `${car?.title ?? "Авто"}${city} Аренда авто Кавказ`;
}

function buildDescription(car: any): string {
    const price = priceText(car);
    const bits = [
        car?.title,
        car?.location ? `Локация: ${car.location}` : null,
        price ? `Цена от ${price}/сутки` : null,
        car?.fuel_type ? `Топливо: ${car.fuel_type}` : null,
        car?.transmission ? `КПП: ${car.transmission}` : null,
    ].filter(Boolean);
    return String(bits.join(". ")) || "Аренда автомобиля на Кавказе.";
}

async function fetchCarById(id: string, opts: { redirectOn401?: boolean } = {}) {
    if (!API_BASE_URL) throw new Error("API_BASE_URL не задан в .env");
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    const h = await headers();

    const res = await fetch(`${API_BASE_URL}/cars/${encodeURIComponent(id)}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
            "X-Forwarded-For": h.get("x-forwarded-for") ?? "",
            "User-Agent": h.get("user-agent") ?? "",
        },
        cache: "no-store",
    });

    if (res.status === 404) return null;
    if (res.status === 401) {
        if (opts.redirectOn401) redirect("/login");
        return null;
    }
    if (!res.ok) throw new Error(`Ошибка загрузки: ${res.status}`);

    return res.json();
}

export async function generateMetadata({
    params,
}: {
    params: { id: string; region?: string };
}): Promise<Metadata> {
    const id = params?.id;
    if (!id) {
        return {
            title: "Авто — Аренда авто Кавказ",
            robots: { index: false, follow: false },
        };
    }

    const car = await fetchCarById(id, { redirectOn401: false });

    if (!car) {
        return {
            title: "Объявление не найдено — Аренда авто Кавказ",
            description: "Объявление не найдено.",
            robots: { index: false, follow: false },
        };
    }

    const title = buildTitle(car);
    const description = buildDescription(car);
    const canonical = `${SITE_URL}/avto/car/${encodeURIComponent(String(car.id))}`;
    const ogImages = extractImages(car);

    return {
        title,
        description,
        robots: { index: true, follow: true },
        alternates: { canonical },
        openGraph: {
            type: "website",
            url: canonical,
            title,
            description,
            images: ogImages,
            siteName: "Аренда авто Кавказ",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImages.length ? [ogImages[0]] : undefined,
        },
        // Можно добавить icons, keywords и т.д.
    };
}

// ---------- JSON-LD builders ----------
function vehicleJsonLd(car: any) {
    const images = extractImages(car);
    const priceNum = Number(
        String(priceText(car) ?? "")
            .replace(/[^\d.,]/g, "")
            .replace(",", ".")
    );
    const sellerUrl = car?.owner?.company_name
        ? `${SITE_URL}/brands/${encodeURIComponent(String(car.owner.company_name))}`
        : undefined;

    return {
        "@context": "https://schema.org",
        "@type": "Vehicle",
        name: car?.title ?? "Автомобиль",
        image: images,
        brand: car?.title?.split(" ")?.[0] ?? undefined,
        model: car?.title ?? undefined,
        vehicleModelDate: car?.year ?? undefined,
        fuelType: car?.fuel_type ?? undefined,
        vehicleTransmission: car?.transmission ?? undefined,
        driveWheelConfiguration: car?.drive ?? undefined,
        offers: {
            "@type": "Offer",
            price: Number.isFinite(priceNum) ? priceNum : undefined,
            priceCurrency: "RUB",
            availability: "https://schema.org/InStock",
            businessFunction: "http://purl.org/goodrelations/v1#LeaseOut",
            url: `${SITE_URL}/avto/car/${encodeURIComponent(String(car?.id))}`,
        },
        ...(car?.owner?.company_name && {
            seller: {
                "@type": "Organization",
                name: car.owner.company_name,
                url: sellerUrl,
                address: car?.owner?.address,
            },
        }),
    };
}

function breadcrumbsJsonLd(car: any) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Авто", item: `${SITE_URL}/avto` },
            {
                "@type": "ListItem",
                position: 3,
                name: car?.title ?? "Авто",
                item: `${SITE_URL}/avto/car/${encodeURIComponent(String(car?.id))}`,
            },
        ],
    };
}

// ---------- Page ----------
export default async function Page({
    params,
}: {
    params: { id: string; region?: string };
}) {
    if (!params?.id) return notFound();

    const car = await fetchCarById(params.id, { redirectOn401: false });
    if (!car) return notFound();

    const ldVehicle = vehicleJsonLd(car);
    const ldBreadcrumbs = breadcrumbsJsonLd(car);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldVehicle) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(ldBreadcrumbs) }}
            />

            <StandardPageID car={car} region={params.region} />
        </>
    );
}
