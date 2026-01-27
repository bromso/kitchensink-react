"use client"

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
import { Button } from "@repo/ui/components/button"
import GradientBlur from "@repo/ui/components/gradient-blur"
import { AnimatePresence, motion } from "motion/react"
import { useSearchParams } from "next/navigation"
import { useCampaign } from "@/data/hooks"
import { ArtefactList } from "./components/artefact-list"
import { ArtefactPreview } from "./components/artefact-preview"

const PANEL_WIDTH = 400

export default function CampaignsPage() {
  const searchParams = useSearchParams()
  const selectedCampaignId = searchParams.get("campaign")
  const selectedArtefactId = searchParams.get("artefact")

  // Fetch campaign using GraphQL hook (falls back to mock data if Supabase not configured)
  const { campaign } = useCampaign(selectedCampaignId)
  const isPanelOpen = Boolean(selectedArtefactId)

  return (
    <div className="relative flex h-full min-h-full w-full overflow-hidden">
      {/* Main content area - Artefact list */}
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
        {campaign && (
          <div className="border-b p-6 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-semibold">{campaign.title}</h1>
                <p className="text-muted-foreground mt-1 text-sm">{campaign.description}</p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm">
                      Delete Campaign
                    </Button>
                  </DialogTrigger>
                  <DialogContent showCloseButton={false}>
                    <DialogHeader>
                      <DialogTitle>Delete campaign</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this campaign? This action cannot be undone
                        and all associated artefacts will be permanently removed.
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
                <Button variant="outline" size="sm">
                  Run Compliance
                </Button>
              </div>
            </div>
          </div>
        )}
        <ArtefactList campaignId={selectedCampaignId} />
      </motion.div>

      {/* Gradient blur overlay */}
      <GradientBlur height="16%" className="z-20" />

      {/* Right-side artefact preview panel */}
      <AnimatePresence>
        {selectedArtefactId && (
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
            <ArtefactPreview artefactId={selectedArtefactId} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
