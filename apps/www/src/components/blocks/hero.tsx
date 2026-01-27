import { Icon } from "@iconify/react"
import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import Link from "next/link"
import { DashedLine } from "@/components/dashed-line"
import { hero, siteConfig } from "@/content/kitchensink-react"

export const Hero = () => {
  return (
    <section className="min-h-[60vh] py-28 lg:min-h-[70vh] lg:py-32 lg:pt-44">
      <div className="container flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        {/* Left side - Main content */}
        <div className="flex-1">
          <Badge
            variant="outline"
            className="mb-4 gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-amber-500" />
            </span>
            Product status: {siteConfig.status}
          </Badge>

          <h1 className="text-foreground max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl">
            {hero.headline}
          </h1>

          <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed md:text-xl">
            {hero.subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button asChild size="lg">
              <Link href={hero.cta.primary.href}>{hero.cta.primary.label}</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="from-background gap-2 bg-linear-to-r to-transparent shadow-md"
              asChild
            >
              <Link href={hero.cta.secondary.href}>
                {hero.cta.secondary.label}
                <Icon icon="lucide:arrow-right" className="size-4 stroke-3" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side - Highlights */}
        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:pl-10">
          <DashedLine orientation="vertical" className="absolute top-0 left-0 max-lg:hidden" />
          <DashedLine orientation="horizontal" className="absolute top-0 lg:hidden" />
          {hero.highlights.map((highlight) => (
            <div key={highlight.title} className="flex gap-2.5 lg:gap-5">
              <Icon icon={highlight.icon} className="text-primary mt-1 size-5 shrink-0 lg:size-6" />
              <div>
                <h2 className="font-text text-foreground font-semibold">{highlight.title}</h2>
                <p className="text-muted-foreground max-w-76 text-sm">{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
