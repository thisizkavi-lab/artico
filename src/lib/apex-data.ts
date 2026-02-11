import { LessonContent } from "./foundation-data";

export const apexData: Record<string, LessonContent> = {
    // MODULE 1: THE PERSONAL ESSAY
    "essay-meaning": {
        id: "essay-meaning",
        blocks: [
            {
                type: "hero",
                title: "The Meaning of Life (In 500 Words)",
                content: "Deep topics require simple words. The smartest people explain complex things simply."
            },
            {
                type: "instruction",
                title: "Active Voice Only",
                content: "Passive: 'It is believed that love is important.' Active: 'Love drives us.'"
            }
        ]
    },
    // MODULE 2: CREATIVE EXPRESSION
    "creative-metaphor": {
        id: "creative-metaphor",
        blocks: [
            {
                type: "hero",
                title: "Metaphors: Painting with Words",
                content: "Don't say 'It was raining hard'. Say 'The sky was angry'."
            },
            {
                type: "interactive",
                data: {
                    type: "quiz",
                    question: "Which one is more powerful?",
                    options: [
                        "He was very tired.",
                        "He was running on fumes."
                    ],
                    correct: 1,
                    explanation: "'Running on fumes' creates a visual image of a car with an empty tank."
                }
            }
        ]
    }
};
