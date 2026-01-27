"use client"

import { Icon } from "@iconify/react"
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
import { RainbowButton } from "@repo/ui/components/rainbow-button"
import { ScrollArea } from "@repo/ui/components/scroll-area"
import { Skeleton } from "@repo/ui/components/skeleton"
import { cn } from "@repo/ui/lib/utils"
import { useState } from "react"
import { getGuidelineCategoryForAssetCategory, isValidCategory } from "@/data/config/categories"
import { type BrandGuideline, useBrandGuidelinesByCategory } from "@/data/hooks"
import type { AssetDetail } from "@/data/mock/assets"
import type { Guideline_Category } from "@/gql/graphql"

interface AssetDetailsPanelProps {
  asset: AssetDetail | null
  onClose: () => void
}

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

// Skeleton loading state for guidelines
function GuidelinesSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2].map((i) => (
        <div key={i} className="rounded-md border p-3">
          <div className="flex items-start gap-3">
            <Skeleton className="h-8 w-8 rounded flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Individual guideline item component
interface GuidelineItemProps {
  guideline: BrandGuideline
}

function GuidelineItem({ guideline }: GuidelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Icon mapping for guideline categories
  const categoryIcons: Record<string, string> = {
    LogoUsage: "lucide:shapes",
    ColorPalette: "lucide:palette",
    Typography: "lucide:type",
    Imagery: "lucide:image",
    ToneVoice: "lucide:message-circle",
    Other: "lucide:file-text",
  }

  const icon = categoryIcons[guideline.category] || categoryIcons.Other

  return (
    <div className="rounded-md border p-3 transition-colors hover:bg-muted/50">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10">
          <Icon icon={icon} className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium truncate">{guideline.name}</p>
            {guideline.isActive && (
              <Badge className="h-5 bg-emerald-500/10 px-1.5 text-[10px] text-emerald-600 hover:bg-emerald-500/10">
                Active
              </Badge>
            )}
          </div>
          {guideline.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {guideline.description}
            </p>
          )}

          {/* Expandable definition details */}
          {guideline.guidelineDefinition &&
            Object.keys(guideline.guidelineDefinition).length > 0 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-6 px-0 text-xs text-muted-foreground hover:text-foreground mt-1"
                >
                  <Icon
                    icon={isExpanded ? "lucide:chevron-up" : "lucide:chevron-down"}
                    className="h-3 w-3 mr-1"
                  />
                  {isExpanded ? "Hide" : "Show"} details
                </Button>

                {isExpanded && (
                  <div className="mt-2 p-2 rounded bg-muted/50 text-xs">
                    <ul className="space-y-1">
                      {Object.entries(guideline.guidelineDefinition).map(([key, value]) => (
                        <li key={key} className="flex items-start gap-2">
                          <span className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}:
                          </span>
                          <span className="text-muted-foreground">
                            {typeof value === "object" ? JSON.stringify(value) : String(value)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
        </div>
      </div>
    </div>
  )
}

export function AssetDetailsPanel({ asset, onClose }: AssetDetailsPanelProps) {
  const [isRegenerating, setIsRegenerating] = useState(false)

  // Get guideline category based on asset category
  const guidelineCategory =
    asset?.category && isValidCategory(asset.category)
      ? getGuidelineCategoryForAssetCategory(asset.category)
      : null

  // Fetch brand guidelines for this asset's category
  const {
    guidelines,
    loading: guidelinesLoading,
    isUsingMockData,
  } = useBrandGuidelinesByCategory(guidelineCategory as Guideline_Category | null)

  if (!asset) return null

  const handleRegenerate = () => {
    setIsRegenerating(true)
    // Simulate regeneration - in real app this would be an API call
    setTimeout(() => setIsRegenerating(false), 3000)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* Header */}
      <CardHeader className="relative shrink-0 space-y-0 border-b px-4 py-4 pr-12">
        <CardTitle className="text-base">{asset.name}</CardTitle>
        <CardDescription>{asset.type}</CardDescription>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute right-4 top-4 h-7 w-7"
        >
          <Icon icon="lucide:x" className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>

      <ScrollArea className="h-0 min-h-0 flex-1">
        <CardContent className="space-y-6 p-4 pb-28">
          <AnimatedTabs defaultValue="comments" className="w-full">
            <AnimatedTabsList className="w-full">
              <AnimatedTabsTrigger value="versions">Versions</AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="comments">Comments</AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="ai-response">Compliance</AnimatedTabsTrigger>
            </AnimatedTabsList>

            <AnimatedTabsContents className="mt-4">
              <AnimatedTabsContent value="comments">
                {/* Chat input */}
                <div className="bg-muted/50 flex items-center gap-2 rounded-full border px-3 py-2 mb-4">
                  <Icon icon="lucide:paperclip" className="text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <Button size="icon" className="h-7 w-7 rounded-full">
                    <Icon icon="lucide:send" className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {/* Oldest messages first */}
                  <Comment
                    initials="JB"
                    name="Jonas Broms"
                    timestamp="1 week ago"
                    message="Initial upload of the new primary logo. Let me know if you have any feedback!"
                    isCurrentUser
                  />
                  <Comment
                    initials="ES"
                    name="Erik Svensson"
                    timestamp="3 days ago"
                    message="The padding around the logo looks off on mobile. Can we adjust the safe zone?"
                    avatarColor="bg-violet-500/10 text-violet-600"
                  />
                  <Comment
                    initials="MK"
                    name="Marcus Karlsson"
                    timestamp="2 days ago"
                    message="Can we get a version with transparent background? Need it for the new marketing materials."
                    avatarColor="bg-amber-500/10 text-amber-600"
                  />
                  <Comment
                    initials="JB"
                    name="Jonas Broms"
                    timestamp="Yesterday"
                    message="@Marcus Done! I've uploaded v2.1 with transparent background option."
                    isCurrentUser
                  />
                  <Comment
                    initials="AL"
                    name="Anna Lindqvist"
                    timestamp="3 hours ago"
                    message="Looks great! The contrast is much better now. Approved from design."
                    avatarColor="bg-emerald-500/10 text-emerald-600"
                  />
                  <Comment
                    initials="JB"
                    name="Jonas Broms"
                    timestamp="2 hours ago"
                    message="Updated with new brand colors. Please review before final approval."
                    isCurrentUser
                  />
                </div>
              </AnimatedTabsContent>

              <AnimatedTabsContent value="versions">
                <div className="space-y-3">
                  <Dropzone className="mt-2" />
                  <Version
                    version="v2.1"
                    description="Updated brand colors, added transparent background option"
                    date="Today at 2:30 PM"
                    fileInfo="SVG • 24 KB"
                    isCurrent
                    isCurrentUser
                  />
                  <Version
                    version="v2.0"
                    description="Major redesign with updated typography and proportions"
                    date="Dec 8, 2025"
                    fileInfo="SVG • 22 KB"
                    isCurrentUser
                  />
                  <Version
                    version="v1.3"
                    description="Adjusted safe zone padding for mobile displays"
                    date="Nov 28, 2025"
                    fileInfo="SVG • 21 KB"
                    authorName="Anna L."
                    authorColor="bg-emerald-500/10 text-emerald-600"
                  />
                  <Version
                    version="v1.2"
                    description="Fixed color profile for print compatibility"
                    date="Nov 22, 2025"
                    fileInfo="SVG • 20 KB"
                    isCurrentUser
                  />
                  <Version
                    version="v1.1"
                    description="Added horizontal lockup variant"
                    date="Nov 5, 2025"
                    fileInfo="SVG • 18 KB"
                    authorName="Marcus K."
                    authorColor="bg-amber-500/10 text-amber-600"
                  />
                  <Version
                    version="v1.0"
                    description="Initial upload of primary logo"
                    date="Oct 15, 2025"
                    fileInfo="SVG • 16 KB"
                    isOriginal
                    isCurrentUser
                  />
                </div>
              </AnimatedTabsContent>

              <AnimatedTabsContent value="ai-response">
                <div className="space-y-4">
                  <Card className="gap-3 py-4 shadow-none">
                    <CardHeader className="px-4 py-0">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:sparkles" className="text-primary h-4 w-4" />
                        <CardTitle className="text-sm">AI Analysis</CardTitle>
                        <span className="text-muted-foreground ml-auto text-xs">
                          Generated 1 hour ago
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 px-4 py-0">
                      <AnalysisMetric label="Brand Consistency" value={92} color="emerald" />
                      <AnalysisMetric label="Color Accuracy" value={98} color="emerald" />
                      <AnalysisMetric label="Accessibility Score" value={78} color="amber" />
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
                          Consider increasing contrast ratio for better accessibility on dark
                          backgrounds.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          icon="lucide:check"
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        />
                        <span>Logo proportions match brand guidelines perfectly.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon
                          icon="lucide:check"
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                        />
                        <span>File format and resolution are optimal for web use.</span>
                      </li>
                    </ul>
                  </div>

                  {isRegenerating ? (
                    <RainbowButton size="sm" className="w-full" disabled>
                      <Icon icon="lucide:loader-2" className="h-4 w-4 animate-spin" />
                      Regenerating...
                    </RainbowButton>
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

                  {/* Brand Guidelines Section */}
                  <div className="space-y-3 pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:book-open" className="text-primary h-4 w-4" />
                      <p className="text-xs font-medium">Related Brand Guidelines</p>
                      {isUsingMockData && (
                        <Badge variant="secondary" className="h-5 px-1.5 text-[10px]">
                          Demo
                        </Badge>
                      )}
                    </div>

                    {guidelinesLoading ? (
                      <GuidelinesSkeleton />
                    ) : guidelines.length === 0 ? (
                      <p className="text-muted-foreground text-sm py-2">
                        No guidelines found for this asset type.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {guidelines.map((guideline) => (
                          <GuidelineItem key={guideline.id} guideline={guideline} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedTabsContent>
            </AnimatedTabsContents>
          </AnimatedTabs>
        </CardContent>
      </ScrollArea>
    </div>
  )
}
