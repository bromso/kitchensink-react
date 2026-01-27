"use client"

import { Icon } from "@iconify/react"
import { Badge } from "@repo/ui/components/badge"
import { BlurFade } from "@repo/ui/components/blur-fade"
import { Dropzone } from "@repo/ui/components/dropzone"
import { Skeleton } from "@repo/ui/components/skeleton"
import { cn } from "@repo/ui/lib/utils"
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCampaignArtefacts } from "@/data/hooks"
import { type Artefact, type ArtefactType, artefactTypes } from "@/data/mock/campaigns"

export interface ArtefactListProps {
  /** Campaign ID to show artefacts for */
  campaignId?: string | null
  /** Additional class names */
  className?: string
  /** Callback when an artefact is selected */
  onArtefactSelect?: (artefact: Artefact) => void
}

function getArtefactIcon(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.icon || "tabler:file"
}

function isImageSrc(src: string | undefined | null): boolean {
  if (!src || src.trim() === "") return false

  // Must start with / (local path) or http(s):// (external URL)
  const isValidPath = src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://")
  if (!isValidPath) return false

  const imageExtensions = [".webp", ".png", ".jpg", ".jpeg", ".gif", ".svg"]
  return imageExtensions.some((ext) => src.toLowerCase().endsWith(ext))
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

function getArtefactTypeLabel(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.label || type
}

export function ArtefactList({ campaignId, className, onArtefactSelect }: ArtefactListProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedArtefactId = searchParams.get("artefact")

  // Fetch artefacts using GraphQL hook (falls back to mock data if Supabase not configured)
  const { artefacts, loading } = useCampaignArtefacts(campaignId ?? null)

  const handleArtefactSelect = (artefact: Artefact) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("artefact", artefact.id)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    onArtefactSelect?.(artefact)
  }

  if (!campaignId) {
    return (
      <div className={cn("flex h-full items-center justify-center", className)}>
        <div className="text-muted-foreground text-center">
          <Icon icon="tabler:click" className="mx-auto mb-2 h-12 w-12 opacity-50" />
          <p className="text-sm">Select a campaign to view artefacts</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={cn("grid gap-4 p-6", className)}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-lg border">
              <Skeleton className="aspect-video w-full" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (artefacts.length === 0) {
    return (
      <div className={cn("flex h-full items-center justify-center", className)}>
        <div className="text-muted-foreground text-center">
          <Icon icon="tabler:folder-off" className="mx-auto mb-2 h-12 w-12 opacity-50" />
          <p className="text-sm">No artefacts in this campaign</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("grid gap-4 p-6", className)}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Upload Dropzone as first card */}
        <BlurFade delay={0.05} duration={0.3} direction="up" className="h-full">
          <Dropzone
            className="h-full min-h-[180px]"
            size="sm"
            showPreview={false}
            maxFiles={10}
            accept={{
              "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
              "application/pdf": [".pdf"],
            }}
            onFilesChange={(files) => {
              // TODO: Handle file upload
              console.log("Files to upload:", files)
            }}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="bg-muted text-muted-foreground rounded-full p-3">
                <Icon icon="lucide:upload-cloud" className="size-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Upload Artefacts</p>
                <p className="text-muted-foreground text-xs">Drag & drop or click to browse</p>
              </div>
            </div>
          </Dropzone>
        </BlurFade>

        {artefacts.map((artefact, index) => (
          <BlurFade
            key={artefact.id}
            delay={0.05 + (index + 1) * 0.03}
            duration={0.3}
            direction="up"
            className="h-full"
          >
            <ArtefactCard
              artefact={artefact}
              isSelected={selectedArtefactId === artefact.id}
              onClick={() => handleArtefactSelect(artefact)}
            />
          </BlurFade>
        ))}
      </div>
    </div>
  )
}

interface ArtefactCardProps {
  artefact: Artefact
  isSelected?: boolean
  onClick?: () => void
}

function ArtefactCard({ artefact, isSelected, onClick }: ArtefactCardProps) {
  const hasImage = isImageSrc(artefact.src)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-card hover:bg-accent group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border text-left transition-all",
        isSelected && "ring-primary ring-2"
      )}
    >
      {/* Image thumbnail or icon header */}
      {hasImage ? (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={artefact.src}
            alt={artefact.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <Badge
            variant={getStatusVariant(artefact.status)}
            className="absolute right-2 top-2 text-[10px]"
          >
            {artefact.status}
          </Badge>
        </div>
      ) : (
        <div className="flex items-start justify-between p-4 pb-0">
          <div
            className={cn(
              "bg-muted flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              "group-hover:bg-primary/10"
            )}
          >
            <Icon
              icon={getArtefactIcon(artefact.type)}
              className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
            />
          </div>
          <Badge variant={getStatusVariant(artefact.status)} className="shrink-0 text-[10px]">
            {artefact.status}
          </Badge>
        </div>
      )}

      <div className={cn("flex flex-1 flex-col", hasImage ? "p-3" : "p-4 pt-3")}>
        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-sm font-medium">{artefact.name}</h3>

        {/* Type badge */}
        <span className="text-muted-foreground mb-2 text-xs">
          {getArtefactTypeLabel(artefact.type)}
        </span>

        {/* Description - only show for non-image cards */}
        {!hasImage && artefact.description && (
          <p className="text-muted-foreground mb-3 line-clamp-2 flex-1 text-xs">
            {artefact.description}
          </p>
        )}

        {/* Metadata footer */}
        <div className="text-muted-foreground mt-auto flex items-center gap-2 text-[10px]">
          {artefact.format && (
            <>
              <span className="font-mono">{artefact.format}</span>
              <span>·</span>
            </>
          )}
          {artefact.dimensions && (
            <>
              <span>
                {artefact.dimensions.width}×{artefact.dimensions.height}
              </span>
              <span>·</span>
            </>
          )}
          <span>
            {new Date(artefact.updatedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </button>
  )
}
