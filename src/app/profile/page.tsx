"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
    UserProfile,
    UserPost,
    PostType,
    getProfile,
    updateProfile,
    getUserPosts,
    createPost,
    deletePost,
    toggleLikePost,
    isPostLiked,
    getPostTypeConfig,
    postTypes,
    formatRelativeTime,
    formatFullDate,
} from "@/lib/profile-data";
import FriendDiscovery from "@/components/profile/FriendDiscovery";

type ProfileTab = "posts" | "learning" | "showcase";
type ProfileView = "profile" | "edit" | "settings";

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [view, setView] = useState<ProfileView>("profile");
    const [activeTab, setActiveTab] = useState<ProfileTab>("posts");
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [posts, setPosts] = useState<UserPost[]>([]);
    const [newPostContent, setNewPostContent] = useState("");
    const [newPostType, setNewPostType] = useState<PostType>("thought");
    const [showNewPost, setShowNewPost] = useState(false);
    const [showDiscovery, setShowDiscovery] = useState(false);

    useEffect(() => {
        setMounted(true);
        setProfile(getProfile());
        setPosts(getUserPosts());
    }, []);

    useEffect(() => {
        if (mounted && !isLoading && !user) {
            router.push("/");
        }
    }, [mounted, isLoading, user, router]);

    const refreshPosts = () => setPosts(getUserPosts());

    const handleCreatePost = () => {
        if (!newPostContent.trim()) return;
        createPost(newPostContent.trim(), newPostType);
        setNewPostContent("");
        setShowNewPost(false);
        refreshPosts();
    };

    const handleDeletePost = (postId: string) => {
        deletePost(postId);
        refreshPosts();
    };

    const handleLikePost = (postId: string) => {
        toggleLikePost(postId);
        refreshPosts();
    };

    if (!mounted || isLoading || !profile) {
        return (
            <div className="min-h-screen bg-linen flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-cocoa border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    // Filter posts by tab
    const filteredPosts = posts.filter(p => {
        if (activeTab === "posts") return p.type === "thought";
        if (activeTab === "learning") return p.type === "log";
        if (activeTab === "showcase") return p.type === "showcase";
        return true;
    });

    return (
        <div className="min-h-screen bg-linen">
            {/* Top Nav */}
            <nav className="bg-white border-b border-pebble px-6 py-4 sticky top-0 z-50">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <Link href="/learn" className="flex items-center gap-2 text-dust hover:text-ink transition-colors">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                        Back
                    </Link>
                    <h1 className="font-primary text-xl font-bold text-ink">Profile</h1>
                    <button
                        onClick={() => setView(view === "settings" ? "profile" : "settings")}
                        className="p-2 hover:bg-pebble rounded-full transition-colors"
                    >
                        <svg className="w-5 h-5 text-ash" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                        </svg>
                    </button>
                </div>
            </nav>

            {view === "profile" && (
                <main className="max-w-2xl mx-auto px-6 py-6">
                    {/* Profile Header */}
                    <div className="bg-white rounded-3xl p-6 border border-pebble shadow-sm mb-4">
                        <div className="flex items-start gap-4">
                            {/* Avatar */}
                            <div className="w-20 h-20 rounded-full bg-cocoa flex items-center justify-center text-white font-bold text-3xl shadow-lg flex-shrink-0">
                                {profile.displayName.charAt(0).toUpperCase()}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <h2 className="font-primary text-xl font-bold text-ink">{profile.displayName}</h2>
                                        <p className="text-dust text-sm">@{profile.username}</p>
                                    </div>
                                    <button
                                        onClick={() => setView("edit")}
                                        className="px-4 py-1.5 border-2 border-divider rounded-full font-semibold text-sm text-ink hover:border-cocoa hover:text-cocoa transition-colors"
                                    >
                                        Edit
                                    </button>
                                </div>

                                {/* Bio */}
                                <p className="text-ash mt-2 text-sm">{profile.bio}</p>

                                {/* Level Badge */}
                                {profile.showLevel && (
                                    <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-pebble text-ink rounded-full text-xs font-medium">
                                        🌱 {profile.currentLevel}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mt-5 pt-5 border-t border-pebble">
                            <button className="text-center hover:opacity-70 transition-opacity">
                                <p className="font-bold text-ink text-lg">{profile.followingCount}</p>
                                <p className="text-xs text-dust">Following</p>
                            </button>
                            <button className="text-center hover:opacity-70 transition-opacity">
                                <p className="font-bold text-ink text-lg">{profile.followersCount}</p>
                                <p className="text-xs text-dust">Followers</p>
                            </button>
                            <button className="text-center hover:opacity-70 transition-opacity">
                                <p className="font-bold text-ink text-lg">{profile.friendsCount}</p>
                                <p className="text-xs text-dust">Friends</p>
                            </button>

                            {/* Find Friends Button */}
                            <button
                                onClick={() => setShowDiscovery(true)}
                                className="ml-auto px-4 py-2 bg-cocoa text-white rounded-full text-sm font-medium transition-colors flex items-center gap-1.5"
                            >
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                                Find Friends
                            </button>
                        </div>
                    </div>

                    {/* New Post Button */}
                    <button
                        onClick={() => setShowNewPost(true)}
                        className="w-full bg-white rounded-2xl p-4 border border-pebble flex items-center gap-3 text-dust hover:border-cocoa hover:text-cocoa transition-colors mb-4"
                    >
                        <div className="w-10 h-10 rounded-full bg-pebble flex items-center justify-center">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                        </div>
                        <span className="font-medium">What's on your mind?</span>
                    </button>

                    {/* Tabs */}
                    <div className="flex border-b border-divider mb-4">
                        {[
                            { id: "posts" as ProfileTab, label: "💭 Posts" },
                            { id: "learning" as ProfileTab, label: "📝 Learning" },
                            { id: "showcase" as ProfileTab, label: "✨ Showcase" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab.id
                                    ? "text-cocoa border-cocoa"
                                    : "text-dust border-transparent hover:text-ink"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Posts Feed */}
                    <div className="space-y-3">
                        {filteredPosts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                                onLike={() => handleLikePost(post.id)}
                                onDelete={() => handleDeletePost(post.id)}
                                isLiked={isPostLiked(post.id)}
                            />
                        ))}
                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12 text-dust">
                                <p className="mb-2">No posts yet</p>
                                <button
                                    onClick={() => setShowNewPost(true)}
                                    className="text-cocoa font-medium hover:underline"
                                >
                                    Create your first post
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            )}

            {view === "edit" && (
                <EditProfileView
                    profile={profile}
                    onSave={(updates) => {
                        updateProfile(updates);
                        setProfile(getProfile());
                        setView("profile");
                    }}
                    onCancel={() => setView("profile")}
                />
            )}

            {view === "settings" && (
                <SettingsView
                    profile={profile}
                    onUpdate={(updates) => {
                        updateProfile(updates);
                        setProfile(getProfile());
                    }}
                    onClose={() => setView("profile")}
                />
            )}

            {/* New Post Modal */}
            {showNewPost && (
                <div className="fixed inset-0 bg-ink/50 z-50 flex items-end sm:items-center justify-center">
                    <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-ink text-lg">New Post</h3>
                            <button onClick={() => setShowNewPost(false)} className="p-2 hover:bg-pebble rounded-full">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                </svg>
                            </button>
                        </div>

                        {/* Post Type */}
                        <div className="flex gap-2 mb-4">
                            {postTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setNewPostType(type.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${newPostType === type.id
                                        ? "bg-cocoa text-white"
                                        : "bg-pebble text-ash hover:bg-divider"
                                        }`}
                                >
                                    {type.icon} {type.label}
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full px-4 py-3 border border-divider rounded-xl focus:outline-none focus:border-cocoa resize-none"
                            rows={4}
                            autoFocus
                        />

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCreatePost}
                                disabled={!newPostContent.trim()}
                                className="px-6 py-2.5 bg-cocoa text-white font-medium rounded-full transition-colors disabled:opacity-50"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Friend Discovery */}
            {showDiscovery && (
                <FriendDiscovery onClose={() => setShowDiscovery(false)} />
            )}
        </div>
    );
}

// Post Card
interface PostCardProps {
    post: UserPost;
    onLike: () => void;
    onDelete: () => void;
    isLiked: boolean;
}

function PostCard({ post, onLike, onDelete, isLiked }: PostCardProps) {
    const [showMenu, setShowMenu] = useState(false);
    const typeConfig = getPostTypeConfig(post.type);

    return (
        <div className="bg-white rounded-2xl p-4 border border-pebble">
            <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeConfig.color}`}>
                    {typeConfig.icon} {typeConfig.label}
                </span>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1.5 hover:bg-pebble rounded-full transition-colors"
                    >
                        <svg className="w-4 h-4 text-dust" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 top-8 bg-white border border-divider rounded-xl shadow-lg py-1 z-10">
                            <button
                                onClick={() => {
                                    onDelete();
                                    setShowMenu(false);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-ash hover:bg-pebble transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-ink mb-3 whitespace-pre-wrap">{post.content}</p>

            <div className="flex items-center justify-between text-sm">
                <span className="text-dust" title={formatFullDate(post.createdAt)}>
                    {formatRelativeTime(post.createdAt)}
                </span>
                <button
                    onClick={onLike}
                    className={`flex items-center gap-1 transition-colors ${isLiked ? "text-cocoa" : "text-dust hover:text-cocoa"
                        }`}
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {post.likes}
                </button>
            </div>
        </div>
    );
}

// Edit Profile View
interface EditProfileViewProps {
    profile: UserProfile;
    onSave: (updates: Partial<UserProfile>) => void;
    onCancel: () => void;
}

function EditProfileView({ profile, onSave, onCancel }: EditProfileViewProps) {
    const [displayName, setDisplayName] = useState(profile.displayName);
    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [birthday, setBirthday] = useState(profile.birthday || "");

    return (
        <main className="max-w-2xl mx-auto px-6 py-6">
            <div className="bg-white rounded-3xl p-6 border border-pebble">
                <h2 className="font-bold text-ink text-lg mb-6">Edit Profile</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-ink mb-1">Display Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full px-4 py-2.5 border border-divider rounded-xl focus:outline-none focus:border-cocoa"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-ink mb-1">Username</label>
                        <div className="flex items-center">
                            <span className="text-dust mr-1">@</span>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                                className="flex-1 px-4 py-2.5 border border-divider rounded-xl focus:outline-none focus:border-cocoa"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-ink mb-1">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full px-4 py-2.5 border border-divider rounded-xl focus:outline-none focus:border-cocoa resize-none"
                            rows={3}
                            maxLength={160}
                        />
                        <p className="text-xs text-dust mt-1">{bio.length}/160</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-ink mb-1">Birthday</label>
                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            className="w-full px-4 py-2.5 border border-divider rounded-xl focus:outline-none focus:border-cocoa"
                        />
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-2.5 border border-divider rounded-full font-medium text-ink hover:bg-linen transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave({ displayName, username, bio, birthday })}
                        className="flex-1 py-2.5 bg-cocoa text-white font-medium rounded-full transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </main>
    );
}

// Settings View
interface SettingsViewProps {
    profile: UserProfile;
    onUpdate: (updates: Partial<UserProfile>) => void;
    onClose: () => void;
}

function SettingsView({ profile, onUpdate, onClose }: SettingsViewProps) {
    return (
        <main className="max-w-2xl mx-auto px-6 py-6">
            <div className="bg-white rounded-3xl border border-pebble overflow-hidden">
                <div className="px-6 py-4 border-b border-pebble flex items-center justify-between">
                    <h2 className="font-bold text-ink text-lg">Settings</h2>
                    <button onClick={onClose} className="p-2 hover:bg-pebble rounded-full">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                </div>

                {/* Privacy */}
                <div className="px-6 py-4 border-b border-linen">
                    <h3 className="font-medium text-ink mb-3">Privacy</h3>
                    <ToggleSetting
                        label="Private Account"
                        description="Only approved followers can see your posts"
                        value={profile.isPrivate}
                        onChange={(v) => onUpdate({ isPrivate: v })}
                    />
                </div>

                {/* Visibility */}
                <div className="px-6 py-4">
                    <h3 className="font-medium text-ink mb-3">Show on Profile</h3>
                    <div className="space-y-3">
                        <ToggleSetting
                            label="Birthday"
                            value={profile.showBirthday}
                            onChange={(v) => onUpdate({ showBirthday: v })}
                        />
                        <ToggleSetting
                            label="Current Level"
                            value={profile.showLevel}
                            onChange={(v) => onUpdate({ showLevel: v })}
                        />
                        <ToggleSetting
                            label="Learning Posts"
                            value={profile.showLearningPosts}
                            onChange={(v) => onUpdate({ showLearningPosts: v })}
                        />
                        <ToggleSetting
                            label="Daily Logs"
                            value={profile.showDailyLogs}
                            onChange={(v) => onUpdate({ showDailyLogs: v })}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

// Toggle Setting Component
interface ToggleSettingProps {
    label: string;
    description?: string;
    value: boolean;
    onChange: (value: boolean) => void;
}

function ToggleSetting({ label, description, value, onChange }: ToggleSettingProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-ink text-sm">{label}</p>
                {description && <p className="text-xs text-dust">{description}</p>}
            </div>
            <button
                onClick={() => onChange(!value)}
                className={`w-11 h-6 rounded-full relative transition-colors ${value ? "bg-cocoa" : "bg-divider"}`}
            >
                <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${value ? "left-5" : "left-0.5"}`}
                />
            </button>
        </div>
    );
}
