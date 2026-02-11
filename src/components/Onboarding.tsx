"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, Check } from "lucide-react";

interface Step {
    title: string;
    description: string;
    highlight?: string;
    bgColor: string;
}

const steps: Step[] = [
    {
        title: "Learning as Flow",
        description: "Real learning needs effort. but effort shouldn't feel like pain — it should feel like flow. if something's too easy, you don't grow. if it's too hard, you quit.",
        highlight: "this app sits in that perfect middle — where you're challenged, but never lost. you grow without noticing you're grinding.",
        bgColor: "bg-white",
    },
    {
        title: "English is a Skill",
        description: "English here isn't taught like a subject. it's trained like a skill — like an athlete sharpening control, or an artist refining craft.",
        highlight: "you build the mechanics first — sound, rhythm, movement — then you perform. you don't memorize rules; you train expression.",
        bgColor: "bg-linen",
    },
    {
        title: "The Universal Interface",
        description: "beyond all that, communication is the core of everything. it's how you think, connect, and lead. English just happens to be the universal interface — the key that opens almost every door in today's world.",
        highlight: "this app doesn't just teach you English. it shapes how you speak, think, and carry yourself — so that when you talk, people feel it.",
        bgColor: "bg-white",
    },
    {
        title: "Your Progression",
        description: "you start from scratch — from the raw mechanics of English. sounds, letters, tongue movement, rhythm — the basics most people skip, but the real foundation of fluency. from there, you move into social fluency, where English actually lives in conversation.",
        highlight: "once you're comfortable speaking, you step into the application layer — English becomes a tool for job interviews, public speaking, and art.",
        bgColor: "bg-linen",
    },
    {
        title: "The Apex Communicator",
        description: "language stops being something you \"use\" and becomes part of your being. english turns into your medium of thought, art, and connection.",
        highlight: "it's not a course. it's a journey from noise to clarity, from learning English to becoming someone who can speak truth with it.",
        bgColor: "bg-white",
    },
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            onComplete();
        }
    };

    return (
        <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${steps[currentStep].bgColor} transition-colors duration-700`}>
            <div className="max-w-4xl w-full px-8 flex flex-col items-center text-center">

                {/* Progress Bar */}
                <div className="fixed top-12 left-0 right-0 px-12 z-[101]">
                    <div className="max-w-4xl mx-auto flex gap-2">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= currentStep ? "bg-ink" : "bg-pebble"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, y: 30, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 1.02 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 120,
                            duration: 0.6
                        }}
                        className="flex flex-col items-center"
                    >
                        {currentStep === steps.length - 1 ? (
                            <div className="relative mb-12 w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-lg">
                                <img
                                    src="/onboarding-hero.png"
                                    alt="The Journey"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="mb-12 h-20 w-20 rounded-full bg-pebble flex items-center justify-center text-ink font-primary font-bold text-2xl">
                                {currentStep + 1}
                            </div>
                        )}

                        <h2 className="text-4xl md:text-5xl font-primary font-extrabold text-ink mb-8 tracking-tight">
                            {steps[currentStep].title}
                        </h2>

                        <p className="text-xl md:text-2xl text-ash leading-relaxed mb-8 max-w-2xl font-medium">
                            {steps[currentStep].description}
                        </p>

                        {steps[currentStep].highlight && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-lg md:text-xl text-dust italic leading-tight max-w-xl font-light"
                            >
                                &quot;{steps[currentStep].highlight}&quot;
                            </motion.p>
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="fixed bottom-16 flex flex-col items-center">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        className="bg-cocoa text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-lg transition-all duration-300 group"
                    >
                        {currentStep === steps.length - 1 ? (
                            <>
                                Let&apos;s Begin <Check className="w-5 h-5" />
                            </>
                        ) : (
                            <>
                                Continue <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>

                    <button
                        onClick={onComplete}
                        className="mt-6 text-sm text-dust hover:text-ink transition-colors font-medium tracking-wide"
                    >
                        SKIP INTRODUCTION
                    </button>
                </div>
            </div>
        </div>
    );
}
