"use client"

import { Icon } from "@iconify/react"
import { BlurFade } from "@repo/ui/components/blur-fade"
import { Button } from "@repo/ui/components/button"
import GradientBlur from "@repo/ui/components/gradient-blur"
import { ScrollArea } from "@repo/ui/components/scroll-area"
import { cn } from "@repo/ui/lib/utils"
import { AnimatePresence, motion } from "motion/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { useArtefacts, useArtefactsByStatus, useCampaigns } from "@/data/hooks"
import {
  type Artefact,
  type ArtefactStatus,
  type ArtefactType,
  artefactTypes,
} from "@/data/mock/campaigns"

interface StatusCategory {
  id: string
  title: string
  description: string
  icon: string
  artefactStatus: ArtefactStatus
  color: string
  bgColor: string
}

const statusCategories: StatusCategory[] = [
  {
    id: "pending-review",
    title: "Pending Review",
    description: "Items awaiting initial review from the compliance team",
    icon: "lucide:clock",
    artefactStatus: "review",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    id: "brand-approval",
    title: "Brand Approval",
    description: "Items pending approval from brand stakeholders",
    icon: "lucide:stamp",
    artefactStatus: "draft",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    id: "approved",
    title: "Approved",
    description: "Items that have passed all compliance checks",
    icon: "lucide:check-circle",
    artefactStatus: "approved",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    id: "published",
    title: "Published",
    description: "Items that are live and published",
    icon: "lucide:globe",
    artefactStatus: "published",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
]

const PANEL_WIDTH = 400

function getArtefactIcon(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.icon || "tabler:file"
}

function getArtefactTypeLabel(type: ArtefactType): string {
  const typeConfig = artefactTypes.find((t) => t.value === type)
  return typeConfig?.label || type
}

interface CampaignGroup {
  campaignId: string
  campaignTitle: string
  artefacts: Artefact[]
}

interface Campaign {
  id: string
  title: string
}

function groupArtefactsByCampaign(
  artefactList: Artefact[],
  campaigns: Campaign[]
): CampaignGroup[] {
  const campaignMap = new Map(campaigns.map((c) => [c.id, c]))
  const groupMap = new Map<string, Artefact[]>()

  for (const artefact of artefactList) {
    const existing = groupMap.get(artefact.campaignId) || []
    existing.push(artefact)
    groupMap.set(artefact.campaignId, existing)
  }

  const groups: CampaignGroup[] = []
  for (const [campaignId, artefacts] of groupMap) {
    const campaign = campaignMap.get(campaignId)
    groups.push({
      campaignId,
      campaignTitle: campaign?.title || "Unknown Campaign",
      artefacts,
    })
  }

  // Sort by campaign title
  groups.sort((a, b) => a.campaignTitle.localeCompare(b.campaignTitle))

  return groups
}

export default function CampaignsOverviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selectedStatusId = searchParams.get("status")

  // Fetch data using GraphQL hooks (falls back to mock data if Supabase not configured)
  const { campaigns } = useCampaigns()
  const { artefacts: allArtefacts } = useArtefacts()

  const selectedCategory = statusCategories.find((c) => c.id === selectedStatusId)

  // Filter artefacts by selected status
  const artefacts = useMemo(() => {
    if (!selectedCategory) return []
    return allArtefacts.filter((a) => a.status === selectedCategory.artefactStatus)
  }, [allArtefacts, selectedCategory])

  const groupedArtefacts = useMemo(
    () => groupArtefactsByCampaign(artefacts, campaigns),
    [artefacts, campaigns]
  )
  const isPanelOpen = Boolean(selectedStatusId)

  const handleCategoryClick = (category: StatusCategory) => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedStatusId === category.id) {
      params.delete("status")
    } else {
      params.set("status", category.id)
    }
    router.push(`/campaigns/overview?${params.toString()}`, { scroll: false })
  }

  const handleArtefactClick = (artefact: Artefact) => {
    router.push(`/campaigns?campaign=${artefact.campaignId}&artefact=${artefact.id}`)
  }

  const handleClosePanel = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("status")
    router.push(`/campaigns/overview?${params.toString()}`, { scroll: false })
  }

  // Get counts for each category
  const getCategoryCount = (category: StatusCategory) => {
    return allArtefacts.filter((a) => a.status === category.artefactStatus).length
  }

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden">
      <motion.div
        className="flex-1 overflow-auto"
        animate={{
          marginRight: isPanelOpen ? PANEL_WIDTH : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <div className="border-b p-6 pb-4">
          <h1 className="text-xl font-semibold">Compliance Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Monitor and manage brand compliance across all campaigns
          </p>
        </div>

        <div className="grid gap-4 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statusCategories.map((category, index) => (
              <BlurFade
                key={category.id}
                delay={0.05 + index * 0.03}
                duration={0.3}
                direction="up"
                className="h-full"
              >
                <StatusCategoryCard
                  category={category}
                  count={getCategoryCount(category)}
                  isSelected={selectedStatusId === category.id}
                  onClick={() => handleCategoryClick(category)}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </motion.div>

      <GradientBlur height="16%" className="z-20" />

      {/* Side panel for artefacts list */}
      <AnimatePresence>
        {selectedStatusId && selectedCategory && (
          <motion.div
            initial={{ x: PANEL_WIDTH, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: PANEL_WIDTH, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="bg-background absolute right-0 top-0 h-full border-l"
            style={{ width: PANEL_WIDTH }}
          >
            <div className="flex h-full flex-col">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b px-4 py-3">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      selectedCategory.bgColor
                    )}
                  >
                    <Icon
                      icon={selectedCategory.icon}
                      className={cn("h-5 w-5", selectedCategory.color)}
                    />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold">{selectedCategory.title}</h2>
                    <p className="text-muted-foreground text-xs">
                      {artefacts.length} item{artefacts.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleClosePanel}>
                  <Icon icon="lucide:x" className="h-4 w-4" />
                </Button>
              </div>

              {/* Artefacts list */}
              <ScrollArea className="h-0 min-h-0 flex-1">
                <div className="space-y-4 p-4 pb-24">
                  {artefacts.length === 0 ? (
                    <div className="text-muted-foreground py-8 text-center text-sm">
                      No items in this category
                    </div>
                  ) : (
                    groupedArtefacts.map((group) => (
                      <ArtefactSection
                        key={group.campaignId}
                        title={group.campaignTitle}
                        artefacts={group.artefacts}
                        onArtefactClick={handleArtefactClick}
                      />
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface StatusCategoryCardProps {
  category: StatusCategory
  count: number
  isSelected?: boolean
  onClick?: () => void
}

function StatusCategoryCard({ category, count, isSelected, onClick }: StatusCategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "bg-card hover:bg-accent group flex h-full w-full cursor-pointer flex-col rounded-lg border p-5 text-left transition-all",
        isSelected && "ring-primary ring-2"
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-lg transition-colors",
            category.bgColor,
            "group-hover:opacity-80"
          )}
        >
          <Icon icon={category.icon} className={cn("h-6 w-6 transition-colors", category.color)} />
        </div>
        <span className="text-3xl font-semibold tabular-nums">{count}</span>
      </div>

      <h3 className="mb-1 text-base font-medium">{category.title}</h3>

      <p className="text-muted-foreground text-sm">{category.description}</p>
    </button>
  )
}

interface ArtefactListItemProps {
  artefact: Artefact
  onClick?: () => void
}

function ArtefactListItem({ artefact, onClick }: ArtefactListItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-card hover:bg-accent flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors"
    >
      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
        <Icon icon={getArtefactIcon(artefact.type)} className="text-muted-foreground h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{artefact.name}</p>
        <p className="text-muted-foreground text-xs">{getArtefactTypeLabel(artefact.type)}</p>
      </div>
      <Icon icon="lucide:chevron-right" className="text-muted-foreground h-4 w-4 shrink-0" />
    </button>
  )
}

interface ArtefactSectionProps {
  title: string
  artefacts: Artefact[]
  onArtefactClick: (artefact: Artefact) => void
}

function ArtefactSection({ title, artefacts, onArtefactClick }: ArtefactSectionProps) {
  if (artefacts.length === 0) return null

  return (
    <div className="space-y-2">
      <h3 className="text-muted-foreground text-[10px] font-medium uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-2">
        {artefacts.map((artefact) => (
          <ArtefactListItem
            key={artefact.id}
            artefact={artefact}
            onClick={() => onArtefactClick(artefact)}
          />
        ))}
      </div>
    </div>
  )
}
