import type { MetadataRoute } from "next";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rentavtokavkaz.ru").replace(
    /\/+$/,
    ""
);
const HOST = new URL(SITE).host;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/auth/",
                    "/login/",
                    "/profile/",
                    "/favorites/",
                    "/advertising/",
                    "/tarif/",
                ],
            },
        ],
        sitemap: `${SITE}/sitemap.xml`,
        host: HOST,
    };
}
