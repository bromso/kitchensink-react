// Notifications Mock Data

export interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "mention"
  user: {
    name: string
    avatar?: string
  }
  message: string
  timestamp: string
  read: boolean
}

export const notifications: Notification[] = [
  {
    id: "1",
    type: "like",
    user: { name: "Sarah Chen", avatar: "/avatars/avatar-1.webp" },
    message: "liked your photo",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "comment",
    user: { name: "Mike Johnson", avatar: "/avatars/avatar-2.webp" },
    message: 'commented on your post: "Great work on this project!"',
    timestamp: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    user: { name: "Emma Wilson", avatar: "/avatars/avatar-3.webp" },
    message: "started following you",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "mention",
    user: { name: "Alex Rodriguez", avatar: "/avatars/avatar-4.webp" },
    message: "mentioned you in a comment",
    timestamp: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "like",
    user: { name: "Lisa Park", avatar: "/avatars/avatar-5.webp" },
    message: "and 12 others liked your post",
    timestamp: "2 days ago",
    read: true,
  },
]

// Utility functions
export function getUnreadCount(notificationList: Notification[]): number {
  return notificationList.filter((n) => !n.read).length
}

export function markAsRead(notificationList: Notification[], id: string): Notification[] {
  return notificationList.map((n) => (n.id === id ? { ...n, read: true } : n))
}

export function markAllAsRead(notificationList: Notification[]): Notification[] {
  return notificationList.map((n) => ({ ...n, read: true }))
}
