"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import LevelShowcase from "@/components/LevelShowcase";
import AuthModal from "@/components/AuthModal";
import { useLanguage } from "@/lib/language-context";
import { languageInfo } from "@/lib/translations";

function HomePage() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    const [authModalOpen, setAuthModalOpen] = useState(false);

    // If already logged in, redirect to dashboard
    const handleGetStarted = () => {
        if (user) {
            router.push("/dashboard");
        } else {
            setAuthModalOpen(true);
        }
    };

    return (
        <>
            <Navbar onLogin={() => setAuthModalOpen(true)} />

            {/* Auth Modal */}
            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

            {/* Hero Section */}
            <section className="min-h-screen pt-36 pb-24 gradient-hero relative overflow-hidden flex items-center hero-curve">
                {/* Background animation */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/5 left-1/5 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-16 relative z-10 w-full">
                    {/* Content */}
                    <div className="flex-1 max-w-xl">
                        <h1 className="font-primary text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                            {t("hero.title1")}
                            <br />
                            <span className="gradient-text">{t("hero.title2")}</span>
                        </h1>
                        <p className="text-lg text-white/90 mb-10 leading-relaxed max-w-md">
                            {t("hero.subtitle")}
                        </p>

                        <div className="flex flex-col gap-7">
                            <button
                                onClick={handleGetStarted}
                                className="inline-flex items-center gap-2.5 gradient-cta px-10 py-4 rounded-full font-bold text-lg text-dark shadow-button hover:translate-y-[-3px] transition-all w-fit"
                            >
                                {t("nav.getStarted")}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>

                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="text-white/70 text-sm font-medium">{t("hero.availableIn")}</span>
                                <div className="flex gap-2 flex-wrap">
                                    {["日本語", "한국어", "中文", "العربية"].map((lang) => (
                                        <span
                                            key={lang}
                                            className="px-3.5 py-1.5 bg-white/15 border border-white/20 rounded-full text-sm font-semibold text-white backdrop-blur-sm"
                                        >
                                            {lang}
                                        </span>
                                    ))}
                                    <span className="px-3.5 py-1.5 bg-white/15 border border-white/20 rounded-full text-sm font-semibold text-white backdrop-blur-sm">
                                        {t("hero.more")}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Phone Mockup */}
                    <div className="flex-1 hidden lg:flex justify-center items-center">
                        <div
                            className="w-[300px] h-[620px] bg-dark rounded-[48px] p-3 shadow-2xl animate-phone-float"
                            style={{
                                transform: "perspective(1000px) rotateY(-8deg) rotateX(5deg)",
                                boxShadow: "0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)",
                            }}
                        >
                            {/* Notch */}
                            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-7 bg-dark rounded-full z-10" />
                            {/* Screen */}
                            <div className="w-full h-full bg-white rounded-[40px] pt-12 px-4 pb-4 overflow-hidden">
                                <LevelShowcase />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Section */}
            <section id="why" className="py-28 bg-gray-custom-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-primary text-4xl font-bold text-center mb-16 tracking-tight">
                        {t("why.sectionTitle")}{" "}
                        <span className="text-accent">{t("why.sectionHighlight")}</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((num) => (
                            <div
                                key={num}
                                className="bg-white p-10 rounded-3xl shadow-sm border border-gray-custom-100 text-center hover:translate-y-[-8px] hover:shadow-lg transition-all"
                            >
                                <div className="w-18 h-18 mx-auto mb-6 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg
                                        className="w-9 h-9 text-white"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        {num === 1 && (
                                            <>
                                                <circle cx="24" cy="24" r="20" />
                                                <circle cx="24" cy="24" r="12" />
                                                <circle cx="24" cy="24" r="4" fill="currentColor" />
                                            </>
                                        )}
                                        {num === 2 && (
                                            <>
                                                <path d="M12 38V24l12-14 12 14v14" />
                                                <path d="M18 38v-10h12v10" />
                                                <circle cx="24" cy="18" r="4" />
                                            </>
                                        )}
                                        {num === 3 && (
                                            <>
                                                <circle cx="24" cy="24" r="20" />
                                                <path d="M14 20c0-6 4-10 10-10s10 4 10 10" />
                                                <path d="M18 28h12" />
                                                <path d="M24 28v8" />
                                            </>
                                        )}
                                    </svg>
                                </div>
                                <h3 className="font-primary text-xl font-bold mb-3.5">{t(`why.card${num}Title`)}</h3>
                                <p className="text-gray-custom-700 leading-relaxed text-sm">{t(`why.card${num}Desc`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-28 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-primary text-4xl font-bold text-center mb-16 tracking-tight">
                        {t("how.sectionTitle")}{" "}
                        <span className="text-accent">{t("how.sectionHighlight")}</span>
                    </h2>

                    <div className="flex flex-col items-center gap-0 max-w-xl mx-auto">
                        {[1, 2, 3, 4].map((level, index) => (
                            <div key={level}>
                                <div
                                    className={`relative w-full p-9 rounded-3xl text-center border-2 ${level === 4
                                            ? "gradient-hero border-none text-white shadow-lg"
                                            : "bg-white border-gray-custom-100 hover:border-primary hover:shadow-md"
                                        } transition-all`}
                                >
                                    {/* Badge */}
                                    <div
                                        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-xs font-bold ${level === 4 ? "bg-accent text-dark" : "bg-dark text-white"
                                            }`}
                                    >
                                        Level {level}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 mx-auto mt-2 mb-5 rounded-2xl flex items-center justify-center ${level === 4 ? "bg-white/20" : "bg-gray-custom-50"
                                            }`}
                                    >
                                        <svg
                                            className={`w-8 h-8 ${level === 4 ? "text-white" : "text-primary"}`}
                                            viewBox="0 0 48 48"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            {level === 1 && (
                                                <>
                                                    <circle cx="24" cy="24" r="18" />
                                                    <path d="M24 14v10l6 6" />
                                                    <circle cx="24" cy="24" r="4" fill="currentColor" />
                                                </>
                                            )}
                                            {level === 2 && (
                                                <>
                                                    <path d="M8 34c0-6 6-10 16-10s16 4 16 10" />
                                                    <circle cx="24" cy="14" r="8" />
                                                    <circle cx="38" cy="18" r="5" />
                                                    <circle cx="10" cy="18" r="5" />
                                                </>
                                            )}
                                            {level === 3 && (
                                                <>
                                                    <rect x="6" y="10" width="36" height="28" rx="3" />
                                                    <path d="M14 22h20M14 30h12" />
                                                    <circle cx="36" cy="30" r="4" fill="currentColor" />
                                                </>
                                            )}
                                            {level === 4 && <path d="M24 4l6 12h12l-10 8 4 14-12-8-12 8 4-14-10-8h12z" />}
                                        </svg>
                                    </div>

                                    <h3 className="font-primary text-2xl font-bold mb-2">{t(`how.level${level}Title`)}</h3>
                                    <p className={`italic mb-3.5 ${level === 4 ? "text-white/85" : "text-gray-custom-500"}`}>
                                        {t(`how.level${level}Tagline`)}
                                    </p>
                                    <p className={`text-sm leading-relaxed ${level === 4 ? "text-white/90" : "text-gray-custom-700"}`}>
                                        {t(`how.level${level}Desc`)}
                                    </p>
                                </div>

                                {/* Connector */}
                                {index < 3 && <div className="w-0.5 h-8 bg-gray-custom-200 mx-auto" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Languages Section */}
            <section id="languages" className="py-28 bg-gray-custom-50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-primary text-4xl font-bold text-center mb-5 tracking-tight">
                        {t("languages.sectionTitle")}{" "}
                        <span className="text-accent">{t("languages.sectionHighlight")}</span>
                    </h2>
                    <p className="text-center text-gray-custom-700 max-w-xl mx-auto mb-16 leading-relaxed">
                        {t("languages.sectionSubtitle")}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Object.entries(languageInfo)
                            .filter(([code]) => code !== "en")
                            .map(([code, info]) => (
                                <button
                                    key={code}
                                    className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl border border-gray-custom-100 hover:border-primary hover:shadow-md transition-all"
                                >
                                    <span className="text-3xl">{info.flag}</span>
                                    <span className="font-semibold text-dark">{info.nativeName}</span>
                                    <span className="text-xs text-gray-custom-500">{info.name}</span>
                                </button>
                            ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-28 bg-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="gradient-hero rounded-3xl p-16 text-center">
                        <h2 className="font-primary text-4xl font-bold text-white mb-4">{t("cta.title")}</h2>
                        <p className="text-white/90 text-lg mb-10 max-w-lg mx-auto">{t("cta.subtitle")}</p>
                        <button
                            onClick={handleGetStarted}
                            className="gradient-cta px-10 py-4 rounded-full font-bold text-lg text-dark shadow-button hover:translate-y-[-3px] transition-all"
                        >
                            {t("cta.button")}
                        </button>

                        <div className="flex items-center justify-center gap-4 mt-10">
                            <span className="text-white/70 text-sm">{t("cta.download")}</span>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white/15 border border-white/25 rounded-full text-white text-sm font-semibold hover:bg-white/25 transition-all"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.523 15.3414c-.3054.5085-.666.9949-1.0812 1.4612-.5648.6324-1.0284 1.071-1.3842 1.3168-.5528.4024-1.1456.6083-1.7808.6203-.4544 0-1.0028-.1295-1.6401-.3923-.6397-.2616-1.2281-.3923-1.7679-.3923-.5648 0-1.1706.1307-1.8186.3923-.6492.2628-1.1718.4-1.5714.4139-.6011.0256-1.2098-.1867-1.8285-.6372-.3856-.2652-.8686-.6997-1.4479-1.3044-.6204-.653-1.1294-1.4114-1.5273-2.2777-.4258-.9342-.6397-1.8393-.6397-2.7178 0-1.0042.2175-1.871.6517-2.599.3402-.5833.7932-1.0429 1.361-1.3804.5678-.3375 1.1815-.5098 1.8454-.5218.4825 0 1.1151.149 1.9024.4414.7849.2937 1.2882.4426 1.5074.4426.1632 0 .7161-.1747 1.6512-.5218.8832-.3226 1.6288-.4569 2.2404-.405 1.6548.1335 2.8975.7858 3.7203 1.9615-1.4802.8967-2.212 2.1527-2.1961 3.7644.0146 1.2539.4674 2.2976 1.3559 3.1262.4031.3832.8529.679 1.3536.8887-.1086.3158-.2233.6181-.3463.909zM14.3151 2.2c0 .9832-.3594 1.9012-1.0745 2.7496-.8626 1.0078-1.9054 1.59-3.0364 1.4979-.0144-.1176-.0227-.2412-.0227-.3707 0-.9434.4113-1.9536 1.142-2.7793.3647-.4194.8287-.7688 1.3919-1.0482.5607-.2758 1.0914-.4278 1.5886-.4538.0146.1283.0111.2566.0111.3843v.0002z" />
                                    </svg>
                                    iOS
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-white/15 border border-white/25 rounded-full text-white text-sm font-semibold hover:bg-white/25 transition-all"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
                                    </svg>
                                    Android
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 bg-dark text-white">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-5 gap-12 mb-12">
                        {/* Brand */}
                        <div className="md:col-span-2">
                            <div className="flex flex-col gap-1 mb-4">
                                <span className="font-primary text-2xl font-extrabold">artiCO</span>
                                <span className="text-sm text-white/70">{t("tagline")}</span>
                            </div>
                            <p className="text-sm text-white/60">{t("footer.copyright")}</p>
                        </div>

                        {/* Links */}
                        {["download", "aboutUs", "resources", "support"].map((section) => (
                            <div key={section}>
                                <h4 className="font-semibold mb-4">{t(`footer.${section}`)}</h4>
                                <div className="flex flex-col gap-2 text-sm text-white/70">
                                    {section === "download" && (
                                        <>
                                            <a href="#" className="hover:text-white transition-colors">Android</a>
                                            <a href="#" className="hover:text-white transition-colors">iOS</a>
                                        </>
                                    )}
                                    {section === "aboutUs" && (
                                        <>
                                            <a href="#" className="hover:text-white transition-colors">{t("footer.company")}</a>
                                            <a href="#" className="hover:text-white transition-colors">{t("footer.partnerWithUs")}</a>
                                        </>
                                    )}
                                    {section === "resources" && (
                                        <>
                                            <a href="#" className="hover:text-white transition-colors">{t("footer.wiki")}</a>
                                            <a href="#" className="hover:text-white transition-colors">{t("footer.blogs")}</a>
                                        </>
                                    )}
                                    {section === "support" && (
                                        <>
                                            <a href="#" className="hover:text-white transition-colors">{t("footer.faqs")}</a>
                                            <a href="#" className="hover:text-white transition-colors">{t("footer.contactUs")}</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-8 flex flex-wrap gap-6 text-sm text-white/60">
                        <a href="#" className="hover:text-white transition-colors">{t("footer.terms")}</a>
                        <a href="#" className="hover:text-white transition-colors">{t("footer.privacy")}</a>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default function Page() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <HomePage />
            </AuthProvider>
        </LanguageProvider>
    );
}
