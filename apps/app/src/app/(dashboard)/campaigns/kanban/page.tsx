"use client"

import GradientBlur from "@repo/ui/components/gradient-blur"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { getArtefacts, getCampaignById } from "@/data/mock/campaigns"

// Dynamic import for heavy @dnd-kit kanban board
const KanbanBoard = dynamic(
  () => import("../components/kanban-board").then((mod) => mod.KanbanBoard),
  {
    ssr: false,
    loading: () => <div className="flex-1 animate-pulse bg-muted" />,
  }
)

export default function CampaignsKanbanPage() {
  const searchParams = useSearchParams()
  const selectedCampaignId = searchParams.get("campaign")

  const campaign = selectedCampaignId ? getCampaignById(selectedCampaignId) : null
  const totalArtefacts = getArtefacts().length

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div className="shrink-0 border-b p-6 pb-4">
        {campaign ? (
          <>
            <h1 className="text-xl font-semibold">{campaign.title}</h1>
            <p className="text-muted-foreground mt-1 text-sm">{campaign.description}</p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">All Artefacts</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Viewing {totalArtefacts} artefacts across all campaigns
            </p>
          </>
        )}
      </div>
      <KanbanBoard campaignId={selectedCampaignId} />
      <GradientBlur height="16%" className="z-20" />
    </div>
  )
}
