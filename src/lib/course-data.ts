// Course data structure for artiCO learning modules

export interface Lesson {
    id: string;
    title: string;
    type: "intro" | "learn" | "practice" | "review";
    completed: boolean;
    current?: boolean;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    unlocked: boolean;
}

export interface Level {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
    color: string;
    modules: Module[];
    unlocked: boolean;
}

export const levels: Level[] = [
    {
        id: "foundations",
        title: "Foundations",
        tagline: "i wanna start from the complete scratch",
        description: "Build your voice from the ground up — mastering the raw sounds, rhythms, and muscle memory that make English feel natural.",
        icon: "🌱",
        color: "from-green-400 to-green-600",
        unlocked: true,
        modules: [
            {
                id: "alphabets",
                title: "Alphabets",
                description: "Master the 26 letters and their sounds",
                unlocked: true,
                lessons: [
                    { id: "alpha-intro", title: "Intro", type: "intro", completed: false, current: true },
                    { id: "abc-rhyme", title: "ABC Rhyme", type: "learn", completed: false },
                    { id: "letters", title: "Letters", type: "learn", completed: false },
                    { id: "sounds-intro", title: "Sounds Intro", type: "learn", completed: false },
                ],
            },
            {
                id: "tongue-twisters",
                title: "Tongue Twisters",
                description: "Train your mouth for speed and clarity",
                unlocked: true,
                lessons: [
                    { id: "twister-intro", title: "Intro", type: "intro", completed: false },
                    { id: "basic-twisters", title: "Basic Twisters", type: "learn", completed: false },
                    { id: "speed-challenge", title: "Speed Challenge", type: "practice", completed: false },
                    { id: "twister-review", title: "Review", type: "review", completed: false },
                ],
            },
        ],
    },
    {
        id: "social-fluency",
        title: "Social Fluency",
        tagline: "i wanna be social butterfly",
        description: "Enter the social world of English — to think, respond, and connect like a native speaker would in everyday social life.",
        icon: "👥",
        color: "from-blue-400 to-blue-600",
        unlocked: true,
        modules: [
            {
                id: "everyday-flow",
                title: "Everyday Flow",
                description: "Common conversations and phrases",
                unlocked: true,
                lessons: [
                    { id: "flow-intro", title: "Intro", type: "intro", completed: false },
                    { id: "greetings", title: "Greetings", type: "learn", completed: false },
                    { id: "small-talk", title: "Small Talk", type: "learn", completed: false },
                ],
            },
            {
                id: "social-mind",
                title: "Social Mind",
                description: "Think in English for social situations",
                unlocked: false,
                lessons: [
                    { id: "mind-intro", title: "Intro", type: "intro", completed: false },
                    { id: "reactions", title: "Reactions", type: "learn", completed: false },
                ],
            },
        ],
    },
    {
        id: "application",
        title: "Application",
        tagline: "i wanna be able to use in my personal use cases",
        description: "Apply your English skills to real-world scenarios — emails, presentations, and professional communication.",
        icon: "💼",
        color: "from-purple-400 to-purple-600",
        unlocked: false,
        modules: [],
    },
    {
        id: "apex-communicator",
        title: "Apex Communicator",
        tagline: "My English is good, but I am be creative",
        description: "Master advanced expression — creativity, persuasion, and the art of impactful communication.",
        icon: "⭐",
        color: "from-amber-400 to-amber-600",
        unlocked: false,
        modules: [],
    },
];

export function getLevelById(id: string): Level | undefined {
    return levels.find((l) => l.id === id);
}

export function getModuleById(levelId: string, moduleId: string): Module | undefined {
    const level = getLevelById(levelId);
    return level?.modules.find((m) => m.id === moduleId);
}
