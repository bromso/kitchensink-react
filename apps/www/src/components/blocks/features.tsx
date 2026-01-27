import { Icon } from "@iconify/react"
import { Card, CardContent } from "@repo/ui/components/card"

import { features } from "@/content/kitchensink-react"

import { cn } from "@/lib/utils"

import { DashedLine } from "../dashed-line"

// Define bento grid positions for visual hierarchy
const bentoConfig = [
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-2", size: "large" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", size: "small" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", size: "small" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-2", size: "tall" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", size: "small" },
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", size: "wide" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", size: "small" },
  { colSpan: "md:col-span-1", rowSpan: "md:row-span-1", size: "small" },
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", size: "wide" },
  { colSpan: "md:col-span-2", rowSpan: "md:row-span-1", size: "wide" },
]

export const Features = ({ className }: { className?: string }) => {
  return (
    <section id="features" className={cn("py-28 lg:py-32", className)}>
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            {features.sectionLabel}
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">{features.headline}</h2>
          <p className="text-muted-foreground leading-snug">{features.subheadline}</p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-[repeat(5,minmax(140px,auto))] lg:mt-20">
          {features.items.map((feature, i) => {
            const config = bentoConfig[i] || bentoConfig[0]
            const isLarge = config.size === "large"
            const isTall = config.size === "tall"

            return (
              <Card
                key={feature.title}
                className={cn(
                  "group overflow-hidden transition-shadow hover:shadow-lg",
                  config.colSpan,
                  config.rowSpan
                )}
              >
                <CardContent
                  className={cn(
                    "flex h-full flex-col p-6",
                    isLarge && "justify-between md:p-8",
                    isTall && "justify-between"
                  )}
                >
                  <div
                    className={cn(
                      "bg-primary/10 mb-4 flex items-center justify-center rounded-xl transition-transform group-hover:scale-105",
                      isLarge ? "size-14" : "size-11",
                      isTall && "size-12"
                    )}
                  >
                    <Icon
                      icon={feature.icon}
                      className={cn(
                        "text-primary",
                        isLarge ? "size-7" : "size-5",
                        isTall && "size-6"
                      )}
                    />
                  </div>
                  <div className={cn(isLarge && "mt-auto", isTall && "mt-auto")}>
                    <h3
                      className={cn(
                        "text-foreground font-semibold",
                        isLarge && "text-xl md:text-2xl",
                        isTall && "text-lg"
                      )}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={cn(
                        "text-muted-foreground mt-2 leading-relaxed",
                        isLarge ? "text-base" : "text-sm",
                        isTall && "text-sm"
                      )}
                    >
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
