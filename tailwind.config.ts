import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts}",
    ],
    theme: {
        extend: {
            colors: {
                linen: "#F7F6F3",
                ink: "#4A463F",
                ash: "#7A766F",
                dust: "#9E9A93",
                cocoa: "#4B463E",
                white: "#FFFFFF",
                pebble: "#DEDCD7",
                divider: "#E6E4DF",
            },
            fontFamily: {
                primary: ["Outfit", "Inter", "system-ui", "sans-serif"],
                secondary: ["Inter", "system-ui", "sans-serif"],
            },
            borderRadius: {
                "2xl": "16px",
                "3xl": "24px",
                "4xl": "32px",
            },
            boxShadow: {
                sm: "0 2px 8px rgba(74, 70, 63, 0.06)",
                md: "0 8px 24px rgba(74, 70, 63, 0.08)",
                lg: "0 16px 48px rgba(74, 70, 63, 0.12)",
            },
            animation: {
                "phone-float": "phoneFloat 6s ease-in-out infinite",
                "fade-in": "fadeIn 0.6s ease-out forwards",
            },
            keyframes: {
                phoneFloat: {
                    "0%, 100%": {
                        transform: "perspective(1000px) rotateY(-8deg) rotateX(5deg) translateY(0)",
                    },
                    "50%": {
                        transform: "perspective(1000px) rotateY(-5deg) rotateX(3deg) translateY(-15px)",
                    },
                },
                fadeIn: {
                    from: { opacity: "0", transform: "translateY(20px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
