// Greetings practice questions for non-native speakers
// These test understanding of greeting patterns, formality, and appropriate usage

import { PracticeQuestion } from "./practice-data";

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// All greetings practice questions
const allGreetingsQuestions: PracticeQuestion[] = [
    // Scenario → Best response
    {
        id: "greet-scenario-1",
        type: "pronunciation-to-letter",
        prompt: "You meet your teacher for the first time. What do you say?",
        correctAnswer: "Hello, I'm [name]. Nice to meet you.",
        options: shuffleArray([
            "Hello, I'm [name]. Nice to meet you.",
            "Hey, what's up?",
            "Sup!",
            "Alright?",
        ]),
    },
    {
        id: "greet-scenario-2",
        type: "pronunciation-to-letter",
        prompt: "You see your friend at a casual party. What's the best opening?",
        correctAnswer: "Hey, how's it going?",
        options: shuffleArray([
            "Hey, how's it going?",
            "How do you do?",
            "Good morning, everyone.",
            "It's a pleasure to meet you.",
        ]),
    },
    {
        id: "greet-scenario-3",
        type: "pronunciation-to-letter",
        prompt: "You are starting a presentation at work. What do you say first?",
        correctAnswer: "Good morning, everyone. I'm [name].",
        options: shuffleArray([
            "Good morning, everyone. I'm [name].",
            "Hey there, what's going on?",
            "Hiya!",
            "Long time no see!",
        ]),
    },
    // Pattern matching
    {
        id: "greet-pattern-1",
        type: "pronunciation-to-letter",
        prompt: "Which pattern is best for a job interview?",
        correctAnswer: "Pattern 2 — Professional / one person",
        options: shuffleArray([
            "Pattern 2 — Professional / one person",
            "Pattern 1 — Social / informal",
            "Pattern 3 — Professional / group",
            "No pattern needed",
        ]),
    },
    {
        id: "greet-pattern-2",
        type: "pronunciation-to-letter",
        prompt: "You're meeting a friend's friend at a barbecue. Which pattern fits?",
        correctAnswer: "Pattern 1 — Social / informal",
        options: shuffleArray([
            "Pattern 1 — Social / informal",
            "Pattern 2 — Professional / one person",
            "Pattern 3 — Professional / group",
            "No pattern needed",
        ]),
    },
    // Classify the greeting
    {
        id: "greet-classify-1",
        type: "pronunciation-to-letter",
        prompt: "Is \"Hiya\" casual, formal, or neutral?",
        correctAnswer: "Casual",
        options: shuffleArray(["Casual", "Formal", "Neutral", "Professional"]),
    },
    {
        id: "greet-classify-2",
        type: "pronunciation-to-letter",
        prompt: "Is \"How do you do?\" casual, formal, or neutral?",
        correctAnswer: "Formal / old-fashioned",
        options: shuffleArray(["Formal / old-fashioned", "Casual", "Neutral", "Slang"]),
    },
    {
        id: "greet-classify-3",
        type: "pronunciation-to-letter",
        prompt: "Is \"Hello\" casual, formal, or neutral?",
        correctAnswer: "Neutral — works everywhere",
        options: shuffleArray(["Neutral — works everywhere", "Very casual", "Very formal", "Slang"]),
    },
    // Complete the dialogue
    {
        id: "greet-complete-1",
        type: "pronunciation-to-letter",
        prompt: "A: \"Hey, how's it going?\"\nB: \"Good. ___\"\nWhat comes next?",
        correctAnswer: "You?",
        options: shuffleArray(["You?", "Goodbye.", "How do you do?", "Nice to meet you."]),
    },
    {
        id: "greet-complete-2",
        type: "pronunciation-to-letter",
        prompt: "A: \"Hello, I'm John Smith. Nice to meet you.\"\nB: \"___\"",
        correctAnswer: "Nice to meet you. I'm Karen Lee.",
        options: shuffleArray([
            "Nice to meet you. I'm Karen Lee.",
            "Sup!",
            "What's going on?",
            "Long time no see!",
        ]),
    },
    // What's the real function?
    {
        id: "greet-function-1",
        type: "pronunciation-to-letter",
        prompt: "What is the real function of a greeting?",
        correctAnswer: "To make the other person feel safe and open to talk",
        options: shuffleArray([
            "To make the other person feel safe and open to talk",
            "To share your name as quickly as possible",
            "To show how fluent you are",
            "To ask for information",
        ]),
    },
    // Recognition
    {
        id: "greet-recognize-1",
        type: "pronunciation-to-letter",
        prompt: "Someone says \"Long time no see!\" — what does this mean?",
        correctAnswer: "They recognize you and haven't seen you in a while",
        options: shuffleArray([
            "They recognize you and haven't seen you in a while",
            "They are meeting you for the first time",
            "They are saying goodbye",
            "They are asking how you are",
        ]),
    },
    {
        id: "greet-recognize-2",
        type: "pronunciation-to-letter",
        prompt: "Which is an appropriate farewell for a beginner?",
        correctAnswer: "See you later!",
        options: shuffleArray([
            "See you later!",
            "How's it going?",
            "Nice to meet you.",
            "What's up?",
        ]),
    },
    {
        id: "greet-recognize-3",
        type: "pronunciation-to-letter",
        prompt: "What should you focus on first as a beginner?",
        correctAnswer: "Learn the core pattern and practice a few reliable phrases",
        options: shuffleArray([
            "Learn the core pattern and practice a few reliable phrases",
            "Memorize every possible greeting",
            "Only use slang expressions",
            "Avoid greetings completely",
        ]),
    },
];

// Get a random practice session for greetings
export function getGreetingsPracticeSession(questionCount: number = 10): PracticeQuestion[] {
    return shuffleArray(allGreetingsQuestions).slice(0, Math.min(questionCount, allGreetingsQuestions.length));
}

// Instruction text for greetings questions
export function getGreetingsQuestionInstruction(): string {
    return "Select the best answer";
}
