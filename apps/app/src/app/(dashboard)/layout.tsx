import { SidebarProvider } from "@repo/ui/components/animate-ui/components/radix/sidebar"
import { cn } from "@repo/ui/lib/utils"
import { cookies } from "next/headers"
import type React from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"

interface Props {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const cookieStore = await cookies()
  const defaultClose = cookieStore.get("sidebar:state")?.value === "false"
  return (
    <div className="border-grid flex flex-1 flex-col">
      <SidebarProvider defaultOpen={!defaultClose}>
        <AppSidebar />
        <main
          id="content"
          className={cn(
            "flex h-full w-full flex-col overflow-hidden",
            "has-[div[data-layout=fixed]]:h-svh",
            "group-data-[scroll-locked=1]/body:h-full",
            "has-[data-layout=fixed]:group-data-[scroll-locked=1]/body:h-svh"
          )}
        >
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}
