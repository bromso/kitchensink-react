"use client"

import { Icon } from "@iconify/react"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { Skeleton } from "@repo/ui/components/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip"
import { formatDistanceToNow } from "date-fns"
import { useState } from "react"
import {
  type UserNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useUnreadNotifications,
} from "@/data/hooks"
import { useCurrentUser } from "@/hooks/use-current-user"

// Icon mapping for notification types
const notificationIcons: Record<string, string> = {
  comment: "lucide:message-circle",
  review: "lucide:check-circle",
  mention: "lucide:at-sign",
  approval: "lucide:thumbs-up",
  rejection: "lucide:x-circle",
  default: "lucide:bell",
}

function getNotificationIcon(type: string): string {
  return notificationIcons[type] || notificationIcons.default
}

function formatTimestamp(dateString: string): string {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  } catch {
    return dateString
  }
}

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false)

  // Get current user for notification queries
  const { user, loading: userLoading } = useCurrentUser()

  // Fetch notifications using GraphQL hook
  const {
    notifications,
    unreadCount,
    loading: notificationsLoading,
    refetch,
    isUsingMockData,
  } = useUnreadNotifications(user?.id ?? null)

  // Mutation hooks for marking as read
  const { markAsRead: markAsReadMutation, localMarkedIds } = useMarkNotificationRead()
  const { markAllAsRead: markAllAsReadMutation } = useMarkAllNotificationsRead()

  const loading = userLoading || notificationsLoading

  // Filter out locally marked notifications for optimistic UI
  const displayNotifications = notifications.filter((n) => !localMarkedIds.has(n.id))
  const displayUnreadCount = Math.max(0, unreadCount - localMarkedIds.size)

  const handleMarkAsRead = async (id: string) => {
    await markAsReadMutation(id)
  }

  const handleMarkAllAsRead = async () => {
    if (user?.id) {
      await markAllAsReadMutation(user.id)
      // Refetch to get updated list
      refetch()
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Icon icon="lucide:bell" className="h-5 w-5" />
              {displayUnreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-medium"
                >
                  {displayUnreadCount > 9 ? "9+" : displayUnreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Notifications</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 bg-popover border border-border shadow-lg"
        sideOffset={8}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">Notifications</h3>
          {displayUnreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="text-sm">
              Mark all as read
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <NotificationSkeleton />
          ) : displayNotifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Icon icon="lucide:bell" className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            displayNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          )}
        </div>

        {displayNotifications.length > 0 && (
          <div className="p-3 border-t bg-muted/30">
            <Button
              variant="ghost"
              className="w-full text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              See all notifications
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Skeleton loading state for notifications
function NotificationSkeleton() {
  return (
    <div className="space-y-0">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-start gap-3 p-4 border-b last:border-b-0">
          <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Individual notification item component
interface NotificationItemProps {
  notification: UserNotification
  onMarkAsRead: (id: string) => void
}

function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  return (
    <div
      className={`group relative flex items-start gap-3 p-4 hover:bg-accent transition-colors border-b last:border-b-0 ${
        !notification.isRead ? "bg-accent/20" : ""
      }`}
    >
      <div className="h-10 w-10 flex-shrink-0 rounded-full bg-muted flex items-center justify-center">
        <Icon icon={getNotificationIcon(notification.type)} className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm leading-relaxed">
            <span className="font-medium">{notification.title}</span>
          </p>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{notification.message}</p>

        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(notification.createdAt)}
          </span>
          {!notification.isRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkAsRead(notification.id)}
              className="h-6 px-2 text-xs"
            >
              <Icon icon="lucide:check" className="h-3 w-3 mr-1" />
              Mark as read
            </Button>
          )}
        </div>

        {!notification.isRead && (
          <div className="absolute right-4 top-6 w-2 h-2 bg-primary rounded-full" />
        )}
      </div>
    </div>
  )
}
