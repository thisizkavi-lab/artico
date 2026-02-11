import { levels } from "@/lib/course-data";
import { useLanguage } from "@/lib/language-context";
import { memo, useMemo, useCallback } from "react";
import Link from "next/link";

interface LearnHomeProps {
    onSelectLevel: (levelId: string) => void;
    onContinue: (levelId: string, moduleId: string, lessonId: string) => void;
}

// Get last progress from localStorage
function getLastProgress(): { levelId: string; moduleId: string; lessonId: string; lessonTitle: string; moduleName: string; levelName: string } | null {
    if (typeof window === "undefined") return null;

    const saved = localStorage.getItem("artico-last-progress");
    if (!saved) return null;

    try {
        return JSON.parse(saved);
    } catch {
        return null;
    }
}

// Save last progress to localStorage
export function saveLastProgress(levelId: string, moduleId: string, lessonId: string, lessonTitle: string, moduleName: string, levelName: string) {
    if (typeof window === "undefined") return;
    localStorage.setItem("artico-last-progress", JSON.stringify({ levelId, moduleId, lessonId, lessonTitle, moduleName, levelName }));
}

// Level card icons
const levelIcons: Record<string, React.ReactNode> = {
    "1": (
        <svg className="w-8 h-8 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 20h.01M8 20h.01M16 20h.01M4 20v-6a8 8 0 1116 0v6" />
        </svg>
    ),
    "2": (
        <svg className="w-8 h-8 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    "3": (
        <svg className="w-8 h-8 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
        </svg>
    ),
    "4": (
        <svg className="w-8 h-8 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
};

const levelColors: Record<string, string> = {
    "1": "bg-white border-divider",
    "2": "bg-white border-divider",
    "3": "bg-white border-divider",
    "4": "bg-white border-divider",
};

const levelAccents: Record<string, string> = {
    "1": "bg-cocoa",
    "2": "bg-cocoa",
    "3": "bg-cocoa",
    "4": "bg-cocoa",
};

// Memoized Level Card for performance
const LevelCard = memo(function LevelCard({
    level,
    index,
    isUnlocked,
    onClick,
    t,
}: {
    level: typeof levels[0];
    index: number;
    isUnlocked: boolean;
    onClick: () => void;
    t: (key: string) => string;
}) {
    return (
        <button
            onClick={onClick}
            disabled={!isUnlocked}
            className={`relative w-full p-6 rounded-2xl text-left transition-all duration-200 border-2 ${isUnlocked
                ? `${levelColors[level.id]} hover:shadow-lg hover:scale-[1.02] cursor-pointer`
                : "bg-linen border-divider cursor-not-allowed"
                }`}
        >
            {/* Accent bar */}
            <div className={`absolute left-0 top-6 bottom-6 w-1 ${levelAccents[level.id]} rounded-r-full`} />

            <div className="flex items-start gap-4 pl-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-linen flex items-center justify-center shadow-sm shrink-0">
                    {levelIcons[level.id]}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-dust uppercase tracking-wide">
                            {t("common.level")} {index + 1}
                        </span>
                        {!isUnlocked && (
                            <svg className="w-4 h-4 text-dust" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                        )}
                    </div>
                    <h3 className="font-bold text-lg text-ink mb-1 truncate">
                        {t(`levels.${level.id}.title`)}
                    </h3>
                    <p className="text-sm text-dust line-clamp-2">
                        {t(`levels.${level.id}.description`)}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-dust">{level.modules.length} {t("learn.modules")}</span>
                        <span className="text-xs text-dust">•</span>
                        <span className="text-xs text-dust">
                            {level.modules.reduce((acc, m) => acc + m.lessons.length, 0)} {t("learn.lessons")}
                        </span>
                    </div>
                </div>

                {/* Arrow */}
                {isUnlocked && (
                    <svg className="w-6 h-6 text-pebble shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                )}
            </div>
        </button>
    );
});

export default function LearnHome({ onSelectLevel, onContinue }: LearnHomeProps) {
    const { language, t } = useLanguage();
    const lastProgress = useMemo(() => getLastProgress(), []);

    const handleContinue = useCallback(() => {
        if (lastProgress) {
            onContinue(lastProgress.levelId, lastProgress.moduleId, lastProgress.lessonId);
        }
    }, [lastProgress, onContinue]);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Resume Section */}
            {lastProgress && (
                <div className="mb-10">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-dust mb-3">
                        {t("learn.continueLearning")}
                    </p>
                    <div className="bg-pebble rounded-2xl p-6 border border-divider flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shrink-0">
                            <svg className="w-8 h-8 text-ink" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-ink truncate">{lastProgress.lessonTitle}</h3>
                            <p className="text-sm text-ash">
                                {lastProgress.levelName} → {lastProgress.moduleName}
                            </p>
                        </div>
                        <button
                            onClick={handleContinue}
                            className="px-8 py-3 bg-cocoa text-white rounded-xl font-bold text-sm transition-all shrink-0"
                        >
                            {t("learn.resume")}
                        </button>
                    </div>
                </div>
            )}

            {/* Levels Grid */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="font-bold text-2xl text-ink">{t("learn.learningPaths")}</h2>
                    <p className="text-sm text-dust">{t("learn.chooseLevel")}</p>
                </div>
            </div>

            <div className="space-y-4">
                {levels.map((level, index) => (
                    <LevelCard
                        key={level.id}
                        level={level}
                        index={index}
                        isUnlocked={index === 0 || index === 1} // First 2 levels unlocked for demo
                        onClick={() => onSelectLevel(level.id)}
                        t={t}
                    />
                ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="bg-linen rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-ink">4</p>
                    <p className="text-xs text-dust mt-1">{t("learn.totalLevels")}</p>
                </div>
                <div className="bg-linen rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-ink">120+</p>
                    <p className="text-xs text-dust mt-1">{t("learn.lessons")}</p>
                </div>
                <div className="bg-linen rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-ink">6mo</p>
                    <p className="text-xs text-dust mt-1">{t("learn.avgTime")}</p>
                </div>
            </div>
        </div>
    );
}
