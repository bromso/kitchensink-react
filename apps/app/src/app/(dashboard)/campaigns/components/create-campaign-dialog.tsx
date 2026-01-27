"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog"
import { Input } from "@repo/ui/components/input"
import { Label } from "@repo/ui/components/label"
import { Textarea } from "@repo/ui/components/textarea"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"
import { useState } from "react"
import { useCreateCampaign } from "@/data/hooks"

interface CreateCampaignDialogProps {
  children: ReactNode
  onSuccess?: () => void
}

export function CreateCampaignDialog({ children, onSuccess }: CreateCampaignDialogProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { createCampaign, loading, error } = useCreateCampaign()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const campaign = await createCampaign({
        name: title,
        description: description || undefined,
      })

      if (campaign) {
        setOpen(false)
        setTitle("")
        setDescription("")
        onSuccess?.()
        // Navigate to the new campaign
        router.push(`/campaigns?campaign=${campaign.id}`)
      }
    } catch (err) {
      console.error("Failed to create campaign:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Campaign</DialogTitle>
            <DialogDescription>
              Create a new campaign to organize your brand assets and artefacts.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Campaign Name</Label>
              <Input
                id="title"
                placeholder="e.g., Summer Product Launch"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the campaign..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {error && (
            <div className="text-destructive space-y-1 text-sm">
              <p className="font-medium">Failed to create campaign</p>
              <p className="text-muted-foreground text-xs">
                {error.message || "Please check your authentication and try again."}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!title.trim() || loading}>
              {loading ? (
                <>
                  <Icon icon="ph:spinner" className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Icon icon="ph:plus-bold" className="mr-2 h-4 w-4" />
                  Create Campaign
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
