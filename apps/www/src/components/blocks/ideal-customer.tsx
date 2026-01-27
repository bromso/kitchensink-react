import { Icon } from "@iconify/react"
import { Card, CardContent } from "@repo/ui/components/card"

import { idealCustomer } from "@/content/kitchensink-react"

import { cn } from "@/lib/utils"

import { DashedLine } from "../dashed-line"

export const IdealCustomer = ({ className }: { className?: string }) => {
  return (
    <section id="who-its-for" className={cn("py-28 lg:py-32", className)}>
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            {idealCustomer.sectionLabel}
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 max-w-3xl text-center lg:mt-24">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            {idealCustomer.headline}
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl leading-snug">
            {idealCustomer.subheadline}
          </p>
        </div>

        {/* Best Fit Section */}
        <div className="mt-12 lg:mt-20">
          <h3 className="text-center text-lg font-semibold text-primary">
            {idealCustomer.bestFit.title}
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {idealCustomer.bestFit.items.map((item) => (
              <Card key={item.title}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="bg-primary/10 mb-4 flex size-14 items-center justify-center rounded-xl">
                    <Icon icon={item.icon} className="text-primary size-7" />
                  </div>
                  <h4 className="text-foreground font-semibold">{item.title}</h4>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Not Fit Section */}
        <div className="mx-auto mt-16 max-w-2xl">
          <h3 className="text-center text-lg font-semibold text-muted-foreground">
            {idealCustomer.notFit.title}
          </h3>
          <div className="mt-6 space-y-4">
            {idealCustomer.notFit.items.map((item) => (
              <div key={item.title} className="flex gap-4 rounded-lg border border-dashed p-4">
                <Icon icon="lucide:info" className="text-muted-foreground mt-0.5 size-5 shrink-0" />
                <div>
                  <h4 className="text-foreground font-medium">{item.title}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
