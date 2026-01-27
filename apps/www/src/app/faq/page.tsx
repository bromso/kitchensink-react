import type { FAQPage, WithContext } from "schema-dts"

import { Background } from "@/components/background"
import { FAQ } from "@/components/blocks/faq"
import { Testimonials } from "@/components/blocks/testimonials"
import { DashedLine } from "@/components/dashed-line"
import { JsonLd } from "@/components/json-ld"
import { faq } from "@/content/kitchensink-react"

const faqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.categories.flatMap((category) =>
    category.questions.map((q) => ({
      "@type": "Question" as const,
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: q.answer,
      },
    }))
  ),
}

export default function Page() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Background>
        <FAQ
          className="py-28 text-center lg:pt-44 lg:pb-32"
          className2="max-w-xl lg:grid-cols-1"
          headerTag="h1"
        />
        <DashedLine className="mx-auto max-w-xl" />
        <Testimonials dashedLineClassName="hidden" />
      </Background>
    </>
  )
}
