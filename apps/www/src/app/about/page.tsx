import type { AboutPage as AboutPageSchema, WithContext } from "schema-dts"

import { Background } from "@/components/background"
import About from "@/components/blocks/about"
import { AboutHero } from "@/components/blocks/about-hero"
import { Investors } from "@/components/blocks/investors"
import { DashedLine } from "@/components/dashed-line"
import { JsonLd } from "@/components/json-ld"
import { metadata as brandMonitorMetadata, siteConfig } from "@/content/kitchensink-react"

const aboutPageSchema: WithContext<AboutPageSchema> = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: `About ${siteConfig.name}`,
  description: brandMonitorMetadata.description,
  url: `${siteConfig.url}/about`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: brandMonitorMetadata.description,
    foundingDate: "2024",
  },
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageSchema} />
      <Background>
        <div className="py-28 lg:py-32 lg:pt-44">
          <AboutHero />

          <About />
          <div className="pt-28 lg:pt-32">
            <DashedLine className="container max-w-5xl scale-x-115" />
            <Investors />
          </div>
        </div>
      </Background>
    </>
  )
}
