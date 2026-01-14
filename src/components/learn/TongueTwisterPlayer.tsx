"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TongueTwister, tongueTwisters, getTongueTwisterById } from "@/lib/tongue-twister-data";
import { useLanguage } from "@/lib/language-context";
import { appT } from "@/lib/app-translations";

type PlayMode = "listen" | "shadow" | "practice";

interface TongueTwisterPlayerProps {
    onClose: () => void;
    initialTwisterId?: string;
}

// Speak text using Web Speech API
function speak(text: string, rate: number = 1, onEnd?: () => void): SpeechSynthesisUtterance | null {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.lang = "en-US";

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
        voices.find((v) => v.name.includes("Samantha")) ||
        voices.find((v) => v.name.includes("Google US English")) ||
        voices.find((v) => v.lang === "en-US" && v.localService);

    if (preferredVoice) utterance.voice = preferredVoice;
    if (onEnd) utterance.onend = onEnd;

    window.speechSynthesis.speak(utterance);
    return utterance;
}

export default function TongueTwisterPlayer({ onClose, initialTwisterId }: TongueTwisterPlayerProps) {
    const { language } = useLanguage();
    const [selectedTwister, setSelectedTwister] = useState<TongueTwister | null>(
        initialTwisterId ? getTongueTwisterById(initialTwisterId) || null : null
    );
    const [mode, setMode] = useState<PlayMode>("listen");
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [currentWordIndex, setCurrentWordIndex] = useState<{ line: number; word: number } | null>(null);
    const [shadowPhase, setShadowPhase] = useState<"listen" | "repeat">("listen");
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" });
                const url = URL.createObjectURL(blob);
                setAudioUrl(url);
            };

            mediaRecorder.start();
            setIsRecording(true);
            setAudioUrl(null);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Could not access microphone. Please allow permissions.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            // Stop tracks to release microphone
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const toggleRecording = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    // Get all words flat for timing
    const getAllWords = useCallback(() => {
        if (!selectedTwister) return [];
        return selectedTwister.lines.flatMap((line, lineIdx) =>
            line.words.map((word, wordIdx) => ({ ...word, lineIdx, wordIdx }))
        );
    }, [selectedTwister]);

    // Update current word based on time
    useEffect(() => {
        if (!selectedTwister || !isPlaying) return;

        const words = getAllWords();
        const adjustedTime = currentTime * speed;

        for (let i = words.length - 1; i >= 0; i--) {
            if (adjustedTime >= words[i].start) {
                setCurrentWordIndex({ line: words[i].lineIdx, word: words[i].wordIdx });
                break;
            }
        }
    }, [currentTime, selectedTwister, isPlaying, speed, getAllWords]);

    // Play function
    const play = useCallback(() => {
        if (!selectedTwister) return;

        setIsPlaying(true);
        startTimeRef.current = Date.now() - currentTime;

        // Start speech
        const fullText = selectedTwister.lines.map((l) => l.fullText).join(". ");
        speak(fullText, speed, () => {
            setIsPlaying(false);
            setCurrentTime(0);
            setCurrentWordIndex(null);

            if (mode === "shadow") {
                setShadowPhase("repeat");
                // Give user time to repeat
                setTimeout(() => setShadowPhase("listen"), 3000);
            }
        });

        // Timer for visual sync
        timerRef.current = setInterval(() => {
            const elapsed = Date.now() - startTimeRef.current;
            setCurrentTime(elapsed);

            if (elapsed >= selectedTwister.totalDuration / speed) {
                if (timerRef.current) clearInterval(timerRef.current);
            }
        }, 50);
    }, [selectedTwister, currentTime, speed, mode]);

    // Pause function
    const pause = useCallback(() => {
        setIsPlaying(false);
        window.speechSynthesis?.cancel();
        if (timerRef.current) clearInterval(timerRef.current);
    }, []);

    // Toggle play/pause
    const togglePlay = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, pause, play]);

    // Reset on twister change
    useEffect(() => {
        setCurrentTime(0);
        setCurrentWordIndex(null);
        setIsPlaying(false);
        window.speechSynthesis?.cancel();
        if (timerRef.current) clearInterval(timerRef.current);
    }, [selectedTwister]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            window.speechSynthesis?.cancel();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const difficultyColors = {
        easy: "text-green-400",
        medium: "text-yellow-400",
        hard: "text-red-400",
    };

    const difficultyStars = {
        easy: "★☆☆",
        medium: "★★☆",
        hard: "★★★",
    };

    // Twister selection view
    if (!selectedTwister) {
        return (
            <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-y-auto">
                <div className="max-w-2xl mx-auto px-6 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold text-white">🗣️ Tongue Twisters</h1>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Difficulty sections */}
                    {(["easy", "medium", "hard"] as const).map((difficulty) => (
                        <div key={difficulty} className="mb-8">
                            <h2 className={`text-lg font-semibold mb-4 ${difficultyColors[difficulty]}`}>
                                {difficultyStars[difficulty]} {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </h2>
                            <div className="space-y-3">
                                {tongueTwisters
                                    .filter((t) => t.difficulty === difficulty)
                                    .map((twister) => (
                                        <button
                                            key={twister.id}
                                            onClick={() => setSelectedTwister(twister)}
                                            className="w-full flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                                        >
                                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-2xl">
                                                🎤
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                                                    {twister.title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    Focus: {twister.focusSound}
                                                </p>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </button>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Player view
    const progress = selectedTwister ? (currentTime / (selectedTwister.totalDuration / speed)) * 100 : 0;

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
                <button
                    onClick={() => setSelectedTwister(null)}
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                </button>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center px-6">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedTwister.title}</h1>
                    <p className={`${difficultyColors[selectedTwister.difficulty]}`}>
                        {difficultyStars[selectedTwister.difficulty]} {selectedTwister.difficulty} • Focus: {selectedTwister.focusSound}
                    </p>
                </div>

                {/* Lyrics display */}
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 w-full max-w-xl mb-8">
                    <div className="space-y-4 text-center">
                        {selectedTwister.lines.map((line, lineIdx) => (
                            <p key={lineIdx} className="text-xl leading-relaxed">
                                {line.words.map((word, wordIdx) => {
                                    const isActive = currentWordIndex?.line === lineIdx && currentWordIndex?.word === wordIdx;
                                    const isPast = currentWordIndex && (
                                        lineIdx < currentWordIndex.line ||
                                        (lineIdx === currentWordIndex.line && wordIdx < currentWordIndex.word)
                                    );

                                    return (
                                        <span
                                            key={wordIdx}
                                            className={`transition-all duration-150 ${isActive
                                                ? "text-primary font-bold scale-110 inline-block"
                                                : isPast
                                                    ? "text-gray-300"
                                                    : "text-gray-500"
                                                }`}
                                        >
                                            {word.text}{" "}
                                        </span>
                                    );
                                })}
                            </p>
                        ))}
                    </div>

                    {/* Shadow mode indicator */}
                    {mode === "shadow" && shadowPhase === "repeat" && (
                        <div className="mt-6 text-center">
                            <p className="text-primary animate-pulse text-lg font-medium">
                                🎤 Your turn! Repeat now...
                            </p>
                        </div>
                    )}
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-xl mb-6">
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400 w-10">
                            {Math.floor(currentTime / 1000)}s
                        </span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary rounded-full transition-all"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>
                        <span className="text-xs text-gray-400 w-10 text-right">
                            {Math.floor((selectedTwister.totalDuration / speed) / 1000)}s
                        </span>
                    </div>
                </div>

                {/* Speed controls */}
                <div className="flex items-center gap-4 mb-8">
                    <span className="text-gray-400 text-sm">🐢</span>
                    {[0.5, 0.75, 1, 1.25, 1.5].map((s) => (
                        <button
                            key={s}
                            onClick={() => setSpeed(s)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${speed === s
                                ? "bg-primary text-white"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            {s}x
                        </button>
                    ))}
                    <span className="text-gray-400 text-sm">🐇</span>
                </div>

                {/* Play button */}
                <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg mb-8"
                >
                    {isPlaying ? (
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Mode selector */}
                <div className="flex gap-3">
                    {(["listen", "shadow", "practice"] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => setMode(m)}
                            className={`px-5 py-2.5 rounded-full font-medium transition-all ${mode === m
                                ? "bg-white text-gray-900"
                                : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                        >
                            {m === "listen" && "🎧 Listen"}
                            {m === "shadow" && "🎤 Shadow"}
                            {m === "practice" && "🔴 Practice"}
                        </button>
                    ))}
                </div>

                {/* Practice mode indicator */}
                {mode === "practice" && (
                    <div className="mt-6 text-center">
                        {!audioUrl ? (
                            <>
                                <p className="text-gray-400 text-sm mb-3">
                                    {isRecording ? "Recording... Say the tongue twister!" : "Press below to start recording"}
                                </p>
                                <button
                                    onClick={toggleRecording}
                                    className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 mx-auto ${isRecording
                                        ? "bg-red-500 text-white animate-pulse"
                                        : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                        }`}
                                >
                                    {isRecording ? (
                                        <>
                                            <span className="animate-pulse">●</span> Stop Recording
                                        </>
                                    ) : (
                                        <>
                                            🎙️ Start Recording
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col items-center gap-4">
                                <p className="text-green-400 font-medium">Recording saved!</p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            const audio = new Audio(audioUrl);
                                            audio.play();
                                        }}
                                        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium flex items-center gap-2"
                                    >
                                        ▶️ Play My Recording
                                    </button>
                                    <button
                                        onClick={() => setAudioUrl(null)}
                                        className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white font-medium"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
