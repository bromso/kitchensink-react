import { benefits, features, metadata, siteConfig } from "@/content/kitchensink-react"

export function GET() {
  const content = `# ${siteConfig.name}

> ${metadata.description}

${siteConfig.name} is an AI-powered brand compliance platform that helps enterprise teams and agencies check text and visual creatives against brand guidelines. The platform returns clear pass/fail/review outcomes with actionable feedback, enabling teams to catch issues early, ship faster, and protect brand integrity at scale.

## Key Features

${features.items.map((f) => `- **${f.title}**: ${f.description}`).join("\n")}

## Benefits

${benefits.items.map((b) => `- **${b.title}**: ${b.description}`).join("\n")}

## Target Audience

- Large enterprises with high brand equity and content volume
- Creative and marketing agencies managing enterprise clients
- IT, Security & Procurement teams requiring SSO/RBAC/MFA and audit logs

## Pages

- [Home](${siteConfig.url}): Main landing page with product overview
- [Pricing](${siteConfig.url}/pricing): Pricing plans and feature comparison
- [About](${siteConfig.url}/about): Company information and mission
- [FAQ](${siteConfig.url}/faq): Frequently asked questions
- [Contact](${siteConfig.url}/contact): Contact form and information
- [Sign Up](${siteConfig.url}/signup): Join the waitlist for early access

## Technical Information

- Product Status: ${siteConfig.status}
- Website: ${siteConfig.url}

## Optional

- [Privacy Policy](${siteConfig.url}/privacy): Privacy and data handling information
- [Login](${siteConfig.url}/login): User authentication page
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
