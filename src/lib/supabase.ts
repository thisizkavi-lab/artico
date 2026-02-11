import { createBrowserClient } from "@supabase/ssr";

// Database types
export interface Profile {
    id: string;
    username: string;
    display_name: string;
    bio: string | null;
    level: string;
    interests: string[];
    avatar_url: string | null;
    created_at: string;
}

export interface Friendship {
    id: string;
    user_id: string;
    friend_id: string;
    status: "pending" | "accepted" | "skipped";
    created_at: string;
    // Joined data
    friend?: Profile;
}

export interface Post {
    id: string;
    author_id: string;
    title: string;
    content: string;
    category: "question" | "tip" | "discussion" | "resource";
    upvotes: number;
    downvotes: number;
    created_at: string;
    // Joined data
    author?: Profile;
    comment_count?: number;
}

export interface Comment {
    id: string;
    post_id: string;
    author_id: string;
    content: string;
    upvotes: number;
    created_at: string;
    // Joined data
    author?: Profile;
}

export interface Vote {
    user_id: string;
    post_id: string;
    vote_type: "up" | "down";
}

export interface LessonProgress {
    user_id: string;
    lesson_id: string;
    completed: boolean;
    completed_at: string | null;
}

// Create Supabase client for browser
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

// Singleton for client-side usage
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
    if (!browserClient) {
        browserClient = createClient();
    }
    return browserClient;
}
