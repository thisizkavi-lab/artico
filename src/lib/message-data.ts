// Message data and types

export interface Message {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    type: "text" | "voice" | "image" | "file";
    createdAt: string;
    read: boolean;
}

export interface Conversation {
    id: string;
    participant: {
        id: string;
        name: string;
        avatar?: string;
        online: boolean;
    };
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    theme: MessageTheme;
}

export type MessageTheme = "default" | "ocean" | "sunset" | "forest" | "purple";

export const messageThemes: { id: MessageTheme; name: string; bg: string; bubble: string }[] = [
    { id: "default", name: "Default", bg: "bg-white", bubble: "bg-primary" },
    { id: "ocean", name: "Ocean", bg: "bg-gradient-to-b from-blue-50 to-cyan-50", bubble: "bg-cyan-500" },
    { id: "sunset", name: "Sunset", bg: "bg-gradient-to-b from-orange-50 to-pink-50", bubble: "bg-orange-500" },
    { id: "forest", name: "Forest", bg: "bg-gradient-to-b from-green-50 to-emerald-50", bubble: "bg-emerald-500" },
    { id: "purple", name: "Purple", bg: "bg-gradient-to-b from-purple-50 to-indigo-50", bubble: "bg-purple-500" },
];

// Mock conversations
const mockConversations: Conversation[] = [
    {
        id: "conv1",
        participant: { id: "user1", name: "Sarah Kim", online: true },
        lastMessage: "Hey! How's your pronunciation practice going?",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        unreadCount: 2,
        theme: "default",
    },
    {
        id: "conv2",
        participant: { id: "user2", name: "Carlos M.", online: false },
        lastMessage: "Thanks for the tip! 🙏",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        unreadCount: 0,
        theme: "ocean",
    },
    {
        id: "conv3",
        participant: { id: "user3", name: "Yuki Tanaka", online: true },
        lastMessage: "Let's practice together tomorrow!",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        unreadCount: 0,
        theme: "forest",
    },
];

// Mock messages for each conversation
const mockMessages: Record<string, Message[]> = {
    conv1: [
        { id: "m1", senderId: "user1", receiverId: "current-user", content: "Hey! How's your pronunciation practice going?", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(), read: false },
        { id: "m2", senderId: "current-user", receiverId: "user1", content: "Pretty good! Just finished the Alphabets module 🎉", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(), read: true },
        { id: "m3", senderId: "user1", receiverId: "current-user", content: "That's awesome! The TH sounds are so tricky 😅", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), read: false },
    ],
    conv2: [
        { id: "m4", senderId: "current-user", receiverId: "user2", content: "Hey Carlos! Try slowing down the speech rate", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), read: true },
        { id: "m5", senderId: "user2", receiverId: "current-user", content: "Thanks for the tip! 🙏", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), read: true },
    ],
    conv3: [
        { id: "m6", senderId: "user3", receiverId: "current-user", content: "Hi! I saw your post about tongue twisters", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), read: true },
        { id: "m7", senderId: "current-user", receiverId: "user3", content: "Yeah! They're really helpful for muscle memory", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 - 1000 * 60 * 30).toISOString(), read: true },
        { id: "m8", senderId: "user3", receiverId: "current-user", content: "Let's practice together tomorrow!", type: "text", createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), read: true },
    ],
};

// localStorage keys
const CONVERSATIONS_KEY = "artico-conversations";
const MESSAGES_KEY = "artico-messages";

// Initialize
function initializeMessages() {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(CONVERSATIONS_KEY)) {
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(mockConversations));
    }
    if (!localStorage.getItem(MESSAGES_KEY)) {
        localStorage.setItem(MESSAGES_KEY, JSON.stringify(mockMessages));
    }
}

// Get all conversations
export function getConversations(): Conversation[] {
    if (typeof window === "undefined") return mockConversations;
    initializeMessages();
    return JSON.parse(localStorage.getItem(CONVERSATIONS_KEY) || "[]");
}

// Get messages for a conversation
export function getMessages(conversationId: string): Message[] {
    if (typeof window === "undefined") return mockMessages[conversationId] || [];
    initializeMessages();
    const allMessages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || "{}");
    return allMessages[conversationId] || [];
}

// Send message
export function sendMessage(conversationId: string, content: string, type: "text" | "voice" | "image" | "file" = "text"): Message {
    initializeMessages();
    const allMessages = JSON.parse(localStorage.getItem(MESSAGES_KEY) || "{}");
    const conversations = getConversations();

    const newMessage: Message = {
        id: Date.now().toString(),
        senderId: "current-user",
        receiverId: conversations.find(c => c.id === conversationId)?.participant.id || "",
        content,
        type,
        createdAt: new Date().toISOString(),
        read: true,
    };

    if (!allMessages[conversationId]) {
        allMessages[conversationId] = [];
    }
    allMessages[conversationId].push(newMessage);
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(allMessages));

    // Update conversation last message
    const convIndex = conversations.findIndex(c => c.id === conversationId);
    if (convIndex !== -1) {
        conversations[convIndex].lastMessage = content;
        conversations[convIndex].lastMessageTime = newMessage.createdAt;
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    }

    return newMessage;
}

// Get total unread count
export function getTotalUnreadMessages(): number {
    return getConversations().reduce((sum, c) => sum + c.unreadCount, 0);
}

// Mark conversation as read
export function markConversationAsRead(conversationId: string): void {
    const conversations = getConversations();
    const index = conversations.findIndex(c => c.id === conversationId);
    if (index !== -1) {
        conversations[index].unreadCount = 0;
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    }
}

// Update theme
export function updateConversationTheme(conversationId: string, theme: MessageTheme): void {
    const conversations = getConversations();
    const index = conversations.findIndex(c => c.id === conversationId);
    if (index !== -1) {
        conversations[index].theme = theme;
        localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
    }
}

// Format time
export function formatMessageTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function formatConversationTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 24) return formatMessageTime(dateString);
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString();
}
