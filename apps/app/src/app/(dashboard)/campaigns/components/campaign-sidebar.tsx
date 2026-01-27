"use client"

import { Badge } from "@repo/ui/components/badge"
import { Input } from "@repo/ui/components/input"
import { ScrollArea } from "@repo/ui/components/scroll-area"
import { cn } from "@repo/ui/lib/utils"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { useCampaigns } from "@/data/hooks"
import type { Campaign } from "@/data/mock/campaigns"

export interface CampaignSidebarProps {
  /** Whether to show the sidebar */
  visible?: boolean
  /** Whether to show the search input */
  showSearch?: boolean
  /** Search placeholder text */
  searchPlaceholder?: string
  /** Custom width (default: 300px) */
  width?: number | string
  /** Additional class names */
  className?: string
  /** Callback when a campaign is selected */
  onCampaignSelect?: (campaign: Campaign) => void
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void
  /** Custom header content (replaces default title/subtitle) */
  headerContent?: React.ReactNode
  /** Custom footer content */
  footerContent?: React.ReactNode
}

function getStatusVariant(status: Campaign["status"]): "default" | "secondary" | "outline" {
  switch (status) {
    case "active":
      return "default"
    case "completed":
      return "secondary"
    default:
      return "outline"
  }
}

function formatDateRange(startDate: string, endDate?: string): string {
  const start = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
  if (!endDate) return `From ${start}`
  const end = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  return `${start} - ${end}`
}

export function CampaignSidebar({
  visible = true,
  showSearch = true,
  searchPlaceholder = "Search campaigns...",
  width = 300,
  className,
  onCampaignSelect,
  onSearchChange,
  headerContent,
  footerContent,
}: CampaignSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCampaignId = searchParams.get("campaign")
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch campaigns using GraphQL hook (falls back to mock data if Supabase not configured)
  const { campaigns } = useCampaigns()

  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return campaigns
    const query = searchQuery.toLowerCase()
    return campaigns.filter(
      (c) => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)
    )
  }, [campaigns, searchQuery])

  if (!visible) {
    return null
  }

  const widthStyle = typeof width === "number" ? `${width}px` : width

  const handleCampaignSelect = (campaign: Campaign) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("campaign", campaign.id)
    params.delete("artefact") // Clear artefact selection when changing campaigns
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    onCampaignSelect?.(campaign)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    onSearchChange?.(value)
  }

  return (
    <div
      className={cn(
        "bg-muted/40 hidden h-full flex-col overflow-hidden border-r md:flex",
        className
      )}
      style={{ width: widthStyle }}
    >
      <div className="flex shrink-0 flex-col gap-3.5 border-b p-4">
        {headerContent || (
          <div className="flex w-full flex-col gap-1">
            <h2 className="text-foreground text-base font-medium">Campaigns</h2>
            <p className="text-muted-foreground text-xs">
              {campaigns.length} campaign{campaigns.length !== 1 ? "s" : ""}
            </p>
          </div>
        )}
        {showSearch && (
          <Input
            placeholder={searchPlaceholder}
            className="h-8"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        )}
      </div>
      <ScrollArea className="h-0 min-h-0 flex-1">
        <CampaignList
          campaigns={filteredCampaigns}
          onCampaignSelect={handleCampaignSelect}
          selectedCampaignId={selectedCampaignId}
        />
        <div className="pb-24" />
      </ScrollArea>
      {footerContent && <div className="border-t p-4">{footerContent}</div>}
    </div>
  )
}

interface CampaignListProps {
  campaigns: Campaign[]
  onCampaignSelect?: (campaign: Campaign) => void
  selectedCampaignId?: string | null
}

function CampaignList({ campaigns, onCampaignSelect, selectedCampaignId }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="text-muted-foreground p-4 text-center text-sm">No campaigns available</div>
    )
  }

  return (
    <>
      {campaigns.map((campaign) => {
        const isSelected = selectedCampaignId === campaign.id

        return (
          <button
            type="button"
            key={campaign.id}
            onClick={() => onCampaignSelect?.(campaign)}
            className={cn(
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full cursor-pointer flex-col items-start gap-2 border-b p-4 text-left text-sm leading-tight last:border-b-0 transition-colors",
              isSelected && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
          >
            <div className="flex w-full items-center gap-2">
              <span className="truncate font-medium">{campaign.title}</span>
              <Badge variant={getStatusVariant(campaign.status)} className="ml-auto shrink-0">
                {campaign.status}
              </Badge>
            </div>
            <span className="text-muted-foreground text-xs">
              {formatDateRange(campaign.startDate, campaign.endDate)}
            </span>
            <span className="text-muted-foreground line-clamp-2 w-full text-xs">
              {campaign.description}
            </span>
            <span className="text-muted-foreground text-xs">
              {campaign.artefactCount} artefact{campaign.artefactCount !== 1 ? "s" : ""}
            </span>
          </button>
        )
      })}
    </>
  )
}
