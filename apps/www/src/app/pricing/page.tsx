import type { WebPage, WithContext } from "schema-dts"

import { Background } from "@/components/background"
import { Pricing } from "@/components/blocks/pricing"
import { PricingTable } from "@/components/blocks/pricing-table"
import { JsonLd } from "@/components/json-ld"
import { metadata as brandMonitorMetadata, siteConfig } from "@/content/kitchensink-react"

const pricingPageSchema: WithContext<WebPage> = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `Pricing - ${siteConfig.name}`,
  description: `Explore ${siteConfig.name} pricing plans. Find the right plan for your brand compliance needs.`,
  url: `${siteConfig.url}/pricing`,
  mainEntity: {
    "@type": "Product",
    name: siteConfig.name,
    description: brandMonitorMetadata.description,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      offerCount: 3,
    },
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={pricingPageSchema} />
      <Background>
        <Pricing className="py-28 text-center lg:pt-44 lg:pb-32" />
        <PricingTable />
      </Background>
    </>
  )
}
