"use client";

import { useState } from "react";
import { OnboardingPage, OnboardingLessonData } from "@/lib/greetings-content";
import { greetingsT } from "@/lib/greetings-translations";
import { useLanguage } from "@/lib/language-context";

interface OnboardingLessonProps {
    lessonData: OnboardingLessonData;
    onComplete: () => void;
    onPractice: () => void;
}

export default function OnboardingLesson({ lessonData, onComplete, onPractice }: OnboardingLessonProps) {
    const { language } = useLanguage();
    const [currentPage, setCurrentPage] = useState(0);
    const [showCongrats, setShowCongrats] = useState(false);

    const t = (key: string) => greetingsT(key, language);
    const pages = lessonData.pages;
    const totalPages = pages.length;
    const progress = ((currentPage + 1) / (totalPages + 1)) * 100; // +1 for congrats

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setShowCongrats(true);
        }
    };

    const handlePrev = () => {
        if (showCongrats) {
            setShowCongrats(false);
        } else if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Congrats screen
    if (showCongrats) {
        const congrats = t("greetings.congrats");
        return (
            <div className="fixed inset-0 z-50 bg-white overflow-y-auto font-sans">
                {/* Progress bar — full */}
                <div className="sticky top-0 z-50 bg-white border-b border-divider">
                    <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
                        <div className="flex-1 h-2 bg-pebble rounded-full overflow-hidden">
                            <div className="h-full bg-cocoa rounded-full transition-all duration-700" style={{ width: "100%" }} />
                        </div>
                        <button onClick={onComplete} className="w-10 h-10 rounded-full hover:bg-linen flex items-center justify-center text-dust hover:text-ink transition-all">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                    <div className="max-w-xl w-full px-6 py-20 text-center">
                        <div className="w-32 h-32 bg-pebble text-ink rounded-full flex items-center justify-center mx-auto mb-8 text-6xl shadow-inner" style={{ animation: "zoomIn 0.5s ease-out" }}>
                            🎉
                        </div>
                        <h1 className="text-4xl font-bold text-ink mb-4 font-primary">{congrats?.title || "You did it! 🎉"}</h1>
                        <p className="text-dust text-lg mb-12 leading-relaxed">{congrats?.body || ""}</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={onPractice}
                                className="px-12 py-5 bg-cocoa text-white font-bold rounded-2xl hover:shadow-lg transition-all text-lg group"
                            >
                                <div className="flex items-center gap-3">
                                    <span>{congrats?.cta || "Now let's practice"}</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </div>
                            </button>
                            <button onClick={onComplete} className="px-8 py-5 bg-linen text-ash font-bold rounded-2xl hover:bg-pebble transition-all text-lg">
                                Return to Syllabus
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const page = pages[currentPage];

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto font-sans">
            {/* Top Bar */}
            <div className="sticky top-0 z-50 bg-white border-b border-divider">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center gap-4">
                    {/* Back button */}
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentPage === 0 ? "text-pebble cursor-not-allowed" : "hover:bg-linen text-dust hover:text-ink"}`}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    </button>

                    {/* Progress bar */}
                    <div className="flex-1 h-2 bg-pebble rounded-full overflow-hidden">
                        <div
                            className="h-full bg-cocoa rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Page indicator */}
                    <span className="text-xs font-bold text-dust tabular-nums whitespace-nowrap">
                        {currentPage + 1} / {totalPages}
                    </span>

                    {/* Close button */}
                    <button onClick={onComplete} className="w-10 h-10 rounded-full hover:bg-linen flex items-center justify-center text-dust hover:text-ink transition-all">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>

            {/* Page Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <div className="max-w-2xl w-full px-6 py-12" key={page.id} style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
                    <PageRenderer page={page} t={t} />
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-divider">
                <div className="max-w-2xl mx-auto px-6 py-4 flex justify-end">
                    <button
                        onClick={handleNext}
                        className="px-10 py-4 bg-cocoa text-white font-bold rounded-2xl hover:shadow-lg transition-all text-base group"
                    >
                        <div className="flex items-center gap-2">
                            <span>{currentPage < totalPages - 1 ? "Continue" : "Finish"}</span>
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </div>
                    </button>
                </div>
            </div>

            {/* CSS animations */}
            <style jsx>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateY(16px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes zoomIn {
                    from { transform: scale(0.5); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

// ─── Page Renderers ────────────────────────────────────────────

function PageRenderer({ page, t }: { page: OnboardingPage; t: (key: string) => any }) {
    const data = t(page.tKey);
    if (!data || typeof data === "string") return <div className="text-dust">Content loading...</div>;

    switch (page.type) {
        case "text":
            return <TextPage data={data} media={page.media} />;
        case "highlight":
            return <HighlightPage data={data} />;
        case "list":
            return <ListPage data={data} categories={page.listCategories || []} />;
        case "pattern":
            return <PatternPage data={data} />;
        case "note":
            return <NotePage data={data} />;
        default:
            return <TextPage data={data} />;
    }
}

function TextPage({ data, media }: { data: any; media?: any }) {
    return (
        <div className="space-y-6">
            {data.title && <h1 className="font-primary text-3xl md:text-4xl font-bold text-ink tracking-tight">{data.title}</h1>}
            {data.body1 && <p className="text-ash text-lg leading-relaxed">{data.body1}</p>}
            {data.body2 && <p className="text-ash text-lg leading-relaxed">{data.body2}</p>}
            {data.emphasis && (
                <p className="text-ink font-bold text-xl bg-linen p-5 rounded-2xl border border-divider">{data.emphasis}</p>
            )}
            {data.emphasis1 && (
                <p className="text-ink font-bold text-lg bg-linen p-5 rounded-2xl border border-divider">{data.emphasis1}</p>
            )}
            {data.body && <p className="text-ash text-lg leading-relaxed">{data.body}</p>}
            {data.step1 && (
                <div className="space-y-3 pl-1">
                    <div className="flex gap-3"><span className="text-cocoa font-bold mt-0.5 shrink-0">1.</span><p className="text-ash leading-relaxed">{data.step1}</p></div>
                    {data.step2 && <div className="flex gap-3"><span className="text-cocoa font-bold mt-0.5 shrink-0">2.</span><p className="text-ash leading-relaxed">{data.step2}</p></div>}
                    {data.step3 && <div className="flex gap-3"><span className="text-cocoa font-bold mt-0.5 shrink-0">3.</span><p className="text-ash leading-relaxed">{data.step3}</p></div>}
                </div>
            )}
            {data.body3 && <p className="text-ash text-lg leading-relaxed">{data.body3}</p>}
            {data.emphasis2 && (
                <p className="text-ink font-bold text-lg bg-pebble p-5 rounded-2xl border border-divider">{data.emphasis2}</p>
            )}
            {data.body4 && <p className="text-ash leading-relaxed">{data.body4}</p>}
            {data.goal && (
                <div className="bg-cocoa text-white p-5 rounded-2xl text-lg font-bold whitespace-pre-line">{data.goal}</div>
            )}
            {data.note && <p className="text-dust text-sm italic">{data.note}</p>}
            {data.quote && (
                <blockquote className="border-l-4 border-cocoa pl-5 py-3 text-ink text-xl font-medium italic bg-linen rounded-r-2xl">{data.quote}</blockquote>
            )}
            {/* Media placeholder */}
            {media && (
                <div className="bg-pebble rounded-3xl p-8 flex items-center justify-center text-dust border border-divider">
                    <div className="text-center">
                        <span className="text-3xl block mb-2">{media.type === "image" ? "🖼️" : media.type === "video" ? "🎬" : media.type === "audio" ? "🔊" : "📎"}</span>
                        <p className="text-sm font-medium">{media.alt || `${media.type} placeholder`}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

function HighlightPage({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            {data.title && <h1 className="font-primary text-3xl md:text-4xl font-bold text-ink tracking-tight">{data.title}</h1>}
            {/* Three items format (p2) */}
            {data.item1 && (
                <div className="space-y-4">
                    {[data.item1, data.item2, data.item3, data.item4].filter(Boolean).map((item: string, i: number) => (
                        <div key={i} className="flex items-start gap-4 bg-linen p-5 rounded-2xl border border-divider">
                            <span className="w-10 h-10 bg-cocoa text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</span>
                            <p className="text-ink font-medium text-lg pt-1.5">{item}</p>
                        </div>
                    ))}
                </div>
            )}
            {data.body && <p className="text-ash text-lg leading-relaxed">{data.body}</p>}
            {data.body2 && <p className="text-ash text-lg leading-relaxed">{data.body2}</p>}
            {data.emphasis && (
                <p className="text-ink font-bold text-xl bg-pebble p-6 rounded-2xl border border-divider text-center">{data.emphasis}</p>
            )}
            {data.emphasis1 && (
                <p className="text-ink font-bold text-lg bg-linen p-5 rounded-2xl border border-divider">{data.emphasis1}</p>
            )}
            {data.body3 && <p className="text-ash text-lg leading-relaxed">{data.body3}</p>}
            {data.emphasis2 && (
                <p className="text-ink font-bold text-lg bg-pebble p-5 rounded-2xl border border-divider">{data.emphasis2}</p>
            )}
            {data.subtitle && <p className="text-dust text-center text-lg italic">{data.subtitle}</p>}
        </div>
    );
}

function ListPage({ data, categories }: { data: any; categories: string[] }) {
    return (
        <div className="space-y-6">
            {data.title && <h2 className="font-primary text-2xl md:text-3xl font-bold text-ink tracking-tight">{data.title}</h2>}
            {data.subtitle && <p className="text-dust italic">{data.subtitle}</p>}
            {data.note && <p className="text-dust text-sm italic">{data.note}</p>}
            <div className="space-y-4">
                {categories.map((catKey) => {
                    const cat = data[catKey];
                    if (!cat) return null;
                    return (
                        <div key={catKey} className="bg-white rounded-2xl border border-divider p-5">
                            {cat.label && <p className="text-xs uppercase tracking-widest text-dust font-bold mb-3">{cat.label}</p>}
                            <div className="flex flex-wrap gap-2">
                                {(cat.items || []).map((item: string, i: number) => (
                                    <span key={i} className="inline-block bg-linen text-ink px-4 py-2 rounded-xl text-sm font-medium border border-divider hover:bg-pebble transition-colors">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function PatternPage({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            {data.title && <h2 className="font-primary text-2xl md:text-3xl font-bold text-ink tracking-tight">{data.title}</h2>}
            {data.useWhen && <p className="text-dust italic text-sm">{data.useWhen}</p>}

            {/* Dialogue card */}
            <div className="bg-linen rounded-3xl border border-divider p-6 space-y-1">
                {data.label && <p className="text-xs uppercase tracking-widest text-dust font-bold mb-4">{data.label}</p>}
                {data.lineA1 && <DialogueLine speaker="A" text={data.lineA1} />}
                {data.lineB1 && <DialogueLine speaker="B" text={data.lineB1} />}
                {data.lineA2 && <DialogueLine speaker="A" text={data.lineA2} />}
                {data.lineB2 && <DialogueLine speaker="B" text={data.lineB2} />}
            </div>

            {/* Why this works */}
            {data.why && (
                <div className="bg-pebble rounded-2xl border border-divider p-5">
                    <p className="text-xs uppercase tracking-widest text-dust font-bold mb-2">{data.why}</p>
                    <p className="text-ink font-medium">{data.reason}</p>
                </div>
            )}
        </div>
    );
}

function DialogueLine({ speaker, text }: { speaker: string; text: string }) {
    const isA = speaker === "A";
    return (
        <div className={`flex gap-3 items-start py-2 ${isA ? "" : "justify-end"}`}>
            {isA && <span className="w-8 h-8 rounded-full bg-cocoa text-white flex items-center justify-center text-xs font-bold shrink-0">A</span>}
            <div className={`px-5 py-3 rounded-2xl max-w-[80%] ${isA ? "bg-white border border-divider text-ink" : "bg-cocoa text-white"}`}>
                <p className="font-medium">{text}</p>
            </div>
            {!isA && <span className="w-8 h-8 rounded-full bg-ash text-white flex items-center justify-center text-xs font-bold shrink-0">B</span>}
        </div>
    );
}

function NotePage({ data }: { data: any }) {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">⚠️</span>
                {data.title && <h2 className="font-primary text-2xl font-bold text-ink">{data.title}</h2>}
            </div>
            {data.body1 && <p className="text-ash text-lg leading-relaxed">{data.body1}</p>}
            {data.emphasis && (
                <p className="text-ink font-bold text-xl bg-linen p-5 rounded-2xl border border-divider">{data.emphasis}</p>
            )}
            {data.body2 && <p className="text-ash text-lg leading-relaxed">{data.body2}</p>}
            {data.item1 && (
                <ul className="space-y-2 pl-1">
                    <li className="flex gap-3"><span className="text-cocoa mt-1">•</span><span className="text-ash">{data.item1}</span></li>
                    {data.item2 && <li className="flex gap-3"><span className="text-cocoa mt-1">•</span><span className="text-ash">{data.item2}</span></li>}
                </ul>
            )}
            {data.body3 && <p className="text-ash text-lg leading-relaxed">{data.body3}</p>}
            {data.body4 && (
                <p className="text-ink font-bold text-lg bg-pebble p-5 rounded-2xl border border-divider">{data.body4}</p>
            )}
        </div>
    );
}
