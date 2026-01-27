import { ScrollArea } from "@repo/ui/components/scroll-area"
import { Separator } from "@repo/ui/components/separator"
import { cn } from "@repo/ui/lib/utils"
import type React from "react"

export default function ContentSection({
  title,
  desc,
  children,
  className,
}: {
  title: string
  desc: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-none">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{desc}</p>
      </div>
      <Separator className="mt-4 flex-none shadow-sm" />
      <ScrollArea className="faded-bottom -mx-4 flex-1 scroll-smooth px-4 md:pb-16">
        <div className={cn("-mx-1 px-1.5 pt-4 lg:max-w-xl", className)}>{children}</div>
      </ScrollArea>
    </div>
  )
}
