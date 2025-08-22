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
        domains: ["rentavtokavkaz.ru", "static-maps.yandex.ru"],
    },
};
