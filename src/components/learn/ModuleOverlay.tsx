"use client";

import { Module, Lesson } from "@/lib/course-data";

interface ModuleOverlayProps {
    module: Module;
    onClose: () => void;
    onSelectLesson: (lessonId: string) => void;
}

export default function ModuleOverlay({ module, onClose, onSelectLesson }: ModuleOverlayProps) {
    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/20 z-40"
                onClick={onClose}
            />

            {/* Slide-in Panel */}
            <div className="fixed top-0 left-0 h-full w-full max-w-md bg-amber-50/95 backdrop-blur-lg z-50 shadow-2xl animate-slide-in-left overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-amber-50/95 backdrop-blur-sm px-6 py-5 border-b border-gray-custom-200 flex items-center justify-between">
                    <h2 className="font-bold text-xl text-dark">
                        Module 1: {module.title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center text-gray-custom-500 hover:text-dark transition-colors"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Lessons List */}
                <div className="px-6 py-6">
                    <div className="relative">
                        {/* Vertical progress line */}
                        <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-gray-custom-300" />

                        <div className="space-y-0">
                            {module.lessons.map((lesson, index) => (
                                <LessonItem
                                    key={lesson.id}
                                    lesson={lesson}
                                    onClick={() => onSelectLesson(lesson.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface LessonItemProps {
    lesson: Lesson;
    onClick: () => void;
}

function LessonItem({ lesson, onClick }: LessonItemProps) {
    const isActive = lesson.current || lesson.completed;

    return (
        <button
            onClick={onClick}
            className="w-full flex items-start gap-4 py-3 text-left hover:bg-white/50 rounded-lg px-2 -ml-2 transition-colors"
        >
            {/* Progress indicator */}
            <div className="relative">
                <div
                    className={`w-4 h-4 rounded-sm mt-0.5 ${lesson.completed
                            ? "bg-accent"
                            : lesson.current
                                ? "bg-accent"
                                : "bg-white border-2 border-gray-custom-300"
                        }`}
                />
            </div>

            {/* Lesson title */}
            <span
                className={`font-medium ${lesson.current
                        ? "text-dark font-bold"
                        : lesson.completed
                            ? "text-gray-custom-600"
                            : "text-gray-custom-500"
                    }`}
            >
                {lesson.title}
            </span>
        </button>
    );
}
