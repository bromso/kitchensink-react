"use client"

import { Icon } from "@iconify/react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/animate-ui/components/radix/dialog"
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsContents,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@repo/ui/components/animated-ui/animate/tabs"
import { Avatar, AvatarFallback } from "@repo/ui/components/avatar"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Dropzone } from "@repo/ui/components/dropzone"
import { Progress } from "@repo/ui/components/progress"
import { ScrollArea } from "@repo/ui/components/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip"
import { cn } from "@repo/ui/lib/utils"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useArtefact } from "@/data/hooks"
import {
  type Artefact,
  type ArtefactType,
  artefactStatuses,
  artefactTypes,
} from "@/data/mock/campaigns"

export interface ArtefactPreviewProps {
  /** Artefact ID to preview */
  artefactId?: string | null
  /** Additional class names */
  className?: string
}

function getArtefactIcon(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.icon || "tabler:file"
}

function getArtefactTypeLabel(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.label || type
}

function getStatusInfo(status: Artefact["status"]) {
  const statusConfig = artefactStatuses.find((s) => s.value === status)
  return {
    label: statusConfig?.label || status,
    icon: statusConfig?.icon || "tabler:circle",
  }
}

function getStatusVariant(
  status: Artefact["status"]
): "default" | "secondary" | "outline" | "destructive" {
  switch (status) {
    case "published":
      return "default"
    case "approved":
      return "secondary"
    case "review":
      return "outline"
    default:
      return "outline"
  }
}

function isImageSrc(src: string | undefined | null): boolean {
  if (!src || src.trim() === "") return false

  // Must start with / (local path) or http(s):// (external URL)
  const isValidPath = src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")
  if (!isValidPath) return false

  const imageExtensions = [".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"]
  return imageExtensions.some((ext) => src.toLowerCase().endsWith(ext))
}

// Comment component
interface CommentProps {
  initials: string
  name: string
  timestamp: string
  message: string
  isCurrentUser?: boolean
  avatarColor?: string
}

