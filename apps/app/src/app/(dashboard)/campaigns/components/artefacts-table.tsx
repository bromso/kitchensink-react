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
import { Skeleton } from "@repo/ui/components/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip"
import { cn } from "@repo/ui/lib/utils"
import Image from "next/image"
import { useState } from "react"
import { useArtefacts, useCampaignArtefacts } from "@/data/hooks"
import {
  type Artefact,
  type ArtefactStatus,
  type ArtefactType,
  artefactStatuses,
  artefactTypes,
  getCampaignById,
} from "@/data/mock/campaigns"

export interface ArtefactsTableProps {
  campaignId?: string | null
  className?: string
}

const statusConfig: Record<ArtefactStatus, { label: string; icon: string; color: string }> = {
  draft: { label: "Draft", icon: "tabler:pencil", color: "bg-zinc-500/20 text-zinc-600" },
  review: { label: "In Review", icon: "tabler:eye", color: "bg-amber-500/20 text-amber-600" },
  approved: {
    label: "Approved",
    icon: "tabler:circle-check",
    color: "bg-blue-500/20 text-blue-600",
  },
  published: {
    label: "Published",
    icon: "tabler:world",
    color: "bg-emerald-500/20 text-emerald-600",
  },
}

function getArtefactIcon(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.icon || "tabler:file"
}

function getArtefactTypeLabel(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.label || type
}

function isImageSrc(src: string | undefined | null): boolean {
  if (!src || src.trim() === "") return false

  // Must start with / (local path) or http(s):// (external URL)
  const isValidPath = src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")
  if (!isValidPath) return false

  const imageExtensions = [".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"]
  return imageExtensions.some((ext) => src.toLowerCase().endsWith(ext))
}

