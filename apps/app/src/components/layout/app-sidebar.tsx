"use client"

import { Icon } from "@iconify/react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@repo/ui/components/animate-ui/components/radix/sidebar"
import Link from "next/link"
import type React from "react"
import { NavTabsContent, NavTabsHeader } from "@/components/layout/nav-tabs"
import { TabsProvider } from "@/components/layout/nav-tabs-context"
import { NavUser } from "@/components/layout/nav-user"
import { TeamSwitcher } from "@/components/layout/team-switcher"
import { sidebarData } from "@/data/mock/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <aside className="relative">
      <Sidebar collapsible="icon" {...props}>
        <TabsProvider>
          <SidebarHeader className="gap-0 border-b">
            <TeamSwitcher teams={sidebarData.teams} />
            <NavTabsHeader />
          </SidebarHeader>
          <SidebarContent>
            <NavTabsContent />
          </SidebarContent>
        </TabsProvider>
        <SidebarFooter className="gap-0 border-t">
          <SidebarMenu>
            {sidebarData.navSecondary.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild size="sm">
                  <Link href={item.url}>
                    <Icon icon={item.icon} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </aside>
  )
}
