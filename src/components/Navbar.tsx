"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
            className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300 ${scrolled
                ? "bg-white shadow-sm"
                : "bg-linen"
                }`}
        >
            <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="relative flex items-center h-14 w-44 hover:scale-[1.02] transition-transform duration-200">
                    <img
                        src="/logo.png"
                        alt="artiCo"
                        className="object-contain w-full h-full"
                    />
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Globe Icon */}
                    <button
                        onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                        className="w-10 h-10 rounded-full border border-pebble flex items-center justify-center text-ash hover:bg-pebble transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                    </button>

                    {/* Language Dropdown */}
                    {langDropdownOpen && (
                        <div className="absolute top-20 right-6 w-44 bg-white rounded-2xl shadow-lg p-2 z-50 border border-divider">
                            {Object.entries(languageInfo).map(([code, info]) => (
                                <button
                                    key={code}
                                    onClick={() => {
                                        setLanguage(code);
                                        setLangDropdownOpen(false);
                                    }}
                                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${code === language
                                        ? "bg-pebble text-ink"
                                        : "hover:bg-linen text-ink"
                                        }`}
                                >
                                    <span className="text-base">{info.flag}</span>
                                    <span>{info.nativeName}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Get Started Button */}
                    <button
                        onClick={onLogin}
                        className="bg-cocoa text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-sm transition-all"
                    >
                        {t("nav.getStarted")}
                    </button>

                    {/* Login Button */}
                    <button
                        onClick={onLogin}
                        className="hidden sm:flex items-center bg-pebble text-ink px-6 py-2.5 rounded-full font-bold text-sm transition-all"
                    >
                        {t("nav.login")}
                    </button>
                </div>
            </div>
        </nav>
    );
}
