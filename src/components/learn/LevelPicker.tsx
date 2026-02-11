"use client";

import { levels } from "@/lib/course-data";

interface LevelPickerProps {
    onSelectLevel: (levelId: string) => void;
}

const levelIcons: Record<string, string> = {
    foundations: "🌱",
    "social-fluency": "👥",
    application: "💼",
    "apex-communicator": "⭐",
};

export default function LevelPicker({ onSelectLevel }: LevelPickerProps) {
    return (
        <div className="min-h-[calc(100vh-60px)] px-6 py-12 relative">
            <div className="relative z-10 max-w-2xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-ink mb-4">
                        pick your starting point
                    </h1>
                    <p className="text-dust text-sm max-w-md mx-auto">
                        select a starting point that best fits your current skills and future goals. Let&apos;s begin your journey.
                    </p>
                </div>

                <div className="space-y-4">
                    {levels.map((level) => (
                        <div
                            key={level.id}
                            className={`flex items-center gap-5 p-5 rounded-2xl border-2 transition-all ${level.unlocked
                                ? "bg-white border-divider hover:border-ink hover:shadow-md cursor-pointer"
                                : "bg-linen border-divider"
                                }`}
                            onClick={() => level.unlocked && onSelectLevel(level.id)}
                        >
                            {/* Icon Circle */}
                            <div
                                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${level.unlocked
                                    ? "bg-pebble"
                                    : "bg-pebble"
                                    }`}
                            >
                                {levelIcons[level.id] || level.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-ink">{level.title}</h3>
                                <p className="text-sm text-dust">{level.tagline}</p>
                            </div>

                            {/* Button */}
                            {level.unlocked ? (
                                <button
                                    className="px-5 py-2.5 bg-cocoa text-white font-bold text-sm rounded-full transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectLevel(level.id);
                                    }}
                                >
                                    start now
                                </button>
                            ) : (
                                <span className="px-5 py-2.5 bg-pebble text-ash font-bold text-sm rounded-full flex items-center gap-1.5">
                                    Unlock
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 17a2 2 0 002-2 2 2 0 00-2-2 2 2 0 00-2 2 2 2 0 002 2m6-9a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10a2 2 0 012-2h1V6a5 5 0 015-5 5 5 0 015 5v2h1m-6-5a3 3 0 00-3 3v2h6V6a3 3 0 00-3-3z" />
                                    </svg>
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
