import dynamic from "next/dynamic"
import type { SoftwareApplication, WithContext } from "schema-dts"

import { Background } from "@/components/background"
import { Hero } from "@/components/blocks/hero"
import { JsonLd } from "@/components/json-ld"
import { metadata as brandMonitorMetadata, features, siteConfig } from "@/content/kitchensink-react"

// Below-the-fold components - dynamically imported for better initial load
const Benefits = dynamic(() => import("@/components/blocks/benefits").then((mod) => mod.Benefits), {
  ssr: true,
})
const Features = dynamic(() => import("@/components/blocks/features").then((mod) => mod.Features), {
  ssr: true,
})
const Differentiators = dynamic(
  () => import("@/components/blocks/differentiators").then((mod) => mod.Differentiators),
  { ssr: true }
)
const UseCases = dynamic(
  () => import("@/components/blocks/use-cases").then((mod) => mod.UseCases),
  { ssr: true }
)
const IdealCustomer = dynamic(
  () => import("@/components/blocks/ideal-customer").then((mod) => mod.IdealCustomer),
  { ssr: true }
)
const WhyItMatters = dynamic(
  () => import("@/components/blocks/why-it-matters").then((mod) => mod.WhyItMatters),
  { ssr: true }
)
const FAQ = dynamic(() => import("@/components/blocks/faq").then((mod) => mod.FAQ), { ssr: true })

const softwareApplicationSchema: WithContext<SoftwareApplication> = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  description: brandMonitorMetadata.description,
  url: siteConfig.url,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/PreOrder",
  },
  featureList: features.items.map((f) => f.title),
  author: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
}

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <Background className="via-muted to-muted/80">
        <Hero />
        <Benefits />
        <Features />
      </Background>
      <Differentiators />
      <Background variant="bottom">
        <UseCases />
        <IdealCustomer />
        <WhyItMatters />
        <FAQ />
      </Background>
    </>
  )
}
