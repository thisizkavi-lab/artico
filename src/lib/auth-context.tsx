"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    level: number;
    xp: number;
    streak: number;
    lessonsCompleted: number;
    minutesToday: number;
    joinedAt: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, name?: string) => Promise<void>;
    signup: (email: string, name: string) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "artico-user";

// Generate a mock user for demo
function createMockUser(email: string, name?: string): User {
    return {
        id: Math.random().toString(36).substring(2, 9),
        name: name || email.split("@")[0],
        email,
        avatar: undefined,
        level: 1,
        xp: 0,
        streak: 1,
        lessonsCompleted: 0,
        minutesToday: 0,
        joinedAt: new Date().toISOString(),
    };
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    // Persist user changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        }
    }, [user]);

    const login = async (email: string, name?: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Check if user exists in storage (returning user)
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const existingUser = JSON.parse(stored);
            if (existingUser.email === email) {
                setUser(existingUser);
                return;
            }
        }

        // New login - create mock user
        const newUser = createMockUser(email, name);
        setUser(newUser);
    };

    const signup = async (email: string, name: string) => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const newUser = createMockUser(email, name);
        setUser(newUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
    };

    const updateUser = (updates: Partial<User>) => {
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
