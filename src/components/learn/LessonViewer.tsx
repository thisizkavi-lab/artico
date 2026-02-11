"use client";

import { Lesson } from "@/lib/course-data";
import { useLanguage } from "@/lib/language-context";
import { appT } from "@/lib/app-translations";
import { lessonT } from "@/lib/lesson-translations";
import LettersLesson from "./LettersLesson";
import OnboardingLesson from "./OnboardingLesson";
import PracticeSession from "../practice/PracticeSession";
import LessonBlockRenderer from "./LessonBlockRenderer";
import { foundationData } from "@/lib/foundation-data";
import { greetingsLesson } from "@/lib/greetings-content";
import { useState } from "react";

interface LessonViewerProps {
    lesson: Lesson;
    moduleName: string;
    currentIndex: number;
    totalLessons: number;
    onClose: () => void;
    onNext?: () => void;
}

export default function LessonViewer({
    lesson,
    moduleName,
    currentIndex,
    totalLessons,
    onClose,
    onNext,
}: LessonViewerProps) {
    const { language } = useLanguage();
    const [isCompleted, setIsCompleted] = useState(false);
    const progress = ((currentIndex + 1) / totalLessons) * 100;

    // Check if we have block-based content for this lesson
    const lessonContent = foundationData[lesson.id];
    const isLettersLesson = lesson.id === "letters";
    const isGreetingsLesson = lesson.id === "sf-01";
    const isGreetingsPractice = lesson.id === "sf-01-practice";

    const t = (key: string) => lessonT(key, language);

    const handleNext = () => {
        if (onNext) {
            onNext();
        } else {
            setIsCompleted(true);
        }
    };

    const handleRetake = () => {
        setIsCompleted(false);
    };

    if (isCompleted) {
        return (
            <div className="fixed inset-0 z-50 bg-white flex items-center justify-center font-sans overflow-y-auto">
                <div className="max-w-xl w-full px-6 py-20 text-center">
                    <div className="w-32 h-32 bg-pebble text-ink rounded-full flex items-center justify-center mx-auto mb-8 text-6xl shadow-inner animate-in zoom-in duration-500">
                        ✓
                    </div>
                    <h1 className="text-4xl font-bold text-ink mb-4">Module Completed!</h1>
                    <p className="text-dust text-lg mb-12 leading-relaxed">
                        Fantastic work! You've successfully finished <span className="text-ink font-bold font-primary">{moduleName}</span>.
                        Your progress is marked as complete.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={onClose}
                            className="px-12 py-5 bg-cocoa text-white font-bold rounded-2xl hover:shadow-lg transition-all text-lg"
                        >
                            Return to Syllabus
                        </button>
                        <button
                            onClick={handleRetake}
                            className="px-8 py-5 bg-linen text-ash font-bold rounded-2xl hover:bg-pebble transition-all text-lg"
                        >
                            Retake Module
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto font-sans">
            {/* Top Navigation Bar */}
            <div className="sticky top-0 z-50 bg-white border-b border-divider">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
                    {/* Progress */}
                    <div className="flex-1 flex items-center gap-4">
                        <div className="flex-1 h-2 bg-pebble rounded-full overflow-hidden">
                            <div
                                className="h-full bg-cocoa rounded-full transition-all duration-700"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs font-bold text-dust tabular-nums">
                            {currentIndex + 1} / {totalLessons}
                        </span>
                    </div>

                    {/* Module Title */}
                    <div className="hidden md:block text-center">
                        <p className="text-[10px] uppercase tracking-widest text-dust font-bold mb-0.5">
                            {moduleName}
                        </p>
                        <p className="text-sm font-bold text-ink">
                            {lesson.title}
                        </p>
                    </div>

                    {/* Exit */}
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full hover:bg-linen flex items-center justify-center text-dust hover:text-ink transition-all"
                    >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Onboarding-style lessons take over full screen */}
            {isGreetingsLesson && (
                <OnboardingLesson
                    lessonData={greetingsLesson}
                    onComplete={onClose}
                    onPractice={() => {
                        // Trigger the practice lesson
                        if (onNext) onNext();
                        else onClose();
                    }}
                />
            )}

            {isGreetingsPractice && (
                <div className="fixed inset-0 z-50 bg-white overflow-y-auto font-sans">
                    <PracticeSession moduleId="greetings" onComplete={onClose} />
                </div>
            )}

            {/* Content Area — only show for non-onboarding lessons */}
            {!isGreetingsLesson && !isGreetingsPractice && (
                <div className="max-w-5xl mx-auto px-6 py-16">
                    {/* Block Renderer (Modern) */}
                    {lessonContent ? (
                        <div className="space-y-4">
                            {lessonContent.blocks.map((block, idx) => (
                                <LessonBlockRenderer key={idx} block={block} />
                            ))}
                        </div>
                    ) : (
                        /* Legacy / Specialized Handlers */
                        <>
                            {lesson.id === "letters" && <LettersLesson onComplete={handleNext} />}
                            {lesson.id === "alpha-practice" && <PracticeSession moduleId="alphabets" onComplete={onClose} />}

                            {/* Fallback */}
                            {!lessonContent && !["letters", "alpha-practice"].includes(lesson.id) && (
                                <div className="py-20 text-center">
                                    <div className="w-20 h-20 bg-linen rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl">
                                        🚧
                                    </div>
                                    <h1 className="text-3xl font-bold text-ink mb-4">
                                        Content in Construction
                                    </h1>
                                    <p className="text-dust max-w-md mx-auto">
                                        We are perfecting this lesson to meet the highest educational standards.
                                        Check back soon!
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Footer Navigation */}
                    {!isLettersLesson && (
                        <div className="flex justify-center mt-20 pt-10 border-t border-divider">
                            <div className="text-center">
                                <p className="text-sm text-dust mb-6 font-medium">Ready for the next step?</p>
                                <button
                                    onClick={handleNext}
                                    className="px-16 py-5 bg-cocoa text-white font-bold rounded-2xl hover:shadow-lg transition-all text-lg group"
                                >
                                    <div className="flex items-center gap-3">
                                        <span>{t("common.continueButton")}</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
