"use client"

import { Icon } from "@iconify/react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/animate-ui/components/radix/sidebar"
// import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/components/tooltip"
import { cn } from "@repo/ui/lib/utils"
import * as React from "react"
import { Logo } from "../logo"

interface Props {
  teams: {
    name: string
    logo: string
    plan: string
  }[]
}

export function TeamSwitcher({ teams }: Props) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  // Helper function to render logo based on string value
  const renderLogo = (logo: string, className?: string) => {
    if (logo === "logo") {
      return <Logo symbol className={className} />
    }
    return <Icon icon={logo} className={className} />
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="ring-sidebar-primary/50 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground focus-visible:ring-1"
                >
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    {renderLogo(activeTeam.logo, "size-4")}
                  </div>
                  <div className="grid flex-1 text-left text-xs leading-tight">
                    <span className="truncate font-semibold">{activeTeam.name}</span>
                    <span className="truncate text-xs">{activeTeam.plan}</span>
                  </div>
                  <Icon icon="lucide:chevrons-up-down" className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="right">Change Brand</TooltipContent>
          </Tooltip>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">Brands</DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2 text-balance"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  {renderLogo(
                    team.logo,
                    cn("size-4 shrink-0", index === 0 && "invert-0 dark:invert")
                  )}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Icon icon="lucide:plus" className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add Brand</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
