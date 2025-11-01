import type { Metadata } from "next";
import BrandPageClient from "@src/components/pages/BrandPageClient/BrandPageClient";

const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "https://rentavtokavkaz.ru";

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: { brand: string };
}): Promise<Metadata> {
    const brandName = decodeURIComponent(params.brand);

    const title = `Автопарк ${brandName} — аренда автомобилей | RentAvtoKavkaz`;
    const description = `Аренда автомобилей от ${brandName}. Лучшие цены, широкий выбор авто — премиум, комфорт, бизнес и эконом класс. RentAvtoKavkaz — аренда без посредников.`;
    const canonical = `${SITE_URL}/brands/${encodeURIComponent(brandName)}`;

    return {
        title,
        description,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: "RentAvtoKavkaz",
            type: "website",
            locale: "ru_RU",
            images: [`${SITE_URL}/og/default.png`],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${SITE_URL}/og/default.png`],
        },
        keywords: [
            "аренда авто",
            "аренда автомобилей",
            "аренда без водителя",
            "автопарк",
            "RentAvtoKavkaz",
            brandName,
        ],
    };
}

export default function Page({ params }: { params: { brand: string } }) {
    const brandName = decodeURIComponent(params.brand);
    return <BrandPageClient name={brandName} />;
}
