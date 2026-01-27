"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip"
import { useSearch } from "./search-provider"

export function SearchButton() {
  const { setOpen } = useSearch()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" className="size-7" onClick={() => setOpen(true)}>
          <Icon icon="lucide:search" className="size-4" />
          <span className="sr-only">Search (⌘K)</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Search</p>
      </TooltipContent>
    </Tooltip>
  )
}
