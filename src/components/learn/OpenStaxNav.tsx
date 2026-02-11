"use client";

import { useState, useEffect, useRef } from "react";
import { Level, Module, Lesson } from "@/lib/course-data";
import { useRouter } from "next/navigation";

interface Props {
    level: Level;
    onLessonSelect?: (lessonId: string, moduleId: string) => void;
}

export default function OpenStaxNav({ level, onLessonSelect }: Props) {
    const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
    const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const lessonRefs = useRef<Map<string, HTMLElement>>(new Map());
    const router = useRouter();

    // Scroll-based highlighting using Intersection Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-lesson-id");
                        const moduleId = entry.target.getAttribute("data-module-id");
                        if (id) setActiveLessonId(id);
                        if (moduleId) setActiveModuleId(moduleId);
                    }
                });
            },
            {
                root: containerRef.current,
                rootMargin: "-40% 0px -55% 0px",
                threshold: 0,
            }
        );

        lessonRefs.current.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [level]);

    const handleLessonClick = (lessonId: string, moduleId: string) => {
        setActiveLessonId(lessonId);
        setActiveModuleId(moduleId);
        if (onLessonSelect) {
            onLessonSelect(lessonId, moduleId);
        }
    };

    return (
        <div
            ref={containerRef}
            className="h-full overflow-y-auto py-8 scroll-smooth"
            style={{ scrollBehavior: "smooth" }}
        >
            {level.modules.map((module) => (
                <div key={module.id} className="mb-8">
                    {/* Module Header */}
                    <div
                        className="relative pl-6 mb-4 transition-all duration-300"
                        style={{
                            borderLeft: `3px solid ${activeModuleId === module.id ? "#4B463E" : "#E6E3DD"}`,
                        }}
                    >
                        <h3
                            className="font-bold text-sm tracking-wider uppercase transition-colors duration-300"
                            style={{
                                color: activeModuleId === module.id ? "#4A463F" : "#ACA89F",
                            }}
                        >
                            {module.title}
                        </h3>
                    </div>

                    {/* Lessons */}
                    <div className="space-y-1">
                        {module.lessons.map((lesson, idx) => (
                            <div
                                key={lesson.id}
                                ref={(el) => {
                                    if (el) lessonRefs.current.set(lesson.id, el);
                                }}
                                data-lesson-id={lesson.id}
                                data-module-id={module.id}
                                onClick={() => handleLessonClick(lesson.id, module.id)}
                                className="relative pl-6 py-2 cursor-pointer transition-all duration-300 group"
                                style={{
                                    borderLeft: `3px solid ${activeLessonId === lesson.id ? "#4B463E" : "#E6E3DD"
                                        }`,
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className="text-xs font-mono transition-colors duration-300"
                                        style={{
                                            color: activeLessonId === lesson.id ? "#4B463E" : "#ACA89F",
                                        }}
                                    >
                                        {String(idx + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={`transition-all duration-300 text-sm ${activeLessonId === lesson.id
                                            ? "font-bold"
                                            : "font-normal group-hover:font-medium"
                                            }`}
                                        style={{
                                            color:
                                                activeLessonId === lesson.id
                                                    ? "#4B463E"
                                                    : "#4A463F",
                                        }}
                                    >
                                        {lesson.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
