"use client"

import { useMutation, useQuery } from "@apollo/client/react"
import { useMemo, useState } from "react"
import {
  GET_UNREAD_USER_NOTIFICATIONS,
  GET_USER_NOTIFICATIONS,
  MARK_ALL_NOTIFICATIONS_READ,
  MARK_NOTIFICATION_READ,
} from "@/data/queries/assets"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// User notification type from Supabase (snake_case)
interface UserNotificationNode {
  id: string
  nodeId: string
  type: string
  title: string
  message: string
  link: string | null
  is_read: boolean
  user_id: string
  related_asset_id: string | null
  related_comment_id: string | null
  created_at: string
}

// App-friendly type with camelCase
export interface UserNotification {
  id: string
  nodeId: string
  type: string
  title: string
  message: string
  link: string | null
  isRead: boolean
  userId: string
  relatedAssetId: string | null
  relatedCommentId: string | null
  createdAt: string
}

interface UserNotificationsQueryResult {
  user_notificationsCollection: {
    edges: Array<{ cursor: string; node: UserNotificationNode }>
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor: string | null
      endCursor: string | null
    }
  } | null
}

interface MarkNotificationReadResult {
  updateuser_notificationsCollection: {
    records: Array<{ id: string; is_read: boolean }>
  }
}

interface MarkAllNotificationsReadResult {
  updateuser_notificationsCollection: {
    affectedCount: number
  }
}

// Type adapter - converts snake_case from Supabase to camelCase for app
function nodeToUserNotification(node: UserNotificationNode): UserNotification {
  return {
    id: node.id,
    nodeId: node.nodeId,
    type: node.type,
    title: node.title,
    message: node.message,
    link: node.link,
    isRead: node.is_read,
    userId: node.user_id,
    relatedAssetId: node.related_asset_id,
    relatedCommentId: node.related_comment_id,
    createdAt: node.created_at,
  }
}

// Mock data for when Supabase is not configured
const mockNotifications: UserNotification[] = [
  {
    id: "mock-notif-1",
    nodeId: "mock-node-1",
    type: "comment",
    title: "New comment",
    message: "John commented on your asset",
    link: "/assets/mock-asset-1",
    isRead: false,
    userId: "mock-user",
    relatedAssetId: "mock-asset-1",
    relatedCommentId: "mock-comment-1",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: "mock-notif-2",
    nodeId: "mock-node-2",
    type: "review",
    title: "Asset approved",
    message: "Your brand banner was approved",
    link: "/assets/mock-asset-2",
    isRead: false,
    userId: "mock-user",
    relatedAssetId: "mock-asset-2",
    relatedCommentId: null,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: "mock-notif-3",
    nodeId: "mock-node-3",
    type: "mention",
    title: "You were mentioned",
    message: "Sarah mentioned you in a discussion",
    link: "/campaigns/mock-campaign-1",
    isRead: true,
    userId: "mock-user",
    relatedAssetId: null,
    relatedCommentId: "mock-comment-2",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
]

/**
 * Hook to fetch user notifications
 */
export function useNotifications(userId: string | null) {
  const { data, loading, error, refetch } = useQuery<UserNotificationsQueryResult>(
    GET_USER_NOTIFICATIONS,
    {
      skip: !USE_REAL_DATA || !userId,
      variables: { userId, first: 20 },
      pollInterval: 60000, // Poll every minute for new notifications
    }
  )

  const notifications = useMemo(() => {
    if (!userId) return []

    if (!USE_REAL_DATA) {
      return mockNotifications
    }

    if (!data?.user_notificationsCollection?.edges) {
      return []
    }

    return data.user_notificationsCollection.edges.map((edge) => nodeToUserNotification(edge.node))
  }, [data, userId])

  return {
    notifications,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to fetch only unread notifications
 */
export function useUnreadNotifications(userId: string | null) {
  const { data, loading, error, refetch } = useQuery<UserNotificationsQueryResult>(
    GET_UNREAD_USER_NOTIFICATIONS,
    {
      skip: !USE_REAL_DATA || !userId,
      variables: { userId },
      pollInterval: 30000, // Poll every 30 seconds for unread
    }
  )

  const notifications = useMemo(() => {
    if (!userId) return []

    if (!USE_REAL_DATA) {
      return mockNotifications.filter((n) => !n.isRead)
    }

    if (!data?.user_notificationsCollection?.edges) {
      return []
    }

    return data.user_notificationsCollection.edges.map((edge) => nodeToUserNotification(edge.node))
  }, [data, userId])

  const unreadCount = notifications.length

  return {
    notifications,
    unreadCount,
    loading: USE_REAL_DATA ? loading : false,
    error,
    refetch,
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to mark a notification as read
 */
export function useMarkNotificationRead() {
  const [markReadMutation, { loading, error }] =
    useMutation<MarkNotificationReadResult>(MARK_NOTIFICATION_READ)
  const [localMarkedIds, setLocalMarkedIds] = useState<Set<string>>(new Set())

  const markAsRead = async (notificationId: string) => {
    if (!USE_REAL_DATA) {
      // For mock data, track locally
      setLocalMarkedIds((prev) => new Set(prev).add(notificationId))
      return true
    }

    try {
      await markReadMutation({
        variables: { id: notificationId },
      })
      return true
    } catch (err) {
      console.error("Failed to mark notification as read:", err)
      return false
    }
  }

  return {
    markAsRead,
    loading,
    error,
    localMarkedIds, // Useful for optimistic UI updates
    isUsingMockData: !USE_REAL_DATA,
  }
}

/**
 * Hook to mark all notifications as read
 */
export function useMarkAllNotificationsRead() {
  const [markAllReadMutation, { loading, error }] = useMutation<MarkAllNotificationsReadResult>(
    MARK_ALL_NOTIFICATIONS_READ
  )
  const [allMarked, setAllMarked] = useState(false)

  const markAllAsRead = async (userId: string) => {
    if (!USE_REAL_DATA) {
      // For mock data, track locally
      setAllMarked(true)
      return true
    }

    try {
      await markAllReadMutation({
        variables: { userId },
      })
      return true
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err)
      return false
    }
  }

  return {
    markAllAsRead,
    loading,
    error,
    allMarked,
    isUsingMockData: !USE_REAL_DATA,
  }
}
