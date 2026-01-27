"use client"

import { createContext, type ReactNode, useCallback, useContext, useRef, useState } from "react"

const TAB_ORDER = ["campaign", "rules"] as const

interface TabsContextValue {
  activeTab: string
  setActiveTab: (tab: string) => void
  direction: number
}

const TabsContext = createContext<TabsContextValue | null>(null)

export function TabsProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState("campaign")
  const prevTabRef = useRef(activeTab)

  const getDirection = useCallback(() => {
    const currentIndex = TAB_ORDER.indexOf(activeTab as (typeof TAB_ORDER)[number])
    const prevIndex = TAB_ORDER.indexOf(prevTabRef.current as (typeof TAB_ORDER)[number])
    return currentIndex >= prevIndex ? 1 : -1
  }, [activeTab])

  const handleSetActiveTab = useCallback(
    (tab: string) => {
      prevTabRef.current = activeTab
      setActiveTab(tab)
    },
    [activeTab]
  )

  const direction = getDirection()

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab, direction }}>
      {children}
    </TabsContext.Provider>
  )
}

export function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider")
  }
  return context
}
