/** @type {import('next').NextConfig} */
module.exports = {
    output: "standalone",

    typescript: {
        ignoreBuildErrors: true,
    },
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
            {
                source: "/:path*",
                has: [
                    {
                        type: "host",
                        value: "www.rentavtokavkaz.ru",
                    },
                ],
                destination: "https://rentavtokavkaz.ru/:path*",
                permanent: true,
            },
        ];
    },
};
