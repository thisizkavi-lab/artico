"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getLevelById, getModuleById } from "@/lib/course-data";

import AppNavbar from "@/components/learn/AppNavbar";
import LearnHome, { saveLastProgress } from "@/components/learn/LearnHome";
import LevelPage from "@/components/learn/LevelPage";
import LessonViewer from "@/components/learn/LessonViewer";

type LearnStep = "home" | "level-page" | "lesson";

export default function LearnPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<LearnStep>("home");
    const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

    // Read URL params on mount
    useEffect(() => {
        setMounted(true);

        const levelParam = searchParams.get("level");
        const moduleParam = searchParams.get("module");
        const lessonParam = searchParams.get("lesson");

        if (levelParam) {
            setSelectedLevelId(levelParam);
            if (moduleParam && lessonParam) {
                setSelectedModuleId(moduleParam);
                setSelectedLessonId(lessonParam);
                setStep("lesson");
            } else {
                setStep("level-page");
            }
        }
    }, [searchParams]);

    useEffect(() => {
        if (mounted && !isLoading && !user) {
            router.push("/");
        }
    }, [mounted, isLoading, user, router]);

    // Save progress when viewing a lesson
    useEffect(() => {
        if (selectedLevelId && selectedModuleId && selectedLessonId) {
            const level = getLevelById(selectedLevelId);
            const module = getModuleById(selectedLevelId, selectedModuleId);
            const lesson = module?.lessons.find(l => l.id === selectedLessonId);

            if (level && module && lesson) {
                saveLastProgress(
                    selectedLevelId,
                    selectedModuleId,
                    selectedLessonId,
                    lesson.title,
                    module.title,
                    level.title
                );
            }
        }
    }, [selectedLevelId, selectedModuleId, selectedLessonId]);

    const handleSelectLevel = (levelId: string) => {
        setSelectedLevelId(levelId);
        setStep("level-page");
    };

    const handleContinueProgress = (levelId: string, moduleId: string, lessonId: string) => {
        setSelectedLevelId(levelId);
        setSelectedModuleId(moduleId);
        setSelectedLessonId(lessonId);
        setStep("lesson");
    };

    // Module selection now handled within LevelPage - no separate module-page step

    const handleBackToHome = () => {
        setSelectedLevelId(null);
        setSelectedModuleId(null);
        setStep("home");
    };

    const handleCloseLesson = () => {
        setSelectedLessonId(null);
        setStep("level-page");
    };

    const handleNextLesson = () => {
        if (!selectedModule) return;
        const currentIndex = selectedModule.lessons.findIndex(l => l.id === selectedLessonId);
        if (currentIndex < selectedModule.lessons.length - 1) {
            setSelectedLessonId(selectedModule.lessons[currentIndex + 1].id);
        } else {
            handleCloseLesson();
        }
    };

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cocoa border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const selectedLevel = selectedLevelId ? getLevelById(selectedLevelId) : null;
    const selectedModule = selectedLevelId && selectedModuleId
        ? getModuleById(selectedLevelId, selectedModuleId)
        : null;
    const selectedLesson = selectedModule?.lessons.find(l => l.id === selectedLessonId);
    const currentLessonIndex = selectedModule?.lessons.findIndex(l => l.id === selectedLessonId) ?? 0;

    return (
        <div className="min-h-screen bg-white">
            {step !== "lesson" && <AppNavbar activeTab="learn" />}

            {step === "home" && (
                <LearnHome
                    onSelectLevel={handleSelectLevel}
                    onContinue={handleContinueProgress}
                />
            )}

            {step === "level-page" && selectedLevel && (
                <LevelPage
                    level={selectedLevel}
                    onSelectLesson={(lessonId, moduleId) => {
                        setSelectedModuleId(moduleId);
                        setSelectedLessonId(lessonId);
                        setStep("lesson");
                    }}
                    onBack={handleBackToHome}
                />
            )}

            {step === "lesson" && selectedModule && selectedLesson && (
                <LessonViewer
                    lesson={selectedLesson}
                    moduleName={selectedModule.title}
                    currentIndex={currentLessonIndex}
                    totalLessons={selectedModule.lessons.length}
                    onClose={handleCloseLesson}
                    onNext={currentLessonIndex < selectedModule.lessons.length - 1 ? handleNextLesson : undefined}
                />
            )}
        </div>
    );
}
