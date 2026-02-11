// Feed data types and mock data for the Home learning feed

export interface FeedComment {
    id: string;
    postId: string;
    authorName: string;
    content: string;
    createdAt: string;
}

export interface FeedPost {
    id: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    media?: string; // base64 data URL for image/video
    mediaType?: "image" | "video";
    likes: number;
    commentCount: number;
    likedByUser: boolean;
    createdAt: string;
}

const FEED_KEY = "artico-feed-posts";
const COMMENTS_KEY = "artico-feed-comments";

const mockFeedPosts: FeedPost[] = [
    {
        id: "f1",
        authorName: "Sarah K.",
        content: "Just finished Level 1 Foundations! 🎉 The tongue twisters were surprisingly fun. 'She sells seashells' is stuck in my head now.",
        likes: 12,
        commentCount: 3,
        likedByUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
        id: "f2",
        authorName: "Marco R.",
        content: "Tip: Record yourself reading aloud for 5 minutes every morning. After two weeks, I can already hear the difference in my pronunciation.",
        likes: 34,
        commentCount: 8,
        likedByUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: "f3",
        authorName: "Yuki T.",
        content: "Day 14 of my streak! 🔥 Consistency really is the key. Even 10 minutes a day adds up.",
        likes: 21,
        commentCount: 5,
        likedByUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
        id: "f4",
        authorName: "Anna L.",
        content: "Finally understood the difference between 'affect' and 'effect' thanks to the grammar module. Small wins! ✨",
        likes: 18,
        commentCount: 2,
        likedByUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    },
    {
        id: "f5",
        authorName: "David M.",
        content: "Had my first full English conversation today without switching back to my native language. Nervous but proud. 💪",
        likes: 47,
        commentCount: 11,
        likedByUser: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
];

const mockComments: FeedComment[] = [
    { id: "fc1", postId: "f1", authorName: "Marco R.", content: "That's awesome! Tongue twisters are the best warm-up.", createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
    { id: "fc2", postId: "f1", authorName: "Yuki T.", content: "Try 'Peter Piper' next — it's a real challenge!", createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
    { id: "fc3", postId: "f1", authorName: "Anna L.", content: "Congrats on finishing Foundations! 🎉", createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
    { id: "fc4", postId: "f2", authorName: "Sarah K.", content: "Great tip! I'll try this starting tomorrow.", createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString() },
    { id: "fc5", postId: "f3", authorName: "David M.", content: "Keep it up! Streaks really help build the habit.", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() },
];

function initializeFeed(): void {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(FEED_KEY)) {
        localStorage.setItem(FEED_KEY, JSON.stringify(mockFeedPosts));
    }
    if (!localStorage.getItem(COMMENTS_KEY)) {
        localStorage.setItem(COMMENTS_KEY, JSON.stringify(mockComments));
    }
}

export function getFeedPosts(): FeedPost[] {
    if (typeof window === "undefined") return [];
    initializeFeed();
    const raw = localStorage.getItem(FEED_KEY);
    if (!raw) return [];
    const posts: FeedPost[] = JSON.parse(raw);
    return posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function createFeedPost(authorName: string, content: string, media?: string, mediaType?: "image" | "video"): FeedPost {
    initializeFeed();
    const posts = getFeedPosts();
    const newPost: FeedPost = {
        id: `f-${Date.now()}`,
        authorName,
        content,
        media,
        mediaType,
        likes: 0,
        commentCount: 0,
        likedByUser: false,
        createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    localStorage.setItem(FEED_KEY, JSON.stringify(posts));
    return newPost;
}

export function likeFeedPost(postId: string): void {
    const posts = getFeedPosts();
    const post = posts.find((p) => p.id === postId);
    if (!post) return;
    if (post.likedByUser) {
        post.likes = Math.max(0, post.likes - 1);
        post.likedByUser = false;
    } else {
        post.likes += 1;
        post.likedByUser = true;
    }
    localStorage.setItem(FEED_KEY, JSON.stringify(posts));
}

// ---- Comments ----

export function getComments(postId: string): FeedComment[] {
    if (typeof window === "undefined") return [];
    initializeFeed();
    const raw = localStorage.getItem(COMMENTS_KEY);
    if (!raw) return [];
    const all: FeedComment[] = JSON.parse(raw);
    return all.filter((c) => c.postId === postId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
}

export function addComment(postId: string, authorName: string, content: string): FeedComment {
    initializeFeed();
    const raw = localStorage.getItem(COMMENTS_KEY);
    const all: FeedComment[] = raw ? JSON.parse(raw) : [];
    const newComment: FeedComment = {
        id: `fc-${Date.now()}`,
        postId,
        authorName,
        content,
        createdAt: new Date().toISOString(),
    };
    all.push(newComment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));

    // Update comment count on the post
    const posts = getFeedPosts();
    const post = posts.find((p) => p.id === postId);
    if (post) {
        post.commentCount = all.filter((c) => c.postId === postId).length;
        localStorage.setItem(FEED_KEY, JSON.stringify(posts));
    }

    return newComment;
}

// ---- Formatting ----

export function formatFeedTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffHr = Math.floor(diffMs / 3600000);
    const diffDay = Math.floor(diffMs / 86400000);

    if (diffMin < 1) return "just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return date.toLocaleDateString();
}
