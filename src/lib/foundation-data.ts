export type BlockType = "hero" | "instruction" | "interactive" | "callout" | "video";

export interface LessonBlock {
    type: BlockType;
    title?: string;
    content?: string;
    variant?: "expertise" | "tip" | "warning"; // For callouts
    data?: any; // For specialized content like interactive exercises
}

export interface LessonContent {
    id: string;
    blocks: LessonBlock[];
}

import { socialData } from "./social-data";
import { applicationData } from "./application-data";
import { apexData } from "./apex-data";

export const foundationData: Record<string, LessonContent> = {
    ...socialData,
    ...applicationData,
    ...apexData,
    "alpha-intro": {
        id: "alpha-intro",
        blocks: [
            {
                type: "hero",
                title: "One language, infinite possibilities.",
                content: "Jennifer has been in social work for 25 years. She never thought she'd need accounting until she became a director. English is the same—it is the foundation for your professional life, even if you don't see it yet."
            },
            {
                type: "instruction",
                title: "Welcome to the very start of English.",
                content: "Every word you've ever heard in English is built from just 26 letters. That's it. Twenty-six symbols, two shapes each — capital and small."
            },
            {
                type: "interactive",
                title: "The 26 Characters",
                data: {
                    type: "alphabet-grid",
                    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
                    lowercase: "abcdefghijklmnopqrstuvwxyz".split("")
                }
            },
            {
                type: "instruction",
                title: "The Bricks of Communication",
                content: "Think of letters like bricks. Alone, they're small and simple. Put them together, and you can build anything — names, jokes, songs, stories, even entire worlds."
            },
            {
                type: "callout",
                variant: "expertise",
                title: "Historical Context",
                content: "These letters weren't born in England. They traveled. The English alphabet came from Latin, which came from Greek, which came from ancient Phoenician traders thousands of years ago. Every time you write a letter, you're using a piece of history that's over 3,000 years old."
            }
        ]
    },
    "abc-rhyme": {
        id: "abc-rhyme",
        blocks: [
            {
                type: "hero",
                title: "Stage 0: Sound Familiarization",
                content: "Before learning letters, let's feel how English sounds. Rhythm is the secret to sounding natural."
            },
            {
                type: "video",
                title: "Step 1: The Rhythm of English",
                content: "Listen to the ABC song. Focus on the flow. Don't try to sing yet — just feel how the sounds connect.",
                data: { videoId: "MgmIHtp-ZQM" }
            },
            {
                type: "instruction",
                title: "Step 2: Repeat & Recall",
                content: "Repeat along with the song 5-10 times until your mouth moves naturally. Once comfortable, try to sing it without listening to train your memory."
            },
            {
                type: "callout",
                variant: "tip",
                title: "Pro Tip: The L-M-N-O-P Flow",
                content: "Pay attention to the transitions between L, M, N, O, and P. These are often blurred in natural speech. Practice the 'and' before 'Z' to maintain the tempo."
            }
        ]
    },
    "sounds-intro": {
        id: "sounds-intro",
        blocks: [
            {
                type: "hero",
                title: "English is NOT Phonetic.",
                content: "In many languages, the spelling tells you exactly how it sounds. In English, one letter can make many different sounds depending on the context."
            },
            {
                type: "instruction",
                title: "The 44 Sounds",
                content: "English has 26 letters but around 44 sounds (called phonemes). That's why the same letter can sound different in different words. You don't need to master every symbol, but knowing they exist helps remove the confusion."
            },
            {
                type: "video",
                title: "Introduction to IPA",
                content: "The International Phonetic Alphabet (IPA) is a system where each symbol represents ONE sound. This video walks through all 44 sounds.",
                data: { videoId: "ETVV9Jo53CA" }
            },
            {
                type: "callout",
                variant: "expertise",
                title: "Why we use IPA",
                content: "Top communicators don't rely on spelling to guess pronunciation. They use IPA charts to verify the exact sounds of new words, ensuring they sound native and clear."
            }
        ]
    },
    "twister-intro": {
        id: "twister-intro",
        blocks: [
            {
                type: "hero",
                title: "Gym for your Voice.",
                content: "Tongue twisters are to speakers what heavy lifting is to athletes. They force your muscles to coordinate complex movements at high speeds."
            },
            {
                type: "instruction",
                title: "Muscle Memory",
                content: "Practice doesn't make perfect; practice makes permanent. We use twisters to train the 'muscle memory' needed for professional, effortless speech."
            },
            {
                type: "interactive",
                title: "Warming Up: Peter Piper",
                data: {
                    type: "tongue-twister",
                    twisterId: "peter-piper"
                }
            }
        ]
    },
    "basic-twisters": {
        id: "basic-twisters",
        blocks: [
            {
                type: "instruction",
                title: "Precision Drill: Betty Botter",
                content: "This twister focuses on the 'B' plosive. Notice how your lips must snap together. This builds the clarity needed for business presentations."
            },
            {
                type: "interactive",
                data: {
                    type: "tongue-twister",
                    twisterId: "betty-botter"
                }
            },
            {
                type: "callout",
                variant: "tip",
                title: "Accuracy over Speed",
                content: "If you stumble, go back to 0.75x speed. Speed is a byproduct of perfect accuracy."
            }
        ]
    },
    "speed-challenge": {
        id: "speed-challenge",
        blocks: [
            {
                type: "hero",
                title: "The Speed Challenge",
                content: "Can you maintain perfect clarity while increasing your pace? Professional speakers must be able to speak rapidly without 'mumbling'."
            },
            {
                type: "interactive",
                data: {
                    type: "tongue-twister",
                    twisterId: "woodchuck"
                }
            },
            {
                type: "callout",
                variant: "expertise",
                title: "The 1.25x Rule",
                content: "If you can say it clearly at 1.25x speed, you will find normal conversation effortless. Always aim higher than the average pace."
            }
        ]
    },
    "twister-review": {
        id: "twister-review",
        blocks: [
            {
                type: "instruction",
                title: "Consolidation: Sea Shells",
                content: "Final drill for today. S and SH sounds are often difficult to distinguish at speed. Focus on the tongue position."
            },
            {
                type: "interactive",
                data: {
                    type: "tongue-twister",
                    twisterId: "she-sells"
                }
            }
        ]
    }
};
