// Mock users data for friend discovery

export interface DiscoverableUser {
    id: string;
    displayName: string;
    username: string;
    bio: string;
    level: string;
    interests: string[];
    avatar?: string;
    mutualFriends: number;
}

// Mock users to discover - diverse learners from around the world
export const discoverableUsers: DiscoverableUser[] = [
    // === JAPAN ===
    {
        id: "user1",
        displayName: "Yuki Tanaka",
        username: "yukitan",
        bio: "日本 → 🌍 Trying to master the TH sound! It's so hard 😅 Software engineer by day.",
        level: "Foundations",
        interests: ["Anime", "Gaming", "Tongue Twisters"],
        mutualFriends: 5,
    },
    {
        id: "user2",
        displayName: "Kenji Yamamoto",
        username: "kenjiy",
        bio: "English for gaming and streaming! Let's practice together 🎮 Twitch affiliate",
        level: "Social Fluency",
        interests: ["Gaming", "Streaming", "Slang"],
        mutualFriends: 6,
    },
    {
        id: "user3",
        displayName: "Aiko Nakamura",
        username: "aikonak",
        bio: "TOEIC 900 targeted 📈 Working at a trading company. Need speaking confidence!",
        level: "Application",
        interests: ["Business English", "TOEIC", "Presentations"],
        mutualFriends: 2,
    },
    {
        id: "user4",
        displayName: "Ryo Suzuki",
        username: "ryoeng",
        bio: "PhD student at Tokyo University. Preparing for international conferences 🎓",
        level: "Apex Communicator",
        interests: ["Academic English", "Research", "Debates"],
        mutualFriends: 1,
    },
    {
        id: "user5",
        displayName: "Miki Hayashi",
        username: "mikiwords",
        bio: "Translator working on my speaking. Reading ≠ Speaking! 📚",
        level: "Social Fluency",
        interests: ["Translation", "Literature", "Idioms"],
        mutualFriends: 3,
    },

    // === KOREA ===
    {
        id: "user6",
        displayName: "Sarah Kim",
        username: "sarahk",
        bio: "Korean learning English! Love K-dramas and practicing pronunciation 🎬",
        level: "Foundations",
        interests: ["Pronunciation", "Movies", "K-pop"],
        mutualFriends: 3,
    },
    {
        id: "user7",
        displayName: "Jihoon Park",
        username: "jihoonp",
        bio: "Samsung employee. English for global meetings. 발음이 너무 어려워 😩",
        level: "Application",
        interests: ["Tech", "Global Business", "Networking"],
        mutualFriends: 4,
    },
    {
        id: "user8",
        displayName: "Minji Lee",
        username: "minjilee",
        bio: "Dreaming of studying abroad 🇺🇸 IELTS 7.0 goal! Let's practice together",
        level: "Foundations",
        interests: ["IELTS", "Study Abroad", "Traveling"],
        mutualFriends: 7,
    },
    {
        id: "user9",
        displayName: "Hyunwoo Cho",
        username: "hwcho",
        bio: "YouTuber learning English for international collabs. 100k subs 🎥",
        level: "Apex Communicator",
        interests: ["Content Creation", "Podcasts", "Storytelling"],
        mutualFriends: 12,
    },

    // === CHINA ===
    {
        id: "user10",
        displayName: "Wei Chen",
        username: "weichen",
        bio: "Software developer. Need English for FAANG interviews! 💻",
        level: "Application",
        interests: ["Tech Interviews", "Presentations", "Coding"],
        mutualFriends: 0,
    },
    {
        id: "user11",
        displayName: "Xiaoming Zhang",
        username: "xiaomingz",
        bio: "Finance professional in Shanghai. Working on persuasive speaking 📊",
        level: "Apex Communicator",
        interests: ["Finance", "Negotiation", "Public Speaking"],
        mutualFriends: 2,
    },
    {
        id: "user12",
        displayName: "Lucy Wang",
        username: "lucywang",
        bio: "Art student in Beijing. Want to explain my work to international audiences 🎨",
        level: "Social Fluency",
        interests: ["Art", "Creativity", "Exhibitions"],
        mutualFriends: 4,
    },

    // === SOUTHEAST ASIA ===
    {
        id: "user13",
        displayName: "Nguyen Linh",
        username: "linhng",
        bio: "Vietnam 🇻🇳 Hotel manager working on hospitality English. Customer service focus!",
        level: "Application",
        interests: ["Hospitality", "Customer Service", "Tourism"],
        mutualFriends: 3,
    },
    {
        id: "user14",
        displayName: "Putri Maharani",
        username: "putrim",
        bio: "Indonesian teacher. Want to teach in English medium schools 🏫",
        level: "Social Fluency",
        interests: ["Teaching", "Education", "Grammar"],
        mutualFriends: 5,
    },
    {
        id: "user15",
        displayName: "Somchai T.",
        username: "somchait",
        bio: "Thai startup founder. Pitching to VCs in English 🚀 Series A hunting",
        level: "Apex Communicator",
        interests: ["Startups", "Pitching", "Fundraising"],
        mutualFriends: 8,
    },

    // === LATIN AMERICA ===
    {
        id: "user16",
        displayName: "Carlos M.",
        username: "carlosm",
        bio: "From Brazil 🇧🇷 Working on my American accent for business meetings",
        level: "Social Fluency",
        interests: ["Business English", "Networking", "Travel"],
        mutualFriends: 1,
    },
    {
        id: "user17",
        displayName: "Maria García",
        username: "mariag",
        bio: "Spanish teacher learning to sound more native in English 🇪🇸",
        level: "Apex Communicator",
        interests: ["Teaching", "Grammar", "Idioms"],
        mutualFriends: 8,
    },
    {
        id: "user18",
        displayName: "Diego Hernandez",
        username: "diegoh",
        bio: "Mexican gamer 🎮 Building English skills for esports commentary",
        level: "Social Fluency",
        interests: ["Esports", "Gaming", "Commentary"],
        mutualFriends: 9,
    },

    // === MIDDLE EAST ===
    {
        id: "user19",
        displayName: "Ahmed Hassan",
        username: "ahmedh",
        bio: "Egyptian student studying in the UK. Practice buddy wanted! 🇬🇧",
        level: "Application",
        interests: ["Academic English", "IELTS", "Writing"],
        mutualFriends: 2,
    },
    {
        id: "user20",
        displayName: "Fatima Al-Rashid",
        username: "fatimar",
        bio: "Dubai-based marketing manager. Client calls in English daily 📞",
        level: "Application",
        interests: ["Marketing", "Sales Calls", "Presentations"],
        mutualFriends: 3,
    },

    // === EUROPE ===
    {
        id: "user21",
        displayName: "Anna Petrova",
        username: "annap",
        bio: "Russian accent reduction journey. Day 145! 🚀 Can finally say 'world'",
        level: "Foundations",
        interests: ["Accent Training", "Daily Practice", "Podcasts"],
        mutualFriends: 4,
    },
    {
        id: "user22",
        displayName: "Marco Rossi",
        username: "marcor",
        bio: "Italian chef opening restaurant in NYC. Need kitchen English! 🍝",
        level: "Social Fluency",
        interests: ["Hospitality", "Food", "Customer Service"],
        mutualFriends: 2,
    },
    {
        id: "user23",
        displayName: "Klaus Weber",
        username: "klausw",
        bio: "German engineer at BMW. Technical presentations in English 🚗",
        level: "Application",
        interests: ["Engineering", "Technical Writing", "Meetings"],
        mutualFriends: 1,
    },
    {
        id: "user24",
        displayName: "Sophie Dubois",
        username: "sophied",
        bio: "French fashion student. Dreaming of working in London 🇬🇧✨",
        level: "Social Fluency",
        interests: ["Fashion", "Design", "Networking"],
        mutualFriends: 6,
    },

    // === SPECIAL PERSONAS ===
    {
        id: "user25",
        displayName: "Takeshi Mori",
        username: "takeshimori",
        bio: "45yo salaryman. Kids speak better English than me. Time to catch up! 💪",
        level: "Foundations",
        interests: ["Pronunciation", "Daily Conversation", "Travel"],
        mutualFriends: 2,
    },
    {
        id: "user26",
        displayName: "Hana Kim",
        username: "hanakpop",
        bio: "K-pop trainee. English for global fans and interviews! 🎤",
        level: "Social Fluency",
        interests: ["K-pop", "Fan Interaction", "Interviews"],
        mutualFriends: 15,
    },
    {
        id: "user27",
        displayName: "Dr. Satoshi Yamada",
        username: "dryamada",
        bio: "Oncologist. Publishing papers and presenting at ASCO. Medical English focus 🏥",
        level: "Apex Communicator",
        interests: ["Medical English", "Research", "Conferences"],
        mutualFriends: 3,
    },
    {
        id: "user28",
        displayName: "Priya Sharma",
        username: "priyash",
        bio: "Indian call center team lead. Training 50+ agents. Accent neutralization expert 📞",
        level: "Application",
        interests: ["Call Center", "Training", "Customer Service"],
        mutualFriends: 11,
    },
    {
        id: "user29",
        displayName: "Tony Nguyen",
        username: "tonyn",
        bio: "Vietnamese-American helping parents with English. Teaching & learning! 👨‍👩‍👦",
        level: "Social Fluency",
        interests: ["Family", "Teaching", "Immigration"],
        mutualFriends: 7,
    },
    {
        id: "user30",
        displayName: "Emi Watanabe",
        username: "emiwt",
        bio: "Retired teacher, 62. Never too old to improve! Skyping with grandkids abroad 👵",
        level: "Foundations",
        interests: ["Family", "Travel", "Simple Conversation"],
        mutualFriends: 1,
    },
];

