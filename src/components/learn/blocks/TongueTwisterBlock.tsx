"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getTongueTwisterById, TongueTwister } from "@/lib/tongue-twister-data";

interface Props {
    twisterId: string;
}

export default function TongueTwisterBlock({ twisterId }: Props) {
    const twister = getTongueTwisterById(twisterId);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [currentWordIndex, setCurrentWordIndex] = useState<{ line: number; word: number } | null>(null);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(0);

    const speak = (text: string, rate: number = 1, onEnd?: () => void) => {
        if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate;
        utterance.lang = "en-US";
        if (onEnd) utterance.onend = onEnd;
        window.speechSynthesis.speak(utterance);
    };

    const togglePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
        } else {
            if (!twister) return;
            setIsPlaying(true);
            startTimeRef.current = Date.now() - currentTime;

            const fullText = twister.lines.map(l => l.fullText).join(". ");
            speak(fullText, speed, () => {
                setIsPlaying(false);
                setCurrentTime(0);
                setCurrentWordIndex(null);
            });

            timerRef.current = setInterval(() => {
                const elapsed = Date.now() - startTimeRef.current;
                setCurrentTime(elapsed);
                if (elapsed >= twister.totalDuration / speed) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setIsPlaying(false);
                }
            }, 50);
        }
    };

    useEffect(() => {
        if (!twister || !isPlaying) return;
        const words = twister.lines.flatMap((line, lineIdx) =>
            line.words.map((word, wordIdx) => ({ ...word, lineIdx, wordIdx }))
        );
        const adjustedTime = currentTime * speed;
        for (let i = words.length - 1; i >= 0; i--) {
            if (adjustedTime >= words[i].start) {
                setCurrentWordIndex({ line: words[i].lineIdx, word: words[i].wordIdx });
                break;
            }
        }
    }, [currentTime, twister, isPlaying, speed]);

    if (!twister) return <div className="p-4 bg-pebble text-ash">Twister not found: {twisterId}</div>;

    return (
        <div className="bg-white rounded-[40px] p-10 border border-divider shadow-sm mb-12">
            <div className="flex flex-col items-center text-center">
                <div className="mb-8 p-6 bg-pebble rounded-3xl w-full max-w-2xl">
                    <div className="space-y-4">
                        {twister.lines.map((line, lineIdx) => (
                            <p key={lineIdx} className="text-2xl leading-relaxed text-dust">
                                {line.words.map((word, wordIdx) => {
                                    const isActive = currentWordIndex?.line === lineIdx && currentWordIndex?.word === wordIdx;
                                    return (
                                        <span key={wordIdx} className={`transition-all ${isActive ? "text-ink font-bold scale-110 inline-block" : ""}`}>
                                            {word.text}{" "}
                                        </span>
                                    );
                                })}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 bg-cocoa text-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-lg"
                    >
                        {isPlaying ? (
                            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                        ) : (
                            <svg className="w-10 h-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        )}
                    </button>

                    <div className="flex gap-2">
                        {[0.75, 1, 1.25].map(s => (
                            <button
                                key={s}
                                onClick={() => setSpeed(s)}
                                className={`w-12 h-12 rounded-2xl font-bold flex items-center justify-center transition-all ${speed === s ? "bg-cocoa text-white" : "bg-linen text-dust hover:bg-pebble"
                                    }`}
                            >
                                {s}x
                            </button>
                        ))}
                    </div>
                </div>

                <p className="mt-6 text-dust text-sm">
                    Focus Sound: <span className="font-bold text-ink">{twister.focusSound}</span>
                </p>
            </div>
        </div>
    );
}
