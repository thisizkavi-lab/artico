// Notification data and types

export type NotificationType =
    | "follow"
    | "like"
    | "comment"
    | "view"
    | "request"
    | "suggestion";

export interface Notification {
    id: string;
    type: NotificationType;
    fromUser: {
        id: string;
        name: string;
        avatar?: string;
    };
    message: string;
    read: boolean;
    createdAt: string;
    postId?: string;
}

// Notification type config
export const notificationConfig: Record<NotificationType, { icon: string; color: string }> = {
    follow: { icon: "👤", color: "bg-blue-100 text-blue-600" },
    like: { icon: "❤️", color: "bg-red-100 text-red-600" },
    comment: { icon: "💬", color: "bg-green-100 text-green-600" },
    view: { icon: "👁️", color: "bg-purple-100 text-purple-600" },
    request: { icon: "🤝", color: "bg-amber-100 text-amber-600" },
    suggestion: { icon: "✨", color: "bg-pink-100 text-pink-600" },
};

// Mock notifications
const mockNotifications: Notification[] = [
    {
        id: "n1",
        type: "follow",
        fromUser: { id: "user1", name: "Sarah Kim" },
        message: "started following you",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
        id: "n2",
        type: "like",
        fromUser: { id: "user2", name: "Carlos M." },
        message: "liked your post",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        postId: "p1",
    },
    {
        id: "n3",
        type: "comment",
        fromUser: { id: "user3", name: "Yuki Tanaka" },
        message: "commented: \"Great progress! 🎉\"",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        postId: "p1",
    },
    {
        id: "n4",
        type: "view",
        fromUser: { id: "user4", name: "Ahmed Hassan" },
        message: "viewed your profile",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    },
    {
        id: "n5",
        type: "request",
        fromUser: { id: "user5", name: "Maria García" },
        message: "sent you a friend request",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
        id: "n6",
        type: "suggestion",
        fromUser: { id: "user6", name: "Wei Chen" },
        message: "has similar interests as you. Add them!",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    },
];

// localStorage key
const NOTIFICATIONS_KEY = "artico-notifications";

// Initialize
function initializeNotifications() {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(NOTIFICATIONS_KEY)) {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(mockNotifications));
    }
}

// Get all notifications
export function getNotifications(): Notification[] {
    if (typeof window === "undefined") return mockNotifications;
    initializeNotifications();
    return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || "[]");
}

// Get unread count
export function getUnreadCount(): number {
    return getNotifications().filter(n => !n.read).length;
}

// Mark as read
export function markAsRead(notificationId: string): void {
    const notifications = getNotifications();
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
        notifications[index].read = true;
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
    }
}

// Mark all as read
export function markAllAsRead(): void {
    const notifications = getNotifications();
    notifications.forEach(n => n.read = true);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
}

// Format relative time
export function formatNotificationTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}
