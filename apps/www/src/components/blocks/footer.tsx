import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import Link from "next/link"

import { cta, siteConfig } from "@/content/kitchensink-react"

export function Footer() {
  const navigation = [
    { name: "Features", href: "/#features" },
    { name: "Use Cases", href: "/#use-cases" },
    { name: "Pricing", href: "/pricing" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ]

  const social = [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
  ]

  const legal = [{ name: "Privacy Policy", href: "/privacy" }]

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">{cta.headline}</h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          {cta.subheadline}
        </p>
        <div>
          <Button size="lg" className="mt-4" asChild>
            <Link href={cta.buttonHref}>{cta.buttonLabel}</Link>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="font-medium transition-opacity hover:opacity-75">
                {item.name}
              </Link>
            </li>
          ))}
          {social.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75"
              >
                {item.name} <Icon icon="lucide:arrow-up-right" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Decorative brand watermark */}
      <div
        className="text-primary relative mt-10 w-full overflow-hidden md:mt-14 lg:mt-20"
        aria-hidden="true"
      >
        <div className="flex items-center justify-center">
          <span className="translate-y-[30%] text-[clamp(5rem,18vw,16rem)] font-bold tracking-tighter whitespace-nowrap opacity-[0.08]">
            {siteConfig.name}
          </span>
        </div>
      </div>
    </footer>
  )
}
