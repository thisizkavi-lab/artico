"use client";

import { useState, useEffect, useCallback } from "react";
import {
    PracticeQuestion,
    getAlphabetsPracticeSession,
    getQuestionInstruction,
} from "@/lib/practice-data";
import { getGreetingsPracticeSession } from "@/lib/greetings-practice";

interface PracticeSessionProps {
    moduleId: string;
    onComplete: () => void;
}

// Text-to-speech helper
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
            voices.find((v) => v.lang === "en-US" && v.localService);
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }
}

export default function PracticeSession({ moduleId, onComplete }: PracticeSessionProps) {
    const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Load questions on mount
    useEffect(() => {
        if (moduleId === "alphabets") {
            setQuestions(getAlphabetsPracticeSession(10));
        } else if (moduleId === "greetings") {
            setQuestions(getGreetingsPracticeSession(10));
        }
        // Load voices
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.getVoices();
        }
    }, [moduleId]);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = useCallback((answer: string) => {
        if (showFeedback) return;

        setSelectedAnswer(answer);
        setShowFeedback(true);

        const isCorrect = answer === currentQuestion?.correctAnswer;
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
        }

        if (currentQuestion?.audioLetter) {
            setTimeout(() => {
                speak(currentQuestion.audioLetter!, 1);
            }, 500);
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(prev => prev + 1);
                setSelectedAnswer(null);
                setShowFeedback(false);
            } else {
                setIsComplete(true);
            }
        }, 1500);
    }, [currentIndex, currentQuestion, questions.length, showFeedback]);

    const playAudio = useCallback((slow: boolean = false) => {
        if (currentQuestion?.audioLetter) {
            speak(currentQuestion.audioLetter, slow ? 0.4 : 1);
        }
    }, [currentQuestion]);

    // Loading state
    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-10 h-10 border-4 border-cocoa border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // Complete state
    if (isComplete) {
        return (
            <SessionComplete
                correct={correctCount}
                total={questions.length}
                onFinish={onComplete}
            />
        );
    }

    const progress = ((currentIndex + 1) / questions.length) * 100;
    const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Title */}
            <h1 className="font-primary text-2xl font-bold text-ink text-center mb-8 underline underline-offset-4">
                Test Yourself
            </h1>

            {/* Progress */}
            <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-2 bg-pebble rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cocoa rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <span className="text-sm text-dust font-medium">
                    {currentIndex + 1}/{questions.length}
                </span>
            </div>

            {/* Instruction */}
            <p className="text-center text-ash mb-6">
                {getQuestionInstruction(currentQuestion.type)}
            </p>

            {/* Prompt Card */}
            <div className="flex justify-center mb-10">
                {currentQuestion.type === "audio-to-letter" ? (
                    // Audio prompt
                    <div className="bg-pebble px-10 py-5 rounded-full flex items-center gap-4">
                        <button
                            onClick={() => playAudio(false)}
                            className="p-3 hover:bg-linen rounded-full transition-colors"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => playAudio(true)}
                            className="p-3 hover:bg-linen rounded-full transition-colors"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    // Text prompt
                    <div className="bg-pebble px-12 py-5 rounded-full">
                        <span className={`font-bold ${currentQuestion.type === "pronunciation-to-letter"
                            ? "text-2xl text-cocoa"
                            : "text-4xl text-ink"
                            }`}>
                            {currentQuestion.prompt}
                        </span>
                    </div>
                )}
            </div>

            {/* Answer Options - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-10">
                {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedAnswer === option;
                    const isThisCorrect = option === currentQuestion.correctAnswer;

                    let optionStyle = "border-2 border-ink text-cocoa";
                    if (showFeedback) {
                        if (isThisCorrect) {
                            optionStyle = "border-2 border-cocoa bg-pebble text-cocoa";
                        } else if (isSelected && !isThisCorrect) {
                            optionStyle = "border-2 border-ash bg-linen text-ash";
                        }
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option)}
                            disabled={showFeedback}
                            className={`py-6 rounded-2xl text-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${optionStyle}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {/* Feedback Display */}
            {showFeedback && (
                <div className="flex justify-center gap-4">
                    <div className={`px-12 py-4 rounded-full text-white font-bold text-lg ${isCorrect ? "bg-cocoa" : "bg-ash"
                        }`}>
                        {isCorrect ? "Correct" : "Incorrect*"}
                    </div>
                </div>
            )}
        </div>
    );
}

// Session Complete Screen
interface SessionCompleteProps {
    correct: number;
    total: number;
    onFinish: () => void;
}

function SessionComplete({ correct, total, onFinish }: SessionCompleteProps) {
    const percentage = Math.round((correct / total) * 100);

    let message = "Great job!";
    let emoji = "🎉";
    if (percentage < 50) {
        message = "Keep practicing!";
        emoji = "💪";
    } else if (percentage < 80) {
        message = "Good progress!";
        emoji = "👍";
    }

    return (
        <div className="max-w-md mx-auto text-center py-12">
            <div className="text-6xl mb-6">{emoji}</div>
            <h2 className="text-3xl font-bold text-ink mb-4">{message}</h2>
            <p className="text-xl text-ash mb-2">
                You got <span className="font-bold text-cocoa">{correct}</span> out of <span className="font-bold">{total}</span> correct
            </p>
            <p className="text-4xl font-bold text-cocoa mb-8">{percentage}%</p>

            <button
                onClick={onFinish}
                className="px-10 py-4 bg-cocoa text-white font-bold rounded-full transition-colors shadow-lg"
            >
                Continue
            </button>
        </div>
    );
}
