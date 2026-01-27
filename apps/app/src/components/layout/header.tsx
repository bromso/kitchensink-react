import { SidebarTrigger } from "@repo/ui/components/animate-ui/components/radix/sidebar"
import { Separator } from "@repo/ui/components/separator"
import { cn } from "@repo/ui/lib/utils"
import { HeaderBreadcrumbs } from "@/components/layout/header-breadcrumbs"
import { NotificationButton } from "@/components/notification-button"
import { SearchButton } from "@/components/search-button"

export function Header() {
  return (
    <header
      className={cn(
        "bg-background/60 backdrop-blur-sm z-50 flex h-16 shrink-0 items-center gap-2 border-b px-4",
        "sticky top-0"
      )}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex w-full items-center justify-between">
        <HeaderBreadcrumbs />
        <div className="flex items-center gap-2">
          <SearchButton />
          <NotificationButton />
        </div>
      </div>
    </header>
  )
}
