"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import AppNavbar from "@/components/learn/AppNavbar";
import { getFeedPosts, createFeedPost, likeFeedPost, getComments, addComment, formatFeedTime, FeedPost, FeedComment } from "@/lib/feed-data";
import { levels } from "@/lib/course-data";
import Link from "next/link";

export default function HomePage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [newPostContent, setNewPostContent] = useState("");

    // Media upload state
    const [mediaPreview, setMediaPreview] = useState<string | null>(null);
    const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    // Comments state
    const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
    const [postComments, setPostComments] = useState<Record<string, FeedComment[]>>({});
    const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

    // Share state
    const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        setPosts(getFeedPosts());
    }, []);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user, router]);

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen bg-linen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cocoa border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    // ---- Handlers ----

    const handlePost = () => {
        if (!newPostContent.trim() && !mediaPreview) return;
        createFeedPost(
            user.name,
            newPostContent.trim(),
            mediaPreview || undefined,
            mediaType || undefined
        );
        setNewPostContent("");
        setMediaPreview(null);
        setMediaType(null);
        setPosts(getFeedPosts());
    };

    const handleLike = (postId: string) => {
        likeFeedPost(postId);
        setPosts(getFeedPosts());
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            setMediaPreview(reader.result as string);
            setMediaType(type);
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    const removeMedia = () => {
        setMediaPreview(null);
        setMediaType(null);
    };

    const toggleComments = (postId: string) => {
        const isOpen = expandedComments[postId];
        if (!isOpen) {
            // Load comments when opening
            setPostComments((prev) => ({ ...prev, [postId]: getComments(postId) }));
        }
        setExpandedComments((prev) => ({ ...prev, [postId]: !isOpen }));
    };

    const handleAddComment = (postId: string) => {
        const text = commentInputs[postId]?.trim();
        if (!text) return;
        addComment(postId, user.name, text);
        setPostComments((prev) => ({ ...prev, [postId]: getComments(postId) }));
        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
        setPosts(getFeedPosts()); // refresh comment count
    };

    const handleShare = (post: FeedPost) => {
        const shareText = `${post.authorName}: "${post.content}" — shared from artiCo`;
        if (navigator.share) {
            navigator.share({ text: shareText }).catch(() => {
                // Fallback to clipboard
                copyToClipboard(post.id, shareText);
            });
        } else {
            copyToClipboard(post.id, shareText);
        }
    };

    const copyToClipboard = (postId: string, text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedPostId(postId);
            setTimeout(() => setCopiedPostId(null), 2000);
        });
    };

    // ---- Derived data ----

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    const currentLevel = levels.find((l) => l.title === user.level) || levels[0];
    const currentModule = currentLevel.modules.find((m) => m.unlocked && m.lessons.some((l) => !l.completed)) || currentLevel.modules[0];
    const nextLesson = currentModule?.lessons.find((l) => !l.completed) || currentModule?.lessons[0];

    const xpGoal = 500;
    const xpProgress = Math.min((user.xp / xpGoal) * 100, 100);

    return (
        <div className="min-h-screen bg-linen">
            <AppNavbar activeTab="home" />

            {/* Hidden file inputs */}
            <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileSelect(e, "image")} />
            <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={(e) => handleFileSelect(e, "video")} />

            <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">

                    {/* ====== LEFT COLUMN — Learning Feed ====== */}
                    <div className="lg:col-span-4 space-y-5">

                        {/* Compose Box */}
                        <div className="bg-white rounded-2xl border border-divider p-5 shadow-sm">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-cocoa flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={newPostContent}
                                        onChange={(e) => setNewPostContent(e.target.value)}
                                        placeholder="Share a learning update..."
                                        rows={3}
                                        className="w-full resize-none bg-linen rounded-xl px-4 py-3 text-sm text-ink placeholder:text-dust focus:outline-none focus:ring-2 focus:ring-cocoa/20 border border-divider font-secondary"
                                    />

                                    {/* Media Preview */}
                                    {mediaPreview && (
                                        <div className="mt-3 relative inline-block">
                                            {mediaType === "image" ? (
                                                <img src={mediaPreview} alt="Upload preview" className="max-h-48 rounded-xl border border-divider object-cover" />
                                            ) : (
                                                <video src={mediaPreview} className="max-h-48 rounded-xl border border-divider" controls />
                                            )}
                                            <button
                                                onClick={removeMedia}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-cocoa text-white rounded-full flex items-center justify-center text-xs hover:opacity-80 transition-opacity"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => photoInputRef.current?.click()}
                                                className="flex items-center gap-1.5 text-dust hover:text-ash transition-colors text-xs font-medium"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                                    <path d="m21 15-5-5L5 21" />
                                                </svg>
                                                Photo
                                            </button>
                                            <button
                                                onClick={() => videoInputRef.current?.click()}
                                                className="flex items-center gap-1.5 text-dust hover:text-ash transition-colors text-xs font-medium"
                                            >
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                                                    <circle cx="12" cy="13" r="3" />
                                                </svg>
                                                Video
                                            </button>
                                        </div>
                                        <button
                                            onClick={handlePost}
                                            disabled={!newPostContent.trim() && !mediaPreview}
                                            className="px-5 py-2 bg-cocoa text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Feed Posts */}
                        {posts.map((post) => (
                            <div key={post.id} className="bg-white rounded-2xl border border-divider p-5 shadow-sm">
                                {/* Post Header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-full bg-pebble flex items-center justify-center text-ink font-semibold text-sm">
                                        {post.authorName.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-ink">{post.authorName}</p>
                                        <p className="text-xs text-dust">{formatFeedTime(post.createdAt)}</p>
                                    </div>
                                </div>

                                {/* Post Content */}
                                <p className="text-sm text-ink leading-relaxed mb-3">{post.content}</p>

                                {/* Post Media */}
                                {post.media && (
                                    <div className="mb-4 rounded-xl overflow-hidden border border-divider">
                                        {post.mediaType === "video" ? (
                                            <video src={post.media} className="w-full max-h-80 object-cover" controls />
                                        ) : (
                                            <img src={post.media} alt="Post media" className="w-full max-h-80 object-cover" />
                                        )}
                                    </div>
                                )}

                                {/* Post Actions */}
                                <div className="flex items-center gap-5 pt-3 border-t border-divider">
                                    {/* Like */}
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${post.likedByUser ? "text-cocoa" : "text-dust hover:text-ash"}`}
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill={post.likedByUser ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                        {post.likes > 0 && post.likes}
                                    </button>

                                    {/* Comment */}
                                    <button
                                        onClick={() => toggleComments(post.id)}
                                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${expandedComments[post.id] ? "text-cocoa" : "text-dust hover:text-ash"}`}
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                        </svg>
                                        {post.commentCount > 0 && post.commentCount}
                                    </button>

                                    {/* Share */}
                                    <button
                                        onClick={() => handleShare(post)}
                                        className="flex items-center gap-1.5 text-xs font-medium text-dust hover:text-ash transition-colors ml-auto"
                                    >
                                        {copiedPostId === post.id ? (
                                            <>
                                                <svg className="w-4 h-4 text-cocoa" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                <span className="text-cocoa">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                    <circle cx="18" cy="5" r="3" />
                                                    <circle cx="6" cy="12" r="3" />
                                                    <circle cx="18" cy="19" r="3" />
                                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                                </svg>
                                                Share
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Comments Section (expandable) */}
                                {expandedComments[post.id] && (
                                    <div className="mt-4 pt-3 border-t border-divider space-y-3">
                                        {/* Existing comments */}
                                        {(postComments[post.id] || []).map((comment) => (
                                            <div key={comment.id} className="flex items-start gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-linen border border-divider flex items-center justify-center text-xs font-semibold text-ink shrink-0">
                                                    {comment.authorName.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="flex-1 bg-linen rounded-xl px-3 py-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-semibold text-ink">{comment.authorName}</span>
                                                        <span className="text-[10px] text-dust">{formatFeedTime(comment.createdAt)}</span>
                                                    </div>
                                                    <p className="text-xs text-ink mt-0.5 leading-relaxed">{comment.content}</p>
                                                </div>
                                            </div>
                                        ))}

                                        {(postComments[post.id] || []).length === 0 && (
                                            <p className="text-xs text-dust text-center py-1">No comments yet. Be the first!</p>
                                        )}

                                        {/* Add comment input */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-7 h-7 rounded-full bg-cocoa flex items-center justify-center text-white text-xs font-semibold shrink-0">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 flex items-center gap-2">
                                                <input
                                                    type="text"
                                                    value={commentInputs[post.id] || ""}
                                                    onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                                                    onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                                                    placeholder="Write a comment..."
                                                    className="flex-1 bg-linen rounded-full px-3.5 py-2 text-xs text-ink placeholder:text-dust focus:outline-none focus:ring-2 focus:ring-cocoa/20 border border-divider"
                                                />
                                                <button
                                                    onClick={() => handleAddComment(post.id)}
                                                    disabled={!commentInputs[post.id]?.trim()}
                                                    className="text-cocoa disabled:text-pebble transition-colors"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {posts.length === 0 && (
                            <div className="bg-white rounded-2xl border border-divider p-10 shadow-sm text-center">
                                <p className="text-dust text-sm">No posts yet. Share your first learning update!</p>
                            </div>
                        )}
                    </div>

                    {/* ====== RIGHT COLUMN — Personal Snapshot ====== */}
                    <div className="lg:col-span-3 space-y-5">

                        {/* Greeting Card */}
                        <div className="bg-white rounded-2xl border border-divider p-6 shadow-sm">
                            <h2 className="text-xl font-primary font-bold text-ink">{greeting}, {user.name.split(" ")[0]}</h2>
                            <p className="text-sm text-dust mt-1">
                                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                            </p>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white rounded-2xl border border-divider p-4 shadow-sm text-center">
                                <p className="text-2xl font-primary font-bold text-ink">{user.streak}</p>
                                <p className="text-xs text-dust mt-0.5">🔥 streak</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-divider p-4 shadow-sm text-center">
                                <p className="text-2xl font-primary font-bold text-ink">{user.xp}</p>
                                <p className="text-xs text-dust mt-0.5">XP earned</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-divider p-4 shadow-sm text-center">
                                <p className="text-2xl font-primary font-bold text-ink">{user.lessonsCompleted}</p>
                                <p className="text-xs text-dust mt-0.5">lessons</p>
                            </div>
                        </div>

                        {/* Continue Learning */}
                        <Link href="/learn" className="block">
                            <div className="bg-white rounded-2xl border border-divider p-5 shadow-sm hover:border-cocoa/30 transition-colors group">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{currentLevel.icon}</span>
                                        <h3 className="text-sm font-semibold text-ink font-primary">Continue Learning</h3>
                                    </div>
                                    <svg className="w-4 h-4 text-dust group-hover:text-cocoa transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium text-ink">{currentLevel.title}</p>
                                <p className="text-xs text-dust mt-1">{currentModule?.title} · {nextLesson?.title}</p>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-pebble rounded-full overflow-hidden">
                                        <div className="h-full bg-cocoa rounded-full" style={{ width: "15%" }} />
                                    </div>
                                    <span className="text-xs text-dust">15%</span>
                                </div>
                            </div>
                        </Link>

                        {/* Practice in Progress */}
                        <Link href="/practice" className="block">
                            <div className="bg-white rounded-2xl border border-divider p-5 shadow-sm hover:border-cocoa/30 transition-colors group">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-semibold text-ink font-primary">Practice</h3>
                                    <svg className="w-4 h-4 text-dust group-hover:text-cocoa transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </div>
                                <p className="text-xs text-dust leading-relaxed">
                                    Sharpen your skills with quick exercises. {user.minutesToday > 0 ? `${user.minutesToday} min today.` : "Start your first session."}
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-xs text-cocoa font-medium">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    Start practice
                                </div>
                            </div>
                        </Link>

                        {/* Next Goal */}
                        <div className="bg-white rounded-2xl border border-divider p-5 shadow-sm">
                            <h3 className="text-sm font-semibold text-ink font-primary mb-3">Next Goal</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-linen border border-divider flex items-center justify-center text-lg">
                                    🎯
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-ink">Reach {xpGoal} XP</p>
                                    <div className="mt-1.5 flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-pebble rounded-full overflow-hidden">
                                            <div className="h-full bg-cocoa rounded-full transition-all duration-300" style={{ width: `${xpProgress}%` }} />
                                        </div>
                                        <span className="text-xs text-dust">{user.xp}/{xpGoal}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
