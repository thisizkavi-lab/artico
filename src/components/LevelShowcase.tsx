"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";

const levels = [
    {
        level: 1,
        titleKey: "how.level1Title",
        taglineKey: "how.level1Tagline",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="24" cy="24" r="18" />
                <path d="M24 14v10l6 6" />
                <circle cx="24" cy="24" r="4" fill="currentColor" />
            </svg>
        ),
        isApex: false,
    },
    {
        level: 2,
        titleKey: "how.level2Title",
        taglineKey: "how.level2Tagline",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 34c0-6 6-10 16-10s16 4 16 10" />
                <circle cx="24" cy="14" r="8" />
                <circle cx="38" cy="18" r="5" />
                <circle cx="10" cy="18" r="5" />
            </svg>
        ),
        isApex: false,
    },
    {
        level: 3,
        titleKey: "how.level3Title",
        taglineKey: "how.level3Tagline",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="10" width="36" height="28" rx="3" />
                <path d="M14 22h20M14 30h12" />
                <circle cx="36" cy="30" r="4" fill="currentColor" />
            </svg>
        ),
        isApex: false,
    },
    {
        level: 4,
        titleKey: "how.level4Title",
        taglineKey: "how.level4Tagline",
        icon: (
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M24 4l6 12h12l-10 8 4 14-12-8-12 8 4-14-10-8h12z" />
            </svg>
        ),
        isApex: true,
    },
];

export default function LevelShowcase() {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % levels.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const currentLevel = levels[activeIndex];

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {levels.map((level, index) => (
                <div
                    key={level.level}
                    className={`absolute w-[calc(100%-32px)] p-8 rounded-3xl text-center transition-all duration-500 ${level.isApex
                            ? "gradient-hero border-none"
                            : "bg-white border-2 border-gray-custom-100"
                        } ${index === activeIndex
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-90 pointer-events-none"
                        }`}
                    style={{
                        boxShadow: "0 8px 24px rgba(26, 26, 46, 0.08)",
                    }}
                >
                    {/* Badge */}
                    <span
                        className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5 ${level.isApex
                                ? "bg-accent text-dark"
                                : "bg-dark text-white"
                            }`}
                    >
                        Level {level.level}
                    </span>

                    {/* Icon */}
                    <div
                        className={`w-20 h-20 mx-auto mb-5 rounded-2xl flex items-center justify-center ${level.isApex
                                ? "bg-white/20"
                                : "bg-gradient-to-br from-primary to-primary-light"
                            }`}
                        style={{ boxShadow: "0 8px 24px rgba(51, 102, 255, 0.25)" }}
                    >
                        <div className={`w-10 h-10 ${level.isApex ? "text-white" : "text-white"}`}>
                            {level.icon}
                        </div>
                    </div>

                    {/* Content */}
                    <h3
                        className={`font-primary font-bold text-xl mb-2 ${level.isApex ? "text-white" : "text-dark"
                            }`}
                    >
                        {t(level.titleKey)}
                    </h3>
                    <p
                        className={`text-sm italic ${level.isApex ? "text-white/80" : "text-gray-custom-500"
                            }`}
                    >
                        {t(level.taglineKey)}
                    </p>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {levels.map((_, dotIndex) => (
                            <span
                                key={dotIndex}
                                className={`w-2.5 h-2.5 rounded-full transition-all ${dotIndex === activeIndex
                                        ? "bg-accent scale-125"
                                        : "bg-gray-custom-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
