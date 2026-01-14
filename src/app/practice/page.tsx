"use client";

import { useState } from "react";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from "@/lib/auth-context";
import AppNavbar from "@/components/learn/AppNavbar";
import { levels } from "@/lib/course-data";
import PracticeSession from "@/components/practice/PracticeSession";
import TongueTwisterPlayer from "@/components/learn/TongueTwisterPlayer";

type PracticeStep = "level-picker" | "module-picker" | "practice";

function PracticeContent() {
    const [step, setStep] = useState<PracticeStep>("level-picker");
    const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
    const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

    const selectedLevel = levels.find(l => l.id === selectedLevelId);
    const selectedModule = selectedLevel?.modules.find(m => m.id === selectedModuleId);

    const handleSelectLevel = (levelId: string) => {
        setSelectedLevelId(levelId);
        setStep("module-picker");
    };

    const handleSelectModule = (moduleId: string) => {
        setSelectedModuleId(moduleId);
        setStep("practice");
    };

    const handleBack = () => {
        if (step === "practice") {
            setStep("module-picker");
            setSelectedModuleId(null);
        } else if (step === "module-picker") {
            setStep("level-picker");
            setSelectedLevelId(null);
        }
    };

    const handleComplete = () => {
        setStep("module-picker");
        setSelectedModuleId(null);
    };

    const unlockedLevels = levels.filter(l => l.unlocked);

    return (
        <div className="min-h-screen bg-white">
            {step !== "practice" && <AppNavbar activeTab="practice" />}

            {/* Level Picker */}
            {step === "level-picker" && (
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <h1 className="font-primary text-3xl font-bold text-dark text-center mb-4">
                        Practice
                    </h1>
                    <p className="text-center text-gray-custom-600 mb-10">
                        Choose a level to practice
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {unlockedLevels.map((level) => (
                            <button
                                key={level.id}
                                onClick={() => handleSelectLevel(level.id)}
                                className="p-6 bg-white rounded-2xl border border-gray-custom-200 hover:border-primary hover:shadow-lg transition-all text-left group"
                            >
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-4xl">{level.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-dark group-hover:text-primary transition-colors">
                                            {level.title}
                                        </h3>
                                        <p className="text-sm text-gray-custom-500">
                                            {level.modules.filter(m => m.unlocked).length} modules available
                                        </p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Module Picker */}
            {step === "module-picker" && selectedLevel && (
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-custom-600 hover:text-dark transition-colors mb-8"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Back to levels
                    </button>

                    <h1 className="font-primary text-3xl font-bold text-dark text-center mb-4">
                        {selectedLevel.title}
                    </h1>
                    <p className="text-center text-gray-custom-600 mb-10">
                        Choose a module to practice
                    </p>

                    <div className="space-y-4">
                        {selectedLevel.modules.filter(m => m.unlocked).map((module, index) => (
                            <button
                                key={module.id}
                                onClick={() => handleSelectModule(module.id)}
                                className="w-full flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-custom-200 hover:border-primary hover:shadow-md transition-all text-left group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg text-dark mb-1">
                                        {module.title}
                                    </h3>
                                    <p className="text-sm text-gray-custom-500">
                                        {module.description}
                                    </p>
                                </div>
                                <svg className="w-5 h-5 text-gray-custom-400 group-hover:text-primary transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 18l6-6-6-6" />
                                </svg>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Practice Session */}
            {step === "practice" && selectedModule && (
                selectedModule.id === "tongue-twisters" ? (
                    <TongueTwisterPlayer onClose={handleBack} />
                ) : (
                    <div className="min-h-screen bg-gray-custom-50">
                        <div className="bg-white border-b border-gray-custom-200 px-6 py-4">
                            <div className="max-w-4xl mx-auto flex items-center justify-between">
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-2 text-gray-custom-600 hover:text-dark transition-colors"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M15 18l-6-6 6-6" />
                                    </svg>
                                    Back
                                </button>
                                <h2 className="font-bold text-dark">
                                    Practice: {selectedModule.title}
                                </h2>
                                <div className="w-16" />
                            </div>
                        </div>

                        <div className="max-w-4xl mx-auto px-6 py-12">
                            <PracticeSession
                                moduleId={selectedModule.id}
                                onComplete={handleComplete}
                            />
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default function PracticePage() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <PracticeContent />
            </AuthProvider>
        </LanguageProvider>
    );
}