// localStorage keys
const FRIENDS_KEY = "artico-friends";
const SKIPPED_KEY = "artico-skipped-users";

// Get friends list
export function getFriends(): string[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(FRIENDS_KEY) || "[]");
}

// Get skipped users
export function getSkippedUsers(): string[] {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem(SKIPPED_KEY) || "[]");
}

// Add friend
export function addFriend(userId: string): void {
    const friends = getFriends();
    if (!friends.includes(userId)) {
        friends.push(userId);
        localStorage.setItem(FRIENDS_KEY, JSON.stringify(friends));
    }
}

// Skip user
export function skipUser(userId: string): void {
    const skipped = getSkippedUsers();
    if (!skipped.includes(userId)) {
        skipped.push(userId);
        localStorage.setItem(SKIPPED_KEY, JSON.stringify(skipped));
    }
}

// Get undiscovered users (not friends, not skipped)
export function getUndiscoveredUsers(): DiscoverableUser[] {
    const friends = getFriends();
    const skipped = getSkippedUsers();
    return discoverableUsers.filter(
        (u) => !friends.includes(u.id) && !skipped.includes(u.id)
    );
}

// Reset discovery (for testing)
export function resetDiscovery(): void {
    localStorage.removeItem(SKIPPED_KEY);
}

// Get added friends as user objects
export function getAddedFriends(): DiscoverableUser[] {
    const friendIds = getFriends();
    return discoverableUsers.filter((u) => friendIds.includes(u.id));
}

// Get level color
export function getLevelColor(level: string): string {
    switch (level) {
        case "Foundations":
            return "bg-pebble text-cocoa";
        case "Social Fluency":
            return "bg-pebble text-ink";
        case "Application":
            return "bg-linen text-cocoa";
        case "Apex Communicator":
            return "bg-pebble text-ink";
        default:
            return "bg-pebble text-ash";
    }
}

// Get level emoji
export function getLevelEmoji(level: string): string {
    switch (level) {
        case "Foundations":
            return "🌱";
        case "Social Fluency":
            return "👥";
        case "Application":
            return "💼";
        case "Apex Communicator":
            return "⭐";
        default:
            return "📚";
    }
}
