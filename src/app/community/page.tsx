"use client";

import { useState, useEffect } from "react";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import AppNavbar from "@/components/learn/AppNavbar";
import FriendDiscovery from "@/components/profile/FriendDiscovery";
import {
    Post,
    PostCategory,
    getPosts,
    createPost,
    getPost,
    getComments,
    addComment,
    votePost,
    getUserVote,
    categories,
    getCategoryConfig,
    formatRelativeTime,
    Comment
} from "@/lib/community-data";
import { getAddedFriends, DiscoverableUser } from "@/lib/discover-data";

type CommunityTab = "feed" | "discover" | "friends";
type CommunityView = "feed" | "post-detail" | "create-post";

function CommunityContent() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<CommunityTab>("feed");
    const [view, setView] = useState<CommunityView>("feed");
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
    const [filterCategory, setFilterCategory] = useState<PostCategory | "all">("all");
    const [mounted, setMounted] = useState(false);
    const [friends, setFriends] = useState<DiscoverableUser[]>([]);

    useEffect(() => {
        setMounted(true);
        setPosts(getPosts());
        setFriends(getAddedFriends());
    }, []);

    const refreshPosts = () => setPosts(getPosts());
    const refreshFriends = () => setFriends(getAddedFriends());

    const handleViewPost = (postId: string) => {
        setSelectedPostId(postId);
        setView("post-detail");
    };

    const handleBack = () => {
        setSelectedPostId(null);
        setView("feed");
        refreshPosts();
    };

    const handleCreatePost = (title: string, content: string, category: PostCategory) => {
        createPost({
            authorId: user?.id || "anonymous",
            authorName: user?.name || "Anonymous",
            title,
            content,
            category,
        });
        refreshPosts();
        setView("feed");
    };

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const filteredPosts = filterCategory === "all"
        ? posts
        : posts.filter(p => p.category === filterCategory);

    return (
        <div className="min-h-screen bg-white">
            <AppNavbar activeTab="community" />

            {/* Main Tabs */}
            <div className="border-b border-gray-custom-200 bg-white sticky top-16 z-10">
                <div className="max-w-3xl mx-auto px-6">
                    <div className="flex gap-1">
                        {(["feed", "discover", "friends"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab);
                                    if (tab === "feed") setView("feed");
                                }}
                                className={`px-5 py-4 font-medium transition-colors relative ${activeTab === tab
                                    ? "text-primary"
                                    : "text-gray-custom-500 hover:text-dark"
                                    }`}
                            >
                                {tab === "feed" && "📝 Feed"}
                                {tab === "discover" && "🔍 Discover"}
                                {tab === "friends" && `👥 Friends${friends.length > 0 ? ` (${friends.length})` : ""}`}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feed Tab */}
            {activeTab === "feed" && view === "feed" && (
                <div className="max-w-3xl mx-auto px-6 py-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="font-primary text-3xl font-bold text-dark">Community</h1>
                        <button
                            onClick={() => setView("create-post")}
                            className="px-5 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                            New Post
                        </button>
                    </div>

                    {/* Category Filter */}
                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                        <button
                            onClick={() => setFilterCategory("all")}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filterCategory === "all"
                                ? "bg-dark text-white"
                                : "bg-gray-custom-100 text-gray-custom-600 hover:bg-gray-custom-200"
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setFilterCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${filterCategory === cat.id
                                    ? "bg-dark text-white"
                                    : "bg-gray-custom-100 text-gray-custom-600 hover:bg-gray-custom-200"
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Posts List */}
                    <div className="space-y-4">
                        {filteredPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onClick={() => handleViewPost(post.id)}
                                userId={user?.id || "anonymous"}
                                onVote={refreshPosts}
                            />
                        ))}
                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12 text-gray-custom-500">
                                No posts yet. Be the first to share!
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Discover Tab */}
            {activeTab === "discover" && (
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <div className="mb-6">
                        <h1 className="font-primary text-3xl font-bold text-dark mb-2">Discover Learners</h1>
                        <p className="text-gray-custom-600">Find language partners at your level</p>
                    </div>
                    <FriendDiscovery
                        embedded={true}
                        onFriendAdded={() => {
                            refreshFriends();
                        }}
                    />
                </div>
            )}

            {/* Friends Tab */}
            {activeTab === "friends" && (
                <div className="max-w-3xl mx-auto px-6 py-8">
                    <h1 className="font-primary text-3xl font-bold text-dark mb-6">Your Friends</h1>
                    {friends.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">👥</div>
                            <p className="text-gray-custom-600 mb-4">No friends yet</p>
                            <button
                                onClick={() => setActiveTab("discover")}
                                className="px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
                            >
                                Discover People
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {friends.map((friend) => (
                                <div
                                    key={friend.id}
                                    className="bg-white border border-gray-custom-200 rounded-2xl p-5 flex items-center gap-4"
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl font-bold">
                                        {friend.displayName.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-dark">{friend.displayName}</h3>
                                        <p className="text-sm text-gray-custom-600">
                                            {friend.level} • {friend.mutualFriends} mutual friends
                                        </p>
                                    </div>
                                    <button className="px-4 py-2 bg-gray-custom-100 text-gray-custom-700 rounded-full hover:bg-gray-custom-200 transition-colors text-sm font-medium">
                                        Message
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Post Detail View - still works within feed tab */}
            {activeTab === "feed" && view === "post-detail" && selectedPostId && (
                <PostDetailView
                    postId={selectedPostId}
                    onBack={handleBack}
                    userId={user?.id || "anonymous"}
                    userName={user?.name || "Anonymous"}
                />
            )}

            {activeTab === "feed" && view === "create-post" && (
                <CreatePostView
                    onSubmit={handleCreatePost}
                    onCancel={() => setView("feed")}
                />
            )}
        </div>
    );
}

// Post Card Component
interface PostCardProps {
    post: Post;
    onClick: () => void;
    userId: string;
    onVote: () => void;
}

function PostCard({ post, onClick, userId, onVote }: PostCardProps) {
    const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
    const category = getCategoryConfig(post.category);

    useEffect(() => {
        setUserVote(getUserVote(post.id, userId));
    }, [post.id, userId]);

    const handleVote = (e: React.MouseEvent, type: "up" | "down") => {
        e.stopPropagation();
        votePost(post.id, type, userId);
        setUserVote(getUserVote(post.id, userId));
        onVote();
    };

    const score = post.upvotes - post.downvotes;

    return (
        <div
            onClick={onClick}
            className="bg-white border border-gray-custom-200 rounded-2xl p-5 hover:border-primary hover:shadow-md transition-all cursor-pointer"
        >
            <div className="flex gap-4">
                {/* Vote Column */}
                <div className="flex flex-col items-center gap-1">
                    <button
                        onClick={(e) => handleVote(e, "up")}
                        className={`p-1.5 rounded hover:bg-gray-custom-100 transition-colors ${userVote === "up" ? "text-accent" : "text-gray-custom-400"
                            }`}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                        </svg>
                    </button>
                    <span className={`font-bold text-sm ${score > 0 ? "text-accent" : score < 0 ? "text-red-500" : "text-gray-custom-500"}`}>
                        {score}
                    </span>
                    <button
                        onClick={(e) => handleVote(e, "down")}
                        className={`p-1.5 rounded hover:bg-gray-custom-100 transition-colors ${userVote === "down" ? "text-red-500" : "text-gray-custom-400"
                            }`}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${category.color}`}>
                            {category.icon} {category.label}
                        </span>
                        <span className="text-xs text-gray-custom-400">
                            {post.authorName} • {formatRelativeTime(post.createdAt)}
                        </span>
                    </div>
                    <h3 className="font-bold text-dark mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-gray-custom-600 line-clamp-2 mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-custom-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                            </svg>
                            {post.commentCount} comments
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Post Detail View
interface PostDetailViewProps {
    postId: string;
    onBack: () => void;
    userId: string;
    userName: string;
}

function PostDetailView({ postId, onBack, userId, userName }: PostDetailViewProps) {
    const [post, setPost] = useState<Post | undefined>();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

    useEffect(() => {
        setPost(getPost(postId));
        setComments(getComments(postId));
        setUserVote(getUserVote(postId, userId));
    }, [postId, userId]);

    const handleVote = (type: "up" | "down") => {
        votePost(postId, type, userId);
        setPost(getPost(postId));
        setUserVote(getUserVote(postId, userId));
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        addComment({
            postId,
            authorId: userId,
            authorName: userName,
            content: newComment.trim(),
        });
        setComments(getComments(postId));
        setPost(getPost(postId));
        setNewComment("");
    };

    if (!post) return null;

    const category = getCategoryConfig(post.category);
    const score = post.upvotes - post.downvotes;

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">
            {/* Back button */}
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-custom-600 hover:text-dark transition-colors mb-6"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Back to feed
            </button>

            {/* Post */}
            <div className="bg-white border border-gray-custom-200 rounded-2xl p-6 mb-6">
                <div className="flex gap-4">
                    {/* Vote Column */}
                    <div className="flex flex-col items-center gap-1">
                        <button
                            onClick={() => handleVote("up")}
                            className={`p-2 rounded hover:bg-gray-custom-100 transition-colors ${userVote === "up" ? "text-accent" : "text-gray-custom-400"
                                }`}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
                            </svg>
                        </button>
                        <span className={`font-bold text-lg ${score > 0 ? "text-accent" : score < 0 ? "text-red-500" : "text-gray-custom-500"}`}>
                            {score}
                        </span>
                        <button
                            onClick={() => handleVote("down")}
                            className={`p-2 rounded hover:bg-gray-custom-100 transition-colors ${userVote === "down" ? "text-red-500" : "text-gray-custom-400"
                                }`}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${category.color}`}>
                                {category.icon} {category.label}
                            </span>
                            <span className="text-sm text-gray-custom-400">
                                Posted by {post.authorName} • {formatRelativeTime(post.createdAt)}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-dark mb-4">{post.title}</h1>
                        <p className="text-gray-custom-600 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white border border-gray-custom-200 rounded-2xl p-6">
                <h2 className="font-bold text-dark mb-4">{comments.length} Comments</h2>

                {/* Add Comment */}
                <div className="mb-6">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full px-4 py-3 border border-gray-custom-200 rounded-xl focus:outline-none focus:border-primary resize-none"
                        rows={3}
                    />
                    <div className="flex justify-end mt-2">
                        <button
                            onClick={handleAddComment}
                            disabled={!newComment.trim()}
                            className="px-5 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Comment
                        </button>
                    </div>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-t border-gray-custom-100 pt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-dark text-sm">{comment.authorName}</span>
                                <span className="text-xs text-gray-custom-400">{formatRelativeTime(comment.createdAt)}</span>
                            </div>
                            <p className="text-gray-custom-600 text-sm">{comment.content}</p>
                        </div>
                    ))}
                    {comments.length === 0 && (
                        <p className="text-gray-custom-500 text-sm text-center py-4">
                            No comments yet. Be the first to comment!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Create Post View
interface CreatePostViewProps {
    onSubmit: (title: string, content: string, category: PostCategory) => void;
    onCancel: () => void;
}

function CreatePostView({ onSubmit, onCancel }: CreatePostViewProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<PostCategory>("discussion");

    const handleSubmit = () => {
        if (!title.trim() || !content.trim()) return;
        onSubmit(title.trim(), content.trim(), category);
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-8">
            {/* Back button */}
            <button
                onClick={onCancel}
                className="flex items-center gap-2 text-gray-custom-600 hover:text-dark transition-colors mb-6"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                Cancel
            </button>

            <h1 className="font-primary text-2xl font-bold text-dark mb-6">Create a Post</h1>

            <div className="space-y-5">
                {/* Category */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${category === cat.id
                                    ? "bg-primary text-white"
                                    : "bg-gray-custom-100 text-gray-custom-600 hover:bg-gray-custom-200"
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What's on your mind?"
                        className="w-full px-4 py-3 border border-gray-custom-200 rounded-xl focus:outline-none focus:border-primary"
                    />
                </div>

                {/* Content */}
                <div>
                    <label className="block text-sm font-medium text-dark mb-2">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your thoughts, questions, or tips..."
                        className="w-full px-4 py-3 border border-gray-custom-200 rounded-xl focus:outline-none focus:border-primary resize-none"
                        rows={6}
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={!title.trim() || !content.trim()}
                    className="w-full py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Post
                </button>
            </div>
        </div>
    );
}

export default function CommunityPage() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <CommunityContent />
            </AuthProvider>
        </LanguageProvider>
    );
}
