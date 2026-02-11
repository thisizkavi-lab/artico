"use client";

import { useState } from "react";

import { LessonBlock } from "@/lib/foundation-data";
import { lessonT } from "@/lib/lesson-translations";
import { useLanguage } from "@/lib/language-context";
import TongueTwisterBlock from "./blocks/TongueTwisterBlock";

interface Props {
    block: LessonBlock;
}

export default function LessonBlockRenderer({ block }: Props) {
    const { language } = useLanguage();
    const t = (key: string) => lessonT(key, language);

    switch (block.type) {
        case "hero":
            return (
                <div className="text-center mb-16 py-12 bg-linen rounded-[40px] px-8 border border-divider">
                    <h1 className="font-primary text-4xl md:text-5xl font-bold text-ink mb-6 tracking-tight">
                        {block.title}
                    </h1>
                    {block.content && (
                        <p className="text-dust max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                            {block.content}
                        </p>
                    )}
                </div>
            );

        case "instruction":
            return (
                <div className="mb-12 max-w-3xl mx-auto">
                    {block.title && (
                        <h2 className="text-2xl font-bold text-ink mb-4">{block.title}</h2>
                    )}
                    <div className="text-ash space-y-4 leading-relaxed text-lg">
                        {block.content}
                    </div>
                </div>
            );

        case "callout":
            const isExpertise = block.variant === "expertise";
            return (
                <div className={`my-12 p-8 rounded-3xl border ${isExpertise
                    ? "bg-pebble border-divider"
                    : "bg-pebble border-divider"
                    }`}>
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0 ${isExpertise ? "bg-cocoa text-white" : "bg-cocoa text-white"
                            }`}>
                            {isExpertise ? "🎓" : "💡"}
                        </div>
                        <div>
                            <h4 className={`font-bold mb-2 text-ink`}>
                                {block.title || (isExpertise ? "Expertise" : "Pro Tip")}
                            </h4>
                            <p className="text-ash leading-relaxed">
                                {block.content}
                            </p>
                        </div>
                    </div>
                </div>
            );

        case "video":
            return (
                <div className="mb-16 space-y-6">
                    {block.title && <h3 className="text-2xl font-bold text-ink text-center">{block.title}</h3>}
                    <div className="aspect-video rounded-3xl overflow-hidden shadow-lg bg-ink border border-divider mx-auto max-w-4xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${block.data?.videoId}`}
                            title={block.title || "Video"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    {block.content && (
                        <p className="text-center text-dust max-w-2xl mx-auto text-sm italic">
                            {block.content}
                        </p>
                    )}
                </div>
            );

        case "interactive":
            if (block.data?.type === "alphabet-grid") {
                return (
                    <div className="bg-white rounded-[40px] p-10 border border-divider shadow-sm mb-12">
                        <div className="grid md:grid-cols-2 gap-12">
                            <div>
                                <h3 className="font-bold text-xl mb-6 text-ink flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-pebble flex items-center justify-center text-sm">A</span>
                                    Uppercase
                                </h3>
                                <div className="grid grid-cols-7 gap-3">
                                    {block.data.uppercase.map((l: string) => (
                                        <div key={l} className="aspect-square flex items-center justify-center bg-linen rounded-lg text-lg font-bold text-ink hover:bg-pebble transition-colors cursor-default">
                                            {l}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-xl mb-6 text-ink flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-pebble flex items-center justify-center text-sm">a</span>
                                    Lowercase
                                </h3>
                                <div className="grid grid-cols-7 gap-3">
                                    {block.data.lowercase.map((l: string) => (
                                        <div key={l} className="aspect-square flex items-center justify-center bg-linen rounded-lg text-lg font-medium text-ink hover:bg-pebble transition-colors cursor-default">
                                            {l}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
            if (block.data?.type === "tongue-twister") {
                return <TongueTwisterBlock twisterId={block.data.twisterId} />;
            }

            if (block.data?.type === "flashcards") {
                return (
                    <div className="mb-12">
                        {block.title && <h3 className="text-2xl font-bold mb-6 text-center">{block.title}</h3>}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {block.data.cards.map((card: any, idx: number) => (
                                <Flashcard key={idx} front={card.front} back={card.back} />
                            ))}
                        </div>
                    </div>
                );
            }

            if (block.data?.type === "quiz") {
                return <QuizBlock data={block.data} />;
            }
            return <div className="p-4 bg-pebble text-ash rounded-xl">Unknown interactive block: {block.data?.type}</div>;

        default:
            return <div>Unsupported block type</div>;
    }
}

function Flashcard({ front, back }: { front: string, back: string }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            onClick={() => setFlipped(!flipped)}
            className="group h-48 perspective cursor-pointer"
        >
            <div className={`relative w-full h-full duration-500 preserve-3d transition-transform ${flipped ? 'rotate-y-180' : ''}`}>
                <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border-2 border-divider flex items-center justify-center p-6 text-center shadow-sm group-hover:shadow-md transition-shadow">
                    <p className="font-bold text-lg text-ink">{front}</p>
                    <p className="absolute bottom-4 text-xs text-dust font-medium tracking-wider uppercase">Tap to flip</p>
                </div>
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-cocoa text-white rounded-2xl flex items-center justify-center p-6 text-center shadow-lg">
                    <p className="font-bold text-lg">{back}</p>
                </div>
            </div>
        </div>
    );
}

function QuizBlock({ data }: { data: any }) {
    const [selected, setSelected] = useState<number | null>(null);
    const isCorrect = selected === data.correct;

    return (
        <div className="bg-white rounded-[32px] p-8 border border-divider mb-12 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <span className="bg-pebble text-ink p-2 rounded-lg text-xl">❓</span>
                <span className="font-bold text-dust text-xs tracking-widest uppercase">Quick Quiz</span>
            </div>
            <h3 className="text-xl font-bold text-ink mb-6">{data.question}</h3>
            <div className="space-y-3">
                {data.options.map((opt: string, idx: number) => (
                    <button
                        key={idx}
                        onClick={() => setSelected(idx)}
                        disabled={selected !== null}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center
                            ${selected === null ? 'border-divider hover:border-pebble hover:bg-linen' : ''}
                            ${selected === idx && idx === data.correct ? 'border-cocoa bg-pebble text-ink' : ''}
                            ${selected === idx && idx !== data.correct ? 'border-ash bg-linen text-ash' : ''}
                            ${selected !== null && idx === data.correct ? 'border-cocoa bg-pebble text-ink' : ''}
                        `}
                    >
                        <span>{opt}</span>
                        {selected !== null && idx === data.correct && <span>✅</span>}
                        {selected === idx && idx !== data.correct && <span>❌</span>}
                    </button>
                ))}
            </div>
            {selected !== null && (
                <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-pebble text-ink' : 'bg-linen text-ash'}`}>
                    <p className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Not quite.'}</p>
                    <p className="text-sm">{data.explanation}</p>
                </div>
            )}
        </div>
    );
}
