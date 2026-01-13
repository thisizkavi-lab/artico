"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { getLevelById, getModuleById } from "@/lib/course-data";

import AppNavbar from "@/components/learn/AppNavbar";
import WelcomeScreen from "@/components/learn/WelcomeScreen";
import LearnHome, { saveLastProgress } from "@/components/learn/LearnHome";
import LevelPage from "@/components/learn/LevelPage";
import ModulePage from "@/components/learn/ModulePage";
import LessonViewer from "@/components/learn/LessonViewer";

type LearnStep = "welcome" | "home" | "level-page" | "module-page" | "lesson";

function LearnContent() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [step, setStep] = useState<LearnStep>("welcome");
    const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);

        // Check if user has seen welcome before
        const hasSeenWelcome = localStorage.getItem("artico-seen-welcome");

        if (hasSeenWelcome) {
            setStep("home");
        }
    }, []);

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

    const handleWelcomeContinue = () => {
        localStorage.setItem("artico-seen-welcome", "true");
        setStep("home");
    };

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

    const handleSelectModule = (moduleId: string) => {
        setSelectedModuleId(moduleId);
        setStep("module-page");
    };

    const handleBackToHome = () => {
        setSelectedLevelId(null);
        setSelectedModuleId(null);
        setStep("home");
    };

    const handleBackToLevel = () => {
        setSelectedModuleId(null);
        setStep("level-page");
    };

    const handleSelectLesson = (lessonId: string) => {
        setSelectedLessonId(lessonId);
        setStep("lesson");
    };

    const handleCloseLesson = () => {
        setSelectedLessonId(null);
        setStep("module-page");
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
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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

            {step === "welcome" && (
                <WelcomeScreen onContinue={handleWelcomeContinue} />
            )}

            {step === "home" && (
                <LearnHome
                    onSelectLevel={handleSelectLevel}
                    onContinue={handleContinueProgress}
                />
            )}

            {step === "level-page" && selectedLevel && (
                <LevelPage
                    level={selectedLevel}
                    onSelectModule={handleSelectModule}
                    onBack={handleBackToHome}
                />
            )}

            {step === "module-page" && selectedLevel && selectedModule && (
                <ModulePage
                    module={selectedModule}
                    levelTitle={selectedLevel.title}
                    onBack={handleBackToLevel}
                    onSelectLesson={handleSelectLesson}
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

export default function LearnPage() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <LearnContent />
            </AuthProvider>
        </LanguageProvider>
    );
}
