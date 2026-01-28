import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#FACC15", // yellow-400
                    foreground: "#1A2E05", // dark green/black
                },
                secondary: {
                    DEFAULT: "#1A2E05",
                    foreground: "#FACC15",
                },
                club: {
                    yellow: "#FFD700", // Gold
                    dark: "#1a1a1a"
                }
            },
            container: {
                center: true,
                padding: "2rem",
                screens: {
                    "2xl": "1400px",
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [],
};
export default config;
