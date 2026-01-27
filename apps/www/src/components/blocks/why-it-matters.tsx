import { Button } from "@repo/ui/components/button"
import Link from "next/link"

import { cta, whyItMatters } from "@/content/kitchensink-react"

import { cn } from "@/lib/utils"

import { DashedLine } from "../dashed-line"

export const WhyItMatters = ({ className }: { className?: string }) => {
  return (
    <section id="why-it-matters" className={cn("py-28 lg:py-32", className)}>
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            {whyItMatters.sectionLabel}
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 max-w-4xl lg:mt-24">
          <div className="text-center">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              {whyItMatters.headline}
            </h2>
            <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg leading-relaxed">
              {whyItMatters.subheadline}
            </p>
            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl leading-relaxed">
              {whyItMatters.description}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
            {whyItMatters.stats.map((stat) => (
              <article key={stat.label} className="rounded-xl border bg-card p-6 text-center">
                <h3 className="text-primary text-3xl font-bold tracking-tight">{stat.value}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{stat.label}</p>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl bg-primary/5 p-8 text-center md:p-12">
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{cta.headline}</h3>
            <p className="text-muted-foreground mx-auto mt-3 max-w-md">{cta.subheadline}</p>
            <Button asChild size="lg" className="mt-6">
              <Link href={cta.buttonHref}>{cta.buttonLabel}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
