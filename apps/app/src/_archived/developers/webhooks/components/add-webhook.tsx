"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import { useState } from "react"
import { MutateWebhook } from "./mutate-webhook"

export function AddWebhook() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button size="sm" variant="default" onClick={() => setOpen(true)}>
        <Icon icon="lucide:plus" /> Add Webhook
      </Button>

      <MutateWebhook open={open} setOpen={setOpen} />
    </>
  )
}
