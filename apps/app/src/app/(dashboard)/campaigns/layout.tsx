import type React from "react"
import { Header } from "@/components/layout/header"

interface Props {
  children: React.ReactNode
}

export default function CampaignsLayout({ children }: Props) {
  return (
    <div className="flex h-svh w-full flex-col overflow-hidden">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  )
}
