import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/accordion"
import Link from "next/link"

import { faq } from "@/content/kitchensink-react"

import { cn } from "@/lib/utils"

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2"
  className?: string
  className2?: string
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">{faq.headline}</h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">{faq.headline}</h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              {faq.subheadline}{" "}
              <Link href="/contact" className="underline underline-offset-4">
                Get in touch
              </Link>{" "}
              if you need more help.
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {faq.categories.map((category) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">{category.title}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item) => (
                    <AccordionItem key={item.question} value={item.question}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
