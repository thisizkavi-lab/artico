"use client";

import React, { useState } from "react";
import { Level, Module } from "@/lib/course-data";

interface NestedSyllabusProps {
    levels: Level[];
    onSelectLesson: (levelId: string, moduleId: string, lessonId: string) => void;
    onSelectLevel?: (levelId: string) => void;
    currentLevelId?: string;
    currentModuleId?: string;
}

export default function NestedSyllabus({
    levels,
    onSelectLesson,
    onSelectLevel,
    currentLevelId,
    currentModuleId
}: NestedSyllabusProps) {
    const [expandedLevels, setExpandedLevels] = useState<string[]>(currentLevelId ? [currentLevelId] : [levels[0].id]);
    const [expandedModules, setExpandedModules] = useState<string[]>(currentModuleId ? [currentModuleId] : []);

    const toggleLevel = (id: string) => {
        setExpandedLevels(prev =>
            prev.includes(id) ? prev.filter(l => l !== id) : [...prev, id]
        );
    };

    const handleLevelClick = (level: Level) => {
        if (onSelectLevel) {
            onSelectLevel(level.id);
        } else {
            toggleLevel(level.id);
        }
    };

    const toggleModule = (id: string) => {
        setExpandedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    return (
        <div className="w-full space-y-4">
            {levels.map((level, lIndex) => {
                const isLevelExpanded = expandedLevels.includes(level.id);

                return (
                    <div
                        key={level.id}
                        className={`border rounded-3xl overflow-hidden transition-all duration-300 ${isLevelExpanded ? "border-divider bg-white shadow-sm" : "border-divider bg-linen"
                            }`}
                    >
                        {/* Level Header */}
                        <button
                            onClick={() => handleLevelClick(level)}
                            className="w-full px-8 py-6 flex items-center justify-between group"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${level.unlocked ? "bg-white border border-divider" : "bg-pebble text-dust"
                                    }`}>
                                    {level.icon}
                                </div>
                                <div className="text-left">
                                    <h3 className="font-primary text-lg font-bold text-ink group-hover:text-cocoa transition-colors">
                                        Level {lIndex + 1}: {level.title}
                                    </h3>
                                    <p className="text-sm text-dust font-medium">
                                        {level.modules.length} Modules • {level.tagline}
                                    </p>
                                </div>
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${isLevelExpanded ? "rotate-180 bg-pebble" : "bg-white"
                                }`}>
                                <svg className="w-5 h-5 text-dust" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        {/* Modules Container */}
                        {isLevelExpanded && (
                            <div className="px-8 pb-8 space-y-3">
                                {level.modules.map((module) => {
                                    const isModuleExpanded = expandedModules.includes(module.id);

                                    return (
                                        <div
                                            key={module.id}
                                            className={`rounded-2xl border transition-all ${isModuleExpanded ? "border-pebble bg-linen" : "border-divider bg-white"
                                                }`}
                                        >
                                            <button
                                                onClick={() => toggleModule(module.id)}
                                                className="w-full p-5 flex items-center justify-between group"
                                            >
                                                <div className="flex items-center gap-4 text-left">
                                                    <div className={`w-2 h-2 rounded-full ${isModuleExpanded ? "bg-cocoa" : "bg-pebble"}`} />
                                                    <span className={`font-bold text-sm ${isModuleExpanded ? "text-ink" : "text-ink"}`}>
                                                        {module.title}
                                                    </span>
                                                </div>
                                                <svg
                                                    className={`w-4 h-4 text-dust transition-transform ${isModuleExpanded ? "rotate-45" : ""}`}
                                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                                >
                                                    <path d="M12 5v14M5 12h14" />
                                                </svg>
                                            </button>

                                            {isModuleExpanded && (
                                                <div className="px-5 pb-5 pt-0 space-y-2">
                                                    {module.lessons.map((lesson) => (
                                                        <button
                                                            key={lesson.id}
                                                            onClick={() => onSelectLesson(level.id, module.id, lesson.id)}
                                                            className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all text-left border border-transparent hover:border-divider group/lesson"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-8 h-8 rounded-lg bg-pebble flex items-center justify-center text-dust group-hover/lesson:bg-cocoa group-hover/lesson:text-white transition-colors">
                                                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                                    </svg>
                                                                </div>
                                                                <div>
                                                                    <p className="text-sm font-bold text-ink">{lesson.title}</p>
                                                                    <p className="text-[11px] text-dust uppercase tracking-widest font-bold">5 min read</p>
                                                                </div>
                                                            </div>
                                                            <span className="text-[10px] font-bold text-cocoa opacity-0 group-hover/lesson:opacity-100 transition-opacity uppercase tracking-widest">
                                                                Start Lesson
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
