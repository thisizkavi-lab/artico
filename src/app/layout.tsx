import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-secondary",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-primary",
});

export const metadata: Metadata = {
    title: "artiCO - English but better",
    description:
        "Learn English from scratch and grow into someone who speaks with flow. Multi-lingual support for Japanese, Korean, Chinese, Arabic, Spanish, Portuguese, Nepali, Hindi and more.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" dir="ltr">
            <body className={`${inter.variable} ${outfit.variable} font-secondary bg-linen text-ink`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
