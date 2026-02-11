"use client";

import { useState } from "react";
import { Level } from "@/lib/course-data";
import OpenStaxNav from "./OpenStaxNav";

interface LevelPageProps {
    level: Level;
    onSelectLesson: (lessonId: string, moduleId: string) => void;
    onBack?: () => void;
}

export default function LevelPage({ level, onSelectLesson, onBack }: LevelPageProps) {
    const [selectedLesson, setSelectedLesson] = useState<{ lessonId: string; moduleId: string } | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const handleLessonSelect = (lessonId: string, moduleId: string) => {
        setSelectedLesson({ lessonId, moduleId });
        onSelectLesson(lessonId, moduleId);
    };

    // Get total lesson count
    const totalLessons = level.modules.reduce((acc, m) => acc + m.lessons.length, 0);

    return (
        <div className="min-h-[calc(100vh-60px)] flex flex-col lg:flex-row">
            {/* Left Sidebar - OpenStax Navigation */}
            <div
                className={`${sidebarOpen ? "lg:w-80 xl:w-96" : "lg:w-0"} lg:h-[calc(100vh-60px)] lg:sticky lg:top-[60px] border-r border-divider bg-white overflow-hidden flex flex-col transition-all duration-300`}
            >
                {sidebarOpen && (
                    <>
                        {/* Level Header */}
                        <div
                            className="p-6 border-b border-divider"
                        >
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="flex items-center gap-2 text-dust hover:text-ink transition-colors mb-4 text-sm"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                    Back
                                </button>
                            )}
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-3xl">{level.icon}</span>
                                <h1 className="font-bold text-xl text-ink">{level.title}</h1>
                            </div>
                            <p className="text-dust text-sm leading-relaxed">
                                {level.modules.length} modules • {totalLessons} lessons
                            </p>
                        </div>

                        {/* Navigation */}
                        <OpenStaxNav
                            level={level}
                            onLessonSelect={handleLessonSelect}
                        />
                    </>
                )}
            </div>

            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex fixed left-0 top-1/2 -translate-y-1/2 z-50 w-6 h-16 bg-white border border-divider border-l-0 rounded-r-lg items-center justify-center shadow-sm hover:bg-linen transition-all"
                style={{ left: sidebarOpen ? "calc(24rem - 1px)" : "0" }}
            >
                <svg
                    className={`w-4 h-4 text-dust transition-transform ${sidebarOpen ? "" : "rotate-180"}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            {/* Right Content Area */}
            <div className="flex-1 bg-linen p-8 lg:p-12">
                {selectedLesson ? (
                    <div className="max-w-3xl mx-auto">
                        {/* Selected Lesson Preview */}
                        <div className="bg-white rounded-2xl border border-divider p-8 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div
                                    className="w-2 h-8 rounded-full bg-cocoa"
                                />
                                <span className="text-sm font-medium text-dust uppercase tracking-wider">
                                    {level.modules.find(m => m.id === selectedLesson.moduleId)?.title}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-ink mb-4">
                                {level.modules
                                    .find(m => m.id === selectedLesson.moduleId)
                                    ?.lessons.find(l => l.id === selectedLesson.lessonId)?.title}
                            </h2>
                            <p className="text-ash mb-6">
                                Click below to start this lesson.
                            </p>
                            <button
                                onClick={() => onSelectLesson(selectedLesson.lessonId, selectedLesson.moduleId)}
                                className="px-6 py-3 rounded-xl font-semibold text-white bg-cocoa transition-all"
                            >
                                Start Lesson
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-3xl mx-auto">
                        {/* Welcome State */}
                        <div className="text-center py-16">
                            <div className="text-6xl mb-6">{level.icon}</div>
                            <h2 className="text-3xl font-bold text-ink mb-4">{level.title}</h2>
                            <p className="text-ash leading-relaxed max-w-lg mx-auto mb-8">
                                {level.description}
                            </p>
                            <div className="inline-flex items-center gap-2 text-sm text-dust">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M15 18l-6-6 6-6" />
                                </svg>
                                Select a lesson from the sidebar to begin
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
