"use client"

import { Icon } from "@iconify/react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/animate-ui/components/radix/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarData } from "@/data/mock/sidebar"

export function RulesNav() {
  const pathname = usePathname()

  return (
    <>
      {sidebarData.rulesGroups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel>
            <Icon icon={group.icon} className="mr-2 size-4" />
            {group.title}
          </SidebarGroupLabel>
          <SidebarMenu>
            {group.items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                  <Link href={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
