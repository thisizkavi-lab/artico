// Tongue Twister data with word-level timing for sync
export interface TongueTwisterWord {
    text: string;
    start: number; // ms from start
    end: number;
}

export interface TongueTwisterLine {
    words: TongueTwisterWord[];
    fullText: string;
}

export interface TongueTwister {
    id: string;
    title: string;
    difficulty: "easy" | "medium" | "hard";
    focusSound: string; // e.g., "S", "P", "W"
    lines: TongueTwisterLine[];
    totalDuration: number; // ms
}

// Helper to create word timings
function createLine(text: string, startTime: number, wordsPerSecond: number = 2): TongueTwisterLine {
    const words = text.split(" ");
    const wordDuration = 1000 / wordsPerSecond;
    let currentTime = startTime;

    const timedWords: TongueTwisterWord[] = words.map((word) => {
        const result = {
            text: word,
            start: currentTime,
            end: currentTime + wordDuration,
        };
        currentTime += wordDuration;
        return result;
    });

    return {
        words: timedWords,
        fullText: text,
    };
}

export const tongueTwisters: TongueTwister[] = [
    {
        id: "she-sells",
        title: "She Sells Seashells",
        difficulty: "easy",
        focusSound: "S, Sh",
        lines: [
            createLine("She sells seashells", 0, 2),
            createLine("by the seashore", 2000, 2),
        ],
        totalDuration: 4000,
    },
    {
        id: "peter-piper",
        title: "Peter Piper",
        difficulty: "medium",
        focusSound: "P",
        lines: [
            createLine("Peter Piper picked", 0, 2),
            createLine("a peck of pickled peppers", 1500, 2.5),
            createLine("A peck of pickled peppers", 4000, 2.5),
            createLine("Peter Piper picked", 6500, 2),
        ],
        totalDuration: 8500,
    },
    {
        id: "woodchuck",
        title: "How Much Wood",
        difficulty: "medium",
        focusSound: "W, Ch",
        lines: [
            createLine("How much wood", 0, 2),
            createLine("would a woodchuck chuck", 1500, 2),
            createLine("if a woodchuck could", 4000, 2),
            createLine("chuck wood", 6000, 2),
        ],
        totalDuration: 7500,
    },
    {
        id: "red-lorry",
        title: "Red Lorry Yellow Lorry",
        difficulty: "hard",
        focusSound: "R, L, Y",
        lines: [
            createLine("Red lorry yellow lorry", 0, 2.5),
            createLine("Red lorry yellow lorry", 2000, 2.5),
            createLine("Red lorry yellow lorry", 4000, 3),
        ],
        totalDuration: 5500,
    },
    {
        id: "betty-botter",
        title: "Betty Botter",
        difficulty: "hard",
        focusSound: "B, T",
        lines: [
            createLine("Betty Botter bought some butter", 0, 2.5),
            createLine("But she said the butter's bitter", 2500, 2.5),
            createLine("If I put it in my batter", 5000, 2.5),
            createLine("It will make my batter bitter", 7500, 2.5),
        ],
        totalDuration: 10000,
    },
    {
        id: "unique-new-york",
        title: "Unique New York",
        difficulty: "easy",
        focusSound: "N, Y",
        lines: [
            createLine("Unique New York", 0, 2),
            createLine("You know you need", 1500, 2),
            createLine("unique New York", 3000, 2),
        ],
        totalDuration: 4500,
    },
    {
        id: "toy-boat",
        title: "Toy Boat",
        difficulty: "easy",
        focusSound: "T, B",
        lines: [
            createLine("Toy boat toy boat toy boat", 0, 3),
        ],
        totalDuration: 2500,
    },
    {
        id: "irish-wristwatch",
        title: "Irish Wristwatch",
        difficulty: "hard",
        focusSound: "R, Sh, W",
        lines: [
            createLine("Irish wristwatch", 0, 1.5),
            createLine("Swiss wristwatch", 1500, 1.5),
        ],
        totalDuration: 3500,
    },
];

export function getTongueTwisterById(id: string): TongueTwister | undefined {
    return tongueTwisters.find((t) => t.id === id);
}

export function getTongueTwistersByDifficulty(difficulty: "easy" | "medium" | "hard"): TongueTwister[] {
    return tongueTwisters.filter((t) => t.difficulty === difficulty);
}
