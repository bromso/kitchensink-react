import { Icon } from "@iconify/react"

import { benefits } from "@/content/kitchensink-react"

import { cn } from "@/lib/utils"

import { DashedLine } from "../dashed-line"

export const Benefits = ({ className }: { className?: string }) => {
  return (
    <section id="benefits" className={cn("py-28 lg:py-32", className)}>
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            {benefits.sectionLabel}
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">{benefits.headline}</h2>
          <p className="text-muted-foreground leading-snug">{benefits.subheadline}</p>
        </div>

        {/* Benefits Grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {benefits.items.map((benefit) => (
            <div key={benefit.title} className="flex gap-4">
              <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-lg">
                <Icon icon={benefit.icon} className="text-primary size-6" />
              </div>
              <div>
                <h3 className="text-foreground font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
