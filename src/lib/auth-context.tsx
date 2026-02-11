"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Mock auth for testing - Supabase integration commented out for now
// import { getSupabaseClient, Profile } from "@/lib/supabase";
// import type { User as SupabaseUser, Session, AuthChangeEvent } from "@supabase/supabase-js";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    level: string;
    xp: number;
    streak: number;
    lessonsCompleted: number;
    minutesToday: number;
    joinedAt: string;
    username?: string;
    bio?: string;
    interests?: string[];
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ error?: string }>;
    signup: (email: string, password: string, name: string) => Promise<{ error?: string }>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "artico-user";

function createMockUser(email: string, name: string): User {
    return {
        id: crypto.randomUUID(),
        name: name || email.split("@")[0],
        email: email,
        avatar: undefined,
        level: "Foundations",
        xp: 0,
        streak: 1,
        lessonsCompleted: 0,
        minutesToday: 0,
        joinedAt: new Date().toISOString(),
        username: email.split("@")[0],
        bio: "",
        interests: [],
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem(STORAGE_KEY);
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    // Save user to localStorage when it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    // Mock login - accepts any email/password
    const login = async (email: string, password: string): Promise<{ error?: string }> => {
        if (!email.includes("@")) {
            return { error: "Invalid email format" };
        }
        if (password.length < 6) {
            return { error: "Password must be at least 6 characters" };
        }

        // Check if user exists in localStorage or create new one
        const savedUser = localStorage.getItem(STORAGE_KEY);
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            if (parsed.email === email) {
                setUser(parsed);
                return {};
            }
        }

        // Create new mock user
        const mockUser = createMockUser(email, email.split("@")[0]);
        setUser(mockUser);
        return {};
    };

    // Mock signup
    const signup = async (email: string, password: string, name: string): Promise<{ error?: string }> => {
        if (!email.includes("@")) {
            return { error: "Invalid email format" };
        }
        if (password.length < 6) {
            return { error: "Password must be at least 6 characters" };
        }
        if (!name.trim()) {
            return { error: "Name is required" };
        }

        const mockUser = createMockUser(email, name);
        setUser(mockUser);
        return {};
    };

    // Mock Google login - creates a demo user
    const loginWithGoogle = async (): Promise<void> => {
        const mockUser = createMockUser("demo@artico.app", "Demo User");
        setUser(mockUser);
    };

    // Logout
    const logout = async (): Promise<void> => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    // Update local user state
    const updateUser = (updates: Partial<User>): void => {
        if (user) {
            setUser({ ...user, ...updates });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                login,
                signup,
                loginWithGoogle,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
