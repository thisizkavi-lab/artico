"use client";

import { levels, Level } from "@/lib/course-data";
import { useLanguage } from "@/lib/language-context";
import { appT } from "@/lib/app-translations";

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

export default function LearnHome({ onSelectLevel, onContinue }: LearnHomeProps) {
    const { language } = useLanguage();
    const lastProgress = getLastProgress();

    const t = (key: string) => appT(key, language);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Continue Banner */}
            {lastProgress && (
                <div className="mb-10">
                    <button
                        onClick={() => onContinue(lastProgress.levelId, lastProgress.moduleId, lastProgress.lessonId)}
                        className="w-full bg-gradient-to-r from-primary to-blue-600 text-white rounded-2xl p-6 text-left hover:shadow-xl transition-all group"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm opacity-80 mb-1">{t("learn.continueWhereYouLeftOff")}</p>
                                <h3 className="font-bold text-xl mb-1">
                                    {lastProgress.lessonTitle}
                                </h3>
                                <p className="text-sm opacity-80">
                                    {lastProgress.levelName} → {lastProgress.moduleName}
                                </p>
                            </div>
                            <div className="bg-white/20 p-3 rounded-full group-hover:bg-white/30 transition-colors">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </div>
                    </button>
                </div>
            )}

            {/* Levels Section */}
            <div>
                <h2 className="font-primary text-2xl font-bold text-dark mb-6">
                    {t("learn.yourLearningPath")}
                </h2>

                <div className="space-y-4">
                    {levels.map((level, index) => (
                        <LevelCard
                            key={level.id}
                            level={level}
                            index={index}
                            language={language}
                            onSelect={() => onSelectLevel(level.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

interface LevelCardProps {
    level: Level;
    index: number;
    language: string;
    onSelect: () => void;
}

function LevelCard({ level, index, language, onSelect }: LevelCardProps) {
    const completedModules = 0; // TODO: Track actual progress
    const totalModules = level.modules.length;
    const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

    const t = (key: string) => appT(key, language);

    return (
        <button
            onClick={onSelect}
            disabled={!level.unlocked}
            className={`w-full flex items-center gap-5 p-6 rounded-2xl border text-left transition-all group ${level.unlocked
                ? "bg-white border-gray-custom-200 hover:border-primary hover:shadow-lg cursor-pointer"
                : "bg-gray-custom-50 border-gray-custom-100 cursor-not-allowed opacity-60"
                }`}
        >
            {/* Icon */}
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${level.unlocked ? "bg-gradient-to-br " + level.color : "bg-gray-custom-200"
                }`}>
                {level.icon}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-bold text-lg ${level.unlocked ? "text-dark group-hover:text-primary" : "text-gray-custom-400"} transition-colors`}>
                        {level.title}
                    </h3>
                    {!level.unlocked && (
                        <svg className="w-4 h-4 text-gray-custom-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                        </svg>
                    )}
                </div>
                <p className="text-sm text-gray-custom-500 mb-2">{level.tagline}</p>

                {level.unlocked && (
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-custom-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs text-gray-custom-500">
                            {completedModules}/{totalModules} {t("learn.modules")}
                        </span>
                    </div>
                )}
            </div>

            {/* Arrow */}
            {level.unlocked && (
                <svg className="w-5 h-5 text-gray-custom-400 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            )}
        </button>
    );
}
