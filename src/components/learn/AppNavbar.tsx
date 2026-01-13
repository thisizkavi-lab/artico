"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { languageInfo } from "@/lib/translations";
import { getUnreadCount, getNotifications, markAsRead, markAllAsRead, notificationConfig, formatNotificationTime, Notification } from "@/lib/notification-data";
import { getTotalUnreadMessages, getConversations, getMessages, sendMessage, markConversationAsRead, updateConversationTheme, messageThemes, formatConversationTime, formatMessageTime, Conversation, Message, MessageTheme } from "@/lib/message-data";
import FriendDiscovery from "@/components/profile/FriendDiscovery";

interface AppNavbarProps {
    activeTab: "learn" | "practice" | "community";
}

export default function AppNavbar({ activeTab }: AppNavbarProps) {
    const { user } = useAuth();
    const { language, setLanguage } = useLanguage();
    const [mounted, setMounted] = useState(false);

    // Panel states
    const [showFindFriends, setShowFindFriends] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [showLanguage, setShowLanguage] = useState(false);

    // Data states
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [conversations, setConversations] = useState<Conversation[]>([]);

    // Messages state
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        setMounted(true);
        refreshData();
    }, []);

    const refreshData = () => {
        setUnreadNotifications(getUnreadCount());
        setUnreadMessages(getTotalUnreadMessages());
        setNotifications(getNotifications());
        setConversations(getConversations());
    };

    const closeAllPanels = () => {
        setShowNotifications(false);
        setShowMessages(false);
        setShowLanguage(false);
    };

    const handleOpenNotifications = () => {
        closeAllPanels();
        setShowNotifications(true);
        setNotifications(getNotifications());
    };

    const handleOpenMessages = () => {
        closeAllPanels();
        setShowMessages(true);
        setConversations(getConversations());
    };

    const handleOpenLanguage = () => {
        closeAllPanels();
        setShowLanguage(true);
    };

    const handleSelectConversation = (conv: Conversation) => {
        setSelectedConversation(conv);
        setMessages(getMessages(conv.id));
        markConversationAsRead(conv.id);
        setConversations(getConversations());
        setUnreadMessages(getTotalUnreadMessages());
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;
        sendMessage(selectedConversation.id, newMessage.trim());
        setMessages(getMessages(selectedConversation.id));
        setNewMessage("");
        setConversations(getConversations());
    };

    const handleMarkNotificationRead = (notifId: string) => {
        markAsRead(notifId);
        setNotifications(getNotifications());
        setUnreadNotifications(getUnreadCount());
    };

    const handleMarkAllRead = () => {
        markAllAsRead();
        setNotifications(getNotifications());
        setUnreadNotifications(getUnreadCount());
    };

    if (!mounted) return null;

    return (
        <>
            <nav className="bg-white border-b border-gray-custom-100 px-6 py-3 sticky top-0 z-40">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    {/* Tabs */}
                    <div className="flex items-center gap-1">
                        <Link
                            href="/learn"
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === "learn"
                                ? "bg-amber-100 text-dark"
                                : "text-gray-custom-500 hover:bg-gray-custom-50"
                                }`}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                            </svg>
                            learn
                        </Link>

                        <Link
                            href="/practice"
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === "practice"
                                ? "bg-amber-100 text-dark"
                                : "text-gray-custom-500 hover:bg-gray-custom-50"
                                }`}
                        >
                            practice
                        </Link>

                        <Link
                            href="/community"
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${activeTab === "community"
                                ? "bg-amber-100 text-dark"
                                : "text-gray-custom-500 hover:bg-gray-custom-50"
                                }`}
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                            community
                        </Link>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        {/* Find Friends */}
                        <button
                            onClick={() => setShowFindFriends(true)}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-custom-500 hover:bg-gray-custom-50 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                <circle cx="8.5" cy="7" r="4" />
                                <line x1="20" y1="8" x2="20" y2="14" />
                                <line x1="23" y1="11" x2="17" y2="11" />
                            </svg>
                        </button>

                        {/* Notifications */}
                        <button
                            onClick={handleOpenNotifications}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-custom-500 hover:bg-gray-custom-50 transition-colors relative"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 01-3.46 0" />
                            </svg>
                            {unreadNotifications > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                                </span>
                            )}
                        </button>

                        {/* Messages */}
                        <button
                            onClick={handleOpenMessages}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-custom-500 hover:bg-gray-custom-50 transition-colors relative"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                            </svg>
                            {unreadMessages > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {unreadMessages > 9 ? "9+" : unreadMessages}
                                </span>
                            )}
                        </button>

                        {/* Language */}
                        <button
                            onClick={handleOpenLanguage}
                            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-custom-500 hover:bg-gray-custom-50 transition-colors"
                        >
                            <span className="text-sm font-bold">文A</span>
                        </button>

                        {/* Profile */}
                        <Link
                            href="/profile"
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm"
                        >
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Find Friends Modal */}
            {showFindFriends && (
                <FriendDiscovery onClose={() => setShowFindFriends(false)} />
            )}

            {/* Notifications Panel */}
            {showNotifications && (
                <div className="fixed inset-0 z-50" onClick={() => setShowNotifications(false)}>
                    <div className="absolute right-4 top-16 w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-custom-100 overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-custom-100">
                            <h3 className="font-bold text-dark">Notifications</h3>
                            {unreadNotifications > 0 && (
                                <button onClick={handleMarkAllRead} className="text-sm text-primary hover:underline">
                                    Mark all read
                                </button>
                            )}
                        </div>
                        <div className="overflow-y-auto max-h-[calc(70vh-50px)]">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center text-gray-custom-500">
                                    No notifications yet
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => handleMarkNotificationRead(notif.id)}
                                        className={`flex items-start gap-3 px-4 py-3 hover:bg-gray-custom-50 cursor-pointer ${!notif.read ? "bg-blue-50/50" : ""}`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${notificationConfig[notif.type].color}`}>
                                            {notificationConfig[notif.type].icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-dark">
                                                <span className="font-semibold">{notif.fromUser.name}</span>{" "}
                                                {notif.message}
                                            </p>
                                            <p className="text-xs text-gray-custom-400 mt-0.5">
                                                {formatNotificationTime(notif.createdAt)}
                                            </p>
                                        </div>
                                        {!notif.read && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Panel */}
            {showMessages && (
                <div className="fixed inset-0 z-50" onClick={() => { setShowMessages(false); setSelectedConversation(null); }}>
                    <div
                        className="absolute right-4 top-16 w-96 h-[70vh] bg-white rounded-2xl shadow-2xl border border-gray-custom-100 overflow-hidden flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {!selectedConversation ? (
                            <>
                                <div className="px-4 py-3 border-b border-gray-custom-100">
                                    <h3 className="font-bold text-dark">Messages</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    {conversations.length === 0 ? (
                                        <div className="p-8 text-center text-gray-custom-500">
                                            No messages yet
                                        </div>
                                    ) : (
                                        conversations.map((conv) => (
                                            <button
                                                key={conv.id}
                                                onClick={() => handleSelectConversation(conv)}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-custom-50 text-left"
                                            >
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                                                        {conv.participant.name.charAt(0)}
                                                    </div>
                                                    {conv.participant.online && (
                                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold text-dark">{conv.participant.name}</p>
                                                        <span className="text-xs text-gray-custom-400">{formatConversationTime(conv.lastMessageTime)}</span>
                                                    </div>
                                                    <p className="text-sm text-gray-custom-500 truncate">{conv.lastMessage}</p>
                                                </div>
                                                {conv.unreadCount > 0 && (
                                                    <div className="w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center">
                                                        {conv.unreadCount}
                                                    </div>
                                                )}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </>
                        ) : (
                            <ChatView
                                conversation={selectedConversation}
                                messages={messages}
                                newMessage={newMessage}
                                onNewMessageChange={setNewMessage}
                                onSendMessage={handleSendMessage}
                                onBack={() => setSelectedConversation(null)}
                                onRefresh={() => setMessages(getMessages(selectedConversation.id))}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Language Panel */}
            {showLanguage && (
                <div className="fixed inset-0 z-50" onClick={() => setShowLanguage(false)}>
                    <div className="absolute right-4 top-16 w-72 bg-white rounded-2xl shadow-2xl border border-gray-custom-100 overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="px-4 py-3 border-b border-gray-custom-100">
                            <h3 className="font-bold text-dark">Language</h3>
                            <p className="text-xs text-gray-custom-500">Translate explanations only</p>
                        </div>
                        <div className="py-2">
                            {Object.entries(languageInfo).map(([code, info]) => (
                                <button
                                    key={code}
                                    onClick={() => { setLanguage(code); setShowLanguage(false); }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-custom-50 text-left ${language === code ? "bg-primary/10" : ""}`}
                                >
                                    <span className="text-xl">{info.flag}</span>
                                    <span className={`font-medium ${language === code ? "text-primary" : "text-dark"}`}>
                                        {info.nativeName}
                                    </span>
                                    {language === code && (
                                        <svg className="w-5 h-5 text-primary ml-auto" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Chat View Component
interface ChatViewProps {
    conversation: Conversation;
    messages: Message[];
    newMessage: string;
    onNewMessageChange: (value: string) => void;
    onSendMessage: () => void;
    onBack: () => void;
    onRefresh: () => void;
}

function ChatView({ conversation, messages, newMessage, onNewMessageChange, onSendMessage, onBack, onRefresh }: ChatViewProps) {
    const [showThemes, setShowThemes] = useState(false);
    const theme = messageThemes.find(t => t.id === conversation.theme) || messageThemes[0];

    const handleChangeTheme = (themeId: MessageTheme) => {
        updateConversationTheme(conversation.id, themeId);
        onRefresh();
        setShowThemes(false);
    };

    return (
        <div className={`flex flex-col h-full ${theme.bg}`}>
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-custom-100">
                <button onClick={onBack} className="p-1 hover:bg-gray-custom-100 rounded-full">
                    <svg className="w-5 h-5 text-gray-custom-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                        {conversation.participant.name.charAt(0)}
                    </div>
                    {conversation.participant.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-dark">{conversation.participant.name}</p>
                    <p className="text-xs text-gray-custom-500">{conversation.participant.online ? "Online" : "Offline"}</p>
                </div>
                <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-custom-100 rounded-full text-gray-custom-500">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
                        </svg>
                    </button>
                    <button className="p-2 hover:bg-gray-custom-100 rounded-full text-gray-custom-500">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
                        </svg>
                    </button>
                    <button onClick={() => setShowThemes(!showThemes)} className="p-2 hover:bg-gray-custom-100 rounded-full text-gray-custom-500">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Theme Selector */}
            {showThemes && (
                <div className="flex gap-2 px-4 py-2 bg-white border-b border-gray-custom-100">
                    {messageThemes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => handleChangeTheme(t.id)}
                            className={`w-8 h-8 rounded-full ${t.bubble} ${conversation.theme === t.id ? "ring-2 ring-offset-2 ring-primary" : ""}`}
                        />
                    ))}
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.senderId === "current-user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[75%] px-4 py-2 rounded-2xl ${msg.senderId === "current-user"
                                ? `${theme.bubble} text-white`
                                : "bg-white text-dark"
                            }`}>
                            <p className="text-sm">{msg.content}</p>
                            <p className={`text-xs mt-1 ${msg.senderId === "current-user" ? "text-white/70" : "text-gray-custom-400"}`}>
                                {formatMessageTime(msg.createdAt)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-gray-custom-100">
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-custom-500 hover:bg-gray-custom-100 rounded-full">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                        </svg>
                    </button>
                    <button className="p-2 text-gray-custom-500 hover:bg-gray-custom-100 rounded-full">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
                        </svg>
                    </button>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => onNewMessageChange(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && onSendMessage()}
                        placeholder="Message..."
                        className="flex-1 px-4 py-2 bg-gray-custom-100 rounded-full focus:outline-none text-sm"
                    />
                    <button
                        onClick={onSendMessage}
                        disabled={!newMessage.trim()}
                        className="p-2 text-primary hover:bg-primary/10 rounded-full disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
