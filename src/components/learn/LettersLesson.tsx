"use client";

import { useState, useCallback, useEffect } from "react";
import { alphabetData, AlphabetLetter } from "@/lib/alphabet-data";
import { useLanguage } from "@/lib/language-context";
import { appT } from "@/lib/app-translations";

interface LettersLessonProps {
    onComplete: () => void;
}

// Text-to-speech helper with better voice
function speak(text: string, rate: number = 1) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.pitch = 1.1;
        utterance.volume = 1;
        utterance.lang = "en-US";

        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
            voices.find((v) => v.name.includes("Samantha")) ||
            voices.find((v) => v.name.includes("Google US English")) ||
            voices.find((v) => v.name.includes("Microsoft Zira")) ||
            voices.find((v) => v.name.includes("Karen")) ||
            voices.find((v) => v.lang === "en-US" && v.localService) ||
            voices.find((v) => v.lang.startsWith("en"));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        window.speechSynthesis.speak(utterance);
    }
}

export default function LettersLesson({ onComplete }: LettersLessonProps) {
    const { language } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentLetter = alphabetData[currentIndex];

    const t = (key: string) => appT(key, language);

    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }, []);

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const goToNext = () => {
        if (currentIndex < alphabetData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            onComplete();
        }
    };

    const progress = ((currentIndex + 1) / alphabetData.length) * 100;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Letter Card */}
            <div className="grid lg:grid-cols-3 gap-6 items-start mb-8">
                {/* Main Letter Display */}
                <div className="lg:col-span-2">
                    <LetterCard letter={currentLetter} language={language} />
                </div>

                {/* Good to Know Card */}
                <div className="bg-pebble rounded-2xl p-5 border border-divider relative">
                    <div className="absolute top-3 right-3">
                        <button className="text-dust hover:text-ink transition-colors text-sm">
                            ×
                        </button>
                    </div>
                    <h3 className="font-bold text-ink mb-3">{t("lesson.goodToKnow")}</h3>
                    <p className="text-sm text-ash leading-relaxed">
                        {currentLetter.trivia}
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
                <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className={`flex items-center gap-2 font-medium transition-colors ${currentIndex === 0
                        ? "text-pebble cursor-not-allowed"
                        : "text-ash hover:text-ink"
                        }`}
                >
                    {t("lesson.previous")}
                </button>

                {/* Progress Bar */}
                <div className="flex-1 mx-8 h-2 bg-pebble rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cocoa rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <button
                    onClick={goToNext}
                    className="flex items-center gap-2 font-medium text-ash hover:text-ink transition-colors"
                >
                    {currentIndex === alphabetData.length - 1 ? t("lesson.finish") : t("lesson.next")}
                </button>
            </div>

            {/* Letter dots indicator */}
            <div className="flex justify-center gap-1.5 mt-6 flex-wrap max-w-lg mx-auto">
                {alphabetData.map((l, idx) => (
                    <button
                        key={l.letter}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-7 h-7 rounded-full text-xs font-medium transition-all ${idx === currentIndex
                            ? "bg-cocoa text-white scale-110"
                            : idx < currentIndex
                                ? "bg-pebble text-ink"
                                : "bg-linen text-dust hover:bg-pebble"
                            }`}
                    >
                        {l.letter}
                    </button>
                ))}
            </div>
        </div>
    );
}

interface LetterCardProps {
    letter: AlphabetLetter;
    language: string;
}

function LetterCard({ letter, language }: LetterCardProps) {
    const t = (key: string) => appT(key, language);

    const playLetterSound = useCallback((slow: boolean = false) => {
        speak(letter.letter.toLowerCase(), slow ? 0.4 : 1.0);
    }, [letter]);

    const playExampleSound = useCallback((example: string, slow: boolean = false) => {
        speak(example, slow ? 0.4 : 1.0);
    }, []);

    return (
        <div className="space-y-6">
            {/* Large Letter Display */}
            <div className="bg-white rounded-3xl border-2 border-dashed border-pebble p-8 text-center">
                <div className="flex items-center justify-center gap-8 mb-4">
                    <span className="text-8xl font-bold text-ink">{letter.uppercase}</span>
                    <span className="text-8xl font-medium text-ink">{letter.lowercase}</span>
                </div>
                <p className="text-dust text-lg">{letter.ipa}</p>
            </div>

            {/* Pronunciation */}
            <div className="text-center">
                <p className="text-3xl font-bold text-cocoa mb-3">{letter.pronunciation}</p>
                <div className="flex justify-center gap-4">
                    <button
                        onClick={() => playLetterSound(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-linen rounded-full hover:bg-pebble transition-colors active:scale-95"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                        {t("lesson.sound")}
                    </button>
                    <button
                        onClick={() => playLetterSound(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-linen rounded-full hover:bg-pebble transition-colors active:scale-95"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
                        </svg>
                        {t("lesson.slow")}
                    </button>
                </div>
            </div>

            {/* Common Sounds */}
            <div>
                <p className="text-center text-ash mb-4">
                    {t("lesson.twoCommonSounds")} {letter.letter}:
                </p>
                <div className="space-y-3">
                    {letter.sounds.map((sound, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between bg-linen rounded-xl px-5 py-4 border border-divider"
                        >
                            <span className="text-ink">
                                {idx + 1}. {sound.name} (
                                <span className="text-cocoa font-medium">{sound.highlighted}</span>
                                {sound.example.replace(new RegExp(sound.highlighted, "i"), "")}
                                )
                            </span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => playExampleSound(sound.example, false)}
                                    className="p-2 rounded-full hover:bg-pebble transition-colors active:scale-95"
                                    title={`Play "${sound.example}"`}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => playExampleSound(sound.example, true)}
                                    className="p-2 rounded-full hover:bg-pebble transition-colors active:scale-95"
                                    title={`Play "${sound.example}" slowly`}
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
