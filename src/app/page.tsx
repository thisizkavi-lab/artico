"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import LevelShowcase from "@/components/LevelShowcase";
import AuthModal from "@/components/AuthModal";
import Onboarding from "@/components/Onboarding";
import { useLanguage } from "@/lib/language-context";
import { languageInfo } from "@/lib/translations";

export default function HomePage() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const onboardingDone = localStorage.getItem("artico_onboarding_done");
        if (!onboardingDone) {
            setShowOnboarding(true);
        }
    }, []);

    const handleOnboardingComplete = () => {
        localStorage.setItem("artico_onboarding_done", "true");
        setShowOnboarding(false);
    };

    // If already logged in, redirect to learn
    const handleGetStarted = () => {
        if (user) {
            router.push("/learn");
        } else {
            setAuthModalOpen(true);
        }
    };

    return (
        <>
            {showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}
            <Navbar onLogin={() => setAuthModalOpen(true)} />

            {/* Auth Modal */}
            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

            {/* Hero Section */}
            <section className="min-h-screen pt-36 pb-24 bg-linen relative overflow-hidden flex items-center justify-center">
                <div className="max-w-[900px] mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                    <h1 className="font-primary text-5xl md:text-[5.5rem] font-bold text-ink mb-8 leading-[1.1] tracking-tight">
                        {t("hero.title1")}
                        <br />
                        {t("hero.title2")}
                    </h1>
                    <p className="text-xl md:text-2xl text-ash mb-14 leading-relaxed max-w-3xl mx-auto font-medium">
                        {t("hero.subtitle")}
                    </p>

                    <button
                        onClick={handleGetStarted}
                        className="bg-cocoa text-white px-12 py-5 rounded-full font-bold text-xl transition-all shadow-md"
                    >
                        {t("nav.getStarted")}
                    </button>
                </div>
            </section>

            {/* Why Section */}
            <section id="why" className="py-28 bg-linen">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-primary text-4xl font-bold text-center mb-16 tracking-tight">
                        {t("why.sectionTitle")}{" "}
                        <span className="text-ash">{t("why.sectionHighlight")}</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((num) => (
                            <div
                                key={num}
                                className="bg-white p-10 rounded-3xl shadow-sm border border-divider text-center hover:translate-y-[-8px] hover:shadow-lg transition-all"
                            >
                                <div className="w-18 h-18 mx-auto mb-6 bg-cocoa rounded-2xl flex items-center justify-center shadow-lg">
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
                                <p className="text-ash leading-relaxed text-sm">{t(`why.card${num}Desc`)}</p>
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
                        <span className="text-ash">{t("how.sectionHighlight")}</span>
                    </h2>

                    <div className="flex flex-col items-center gap-0 max-w-xl mx-auto">
                        {[1, 2, 3, 4].map((level, index) => (
                            <div key={level}>
                                <div
                                    className={`relative w-full p-9 rounded-3xl text-center border-2 ${level === 4
                                        ? "bg-cocoa border-cocoa text-white shadow-lg"
                                        : "bg-white border-divider hover:border-ink hover:shadow-md"
                                        } transition-all`}
                                >
                                    {/* Badge */}
                                    <div
                                        className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-xs font-bold ${level === 4 ? "bg-pebble text-ink" : "bg-ink text-white"
                                            }`}
                                    >
                                        Level {level}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className={`w-16 h-16 mx-auto mt-2 mb-5 rounded-2xl flex items-center justify-center ${level === 4 ? "bg-pebble" : "bg-linen"
                                            }`}
                                    >
                                        <svg
                                            className={`w-8 h-8 ${level === 4 ? "text-ink" : "text-ink"}`}
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
                                    <p className={`italic mb-3.5 ${level === 4 ? "text-pebble" : "text-dust"}`}>
                                        {t(`how.level${level}Tagline`)}
                                    </p>
                                    <p className={`text-sm leading-relaxed ${level === 4 ? "text-pebble" : "text-ash"}`}>
                                        {t(`how.level${level}Desc`)}
                                    </p>
                                </div>

                                {/* Connector */}
                                {index < 3 && <div className="w-0.5 h-8 bg-divider mx-auto" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Languages Section */}
            <section id="languages" className="py-28 bg-linen">
                <div className="max-w-[1200px] mx-auto px-6">
                    <h2 className="font-primary text-4xl font-bold text-center mb-5 tracking-tight">
                        {t("languages.sectionTitle")}{" "}
                        <span className="text-ash">{t("languages.sectionHighlight")}</span>
                    </h2>
                    <p className="text-center text-ash max-w-xl mx-auto mb-16 leading-relaxed">
                        {t("languages.sectionSubtitle")}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Object.entries(languageInfo)
                            .filter(([code]) => code !== "en")
                            .map(([code, info]) => (
                                <button
                                    key={code}
                                    className="flex flex-col items-center gap-2 p-6 bg-white rounded-2xl border border-divider hover:border-ink hover:shadow-md transition-all"
                                >
                                    <span className="text-3xl">{info.flag}</span>
                                    <span className="font-semibold text-ink">{info.nativeName}</span>
                                    <span className="text-xs text-dust">{info.name}</span>
                                </button>
                            ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <h2 className="font-primary text-4xl md:text-5xl font-extrabold text-ink tracking-tight">
                        {t("cta.title")}
                    </h2>

                    <button
                        onClick={handleGetStarted}
                        className="bg-cocoa text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-md whitespace-nowrap"
                    >
                        {t("cta.getStarted")}
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-white border-t border-divider">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="grid md:grid-cols-12 gap-12 mb-20">
                        {/* Brand */}
                        <div className="md:col-span-4">
                            <div className="relative flex flex-col gap-0.5 mb-6 h-14 w-44">
                                <img
                                    src="/logo.png"
                                    alt="artiCo"
                                    className="object-contain w-full h-full"
                                />
                            </div>

                            <div className="flex gap-4 text-dust mt-6">
                                {/* Social Icons */}
                                <a href="#" className="w-10 h-10 rounded-full bg-linen flex items-center justify-center hover:bg-pebble transition-colors">
                                    <svg className="w-5 h-5 text-ash" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-linen flex items-center justify-center hover:bg-pebble transition-colors">
                                    <svg className="w-5 h-5 text-ash" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-linen flex items-center justify-center hover:bg-pebble transition-colors">
                                    <svg className="w-5 h-5 text-ash" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div>
                                <h4 className="font-bold text-ink mb-6">Download</h4>
                                <ul className="space-y-4 text-dust text-sm font-medium">
                                    <li><a href="#" className="hover:text-ink transition-colors">android</a></li>
                                    <li><a href="#" className="hover:text-ink transition-colors">iOS</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-ink mb-6">About us</h4>
                                <ul className="space-y-4 text-dust text-sm font-medium">
                                    <li><a href="#" className="hover:text-ink transition-colors">Company</a></li>
                                    <li><a href="#" className="hover:text-ink transition-colors">Partner with us</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-ink mb-6">Resources</h4>
                                <ul className="space-y-4 text-dust text-sm font-medium">
                                    <li><a href="#" className="hover:text-ink transition-colors">Wiki</a></li>
                                    <li><a href="#" className="hover:text-ink transition-colors">Blogs</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-ink mb-6">Support</h4>
                                <ul className="space-y-4 text-dust text-sm font-medium">
                                    <li><a href="#" className="hover:text-ink transition-colors">FAQs</a></li>
                                    <li><a href="#" className="hover:text-ink transition-colors">Contact us</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-xs text-dust font-medium">
                        <p>© 2025 artico, Inc.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-ink transition-colors">Terms of service</a>
                            <a href="#" className="hover:text-ink transition-colors">Privacy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
