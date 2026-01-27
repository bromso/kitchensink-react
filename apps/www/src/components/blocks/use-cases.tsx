import { useCases } from "@/content/kitchensink-react"

import { cn } from "@/lib/utils"

import { DashedLine } from "../dashed-line"

export const UseCases = ({ className }: { className?: string }) => {
  return (
    <section id="use-cases" className={cn("py-28 lg:py-32", className)}>
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            {useCases.sectionLabel}
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 max-w-3xl text-center lg:mt-24">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">{useCases.headline}</h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-snug">
            {useCases.subheadline}
          </p>
        </div>

        {/* Use Cases List */}
        <div className="mx-auto mt-12 max-w-4xl lg:mt-20">
          <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
            {useCases.items.map((item, i) => (
              <div
                key={item.title}
                className={cn(
                  "group flex gap-4 rounded-xl border p-5 transition-colors hover:bg-muted/50",
                  i === useCases.items.length - 1 && "md:col-span-2 md:max-w-md md:mx-auto"
                )}
              >
                <div className="text-primary flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-foreground font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
