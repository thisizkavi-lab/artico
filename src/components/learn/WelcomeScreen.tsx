"use client";

import { useLanguage } from "@/lib/language-context";

interface WelcomeScreenProps {
    onContinue: () => void;
}

export default function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
    const { t } = useLanguage();

    return (
        <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center px-6 relative">
            <div className="relative z-10 text-center max-w-lg">
                <h1 className="text-2xl font-medium text-ash mb-6">
                    {t("welcome.title")} <span className="font-bold text-ink">artiCO</span>
                </h1>

                <p className="text-2xl md:text-3xl font-bold text-ink leading-relaxed mb-2">
                    {t("welcome.subtitle1")}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-ink leading-relaxed mb-12">
                    {t("welcome.subtitle2")}
                </p>

                {/* Globe icon */}
                <div className="mb-8">
                    <svg
                        className="w-16 h-16 mx-auto text-ash"
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <circle cx="24" cy="24" r="18" />
                        <ellipse cx="24" cy="24" rx="8" ry="18" />
                        <path d="M6 24h36" />
                        <path d="M24 6v36" />
                        <path d="M8 12c4 2 10 3 16 3s12-1 16-3" />
                        <path d="M8 36c4-2 10-3 16-3s12 1 16 3" />
                    </svg>
                </div>

                <p className="text-lg text-dust mb-6">
                    {t("welcome.prompt")}
                </p>

                <button
                    onClick={onContinue}
                    className="px-10 py-3.5 bg-cocoa text-white font-bold rounded-full shadow-sm transition-all"
                >
                    {t("welcome.button")}
                </button>
            </div>
        </div>
    );
}
