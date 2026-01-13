"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { languageInfo } from "@/lib/translations";

interface NavbarProps {
    onLogin?: () => void;
}

export default function Navbar({ onLogin }: NavbarProps) {
    const { language, setLanguage, t } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [langDropdownOpen, setLangDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const currentLang = languageInfo[language];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300 ${scrolled
                ? "bg-white/98 backdrop-blur-xl shadow-sm"
                : ""
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex flex-col gap-0.5">
                    <span
                        className={`font-primary text-2xl font-extrabold tracking-tight ${scrolled ? "text-dark" : "text-white"
                            }`}
                    >
                        artiCO
                    </span>
                    <span
                        className={`text-xs font-medium ${scrolled ? "text-gray-custom-500" : "text-white/80"
                            }`}
                    >
                        {t("tagline")}
                    </span>
                </div>

                {/* Nav Links */}
                <div className="hidden md:flex gap-9">
                    {["howItWorks", "levels", "languages"].map((key) => (
                        <a
                            key={key}
                            href={`#${key === "howItWorks" ? "how-it-works" : key}`}
                            className={`font-semibold text-sm relative py-1 transition-colors ${scrolled
                                ? "text-dark hover:text-primary"
                                : "text-white/90 hover:text-white"
                                }`}
                        >
                            {t(`nav.${key}`)}
                        </a>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Language Picker */}
                    <div className="relative">
                        <button
                            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${scrolled
                                ? "bg-gray-custom-50 border border-gray-custom-100 text-dark hover:bg-gray-custom-100"
                                : "bg-white/15 border border-white/25 text-white hover:bg-white/25"
                                }`}
                        >
                            <span className="text-lg">{currentLang?.flag}</span>
                            <span className="text-xs tracking-wide">{language.toUpperCase()}</span>
                            <svg
                                className={`w-3 h-3 opacity-70 transition-transform ${langDropdownOpen ? "rotate-180" : ""
                                    }`}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M6 9l6 6 6-6" />
                            </svg>
                        </button>

                        {langDropdownOpen && (
                            <div className="absolute top-full mt-2 right-0 w-44 bg-white rounded-2xl shadow-lg p-2 z-50">
                                {Object.entries(languageInfo).map(([code, info]) => (
                                    <button
                                        key={code}
                                        onClick={() => {
                                            setLanguage(code);
                                            setLangDropdownOpen(false);
                                        }}
                                        className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${code === language
                                            ? "bg-accent-light text-accent-hover"
                                            : "hover:bg-gray-custom-50 text-dark"
                                            }`}
                                    >
                                        <span className="text-base">{info.flag}</span>
                                        <span>{info.nativeName}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={onLogin}
                        className={`hidden sm:flex items-center px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${scrolled
                            ? "border-2 border-gray-custom-300 text-dark hover:border-primary hover:text-primary"
                            : "bg-white/15 border-2 border-white/30 text-white hover:bg-white/25"
                            }`}
                    >
                        {t("nav.login")}
                    </button>

                    {/* Get Started Button */}
                    <button
                        onClick={onLogin}
                        className="gradient-cta px-6 py-2.5 rounded-full font-bold text-sm text-dark shadow-button hover:translate-y-[-2px] transition-all"
                    >
                        {t("nav.getStarted")}
                    </button>
                </div>
            </div>
        </nav>
    );
}
