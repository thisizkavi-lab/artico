"use client";

import React from "react";

interface CourseCardProps {
    title: string;
    description: string;
    progress?: number;
    badge?: string;
    image?: string;
    onClick: () => void;
    orientation?: "horizontal" | "vertical";
    unlocked?: boolean;
}

export default function CourseCard({
    title,
    description,
    progress = 0,
    badge,
    image,
    onClick,
    orientation = "vertical",
    unlocked = true,
}: CourseCardProps) {
    const isHorizontal = orientation === "horizontal";

    return (
        <button
            onClick={onClick}
            disabled={!unlocked}
            className={`group bg-white rounded-3xl border border-divider text-left transition-all duration-300 ${unlocked
                ? "hover:border-ink hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                : "cursor-not-allowed"
                } ${isHorizontal ? "flex flex-col md:flex-row min-h-[220px]" : "flex flex-col h-full"}`}
        >
            {/* Image Section */}
            <div
                className={`relative overflow-hidden ${isHorizontal
                    ? "w-full md:w-[40%] h-48 md:h-auto rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                    : "w-full h-44 rounded-t-3xl"
                    } bg-linen`}
            >
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linen">
                        <span className="text-4xl">📚</span>
                    </div>
                )}

                {badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-xs font-bold text-ink shadow-sm">
                        {badge}
                    </div>
                )}

                {/* Bottom Progress Line */}
                {unlocked && progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-pebble">
                        <div
                            className="h-full bg-cocoa transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className={`p-6 flex flex-col justify-between ${isHorizontal ? "flex-1" : ""}`}>
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-primary text-xl font-bold text-ink group-hover:text-cocoa transition-colors leading-tight">
                            {title}
                        </h3>
                        {!unlocked && (
                            <svg className="w-4 h-4 text-dust" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                            </svg>
                        )}
                    </div>
                    <p className="text-dust text-sm leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {unlocked && (
                    <div className="mt-4 flex items-center justify-between">
                        {progress > 0 ? (
                            <span className="text-xs font-bold text-cocoa px-3 py-1 bg-pebble rounded-full">
                                {progress === 100 ? "Completed" : `Resume: ${progress}%`}
                            </span>
                        ) : (
                            <span className="text-xs font-bold text-dust px-3 py-1 bg-linen rounded-full">
                                Start Learning
                            </span>
                        )}

                        <div className="w-8 h-8 rounded-full bg-linen flex items-center justify-center group-hover:bg-cocoa group-hover:text-white transition-all">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </button>
    );
}
