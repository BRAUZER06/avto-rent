import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },

            colors: {
                whiteColor: "#ffffff",

                backgroundBlack: "#191919",

                greenMain: "#95FF42",
                greenDeep: "#013E14",

                greyBG: "#272727",
                greyLight: "#616161",
                greyLigter: "#A8A8A8",

                greyText: "#D9D9D9",
            },
        },
    },

    plugins: [],
};
export default config;
