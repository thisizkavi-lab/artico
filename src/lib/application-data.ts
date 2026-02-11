import { LessonContent } from "./foundation-data";

export const applicationData: Record<string, LessonContent> = {
    // MODULE 1: JOB INTERVIEW
    "interview-intro": {
        id: "interview-intro",
        blocks: [
            {
                type: "hero",
                title: "The Interview Game",
                content: "An interview is a sales pitch. The product is YOU. Stop being modest. If you don't sell yourself, nobody will."
            },
            {
                type: "instruction",
                title: "The 'Tell Me About Yourself' Trap",
                content: "They don't want your biography. They don't care where you were born. They want to know: Can you do the job? And will you be annoying to work with?"
            },
            {
                type: "callout",
                variant: "expertise",
                title: "The Past-Present-Future Formula",
                content: "PAST: 'I've spent 5 years in marketing...' PRESENT: 'Currently I'm leading a team of 4...' FUTURE: 'And that's why I'm excited about this role...'"
            }
        ]
    },
    "interview-weakness": {
        id: "interview-weakness",
        blocks: [
            {
                type: "hero",
                title: "The Dreaded Weakness Question",
                content: "This question kills candidates. 'I work too hard' is a lie. 'I am disorganized' is suicide. You need a 'Real Weakness' that is 'Fixable'."
            },
            {
                type: "instruction",
                title: "The Formula",
                content: "Real Weakness + Corrective Action = Growth Mindset."
            },
            {
                type: "interactive",
                title: "Critique These Answers",
                data: {
                    type: "flashcards",
                    cards: [
                        { front: "I'm a perfectionist.", back: "BAD. It's a cliché and implies you work slowly." },
                        { front: "I sometimes struggle to delegate.", back: "GOOD. If you follow up with how you are fixing it." },
                        { front: "I don't like public speaking.", back: "OKAY. But you better say you joined a club to practice." }
                    ]
                }
            },
            {
                type: "instruction",
                title: "The STAR Method",
                content: "Situation. Task. Action. Result. This is how you answer 'Tell me about a time...' questions. Without this structure, you will ramble."
            },
            {
                type: "callout",
                variant: "tip",
                title: "Focus on the 'A' and 'R'",
                content: "Most people spend too much time defining the Situation. Spend 80% of your time on Action (what you did) and Result (what happened)."
            }
        ]
    },

    // MODULE 2: IELTS PREP
    "ielts-speaking": {
        id: "ielts-speaking",
        blocks: [
            {
                type: "hero",
                title: "IELTS Speaking: It's a Performance",
                content: "You are not being graded on truth. You are graded on fluency, lexical resource, grammar, and pronunciation. If you don't have an interesting opinion, invent one."
            },
            {
                type: "instruction",
                title: "The 'Yes/No' Trap",
                content: "Examiner: 'Do you like sports?' Candidate: 'Yes.' -> BAND 4. Candidate: 'Absolutely. I'm a huge fan of tennis...' -> BAND 7+."
            },
            {
                type: "interactive",
                data: {
                    type: "quiz",
                    question: "Examiner: 'What is your hometown like?' Best answer:",
                    options: [
                        "It is small.",
                        "It's a small city in the south. Not much to do there, but it's peaceful.",
                        "I live in Seoul.",
                        "Yes, I like it."
                    ],
                    correct: 1,
                    explanation: "It answers the question AND adds descriptive detail ('peaceful', 'not much to do')."
                }
            },
            {
                type: "callout",
                variant: "expertise",
                title: "Buying Time",
                content: "If you don't know the answer, don't say 'Umm'. Say: 'That's an interesting question, I've never thought about that before...' It counts as fluency!"
            }
        ]
    }
};
