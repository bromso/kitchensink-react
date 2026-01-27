import dynamic from "next/dynamic"
import type { ContactPage, WithContext } from "schema-dts"

import { Background } from "@/components/background"
import { JsonLd } from "@/components/json-ld"
import { siteConfig } from "@/content/kitchensink-react"

// Dynamic import for Contact component which uses motion library
const Contact = dynamic(() => import("@/components/blocks/contact"), {
  ssr: true,
  loading: () => (
    <div className="container max-w-2xl py-28 lg:py-32 lg:pt-44">
      <div className="h-12 w-48 mx-auto animate-pulse rounded bg-muted" />
    </div>
  ),
})

const contactPageSchema: WithContext<ContactPage> = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${siteConfig.name}`,
  description: `Get in touch with ${siteConfig.name}. We'd love to hear from you.`,
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${siteConfig.url}/contact`,
    },
  },
}

export default function Page() {
  return (
    <>
      <JsonLd data={contactPageSchema} />
      <Background>
        <Contact />
      </Background>
    </>
  )
}
