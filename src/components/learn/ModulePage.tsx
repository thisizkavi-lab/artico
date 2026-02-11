"use client";

import { Module } from "@/lib/course-data";

interface ModulePageProps {
    module: Module;
    levelTitle: string;
    onBack: () => void;
    onSelectLesson: (lessonId: string) => void;
}

export default function ModulePage({ module, levelTitle, onBack, onSelectLesson }: ModulePageProps) {
    return (
        <div className="min-h-[calc(100vh-60px)] px-6 py-8 relative">
            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-dust hover:text-ink mb-6 transition-colors"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back to {levelTitle}
                </button>

                {/* Module Header */}
                <div className="bg-white rounded-3xl p-8 border border-divider shadow-sm mb-8">
                    <h1 className="font-primary text-3xl font-bold text-ink mb-2">
                        {module.title}
                    </h1>
                    <p className="text-dust">
                        {module.description}
                    </p>
                </div>

                {/* Lessons Section */}
                <div className="bg-pebble rounded-3xl p-6 border border-divider">
                    <h2 className="font-bold text-lg text-ink mb-6 px-2">Lessons</h2>

                    {/* Lessons List with vertical line */}
                    <div className="relative">
                        {/* Vertical progress line */}
                        <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-divider" />

                        <div className="space-y-1">
                            {module.lessons.map((lesson, index) => {
                                const isActive = lesson.current;
                                const isCompleted = lesson.completed;

                                return (
                                    <button
                                        key={lesson.id}
                                        onClick={() => onSelectLesson(lesson.id)}
                                        className="w-full flex items-center gap-4 py-3 px-3 rounded-xl hover:bg-white transition-all text-left group"
                                    >
                                        {/* Progress indicator */}
                                        <div className="relative z-10">
                                            <div
                                                className={`w-4 h-4 rounded transition-all ${isCompleted
                                                    ? "bg-cocoa"
                                                    : isActive
                                                        ? "bg-cocoa shadow-md"
                                                        : "bg-white border-2 border-pebble"
                                                    }`}
                                            />
                                        </div>

                                        {/* Lesson title */}
                                        <span
                                            className={`flex-1 transition-colors ${isActive
                                                ? "font-bold text-ink"
                                                : isCompleted
                                                    ? "text-ash"
                                                    : "text-dust group-hover:text-ink"
                                                }`}
                                        >
                                            {lesson.title}
                                        </span>

                                        {/* Type badge */}
                                        {lesson.type === "practice" && (
                                            <span className="text-xs px-2 py-1 bg-white text-ash rounded-full">
                                                Practice
                                            </span>
                                        )}
                                        {lesson.type === "review" && (
                                            <span className="text-xs px-2 py-1 bg-white text-ash rounded-full">
                                                Review
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
