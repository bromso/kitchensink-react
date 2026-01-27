import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"

export default function LogsAction() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="shrink-0" variant="outline" size="icon">
          <Icon icon="tabler:dots" className="rotate-90 h-5 w-5" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Export to CSV</DropdownMenuItem>
        <DropdownMenuItem>Export to JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