function Comment({
  initials,
  name,
  timestamp,
  message,
  isCurrentUser = false,
  avatarColor = "bg-muted",
}: CommentProps) {
  return (
    <div className={cn("flex gap-2", isCurrentUser ? "flex-row-reverse" : "flex-row")}>
      {!isCurrentUser && (
        <Avatar className="h-7 w-7 shrink-0">
          <AvatarFallback className={cn("text-[10px] font-medium", avatarColor)}>
            {initials}
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex max-w-[85%] flex-col gap-1", isCurrentUser && "items-end")}>
        {!isCurrentUser && <p className="text-muted-foreground px-1 text-[10px]">{name}</p>}
        <div
          className={cn(
            "rounded-2xl px-3 py-2 text-sm",
            isCurrentUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-bl-sm"
          )}
        >
          {message}
        </div>
        <p className="text-muted-foreground px-1 text-[10px]">{timestamp}</p>
      </div>
    </div>
  )
}

// Version component
interface VersionProps {
  version: string
  description: string
  date: string
  fileInfo: string
  isCurrent?: boolean
  isOriginal?: boolean
  isCurrentUser?: boolean
  authorName?: string
  authorColor?: string
}

function Version({
  version,
  description,
  date,
  fileInfo,
  isCurrent = false,
  isOriginal = false,
  isCurrentUser = false,
  authorName,
  authorColor = "bg-emerald-500/10 text-emerald-600",
}: VersionProps) {
  return (
    <div
      className={cn(
        "rounded-md border p-3",
        isCurrentUser && "bg-primary/5 border-primary/20",
        !isCurrent && "opacity-60"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded",
            isCurrent ? "bg-primary/10" : "bg-muted"
          )}
        >
          <Icon
            icon={isCurrent ? "lucide:file-check" : "lucide:file"}
            className={cn("h-5 w-5", isCurrent ? "text-primary" : "text-muted-foreground")}
          />
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">{version}</p>
            {isCurrent && (
              <Badge className="h-5 bg-emerald-500/10 px-1.5 text-[10px] text-emerald-600 hover:bg-emerald-500/10">
                Current
              </Badge>
            )}
            {isOriginal && (
              <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                Original
              </Badge>
            )}
            {isCurrentUser ? (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary h-5 px-1.5 text-[10px]"
              >
                You
              </Badge>
            ) : (
              authorName && (
                <Badge className={cn("h-5 px-1.5 text-[10px] hover:opacity-100", authorColor)}>
                  {authorName}
                </Badge>
              )
            )}
          </div>
          <CardDescription className="text-xs">{description}</CardDescription>
          <div className="flex items-center gap-3 pt-1">
            <span className="text-muted-foreground text-[10px]">{date}</span>
            <span className="text-muted-foreground text-[10px]">{fileInfo}</span>
          </div>
        </div>
        {isCurrent ? (
          <Icon icon="lucide:check-circle" className="text-primary h-4 w-4 shrink-0" />
        ) : (
          <Button variant="ghost" size="sm" className="h-7 shrink-0 text-xs">
            Restore
          </Button>
        )}
      </div>
    </div>
  )
}

// Analysis metric component
interface AnalysisMetricProps {
  label: string
  value: number
  color?: "emerald" | "amber"
}

function AnalysisMetric({ label, value, color = "emerald" }: AnalysisMetricProps) {
  return (
    <div>
      <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">{label}</p>
      <div className="flex items-center gap-2">
        <Progress
          value={value}
          className={cn(
            "h-2",
            color === "emerald" && "[&>[data-slot=progress-indicator]]:bg-emerald-500",
            color === "amber" && "[&>[data-slot=progress-indicator]]:bg-amber-500"
          )}
        />
        <span className="text-xs font-medium">{value}%</span>
      </div>
    </div>
  )
}

export function ArtefactPreview({ artefactId, className }: ArtefactPreviewProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)

  // Fetch artefact using GraphQL hook (falls back to mock data if Supabase not configured)
  const { artefact } = useArtefact(artefactId ?? null)

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("artefact")
    router.push(`/campaigns?${params.toString()}`, { scroll: false })
  }

  const handleRegenerate = () => {
    setIsRegenerating(true)
    setTimeout(() => setIsRegenerating(false), 3000)
  }

  if (!artefact) {
    return (
      <div className={cn("flex h-full items-center justify-center", className)}>
        <div className="text-muted-foreground text-center">
          <Icon icon="tabler:eye-off" className="mx-auto mb-2 h-12 w-12 opacity-50" />
          <p className="text-sm">Select an artefact to preview</p>
        </div>
      </div>
    )
  }

  const statusInfo = getStatusInfo(artefact.status)
  const hasImage = isImageSrc(artefact.src)

  return (
    <div className={cn("flex h-full flex-col overflow-hidden", className)}>
      {/* Header with image preview */}
      <div className="relative shrink-0">
        {hasImage ? (
          <>
            <div
              className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden border-b bg-muted"
              onClick={() => setImageDialogOpen(true)}
            >
              <Image
                src={artefact.src}
                alt={artefact.name}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                sizes="400px"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
                <Button
                  variant="secondary"
                  size="sm"
                  className="pointer-events-none translate-y-2 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <Icon icon="lucide:expand" className="mr-2 h-4 w-4" />
                  View full size
                </Button>
              </div>
            </div>
            <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
              <DialogContent className="!max-w-[95vw] !sm:max-w-[95vw] !h-[95vh] p-0 overflow-hidden border-0 bg-black/95">
                <div className="relative flex h-full w-full items-center justify-center">
                  <Image
                    src={artefact.src}
                    alt={artefact.name}
                    width={artefact.dimensions?.width || 1920}
                    height={artefact.dimensions?.height || 1080}
                    className="h-full w-full object-contain"
                    sizes="95vw"
                    priority
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-12">
                  <DialogTitle className="text-white">{artefact.name}</DialogTitle>
                  {artefact.dimensions && (
                    <DialogDescription className="text-white/70">
                      {artefact.dimensions.width} × {artefact.dimensions.height}px
                    </DialogDescription>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <div className="bg-muted/30 flex items-center justify-center border-b p-8">
            <div className="flex flex-col items-center gap-3">
              <div className="bg-background flex h-24 w-24 items-center justify-center rounded-xl border shadow-sm">
                <Icon
                  icon={getArtefactIcon(artefact.type)}
                  className="text-muted-foreground h-12 w-12"
                />
              </div>
              {artefact.dimensions && (
                <span className="text-muted-foreground text-xs">
                  {artefact.dimensions.width} × {artefact.dimensions.height}px
                </span>
              )}
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute right-2 top-2 h-7 w-7 bg-background/80 backdrop-blur-sm"
        >
          <Icon icon="lucide:x" className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      {/* Title section */}
      <CardHeader className="shrink-0 space-y-0 border-b px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-base">{artefact.name}</CardTitle>
            <CardDescription>{getArtefactTypeLabel(artefact.type)}</CardDescription>
          </div>
          <Badge variant={getStatusVariant(artefact.status)} className="shrink-0">
            <Icon icon={statusInfo.icon} className="mr-1 h-3 w-3" />
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>

      {/* Tabbed content */}
      <ScrollArea className="h-0 min-h-0 flex-1">
        <CardContent className="space-y-6 p-4 pb-28">
          <AnimatedTabs defaultValue="details" className="w-full">
            <AnimatedTabsList className="w-full">
              <AnimatedTabsTrigger value="details">Details</AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="comments">Comments</AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="versions">Versions</AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="compliance">Compliance</AnimatedTabsTrigger>
            </AnimatedTabsList>

            <AnimatedTabsContents className="mt-4">
              {/* Details Tab */}
              <AnimatedTabsContent value="details">
                <div className="space-y-4">
                  {/* Description */}
                  {artefact.description && (
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                        Description
                      </p>
                      <p className="text-sm">{artefact.description}</p>
                    </div>
                  )}

                  {/* Metadata grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {artefact.format && (
                      <div>
                        <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                          Format
                        </p>
                        <p className="font-mono text-sm font-medium">{artefact.format}</p>
                      </div>
                    )}
                    {artefact.dimensions && (
                      <div>
                        <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                          Dimensions
                        </p>
                        <p className="text-sm font-medium">
                          {artefact.dimensions.width} × {artefact.dimensions.height}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                        Created
                      </p>
                      <p className="text-sm font-medium">
                        {new Date(artefact.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                        Updated
                      </p>
                      <p className="text-sm font-medium">
                        {new Date(artefact.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" size="sm">
                      <Icon icon="tabler:download" className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    <Dialog>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Icon icon="tabler:trash" className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>Delete artefact</TooltipContent>
                      </Tooltip>
                      <DialogContent showCloseButton={false}>
                        <DialogHeader>
                          <DialogTitle>Delete artefact</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this artefact? This action cannot be
                            undone and the file will be permanently removed.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="destructive">Delete</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </AnimatedTabsContent>

              {/* Comments Tab */}
              <AnimatedTabsContent value="comments">
                {/* Chat input */}
                <div className="bg-muted/50 mb-4 flex items-center gap-2 rounded-full border px-3 py-2">
                  <Icon icon="lucide:paperclip" className="text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="placeholder:text-muted-foreground flex-1 bg-transparent text-sm outline-none"
                  />
                  <Button size="icon" className="h-7 w-7 rounded-full">
                    <Icon icon="lucide:send" className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <Comment
                    initials="JB"
                    name="Jonas Broms"
                    timestamp="2 days ago"
                    message="Uploaded the initial design for review. Please check the brand alignment."
                    isCurrentUser
                  />
                  <Comment
                    initials="ES"
                    name="Erik Svensson"
                    timestamp="1 day ago"
                    message="The colors look great! Can we try a slightly bolder font for the headline?"
                    avatarColor="bg-violet-500/10 text-violet-600"
                  />
                  <Comment
                    initials="JB"
                    name="Jonas Broms"
                    timestamp="1 day ago"
                    message="Good suggestion! I'll update the font weight and re-upload."
                    isCurrentUser
                  />
                  <Comment
                    initials="AL"
                    name="Anna Lindqvist"
                    timestamp="3 hours ago"
                    message="Approved! Ready for final review."
                    avatarColor="bg-emerald-500/10 text-emerald-600"
                  />
                </div>
              </AnimatedTabsContent>

              {/* Versions Tab */}
              <AnimatedTabsContent value="versions">
                <div className="space-y-3">
                  <Dropzone className="mt-2" />
                  <Version
                    version="v1.2"
                    description="Updated font weight and improved contrast"
                    date="Today at 2:30 PM"
                    fileInfo={`${artefact.format || "PNG"} • 128 KB`}
                    isCurrent
                    isCurrentUser
                  />
                  <Version
                    version="v1.1"
                    description="Adjusted layout based on feedback"
                    date="Yesterday"
                    fileInfo={`${artefact.format || "PNG"} • 124 KB`}
                    authorName="Erik S."
                    authorColor="bg-violet-500/10 text-violet-600"
                  />
                  <Version
                    version="v1.0"
                    description="Initial upload"
                    date={new Date(artefact.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    fileInfo={`${artefact.format || "PNG"} • 118 KB`}
                    isOriginal
                    isCurrentUser
                  />
                </div>
              </AnimatedTabsContent>

              {/* Compliance Tab */}
              <AnimatedTabsContent value="compliance">
                <div className="space-y-4">
                  <Card className="gap-3 py-4 shadow-none">
                    <CardHeader className="px-4 py-0">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:sparkles" className="text-primary h-4 w-4" />
                        <CardTitle className="text-sm">AI Analysis</CardTitle>
                        <span className="text-muted-foreground ml-auto text-xs">
                          Generated 2 hours ago
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 px-4 py-0">
                      <AnalysisMetric label="Brand Consistency" value={88} color="emerald" />
                      <AnalysisMetric label="Color Accuracy" value={95} color="emerald" />
                      <AnalysisMetric label="Accessibility Score" value={72} color="amber" />
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <p className="text-xs font-medium">Recommendations</p>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Icon
                          icon="lucide:lightbulb"
                          className="mt-0.5 h-4 w-4 shrink-0 text-amber-500"
                        />
                        <span>
                          Consider increasing text contrast for better readability on mobile
                          devices.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          icon="lucide:check"
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        />
                        <span>Color palette matches brand guidelines.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          icon="lucide:check"
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        />
                        <span>Layout follows approved template structure.</span>
                      </li>
                    </ul>
                  </div>

                  {isRegenerating ? (
                    <Button size="sm" className="w-full" disabled>
                      <Icon icon="lucide:loader-2" className="mr-2 h-4 w-4 animate-spin" />
                      Regenerating...
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleRegenerate}
                    >
                      <Icon icon="lucide:refresh-cw" className="mr-2 h-4 w-4" />
                      Regenerate Analysis
                    </Button>
                  )}
                </div>
              </AnimatedTabsContent>
            </AnimatedTabsContents>
          </AnimatedTabs>
        </CardContent>
      </ScrollArea>
    </div>
  )
}
