import Script from "next/script"
import type { Thing, WithContext } from "schema-dts"

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>
}

export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  const schemaType = (data as { "@type"?: string })["@type"] ?? "schema"
  const id = `json-ld-${schemaType.toString().toLowerCase()}`

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="afterInteractive"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Required for JSON-LD structured data injection
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
