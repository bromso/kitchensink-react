import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import DatePicker from "@/components/date-picker"

export default function Dashboard1Actions() {
  return (
    <div className="flex items-center space-x-2">
      <Button>
        <Icon icon="tabler:download" />
        Download
      </Button>
      <DatePicker />
    </div>
  )
}
