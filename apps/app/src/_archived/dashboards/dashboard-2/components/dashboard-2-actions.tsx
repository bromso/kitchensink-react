import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"

export default function Dashboard2Actions() {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <Icon icon="tabler:filter" /> Filter By
      </Button>
      <Button variant="default">
        <Icon icon="tabler:file-description" />
        Export
      </Button>
    </div>
  )
}
