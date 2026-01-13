// Practice data and question generation for all modules

import { alphabetData } from "./alphabet-data";

// Question types
export type QuestionType =
    | "pronunciation-to-letter"  // Show "Ay" → select A
    | "audio-to-letter"          // Hear sound → select A
    | "letter-to-pronunciation"  // Show A → select "Ay"
    | "case-matching";           // Match A → a

export interface PracticeQuestion {
    id: string;
    type: QuestionType;
    prompt: string;          // Text prompt (or empty for audio)
    correctAnswer: string;   // The correct answer
    options: string[];       // 4 options including correct answer
    audioLetter?: string;    // Letter to play audio for (if audio question)
}

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get random items from array (excluding certain values)
function getRandomItems<T>(array: T[], count: number, exclude: T[] = []): T[] {
    const filtered = array.filter(item => !exclude.includes(item));
    return shuffleArray(filtered).slice(0, count);
}

// Generate pronunciation-to-letter questions
// Show "Ay" → select A, C, D, E
function generatePronunciationToLetter(): PracticeQuestion[] {
    return alphabetData.map((letter, index) => {
        const wrongOptions = getRandomItems(
            alphabetData.map(l => l.letter),
            3,
            [letter.letter]
        );

        return {
            id: `pron-${letter.letter}-${index}`,
            type: "pronunciation-to-letter" as QuestionType,
            prompt: letter.pronunciation,
            correctAnswer: letter.letter,
            options: shuffleArray([letter.letter, ...wrongOptions]),
        };
    });
}

// Generate audio-to-letter questions
// Hear letter sound → select A, C, D, E
function generateAudioToLetter(): PracticeQuestion[] {
    return alphabetData.map((letter, index) => {
        const wrongOptions = getRandomItems(
            alphabetData.map(l => l.letter),
            3,
            [letter.letter]
        );

        return {
            id: `audio-${letter.letter}-${index}`,
            type: "audio-to-letter" as QuestionType,
            prompt: "",  // No text prompt - audio only
            correctAnswer: letter.letter,
            options: shuffleArray([letter.letter, ...wrongOptions]),
            audioLetter: letter.letter.toLowerCase(),
        };
    });
}

// Generate letter-to-pronunciation questions
// Show A → select Ay, Bee, See, Dee
function generateLetterToPronunciation(): PracticeQuestion[] {
    return alphabetData.map((letter, index) => {
        const wrongOptions = getRandomItems(
            alphabetData.map(l => l.pronunciation),
            3,
            [letter.pronunciation]
        );

        return {
            id: `letter-pron-${letter.letter}-${index}`,
            type: "letter-to-pronunciation" as QuestionType,
            prompt: letter.letter,
            correctAnswer: letter.pronunciation,
            options: shuffleArray([letter.pronunciation, ...wrongOptions]),
        };
    });
}

// Generate case matching questions
// Show A → select a from a, b, c, d
function generateCaseMatching(): PracticeQuestion[] {
    return alphabetData.map((letter, index) => {
        const wrongOptions = getRandomItems(
            alphabetData.map(l => l.lowercase),
            3,
            [letter.lowercase]
        );

        return {
            id: `case-${letter.letter}-${index}`,
            type: "case-matching" as QuestionType,
            prompt: letter.uppercase,
            correctAnswer: letter.lowercase,
            options: shuffleArray([letter.lowercase, ...wrongOptions]),
        };
    });
}

// Get a random practice session (mix of question types)
export function getAlphabetsPracticeSession(questionCount: number = 10): PracticeQuestion[] {
    // Generate all question types
    const allQuestions: PracticeQuestion[] = [
        ...generatePronunciationToLetter(),
        ...generateAudioToLetter(),
        ...generateLetterToPronunciation(),
        ...generateCaseMatching(),
    ];

    // Shuffle and take requested count
    return shuffleArray(allQuestions).slice(0, questionCount);
}

// Get instruction text for each question type
export function getQuestionInstruction(type: QuestionType): string {
    switch (type) {
        case "pronunciation-to-letter":
            return "Select the alphabet that matches the pronunciation";
        case "audio-to-letter":
            return "Select the letter you hear";
        case "letter-to-pronunciation":
            return "Select the correct pronunciation";
        case "case-matching":
            return "Select the lowercase letter that matches";
        default:
            return "Select the correct answer";
    }
}
