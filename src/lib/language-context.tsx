"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, languageInfo, detectUserLanguage, t } from "./translations";

interface LanguageContextType {
    language: string;
    setLanguage: (lang: string) => void;
    t: (key: string) => string;
    languageInfo: typeof languageInfo;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState("en");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const detected = detectUserLanguage();
        setLanguageState(detected);
    }, []);

    const setLanguage = (lang: string) => {
        if (translations[lang]) {
            setLanguageState(lang);
            localStorage.setItem("artico-language", lang);

            // Update HTML attributes
            document.documentElement.lang = lang;
            document.documentElement.dir = languageInfo[lang]?.rtl ? "rtl" : "ltr";
        }
    };

    const translate = (key: string) => t(key, language);

    const isRTL = languageInfo[language]?.rtl || false;

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <LanguageContext.Provider
                value={{
                    language: "en",
                    setLanguage,
                    t: (key) => t(key, "en"),
                    languageInfo,
                    isRTL: false,
                }}
            >
                {children}
            </LanguageContext.Provider>
        );
    }

    return (
        <LanguageContext.Provider
            value={{
                language,
                setLanguage,
                t: translate,
                languageInfo,
                isRTL,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
