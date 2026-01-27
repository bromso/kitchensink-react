"use client"

import { useSidebar } from "@repo/ui/components/animate-ui/components/radix/sidebar"
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsContents,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@repo/ui/components/animated-ui/animate/tabs"
import { CampaignNavContent, CampaignNavHeader } from "./campaign-nav"
import { useTabsContext } from "./nav-tabs-context"
import { RulesNav } from "./rules-nav"

/** Header part - goes in SidebarHeader */
export function NavTabsHeader() {
  const { state } = useSidebar()
  const { activeTab, setActiveTab, direction } = useTabsContext()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return null
  }

  return (
    <AnimatedTabs
      defaultValue="campaign"
      value={activeTab}
      onValueChange={setActiveTab}
      direction={direction}
      className="w-full pt-2"
    >
      <AnimatedTabsList className="bg-sidebar-accent/50 w-full">
        <AnimatedTabsTrigger value="campaign">Campaign</AnimatedTabsTrigger>
        <AnimatedTabsTrigger value="rules">Rules</AnimatedTabsTrigger>
      </AnimatedTabsList>

      <AnimatedTabsContents>
        <AnimatedTabsContent value="campaign">
          <CampaignNavHeader />
        </AnimatedTabsContent>
        <AnimatedTabsContent value="rules">
          <div />
        </AnimatedTabsContent>
      </AnimatedTabsContents>
    </AnimatedTabs>
  )
}

/** Content part - goes in SidebarContent */
export function NavTabsContent() {
  const { state } = useSidebar()
  const { activeTab, direction } = useTabsContext()
  const isCollapsed = state === "collapsed"

  if (isCollapsed) {
    return null
  }

  return (
    <AnimatedTabs
      defaultValue="campaign"
      value={activeTab}
      direction={direction}
      className="w-full"
    >
      <AnimatedTabsContents>
        <AnimatedTabsContent value="campaign">
          <CampaignNavContent />
        </AnimatedTabsContent>
        <AnimatedTabsContent value="rules">
          <RulesNav />
        </AnimatedTabsContent>
      </AnimatedTabsContents>
    </AnimatedTabs>
  )
}
