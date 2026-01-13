"use client";

import { Lesson } from "@/lib/course-data";
import { useLanguage } from "@/lib/language-context";
import { appT } from "@/lib/app-translations";
import { lessonT } from "@/lib/lesson-translations";
import LettersLesson from "./LettersLesson";
import TongueTwisterPlayer from "./TongueTwisterPlayer";
import PracticeSession from "../practice/PracticeSession";

interface LessonViewerProps {
    lesson: Lesson;
    moduleName: string;
    currentIndex: number;
    totalLessons: number;
    onClose: () => void;
    onNext?: () => void;
}

export default function LessonViewer({
    lesson,
    moduleName,
    currentIndex,
    totalLessons,
    onClose,
    onNext,
}: LessonViewerProps) {
    const { language } = useLanguage();
    const progress = ((currentIndex + 1) / totalLessons) * 100;

    // Letters lesson has its own navigation
    const isLettersLesson = lesson.id === "letters";

    const t = (key: string) => lessonT(key, language);

    return (
        <div className="fixed inset-0 z-50 bg-gray-custom-50 overflow-y-auto">
            {/* Container */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Progress Bar - hide for letters which has its own */}
                {!isLettersLesson && (
                    <div className="flex items-center justify-between gap-4 mb-8">
                        <div className="flex-1 h-3 bg-gray-custom-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-accent rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-custom-400 hover:text-dark transition-colors"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Close button for letters lesson */}
                {isLettersLesson && (
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={onClose}
                            className="text-gray-custom-400 hover:text-dark transition-colors"
                        >
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                {/* Content Area */}
                {lesson.id === "alpha-intro" && <AlphabetsIntroContent language={language} />}
                {lesson.id === "abc-rhyme" && <ABCRhymeContent language={language} />}
                {lesson.id === "letters" && <LettersLesson onComplete={onNext || onClose} />}
                {lesson.id === "sounds-intro" && <SoundsIntroContent language={language} />}
                {lesson.id === "alpha-practice" && <PracticeSession moduleId="alphabets" onComplete={onClose} />}

                {/* Tongue Twister lessons */}
                {(lesson.id === "twister-intro" || lesson.id === "basic-twisters" || lesson.id === "speed-challenge" || lesson.id === "twister-review") && (
                    <TongueTwisterPlayer onClose={onClose} />
                )}

                {/* Generic content for other lessons */}
                {!["alpha-intro", "abc-rhyme", "letters", "sounds-intro", "alpha-practice", "twister-intro", "basic-twisters", "speed-challenge", "twister-review"].includes(lesson.id) && (
                    <div className="text-center text-gray-custom-500">
                        <h1 className="font-primary text-3xl font-bold text-dark text-center mb-10">
                            {moduleName}
                        </h1>
                        <p className="text-lg mb-4">Lesson: {lesson.title}</p>
                        <p>Content coming soon...</p>
                    </div>
                )}

                {/* Navigation */}
                {onNext && (
                    <div className="flex justify-center mt-12">
                        <button
                            onClick={onNext}
                            className="px-10 py-4 bg-accent text-dark font-bold rounded-full hover:bg-accent-hover transition-colors shadow-lg"
                        >
                            {t("common.continueButton")}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function AlphabetsIntroContent({ language }: { language: string }) {
    const t = (key: string) => lessonT(key, language);
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const lowercase = "abcdefghijklmnopqrstuvwxyz".split("");

    return (
        <>
            <h1 className="font-primary text-3xl font-bold text-dark text-center mb-10">
                {t("alphabetsIntro.title")}
            </h1>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
                {/* Left - Introduction Text */}
                <div className="space-y-6 text-center lg:text-left">
                    <div>
                        <h2 className="font-bold text-xl text-dark mb-3">
                            {t("alphabetsIntro.welcomeTitle")}
                        </h2>
                        <p className="text-gray-custom-600 leading-relaxed">
                            {t("alphabetsIntro.welcomeText")}
                        </p>
                    </div>

                    <p className="text-gray-custom-600 leading-relaxed">
                        {t("alphabetsIntro.historyText")}
                    </p>

                    <p className="text-gray-custom-600 leading-relaxed">
                        {t("alphabetsIntro.bricksText")}
                    </p>

                    <div>
                        <p className="text-gray-custom-600 leading-relaxed mb-3">
                            {t("alphabetsIntro.todayText")}
                        </p>
                        <p className="font-bold text-dark text-lg">
                            {t("alphabetsIntro.letsBegin")}
                        </p>
                    </div>
                </div>

                {/* Right - Letter Cards */}
                <div className="bg-white rounded-3xl p-8 border border-gray-custom-200 shadow-sm">
                    {/* Uppercase */}
                    <div className="mb-8">
                        <h3 className="font-bold text-lg text-dark mb-4">
                            {t("alphabetsIntro.uppercase")}
                        </h3>
                        <div className="grid grid-cols-7 gap-3">
                            {uppercase.map((letter) => (
                                <span
                                    key={`upper-${letter}`}
                                    className="text-center text-lg font-medium text-dark"
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Lowercase */}
                    <div>
                        <h3 className="font-bold text-lg text-dark mb-4">
                            {t("alphabetsIntro.lowercase")}
                        </h3>
                        <div className="grid grid-cols-7 gap-3">
                            {lowercase.map((letter) => (
                                <span
                                    key={`lower-${letter}`}
                                    className="text-center text-lg font-medium text-dark"
                                >
                                    {letter}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function ABCRhymeContent({ language }: { language: string }) {
    const t = (key: string) => lessonT(key, language);

    return (
        <>
            {/* Stage Header */}
            <div className="text-center mb-10">
                <h1 className="font-primary text-2xl font-bold text-dark mb-2">
                    {t("abcRhyme.stageTitle")}
                </h1>
                <p className="text-gray-custom-600">
                    {t("abcRhyme.stageSubtitle")}
                </p>
            </div>

            {/* Video + Steps Grid */}
            <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
                {/* Left - YouTube Video */}
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-dark">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/MgmIHtp-ZQM"
                        title="The Alphabet Song"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Right - Step-by-Step Guide */}
                <div className="space-y-8">
                    {/* Step 1 */}
                    <div>
                        <h3 className="font-bold text-lg text-dark mb-2">
                            {t("abcRhyme.step1Title")}
                        </h3>
                        <p className="text-gray-custom-600 leading-relaxed whitespace-pre-line">
                            {t("abcRhyme.step1Text")}
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div>
                        <h3 className="font-bold text-lg text-dark mb-2">
                            {t("abcRhyme.step2Title")}
                        </h3>
                        <p className="text-gray-custom-600 leading-relaxed whitespace-pre-line">
                            {t("abcRhyme.step2Text")}
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div>
                        <h3 className="font-bold text-lg text-dark mb-2">
                            {t("abcRhyme.step3Title")}
                        </h3>
                        <p className="text-gray-custom-600 leading-relaxed whitespace-pre-line">
                            {t("abcRhyme.step3Text")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Transition Text */}
            <div className="bg-white rounded-2xl p-6 border border-gray-custom-200 space-y-4">
                <p className="text-gray-custom-600 leading-relaxed">
                    <span className="text-accent font-bold">{t("abcRhyme.transitionNote")}</span>
                </p>
                <p className="text-gray-custom-600 leading-relaxed">
                    {t("abcRhyme.transitionText1")}
                </p>
                <p className="text-gray-custom-600 leading-relaxed">
                    {t("abcRhyme.transitionText2")}
                </p>
                <p className="text-gray-custom-600 leading-relaxed">
                    <span className="text-red-500">{t("abcRhyme.transitionHighlight")}</span>
                </p>
            </div>
        </>
    );
}

function SoundsIntroContent({ language }: { language: string }) {
    const t = (key: string) => lessonT(key, language);

    return (
        <>
            {/* Title */}
            <h1 className="font-primary text-2xl font-bold text-dark text-center mb-4 underline underline-offset-4">
                {t("soundsIntro.title")}
            </h1>

            {/* Intro text */}
            <p className="text-center text-gray-custom-600 mb-10 max-w-3xl mx-auto">
                {t("soundsIntro.introText")}
            </p>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
                {/* Left - Table and link */}
                <div className="space-y-6">
                    {/* Comparison Table */}
                    <div className="bg-white rounded-2xl border border-gray-custom-200 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-custom-200">
                                    <th className="px-6 py-4 text-left font-semibold text-dark">{t("soundsIntro.systemLabel")}</th>
                                    <th className="px-6 py-4 text-left font-semibold text-dark">{t("soundsIntro.representsLabel")}</th>
                                    <th className="px-6 py-4 text-left font-semibold text-dark">{t("soundsIntro.exampleLabel")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-custom-100">
                                    <td className="px-6 py-4 text-gray-custom-600">{t("soundsIntro.alphabetRow")}</td>
                                    <td className="px-6 py-4 text-gray-custom-600">{t("soundsIntro.lettersLabel")}</td>
                                    <td className="px-6 py-4 text-gray-custom-600">"a", "b", "c"</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 text-gray-custom-600">{t("soundsIntro.ipaRow")}</td>
                                    <td className="px-6 py-4 text-gray-custom-600">{t("soundsIntro.soundsLabel")}</td>
                                    <td className="px-6 py-4 text-gray-custom-600">/æ/, /b/, /k/</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Link */}
                    <div className="text-center">
                        <a
                            href="https://www.ipachart.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-medium"
                        >
                            https://www.ipachart.com
                        </a>
                    </div>
                </div>

                {/* Right - Explanation */}
                <div className="space-y-4 text-gray-custom-600 leading-relaxed">
                    <p>
                        {t("soundsIntro.explanationP1")}
                    </p>
                    <p>
                        {t("soundsIntro.explanationP2")}
                    </p>
                    <p>
                        {t("soundsIntro.explanationP3")}
                    </p>
                </div>
            </div>

            {/* Videos Section */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Left - 44 Sounds Video */}
                <div className="space-y-4">
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-lg bg-dark">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/ETVV9Jo53CA"
                            title="44 English Sounds"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <p className="text-gray-custom-600 leading-relaxed text-sm">
                        {t("soundsIntro.video1Caption")}
                    </p>
                    <p className="text-gray-custom-600 leading-relaxed text-sm">
                        {t("soundsIntro.video1Caption2")}
                    </p>
                </div>

                {/* Right - IPA Song */}
                <div className="space-y-4">
                    <div className="aspect-[9/16] max-h-[400px] rounded-2xl overflow-hidden shadow-lg bg-dark mx-auto">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/nZ6M-gjtdXM"
                            title="IPA Pronunciation Song"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                    <p className="text-gray-custom-600 leading-relaxed text-sm text-center">
                        {t("soundsIntro.video2Caption")}
                    </p>
                </div>
            </div>
        </>
    );
}
