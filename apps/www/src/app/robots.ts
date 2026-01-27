import type { MetadataRoute } from "next"

import { siteConfig } from "@/content/kitchensink-react"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/", // API routes
          "/_next/", // Next.js internals
          "/private/", // Private pages
        ],
      },
      {
        // Googlebot gets full access
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        // Block AI training crawlers from scraping content
        userAgent: [
          "GPTBot", // OpenAI
          "ChatGPT-User", // OpenAI ChatGPT
          "CCBot", // Common Crawl (used for AI training)
          "anthropic-ai", // Anthropic
          "Claude-Web", // Anthropic Claude
          "Google-Extended", // Google AI training
          "FacebookBot", // Meta AI training
          "Bytespider", // ByteDance
        ],
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
