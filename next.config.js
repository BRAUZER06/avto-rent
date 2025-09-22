/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",

    typescript: { ignoreBuildErrors: true },

    experimental: {
        missingSuspenseWithCSRBailout: false,
    },

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "rentavtokavkaz.ru",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "static-maps.yandex.ru",
                port: "",
                pathname: "/**",
            },
        ],
    },

    metadataBase: new URL("https://rentavtokavkaz.ru"),

    async redirects() {
        return [
            // 1-hop редирект с www-рута сразу на целевой URL
            {
                source: "/",
                has: [{ type: "host", value: "www.rentavtokavkaz.ru" }],
                destination: "https://rentavtokavkaz.ru/avto/all",
                permanent: true,
            },
            // редирект c apex-рута
            {
                source: "/",
                destination: "/avto/all",
                permanent: true,
            },
            // канонизация всего остального с www → apex
            {
                source: "/:path*",
                has: [{ type: "host", value: "www.rentavtokavkaz.ru" }],
                destination: "https://rentavtokavkaz.ru/:path*",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
