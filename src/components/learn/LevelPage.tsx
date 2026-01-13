"use client";

import { Level } from "@/lib/course-data";

interface LevelPageProps {
    level: Level;
    onSelectModule: (moduleId: string) => void;
    onBack?: () => void;
}

export default function LevelPage({ level, onSelectModule, onBack }: LevelPageProps) {
    return (
        <div className="min-h-[calc(100vh-60px)] px-6 py-8 relative">
            {/* Yellow gradient blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-full blur-3xl opacity-50" />

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Back Button */}
                {onBack && (
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-custom-600 hover:text-dark transition-colors mb-6"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Back to Home
                    </button>
                )}

                {/* Level Header Card */}
                <div className="bg-gray-custom-50 rounded-3xl p-8 mb-10 flex items-center justify-between border border-gray-custom-100">
                    <div className="max-w-lg">
                        <h1 className="font-primary text-3xl font-bold text-dark mb-3">
                            {level.title}
                        </h1>
                        <p className="text-gray-custom-600 leading-relaxed">
                            {level.description}
                        </p>
                    </div>

                    {/* Illustration placeholder */}
                    <div className="hidden md:flex items-center justify-center w-32 h-32">
                        <div className="text-6xl">{level.icon}</div>
                    </div>
                </div>

                {/* Simple Module List */}
                <div className="space-y-4">
                    {level.modules.map((module, index) => (
                        <button
                            key={module.id}
                            onClick={() => onSelectModule(module.id)}
                            className="w-full flex items-center gap-5 p-6 bg-white rounded-2xl border border-gray-custom-200 hover:border-primary hover:shadow-md transition-all text-left group"
                        >
                            {/* Module Number */}
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                {index + 1}
                            </div>

                            {/* Module Info */}
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-dark mb-1">
                                    {module.title}
                                </h3>
                                <p className="text-sm text-gray-custom-500">
                                    {module.lessons.length} lessons
                                </p>
                            </div>

                            {/* Arrow */}
                            <svg
                                className="w-5 h-5 text-gray-custom-400 group-hover:text-primary transition-colors"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
