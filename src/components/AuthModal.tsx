"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: "login" | "signup";
}

export default function AuthModal({ isOpen, onClose, initialMode = "signup" }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">(initialMode);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { login, signup } = useAuth();
    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.includes("@")) {
            setError("Please enter a valid email");
            return;
        }

        if (mode === "signup" && !name.trim()) {
            setError("Please enter your name");
            return;
        }

        setIsLoading(true);
        try {
            if (mode === "signup") {
                await signup(email, name);
            } else {
                await login(email);
            }
            onClose();
            router.push("/dashboard");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        // Mock Google sign-in
        await login("user@gmail.com", "Demo User");
        onClose();
        router.push("/dashboard");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-custom-50 transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-custom-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="font-primary text-2xl font-bold text-dark mb-2">
                        {mode === "signup" ? "Create your free account" : "Welcome back"}
                    </h2>
                    <p className="text-gray-custom-500 text-sm">
                        {mode === "signup"
                            ? "Start your English learning journey today"
                            : "Log in to continue your progress"
                        }
                    </p>
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-custom-200 rounded-2xl font-semibold text-dark hover:bg-gray-custom-50 transition-all disabled:opacity-50"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 my-6">
                    <div className="flex-1 h-px bg-gray-custom-200" />
                    <span className="text-sm text-gray-custom-500">or</span>
                    <div className="flex-1 h-px bg-gray-custom-200" />
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === "signup" && (
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-5 py-3.5 border-2 border-gray-custom-200 rounded-2xl text-dark placeholder:text-gray-custom-400 focus:border-primary focus:outline-none transition-colors"
                        />
                    )}

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-3.5 border-2 border-gray-custom-200 rounded-2xl text-dark placeholder:text-gray-custom-400 focus:border-primary focus:outline-none transition-colors"
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full gradient-cta py-4 rounded-2xl font-bold text-dark shadow-button hover:translate-y-[-2px] transition-all disabled:opacity-50 disabled:hover:translate-y-0"
                    >
                        {isLoading ? (
                            <span className="inline-flex items-center gap-2">
                                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Please wait...
                            </span>
                        ) : (
                            mode === "signup" ? "Create Account" : "Log In"
                        )}
                    </button>
                </form>

                {/* Toggle mode */}
                <p className="text-center text-sm text-gray-custom-500 mt-6">
                    {mode === "signup" ? (
                        <>
                            Already have an account?{" "}
                            <button
                                onClick={() => setMode("login")}
                                className="text-primary font-semibold hover:underline"
                            >
                                Log In
                            </button>
                        </>
                    ) : (
                        <>
                            Don&apos;t have an account?{" "}
                            <button
                                onClick={() => setMode("signup")}
                                className="text-primary font-semibold hover:underline"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}