function getStatusInfo(status: Artefact["status"]) {
  const statusInfo = artefactStatuses.find((s) => s.value === status)
  return {
    label: statusInfo?.label || status,
    icon: statusInfo?.icon || "tabler:circle",
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

// Comment component for the Comments tab
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

// Version component for the Versions tab
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

// Analysis metric component for the Compliance tab
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

export function ArtefactsTable({ campaignId, className }: ArtefactsTableProps) {
  const [selectedArtefact, setSelectedArtefact] = useState<Artefact | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  // Fetch artefacts using GraphQL hooks
  const campaignArtefactsResult = useCampaignArtefacts(campaignId ?? null)
  const allArtefactsResult = useArtefacts()

  // Use campaign-specific artefacts if campaignId is provided, otherwise use all artefacts
  const { artefacts, loading } = campaignId ? campaignArtefactsResult : allArtefactsResult

  const handleArtefactClick = (artefact: Artefact) => {
    setSelectedArtefact(artefact)
    setDialogOpen(true)
  }

  if (loading) {
    return (
      <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
        <div className="relative flex-1 overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-background sticky top-0 z-10 [&_tr]:border-b">
              <tr className="border-b transition-colors">
                <th className="text-foreground h-10 w-[300px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Name
                </th>
                <th className="text-foreground h-10 w-[140px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Type
                </th>
                <th className="text-foreground h-10 w-[120px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Status
                </th>
                <th className="text-foreground h-10 w-[100px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Format
                </th>
                <th className="text-foreground h-10 w-[120px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Dimensions
                </th>
                <th className="text-foreground h-10 w-[120px] px-2 text-right align-middle font-medium whitespace-nowrap">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="p-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <div className="space-y-1.5">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-10" />
                  </td>
                  <td className="p-2">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="p-2 text-right">
                    <Skeleton className="ml-auto h-4 w-20" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (artefacts.length === 0) {
    return (
      <div className={cn("flex flex-1 items-center justify-center", className)}>
        <div className="text-muted-foreground text-center">
          <Icon icon="tabler:folder-off" className="mx-auto mb-2 h-12 w-12 opacity-50" />
          <p className="text-sm">
            {campaignId ? "No artefacts in this campaign" : "No artefacts found"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={cn("flex flex-1 flex-col overflow-hidden", className)}>
        <div className="relative flex-1 overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-background sticky top-0 z-10 [&_tr]:border-b">
              <tr className="border-b transition-colors">
                <th className="text-foreground h-10 w-[300px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Name
                </th>
                <th className="text-foreground h-10 w-[140px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Type
                </th>
                <th className="text-foreground h-10 w-[120px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Status
                </th>
                <th className="text-foreground h-10 w-[100px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Format
                </th>
                <th className="text-foreground h-10 w-[120px] px-2 text-left align-middle font-medium whitespace-nowrap">
                  Dimensions
                </th>
                {!campaignId && (
                  <th className="text-foreground h-10 w-[180px] px-2 text-left align-middle font-medium whitespace-nowrap">
                    Campaign
                  </th>
                )}
                <th className="text-foreground h-10 w-[120px] px-2 text-right align-middle font-medium whitespace-nowrap">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0 [&_tr:last-child_td]:pb-32">
              {artefacts.map((artefact) => {
                const status = statusConfig[artefact.status]
                const campaign = getCampaignById(artefact.campaignId)

                return (
                  <tr
                    key={artefact.id}
                    className="hover:bg-muted/50 cursor-pointer border-b transition-colors"
                    onClick={() => handleArtefactClick(artefact)}
                  >
                    {/* Name */}
                    <td className="p-2 align-middle whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
                          <Icon
                            icon={getArtefactIcon(artefact.type)}
                            className="text-muted-foreground h-4 w-4"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-medium">{artefact.name}</p>
                          {artefact.description && (
                            <p className="text-muted-foreground truncate text-xs">
                              {artefact.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="p-2 align-middle whitespace-nowrap">
                      <span className="text-muted-foreground text-sm">
                        {getArtefactTypeLabel(artefact.type)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="p-2 align-middle whitespace-nowrap">
                      <Badge variant="secondary" className={cn("gap-1", status.color)}>
                        <Icon icon={status.icon} className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </td>

                    {/* Format */}
                    <td className="p-2 align-middle whitespace-nowrap">
                      {artefact.format && (
                        <span className="text-muted-foreground font-mono text-xs uppercase">
                          {artefact.format}
                        </span>
                      )}
                    </td>

                    {/* Dimensions */}
                    <td className="p-2 align-middle whitespace-nowrap">
                      {artefact.dimensions && (
                        <span className="text-muted-foreground text-xs">
                          {artefact.dimensions.width} × {artefact.dimensions.height}
                        </span>
                      )}
                    </td>

                    {/* Campaign (only shown when viewing all artefacts) */}
                    {!campaignId && (
                      <td className="p-2 align-middle whitespace-nowrap">
                        {campaign && (
                          <span className="text-muted-foreground truncate text-sm">
                            {campaign.title}
                          </span>
                        )}
                      </td>
                    )}

                    {/* Updated */}
                    <td className="p-2 text-right align-middle whitespace-nowrap">
                      <span className="text-muted-foreground text-sm">
                        {new Date(artefact.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Artefact Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="flex max-h-[90vh] max-w-lg flex-col gap-0 overflow-hidden p-0">
          {selectedArtefact && (
            <>
              {/* Image Preview */}
              {isImageSrc(selectedArtefact.src) ? (
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted">
                  <Image
                    src={selectedArtefact.src}
                    alt={selectedArtefact.name}
                    fill
                    className="object-cover"
                    sizes="500px"
                  />
                </div>
              ) : (
                <div className="bg-muted/30 flex shrink-0 items-center justify-center border-b py-12">
                  <div className="bg-background flex h-20 w-20 items-center justify-center rounded-xl border shadow-sm">
                    <Icon
                      icon={getArtefactIcon(selectedArtefact.type)}
                      className="text-muted-foreground h-10 w-10"
                    />
                  </div>
                </div>
              )}

              {/* Title Section */}
              <div className="shrink-0 border-b px-6 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="truncate text-base">
                      {selectedArtefact.name}
                    </DialogTitle>
                    <DialogDescription>
                      {getArtefactTypeLabel(selectedArtefact.type)}
                    </DialogDescription>
                  </div>
                  <Badge variant={getStatusVariant(selectedArtefact.status)} className="shrink-0">
                    <Icon
                      icon={getStatusInfo(selectedArtefact.status).icon}
                      className="mr-1 h-3 w-3"
                    />
                    {getStatusInfo(selectedArtefact.status).label}
                  </Badge>
                </div>
              </div>

              {/* Tabbed Content */}
              <ScrollArea className="min-h-0 flex-1">
                <div className="p-6">
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
                          {selectedArtefact.description && (
                            <div>
                              <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                                Description
                              </p>
                              <p className="text-sm">{selectedArtefact.description}</p>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-4">
                            {selectedArtefact.format && (
                              <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                                  Format
                                </p>
                                <p className="font-mono text-sm font-medium">
                                  {selectedArtefact.format}
                                </p>
                              </div>
                            )}
                            {selectedArtefact.dimensions && (
                              <div>
                                <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                                  Dimensions
                                </p>
                                <p className="text-sm font-medium">
                                  {selectedArtefact.dimensions.width} ×{" "}
                                  {selectedArtefact.dimensions.height}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-muted-foreground mb-1 text-xs font-medium uppercase">
                                Created
                              </p>
                              <p className="text-sm font-medium">
                                {new Date(selectedArtefact.createdAt).toLocaleDateString("en-US", {
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
                                {new Date(selectedArtefact.updatedAt).toLocaleDateString("en-US", {
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
                                    Are you sure you want to delete this artefact? This action
                                    cannot be undone and the file will be permanently removed.
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
                            fileInfo={`${selectedArtefact.format || "PNG"} • 128 KB`}
                            isCurrent
                            isCurrentUser
                          />
                          <Version
                            version="v1.1"
                            description="Adjusted layout based on feedback"
                            date="Yesterday"
                            fileInfo={`${selectedArtefact.format || "PNG"} • 124 KB`}
                            authorName="Erik S."
                            authorColor="bg-violet-500/10 text-violet-600"
                          />
                          <Version
                            version="v1.0"
                            description="Initial upload"
                            date={new Date(selectedArtefact.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                            fileInfo={`${selectedArtefact.format || "PNG"} • 118 KB`}
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
                              <AnalysisMetric
                                label="Brand Consistency"
                                value={88}
                                color="emerald"
                              />
                              <AnalysisMetric label="Color Accuracy" value={95} color="emerald" />
                              <AnalysisMetric
                                label="Accessibility Score"
                                value={72}
                                color="amber"
                              />
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

                          <Button variant="outline" size="sm" className="w-full">
                            <Icon icon="lucide:refresh-cw" className="mr-2 h-4 w-4" />
                            Regenerate Analysis
                          </Button>
                        </div>
                      </AnimatedTabsContent>
                    </AnimatedTabsContents>
                  </AnimatedTabs>
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
