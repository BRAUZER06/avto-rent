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
};
