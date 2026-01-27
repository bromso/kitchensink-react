"use client"

import { Icon } from "@iconify/react"
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert"
import { Button } from "@repo/ui/components/button"

interface GraphQLErrorProps {
  error: Error | null
  title?: string
  retry?: () => void
}

export function GraphQLError({ error, title = "Failed to load data", retry }: GraphQLErrorProps) {
  if (!error) return null

  return (
    <Alert variant="destructive">
      <Icon icon="lucide:alert-circle" className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span className="text-sm">{error.message}</span>
        {retry && (
          <Button variant="outline" size="sm" onClick={retry}>
            <Icon icon="lucide:refresh-cw" className="mr-2 h-3 w-3" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}

interface GraphQLEmptyStateProps {
  title?: string
  description?: string
  icon?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function GraphQLEmptyState({
  title = "No data found",
  description = "There's nothing here yet.",
  icon = "lucide:inbox",
  action,
}: GraphQLEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Icon icon={icon} className="mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  )
}

interface GraphQLLoadingProps {
  rows?: number
}

export function GraphQLLoading({ rows = 3 }: GraphQLLoadingProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-4 w-3/4 rounded bg-muted" />
          <div className="mt-2 h-3 w-1/2 rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}
