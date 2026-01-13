"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { LanguageProvider } from "@/lib/language-context";
import { AuthProvider } from "@/lib/auth-context";

const levels = [
    { level: 1, title: "Raw Mechanics", color: "from-blue-500 to-blue-600", progress: 0 },
    { level: 2, title: "Social Fluency", color: "from-emerald-500 to-emerald-600", progress: 0 },
    { level: 3, title: "Application Layer", color: "from-purple-500 to-purple-600", progress: 0 },
    { level: 4, title: "Apex Communicator", color: "from-amber-500 to-amber-600", progress: 0 },
];

function DashboardContent() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && !isLoading && !user) {
            router.push("/");
        }
    }, [mounted, isLoading, user, router]);

    if (!mounted || isLoading) {
        return (
            <div className="min-h-screen bg-gray-custom-50 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) return null;

    const xpForNextLevel = 1000;
    const xpProgress = (user.xp / xpForNextLevel) * 100;

    return (
        <div className="min-h-screen bg-gray-custom-50">
            {/* Top Nav */}
            <nav className="bg-white border-b border-gray-custom-100 px-6 py-4">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <Link href="/" className="font-primary text-2xl font-extrabold text-dark">
                        artiCO
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/profile"
                            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-custom-50 transition-colors"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-dark hidden sm:block">{user.name}</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="font-primary text-3xl font-bold text-dark mb-2">
                        Welcome back, {user.name.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-gray-custom-500">
                        Keep up the momentum — you're on a {user.streak} day streak!
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {/* Streak */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-custom-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                                <span className="text-2xl">🔥</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-custom-500">Day Streak</p>
                                <p className="font-primary text-2xl font-bold text-dark">{user.streak}</p>
                            </div>
                        </div>
                    </div>

                    {/* XP */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-custom-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-custom-500">Total XP</p>
                                <p className="font-primary text-2xl font-bold text-dark">{user.xp}</p>
                            </div>
                        </div>
                    </div>

                    {/* Lessons */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-custom-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                                <span className="text-2xl">📚</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-custom-500">Lessons Done</p>
                                <p className="font-primary text-2xl font-bold text-dark">{user.lessonsCompleted}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Current Progress */}
                <div className="bg-white rounded-3xl p-8 border border-gray-custom-100 shadow-sm mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <p className="text-sm text-gray-custom-500 mb-1">Current Level</p>
                            <h2 className="font-primary text-2xl font-bold text-dark">
                                Level {user.level}: {levels[user.level - 1]?.title || "Raw Mechanics"}
                            </h2>
                        </div>
                        <Link
                            href="/learn"
                            className="gradient-cta px-8 py-3.5 rounded-full font-bold text-dark shadow-button hover:translate-y-[-2px] transition-all"
                        >
                            Continue Learning →
                        </Link>
                    </div>

                    {/* XP Progress Bar */}
                    <div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-custom-500">Progress to Level {user.level + 1}</span>
                            <span className="font-semibold text-dark">{user.xp} / {xpForNextLevel} XP</span>
                        </div>
                        <div className="h-3 bg-gray-custom-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
                                style={{ width: `${Math.min(xpProgress, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Level Grid */}
                <div>
                    <h3 className="font-primary text-xl font-bold text-dark mb-4">Your Learning Path</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {levels.map((lvl, index) => (
                            <div
                                key={lvl.level}
                                className={`relative rounded-2xl p-6 border-2 transition-all ${user.level === lvl.level
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : user.level > lvl.level
                                        ? "border-green-300 bg-green-50"
                                        : "border-gray-custom-100 bg-white opacity-60"
                                    }`}
                            >
                                {/* Status Badge */}
                                <div
                                    className={`absolute -top-2.5 right-4 px-3 py-1 rounded-full text-xs font-bold ${user.level === lvl.level
                                        ? "bg-primary text-white"
                                        : user.level > lvl.level
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-custom-200 text-gray-custom-600"
                                        }`}
                                >
                                    {user.level === lvl.level ? "Current" : user.level > lvl.level ? "Complete" : "Locked"}
                                </div>

                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${lvl.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
                                    >
                                        {lvl.level}
                                    </div>
                                    <div>
                                        <h4 className="font-primary font-bold text-lg text-dark">{lvl.title}</h4>
                                        <p className="text-sm text-gray-custom-500">
                                            {user.level > lvl.level ? "Completed" : `${lvl.level * 10} lessons`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daily Goal */}
                <div className="mt-8 bg-gradient-to-r from-primary to-primary-light rounded-3xl p-8 text-white">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-primary text-xl font-bold mb-1">Daily Goal</h3>
                            <p className="text-white/80">Practice for 10 minutes today</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <p className="font-primary text-4xl font-bold">{user.minutesToday}</p>
                                <p className="text-sm text-white/70">/ 10 min</p>
                            </div>
                            <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
                                <div
                                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
                                    style={{
                                        background: `conic-gradient(white ${(user.minutesToday / 10) * 100}%, transparent 0%)`,
                                    }}
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <LanguageProvider>
            <AuthProvider>
                <DashboardContent />
            </AuthProvider>
        </LanguageProvider>
    );
}
