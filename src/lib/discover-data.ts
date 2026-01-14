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

// Mock users to discover
export const discoverableUsers: DiscoverableUser[] = [
    {
        id: "user1",
        displayName: "Sarah Kim",
        username: "sarahk",
        bio: "Korean learning English! Love K-dramas and practicing pronunciation 🎬",
        level: "Foundations",
        interests: ["Pronunciation", "Movies", "K-pop"],
        mutualFriends: 3,
    },
    {
        id: "user2",
        displayName: "Carlos M.",
        username: "carlosm",
        bio: "From Brazil 🇧🇷 Working on my American accent for business meetings",
        level: "Social Fluency",
        interests: ["Business English", "Networking", "Travel"],
        mutualFriends: 1,
    },
    {
        id: "user3",
        displayName: "Yuki Tanaka",
        username: "yukitan",
        bio: "日本 → 🌍 Trying to master the TH sound! It's so hard 😅",
        level: "Foundations",
        interests: ["Anime", "Gaming", "Tongue Twisters"],
        mutualFriends: 5,
    },
    {
        id: "user4",
        displayName: "Ahmed Hassan",
        username: "ahmedh",
        bio: "Egyptian student studying in the UK. Practice buddy wanted! 🇬🇧",
        level: "Application",
        interests: ["Academic English", "IELTS", "Writing"],
        mutualFriends: 2,
    },
    {
        id: "user5",
        displayName: "Maria García",
        username: "mariag",
        bio: "Spanish teacher learning to sound more native in English 🇪🇸",
        level: "Apex Communicator",
        interests: ["Teaching", "Grammar", "Idioms"],
        mutualFriends: 8,
    },
    {
        id: "user6",
        displayName: "Wei Chen",
        username: "weichen",
        bio: "Software developer. Need English for tech interviews! 💻",
        level: "Social Fluency",
        interests: ["Tech", "Interviews", "Presentations"],
        mutualFriends: 0,
    },
    {
        id: "user7",
        displayName: "Anna Petrova",
        username: "annap",
        bio: "Russian accent reduction journey. Day 45! 🚀",
        level: "Foundations",
        interests: ["Accent Training", "Daily Practice", "Podcasts"],
        mutualFriends: 4,
    },
    {
        id: "user8",
        displayName: "Kenji Yamamoto",
        username: "kenjiy",
        bio: "English for gaming and streaming! Let's practice together 🎮",
        level: "Social Fluency",
        interests: ["Gaming", "Streaming", "Slang"],
        mutualFriends: 6,
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
            return "bg-green-100 text-green-700";
        case "Social Fluency":
            return "bg-blue-100 text-blue-700";
        case "Application":
            return "bg-purple-100 text-purple-700";
        case "Apex Communicator":
            return "bg-amber-100 text-amber-700";
        default:
            return "bg-gray-100 text-gray-700";
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
