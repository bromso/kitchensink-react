"use client"

import { Icon } from "@iconify/react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/animate-ui/components/radix/sidebar"
import { Button } from "@repo/ui/components/button"
import { Input } from "@repo/ui/components/input"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"
import { CreateCampaignDialog } from "@/app/(dashboard)/campaigns/components/create-campaign-dialog"
import { useCampaigns } from "@/data/hooks"
import { type Campaign, groupCampaignsByDate } from "@/data/mock/campaigns"

const navLinks = [
  { title: "Overview", icon: "ph:house-fill", url: "/campaigns/overview" },
  { title: "Kanban", icon: "ph:kanban-fill", url: "/campaigns/kanban" },
  { title: "Table", icon: "ph:table-fill", url: "/campaigns/table" },
]

/** Sticky header with view links, create button, and separator */
export function CampaignNavHeader() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {navLinks.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
              <Link href={item.url}>
                <Icon icon={item.icon} />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>

      {/* Create Campaign Button */}
      <div className="pt-2">
        <CreateCampaignDialog>
          <Button className="w-full" size="sm">
            <Icon icon="ph:plus-bold" className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </CreateCampaignDialog>
      </div>
    </SidebarGroup>
  )
}

/** Scrollable content with search and campaign list */
export function CampaignNavContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedCampaignId = searchParams.get("campaign")
  const [searchQuery, setSearchQuery] = useState("")

  const { campaigns, loading } = useCampaigns()

  const filteredCampaigns = useMemo(() => {
    if (!searchQuery.trim()) return campaigns
    const query = searchQuery.toLowerCase()
    return campaigns.filter(
      (c) => c.title.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)
    )
  }, [campaigns, searchQuery])

  const groupedCampaigns = useMemo(
    () => groupCampaignsByDate(filteredCampaigns),
    [filteredCampaigns]
  )

  const handleCampaignClick = (campaign: Campaign) => {
    const params = new URLSearchParams()
    params.set("campaign", campaign.id)
    router.push(`/campaigns?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      {/* Search */}
      <SidebarGroup className="py-4">
        <div className="px-2">
          <Input
            placeholder="Search campaigns..."
            className="h-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </SidebarGroup>

      {/* Campaign List by Date */}
      <div className="pb-4">
        <CampaignListSection
          title="This Week"
          campaigns={groupedCampaigns.thisWeek}
          selectedId={selectedCampaignId}
          onSelect={handleCampaignClick}
        />
        <CampaignListSection
          title="This Month"
          campaigns={groupedCampaigns.thisMonth}
          selectedId={selectedCampaignId}
          onSelect={handleCampaignClick}
        />
        <CampaignListSection
          title="Last Month"
          campaigns={groupedCampaigns.lastMonth}
          selectedId={selectedCampaignId}
          onSelect={handleCampaignClick}
        />
        <CampaignListSection
          title="Older"
          campaigns={groupedCampaigns.older}
          selectedId={selectedCampaignId}
          onSelect={handleCampaignClick}
        />
      </div>
    </>
  )
}

interface CampaignListSectionProps {
  title: string
  campaigns: Campaign[]
  selectedId: string | null
  onSelect: (campaign: Campaign) => void
}

function CampaignListSection({ title, campaigns, selectedId, onSelect }: CampaignListSectionProps) {
  if (campaigns.length === 0) return null

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel className="text-muted-foreground text-[10px] uppercase tracking-wider">
        {title}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {campaigns.map((campaign) => (
            <SidebarMenuItem key={campaign.id}>
              <SidebarMenuButton
                isActive={selectedId === campaign.id}
                onClick={() => onSelect(campaign)}
                tooltip={campaign.title}
                className="h-auto py-1.5"
              >
                <StatusDot status={campaign.status} />
                <span className="truncate">{campaign.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function StatusDot({ status }: { status: Campaign["status"] }) {
  const colors: Record<Campaign["status"], string> = {
    draft: "bg-muted-foreground",
    active: "bg-green-500",
    completed: "bg-blue-500",
    archived: "bg-gray-400",
  }

  return <span className={`h-2 w-2 shrink-0 rounded-full ${colors[status]}`} />
}
