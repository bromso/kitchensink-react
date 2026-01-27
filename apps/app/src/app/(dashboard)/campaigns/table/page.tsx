"use client"

import GradientBlur from "@repo/ui/components/gradient-blur"
import { useSearchParams } from "next/navigation"
import { getArtefacts, getCampaignById } from "@/data/mock/campaigns"
import { ArtefactsTable } from "../components/artefacts-table"

export default function CampaignsTablePage() {
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
      <ArtefactsTable campaignId={selectedCampaignId} className="px-6 pt-6" />
      <GradientBlur height="16%" className="z-20" />
    </div>
  )
}
