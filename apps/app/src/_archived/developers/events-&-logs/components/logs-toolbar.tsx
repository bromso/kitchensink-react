import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip"
import type { Dispatch, SetStateAction } from "react"
import { SearchInput } from "@/components/search-input"
import LogsAction from "./logs-actions"
import MobileFilterSheet from "./mobile-filter-sheet"

interface Props {
  toggleFilters: () => void
  searchVal: string
  setSearchVal: Dispatch<SetStateAction<string>>
}

export default function LogsToolbar({ toggleFilters, searchVal, setSearchVal }: Props) {
  return (
    <div className="border-muted flex items-center gap-2 border-b p-3">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleFilters}
              className="hidden shrink-0 lg:block"
              variant="outline"
              size="icon"
            >
              <Icon icon="tabler:filter" className="m-auto h-5 w-5" strokeWidth={1.5} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">Toggle Filter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <MobileFilterSheet />

      <SearchInput value={searchVal} onChange={(e) => setSearchVal(e)} className="flex-1" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="shrink-0" variant="outline" size="icon">
              <Icon icon="tabler:refresh" className="h-5 w-5" strokeWidth={1.5} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium">Refresh</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button variant="outline" className="shrink-0 px-3">
        <Icon icon="tabler:playstation-triangle" className="rotate-90 h-5 w-5" strokeWidth={1.5} />
        <p className="text-sm">Live</p>
      </Button>
      <LogsAction />
    </div>
  )
}
