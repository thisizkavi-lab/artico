"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    DiscoverableUser,
    getUndiscoveredUsers,
    addFriend,
    skipUser,
    getLevelColor,
    getLevelEmoji,
    resetDiscovery,
} from "@/lib/discover-data";

interface FriendDiscoveryProps {
    onClose?: () => void;
    embedded?: boolean;
    onFriendAdded?: () => void;
}

export default function FriendDiscovery({ onClose, embedded = false, onFriendAdded }: FriendDiscoveryProps) {
    const [users, setUsers] = useState<DiscoverableUser[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef(0);

    useEffect(() => {
        setUsers(getUndiscoveredUsers());
    }, []);

    const currentUser = users[currentIndex];

    const handleSwipe = useCallback((direction: "left" | "right") => {
        if (!currentUser) return;

        setSwipeDirection(direction);

        setTimeout(() => {
            if (direction === "right") {
                addFriend(currentUser.id);
                onFriendAdded?.();
            } else {
                skipUser(currentUser.id);
            }

            setSwipeDirection(null);
            setDragOffset(0);

            if (currentIndex < users.length - 1) {
                setCurrentIndex((prev) => prev + 1);
            } else {
                resetDiscovery();
                setUsers(getUndiscoveredUsers());
                setCurrentIndex(0);
            }
        }, 300);
    }, [currentUser, currentIndex, users.length, onFriendAdded]);

    const handleDragStart = (clientX: number) => {
        setIsDragging(true);
        startXRef.current = clientX;
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging) return;
        const diff = clientX - startXRef.current;
        setDragOffset(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const threshold = 100;
        if (dragOffset > threshold) {
            handleSwipe("right");
        } else if (dragOffset < -threshold) {
            handleSwipe("left");
        } else {
            setDragOffset(0);
        }
    };

    const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => {
        if (isDragging) handleDragEnd();
    };

    const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    const rotation = dragOffset * 0.1;
    const opacity = Math.max(0, 1 - Math.abs(dragOffset) / 300);

    if (!currentUser) {
        return (
            <div className={embedded ? "" : "fixed inset-0 bg-ink/50 z-50 flex items-center justify-center p-4"}>
                <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h2 className="font-bold text-2xl text-ink mb-2">All caught up!</h2>
                    <p className="text-dust mb-6">You've seen everyone. Check back later!</p>
                    {!embedded && onClose && (
                        <button
                            onClick={onClose}
                            className="px-8 py-3 bg-cocoa text-white font-medium rounded-full"
                        >
                            Done
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // Embedded mode
    if (embedded) {
        return (
            <div className="flex flex-col items-center">
                {/* Card */}
                <div
                    ref={cardRef}
                    className="relative w-full max-w-sm cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{
                        transform: swipeDirection
                            ? `translateX(${swipeDirection === "right" ? 400 : -400}px) rotate(${swipeDirection === "right" ? 20 : -20}deg)`
                            : `translateX(${dragOffset}px) rotate(${rotation}deg)`,
                        opacity: swipeDirection ? 0 : opacity,
                        transition: swipeDirection || !isDragging ? "transform 0.3s, opacity 0.3s" : "none",
                    }}
                >
                    {/* Swipe indicators */}
                    {dragOffset > 50 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-cocoa text-white font-bold rounded-full text-sm z-10">
                            ✓ ADD FRIEND
                        </div>
                    )}
                    {dragOffset < -50 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-ash text-white font-bold rounded-full text-sm z-10">
                            ✗ SKIP
                        </div>
                    )}

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-divider">
                        {/* Avatar Section */}
                        <div className="bg-cocoa p-8 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-4xl border-4 border-white/30">
                                {currentUser.displayName.charAt(0)}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-6">
                            <div className="text-center mb-4">
                                <h2 className="font-bold text-2xl text-ink">{currentUser.displayName}</h2>
                                <p className="text-dust">@{currentUser.username}</p>
                            </div>

                            {/* Level Badge */}
                            <div className="flex justify-center mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(currentUser.level)}`}>
                                    {getLevelEmoji(currentUser.level)} {currentUser.level}
                                </span>
                            </div>

                            {/* Bio */}
                            <p className="text-ash text-center mb-4 leading-relaxed">
                                {currentUser.bio}
                            </p>

                            {/* Interests */}
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {currentUser.interests.map((interest) => (
                                    <span
                                        key={interest}
                                        className="px-3 py-1 bg-pebble text-ash rounded-full text-xs"
                                    >
                                        {interest}
                                    </span>
                                ))}
                            </div>

                            {/* Mutual Friends */}
                            {currentUser.mutualFriends > 0 && (
                                <p className="text-center text-sm text-dust">
                                    👥 {currentUser.mutualFriends} mutual friends
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Counter */}
                <p className="text-sm text-dust mt-4 mb-4">{currentIndex + 1} of {users.length}</p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-6 mb-4">
                    <button
                        onClick={() => handleSwipe("left")}
                        className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-ash hover:bg-pebble transition-colors border-2 border-divider hover:border-ash"
                    >
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => handleSwipe("right")}
                        className="w-14 h-14 rounded-full bg-cocoa shadow-lg flex items-center justify-center text-white transition-colors"
                    >
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                    </button>
                </div>

                {/* Instructions */}
                <p className="text-center text-sm text-dust">
                    Swipe right to add • Swipe left to skip
                </p>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-linen z-50">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-divider">
                <button onClick={onClose} className="flex items-center gap-2 text-ash hover:text-ink">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                </button>
                <h1 className="font-bold text-ink">Find Friends</h1>
                <p className="text-sm text-dust">{currentIndex + 1}/{users.length}</p>
            </div>

            {/* Card Stack */}
            <div className="flex-1 flex items-center justify-center p-6 h-[calc(100vh-140px)]">
                <div
                    ref={cardRef}
                    className="relative w-full max-w-sm cursor-grab active:cursor-grabbing select-none"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{
                        transform: swipeDirection
                            ? `translateX(${swipeDirection === "right" ? 400 : -400}px) rotate(${swipeDirection === "right" ? 20 : -20}deg)`
                            : `translateX(${dragOffset}px) rotate(${rotation}deg)`,
                        opacity: swipeDirection ? 0 : opacity,
                        transition: swipeDirection || !isDragging ? "transform 0.3s, opacity 0.3s" : "none",
                    }}
                >
                    {/* Swipe indicators */}
                    {dragOffset > 50 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-cocoa text-white font-bold rounded-full text-sm z-10">
                            ✓ ADD FRIEND
                        </div>
                    )}
                    {dragOffset < -50 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-ash text-white font-bold rounded-full text-sm z-10">
                            ✗ SKIP
                        </div>
                    )}

                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-divider">
                        {/* Avatar Section */}
                        <div className="bg-cocoa p-8 flex justify-center">
                            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-4xl border-4 border-white/30">
                                {currentUser.displayName.charAt(0)}
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-6">
                            <div className="text-center mb-4">
                                <h2 className="font-bold text-2xl text-ink">{currentUser.displayName}</h2>
                                <p className="text-dust">@{currentUser.username}</p>
                            </div>

                            {/* Level Badge */}
                            <div className="flex justify-center mb-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(currentUser.level)}`}>
                                    {getLevelEmoji(currentUser.level)} {currentUser.level}
                                </span>
                            </div>

                            {/* Bio */}
                            <p className="text-ash text-center mb-4 leading-relaxed">
                                {currentUser.bio}
                            </p>

                            {/* Interests */}
                            <div className="flex flex-wrap gap-2 justify-center mb-4">
                                {currentUser.interests.map((interest) => (
                                    <span
                                        key={interest}
                                        className="px-3 py-1 bg-pebble text-ash rounded-full text-xs"
                                    >
                                        {interest}
                                    </span>
                                ))}
                            </div>

                            {/* Mutual Friends */}
                            {currentUser.mutualFriends > 0 && (
                                <p className="text-center text-sm text-dust">
                                    👥 {currentUser.mutualFriends} mutual friends
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 pb-8">
                <button
                    onClick={() => handleSwipe("left")}
                    className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-ash hover:bg-pebble transition-colors border-2 border-divider hover:border-ash"
                >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                </button>
                <button
                    onClick={() => handleSwipe("right")}
                    className="w-16 h-16 rounded-full bg-cocoa shadow-lg flex items-center justify-center text-white transition-colors"
                >
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </button>
            </div>

            {/* Instructions */}
            <p className="text-center text-sm text-dust pb-4">
                Swipe right to add • Swipe left to skip
            </p>
        </div>
    );
}
