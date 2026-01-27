import { Icon } from "@iconify/react"
import { Card, CardContent } from "@repo/ui/components/card"

import { differentiators } from "@/content/kitchensink-react"

import { cn } from "@/lib/utils"

import { DashedLine } from "../dashed-line"

export const Differentiators = ({ className }: { className?: string }) => {
  return (
    <section id="differentiators" className={cn("py-28 lg:py-32", className)}>
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            {differentiators.sectionLabel}
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 max-w-3xl text-center lg:mt-24">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {differentiators.headline}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-snug">
            {differentiators.subheadline}
          </p>
        </div>

        {/* Differentiators Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-20">
          {differentiators.items.map((item, i) => (
            <Card
              key={item.title}
              className={cn("overflow-hidden", i === 0 && "md:col-span-2 lg:col-span-1")}
            >
              <CardContent className="flex flex-col gap-4 p-6 md:p-8">
                <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
                  <Icon icon={item.icon} className="text-primary size-6" />
                </div>
                <div>
                  <h3 className="text-foreground text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
