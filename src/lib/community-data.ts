// Community data types and mock data

export type PostCategory = "question" | "tip" | "discussion" | "resource";

export interface Post {
    id: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    title: string;
    content: string;
    category: PostCategory;
    upvotes: number;
    downvotes: number;
    commentCount: number;
    createdAt: string;
}

export interface Comment {
    id: string;
    postId: string;
    authorId: string;
    authorName: string;
    content: string;
    upvotes: number;
    createdAt: string;
}

// Category config
export const categories: { id: PostCategory; label: string; icon: string; color: string }[] = [
    { id: "question", label: "Question", icon: "❓", color: "bg-purple-100 text-purple-700" },
    { id: "tip", label: "Tip", icon: "💡", color: "bg-yellow-100 text-yellow-700" },
    { id: "discussion", label: "Discussion", icon: "💬", color: "bg-blue-100 text-blue-700" },
    { id: "resource", label: "Resource", icon: "📚", color: "bg-green-100 text-green-700" },
];

export function getCategoryConfig(category: PostCategory) {
    return categories.find(c => c.id === category) || categories[0];
}

// Mock posts for initial data
const mockPosts: Post[] = [
    {
        id: "1",
        authorId: "user1",
        authorName: "Sarah K.",
        title: "How do you practice pronunciation daily?",
        content: "I've been learning English for 3 months and I struggle with pronunciation. What's your daily routine? I try to practice tongue twisters but not sure if that's enough.",
        category: "question",
        upvotes: 24,
        downvotes: 2,
        commentCount: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    },
    {
        id: "2",
        authorId: "user2",
        authorName: "Mike T.",
        title: "💡 The IPA song changed my pronunciation game!",
        content: "Just wanted to share that after practicing the IPA song from the Alphabets module for 2 weeks, native speakers started understanding me better. The mouth muscle memory is real!",
        category: "tip",
        upvotes: 56,
        downvotes: 1,
        commentCount: 12,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
    },
    {
        id: "3",
        authorId: "user3",
        authorName: "Anna L.",
        title: "What English accent do you prefer to learn?",
        content: "I'm curious - American, British, Australian? Does it matter which one we focus on? I've been mixing both American and British and now I'm confused.",
        category: "discussion",
        upvotes: 18,
        downvotes: 3,
        commentCount: 23,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
        id: "4",
        authorId: "user4",
        authorName: "David R.",
        title: "📚 Free resource: 100 most common English phrases",
        content: "Found this amazing PDF with 100 commonly used phrases in daily conversation. It includes context examples and pronunciation tips. Link in comments!",
        category: "resource",
        upvotes: 89,
        downvotes: 4,
        commentCount: 31,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    },
];

const mockComments: Comment[] = [
    {
        id: "c1",
        postId: "1",
        authorId: "user5",
        authorName: "James W.",
        content: "I record myself reading sentences and compare with native audio. It helps a lot to hear the difference!",
        upvotes: 8,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
        id: "c2",
        postId: "1",
        authorId: "user6",
        authorName: "Lisa M.",
        content: "Shadowing technique works great for me. I listen to podcasts and repeat exactly what they say.",
        upvotes: 12,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(),
    },
];

// localStorage keys
const POSTS_KEY = "artico-community-posts";
const COMMENTS_KEY = "artico-community-comments";
const VOTES_KEY = "artico-community-votes";

// Initialize localStorage with mock data if empty
function initializeData() {
    if (typeof window === "undefined") return;

    if (!localStorage.getItem(POSTS_KEY)) {
        localStorage.setItem(POSTS_KEY, JSON.stringify(mockPosts));
    }
    if (!localStorage.getItem(COMMENTS_KEY)) {
        localStorage.setItem(COMMENTS_KEY, JSON.stringify(mockComments));
    }
    if (!localStorage.getItem(VOTES_KEY)) {
        localStorage.setItem(VOTES_KEY, JSON.stringify({}));
    }
}

// Get all posts
export function getPosts(): Post[] {
    if (typeof window === "undefined") return mockPosts;
    initializeData();
    const posts = localStorage.getItem(POSTS_KEY);
    return posts ? JSON.parse(posts) : [];
}

// Get single post
export function getPost(id: string): Post | undefined {
    return getPosts().find(p => p.id === id);
}

// Create new post
export function createPost(post: Omit<Post, "id" | "upvotes" | "downvotes" | "commentCount" | "createdAt">): Post {
    const posts = getPosts();
    const newPost: Post = {
        ...post,
        id: Date.now().toString(),
        upvotes: 0,
        downvotes: 0,
        commentCount: 0,
        createdAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    return newPost;
}

// Get comments for a post
export function getComments(postId: string): Comment[] {
    if (typeof window === "undefined") return mockComments.filter(c => c.postId === postId);
    initializeData();
    const comments = localStorage.getItem(COMMENTS_KEY);
    const all: Comment[] = comments ? JSON.parse(comments) : [];
    return all.filter(c => c.postId === postId);
}

// Add comment
export function addComment(comment: Omit<Comment, "id" | "upvotes" | "createdAt">): Comment {
    const comments = localStorage.getItem(COMMENTS_KEY);
    const all: Comment[] = comments ? JSON.parse(comments) : [];

    const newComment: Comment = {
        ...comment,
        id: Date.now().toString(),
        upvotes: 0,
        createdAt: new Date().toISOString(),
    };
    all.push(newComment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));

    // Update post comment count
    const posts = getPosts();
    const postIndex = posts.findIndex(p => p.id === comment.postId);
    if (postIndex !== -1) {
        posts[postIndex].commentCount++;
        localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    }

    return newComment;
}

// Vote on post
export function votePost(postId: string, voteType: "up" | "down", userId: string): void {
    const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || "{}");
    const voteKey = `post-${postId}-${userId}`;
    const currentVote = votes[voteKey];

    const posts = getPosts();
    const postIndex = posts.findIndex(p => p.id === postId);
    if (postIndex === -1) return;

    // Remove previous vote
    if (currentVote === "up") posts[postIndex].upvotes--;
    if (currentVote === "down") posts[postIndex].downvotes--;

    // Toggle vote
    if (currentVote === voteType) {
        delete votes[voteKey];
    } else {
        votes[voteKey] = voteType;
        if (voteType === "up") posts[postIndex].upvotes++;
        if (voteType === "down") posts[postIndex].downvotes++;
    }

    localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

// Get user's vote on a post
export function getUserVote(postId: string, userId: string): "up" | "down" | null {
    if (typeof window === "undefined") return null;
    const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || "{}");
    return votes[`post-${postId}-${userId}`] || null;
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
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}
