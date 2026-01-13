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
                // Primary Brand Colors
                primary: {
                    DEFAULT: "#3366FF",
                    light: "#4D7AFF",
                    dark: "#2952CC",
                },
                // Accent - High Contrast Green
                accent: {
                    DEFAULT: "#00D26A",
                    hover: "#00B85C",
                    light: "#E6FFF2",
                },
                // Secondary
                secondary: {
                    DEFAULT: "#6C5CE7",
                    light: "#A29BFE",
                },
                // Neutrals
                dark: "#1A1A2E",
                "gray-custom": {
                    900: "#3D3D5C",
                    700: "#5C5C7A",
                    500: "#8F8FA3",
                    300: "#C4C4D4",
                    100: "#EEEEF4",
                    50: "#F7F7FB",
                },
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
                sm: "0 2px 8px rgba(26, 26, 46, 0.06)",
                md: "0 8px 24px rgba(26, 26, 46, 0.08)",
                lg: "0 16px 48px rgba(26, 26, 46, 0.12)",
                button: "0 4px 12px rgba(0, 210, 106, 0.3)",
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
