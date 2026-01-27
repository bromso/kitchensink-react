import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import DatePicker from "@/components/date-picker"

export default function Dashboard3Actions() {
  return (
    <div className="flex items-center gap-2">
      <DatePicker />
      <Button>
        <Icon icon="tabler:filter" /> Filter By
      </Button>
    </div>
  )
}
