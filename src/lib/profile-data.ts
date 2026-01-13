// Profile data types and storage

export interface UserProfile {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    bio: string;
    birthday?: string;
    currentLevel: string;
    isPrivate: boolean;

    // Privacy settings
    showBirthday: boolean;
    showLevel: boolean;
    showLearningPosts: boolean;
    showDailyLogs: boolean;

    // Stats
    followersCount: number;
    followingCount: number;
    friendsCount: number;

    createdAt: string;
}

export type PostType = "thought" | "log" | "showcase";

export interface UserPost {
    id: string;
    authorId: string;
    content: string;
    type: PostType;
    likes: number;
    createdAt: string;
}

export type RelationshipType = "following" | "follower" | "friend" | "close_friend" | "blocked" | "pending";

export interface Relationship {
    userId: string;
    targetId: string;
    type: RelationshipType;
}

// Post type config
export const postTypes: { id: PostType; label: string; icon: string; color: string }[] = [
    { id: "thought", label: "Thought", icon: "💭", color: "bg-blue-100 text-blue-700" },
    { id: "log", label: "Learning Log", icon: "📝", color: "bg-green-100 text-green-700" },
    { id: "showcase", label: "Showcase", icon: "✨", color: "bg-purple-100 text-purple-700" },
];

export function getPostTypeConfig(type: PostType) {
    return postTypes.find(t => t.id === type) || postTypes[0];
}

// localStorage keys
const PROFILE_KEY = "artico-user-profile";
const POSTS_KEY = "artico-user-posts";
const RELATIONSHIPS_KEY = "artico-relationships";

// Default profile
const defaultProfile: UserProfile = {
    id: "current-user",
    username: "learner",
    displayName: "English Learner",
    bio: "Learning English one word at a time! 🌱",
    currentLevel: "Foundations",
    isPrivate: false,
    showBirthday: true,
    showLevel: true,
    showLearningPosts: true,
    showDailyLogs: true,
    followersCount: 42,
    followingCount: 28,
    friendsCount: 15,
    createdAt: new Date().toISOString(),
};

// Mock posts
const mockPosts: UserPost[] = [
    {
        id: "p1",
        authorId: "current-user",
        content: "Just completed the Alphabets module! The IPA pronunciation really helped me understand the sounds better. 🎉",
        type: "log",
        likes: 12,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: "p2",
        authorId: "current-user",
        content: "Thinking about accents today... American vs British. Which one sounds more natural to you?",
        type: "thought",
        likes: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
        id: "p3",
        authorId: "current-user",
        content: "Finally mastered the 'TH' sound! Here's my practice recording 🎤",
        type: "showcase",
        likes: 23,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
];

// Initialize data
function initializeData() {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem(PROFILE_KEY)) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(defaultProfile));
    }
    if (!localStorage.getItem(POSTS_KEY)) {
        localStorage.setItem(POSTS_KEY, JSON.stringify(mockPosts));
    }
    if (!localStorage.getItem(RELATIONSHIPS_KEY)) {
        localStorage.setItem(RELATIONSHIPS_KEY, JSON.stringify([]));
    }
}

// Get current user profile
export function getProfile(): UserProfile {
    if (typeof window === "undefined") return defaultProfile;
    initializeData();
    const profile = localStorage.getItem(PROFILE_KEY);
    return profile ? JSON.parse(profile) : defaultProfile;
}

// Update profile
export function updateProfile(updates: Partial<UserProfile>): UserProfile {
    const current = getProfile();
    const updated = { ...current, ...updates };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    return updated;
}

// Get user posts
export function getUserPosts(userId: string = "current-user"): UserPost[] {
    if (typeof window === "undefined") return mockPosts;
    initializeData();
    const posts = localStorage.getItem(POSTS_KEY);
    const all: UserPost[] = posts ? JSON.parse(posts) : [];
    return all.filter(p => p.authorId === userId);
}

// Get posts by type
export function getPostsByType(type: PostType): UserPost[] {
    return getUserPosts().filter(p => p.type === type);
}

// Create new post
export function createPost(content: string, type: PostType): UserPost {
    const posts = getUserPosts();
    const newPost: UserPost = {
        id: Date.now().toString(),
        authorId: "current-user",
        content,
        type,
        likes: 0,
        createdAt: new Date().toISOString(),
    };
    const allPosts = [newPost, ...posts];
    localStorage.setItem(POSTS_KEY, JSON.stringify(allPosts));
    return newPost;
}

// Delete post
export function deletePost(postId: string): void {
    const posts = getUserPosts();
    const filtered = posts.filter(p => p.id !== postId);
    localStorage.setItem(POSTS_KEY, JSON.stringify(filtered));
}

// Like/unlike post
export function toggleLikePost(postId: string): void {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY) || "[]") as UserPost[];
    const likedPosts = JSON.parse(localStorage.getItem("artico-liked-posts") || "[]") as string[];

    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;

    const isLiked = likedPosts.includes(postId);
    if (isLiked) {
        posts[postIndex].likes--;
        likedPosts.splice(likedPosts.indexOf(postId), 1);
    } else {
        posts[postIndex].likes++;
        likedPosts.push(postId);
    }

    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    localStorage.setItem("artico-liked-posts", JSON.stringify(likedPosts));
}

// Check if post is liked
export function isPostLiked(postId: string): boolean {
    if (typeof window === "undefined") return false;
    const likedPosts = JSON.parse(localStorage.getItem("artico-liked-posts") || "[]") as string[];
    return likedPosts.includes(postId);
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Format full date
export function formatFullDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
