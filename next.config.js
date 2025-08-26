module.exports = {
    // Generate standalone server for Docker runtime
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
};
