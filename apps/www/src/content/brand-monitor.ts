/**
 * Symbiora - Marketing Content Module
 *
 * All marketing copy for the Symbiora landing page.
 * Edit this file to update content across all sections.
 */

export const siteConfig = {
  name: "Symbiora",
  tagline: "AI-Powered Brand Compliance",
  url: "https://brandmonitor.ai",
  status: "Phase 1 (prototype)",
}

export const metadata = {
  title: "Symbiora - AI-Powered Brand Compliance Platform",
  description:
    "Symbiora is an AI-powered platform that checks text and visual creatives against your brand guidelines and returns clear pass/fail/review outcomes with actionable feedback—so teams catch issues early, ship faster, and protect brand integrity at scale.",
  keywords: [
    "brand compliance",
    "brand guidelines",
    "AI brand check",
    "creative compliance",
    "brand integrity",
    "brand governance",
    "marketing compliance",
    "brand management",
    "creative review",
    "brand automation",
  ],
}

export const hero = {
  headline: "AI-Powered Brand Compliance",
  subheadline:
    "Symbiora checks text and visual creatives against your brand guidelines and returns clear pass/fail/review outcomes with actionable feedback—so teams catch issues early, ship faster, and protect brand integrity at scale.",
  cta: {
    primary: {
      label: "Join the waitlist",
      href: "/signup",
    },
    secondary: {
      label: "Learn more",
      href: "#benefits",
    },
  },
  highlights: [
    {
      title: "Text & visual analysis",
      description: "Evaluate images, documents, and text against your guidelines.",
      icon: "lucide:scan-eye",
    },
    {
      title: "Clear outcomes",
      description: "Pass, Fail, Review Required, or Not Applicable—with explanations.",
      icon: "lucide:check-circle",
    },
    {
      title: "Actionable feedback",
      description: "Specific, guideline-linked correction suggestions.",
      icon: "lucide:message-square-text",
    },
    {
      title: "Enterprise-ready",
      description: "SSO, RBAC, MFA, and audit logs built in.",
      icon: "lucide:shield-check",
    },
  ],
}

export const benefits = {
  sectionLabel: "KEY BENEFITS",
  headline: "Ship faster. Stay on brand.",
  subheadline:
    "Symbiora helps teams catch issues early, reduce friction, and protect brand integrity at scale.",
  items: [
    {
      title: "Faster approvals",
      description:
        "Move compliance checks earlier in the workflow. Get results in minutes, not days.",
      icon: "lucide:clock",
    },
    {
      title: "Fewer feedback loops",
      description:
        "Specific, guideline-linked correction suggestions eliminate frustrating back-and-forth.",
      icon: "lucide:git-pull-request",
    },
    {
      title: "Consistent brand execution",
      description: "A shared ruleset ensures consistency across teams, channels, and markets.",
      icon: "lucide:layers",
    },
    {
      title: "Reduced risk",
      description:
        "Market-specific rules and auditable status visibility for regulated and multi-market work.",
      icon: "lucide:shield",
    },
    {
      title: "Better collaboration",
      description:
        "Shared status tracking and in-platform review/approval for agency/client partnerships.",
      icon: "lucide:users",
    },
    {
      title: "Improved governance",
      description:
        "Analytics identify which rules cause friction and where guidelines need clarification.",
      icon: "lucide:bar-chart-3",
    },
  ],
}

export const features = {
  sectionLabel: "CORE FEATURES",
  headline: "Everything you need for brand compliance",
  subheadline:
    "A complete platform for evaluating, tracking, and improving brand compliance across your organization.",
  items: [
    {
      title: "Upload & evaluate",
      description:
        "Drag-and-drop images, documents, and text with bulk uploads and progress tracking.",
      icon: "lucide:upload-cloud",
    },
    {
      title: "Multi-layer compliance",
      description:
        "Brand styleguide checks plus concept, seasonal/campaign, and regional/regulatory layers.",
      icon: "lucide:layers-3",
    },
    {
      title: "Real-time evaluation",
      description:
        "Pass / Fail / Review Required / Not Applicable with short explanations and correction guidance.",
      icon: "lucide:zap",
    },
    {
      title: "Version tracking",
      description:
        "Iterative revision support with version history and compliance tracking across versions.",
      icon: "lucide:history",
    },
    {
      title: "Workflow management",
      description:
        "Status tracking for client/agency approvals inside the platform—no more email chains.",
      icon: "lucide:git-branch",
    },
    {
      title: "Role-based dashboards",
      description: "Tailored views for creatives, brand managers, and agency account managers.",
      icon: "lucide:layout-dashboard",
    },
    {
      title: "Reports & analytics",
      description: "Objective accountability and guideline improvement insights.",
      icon: "lucide:pie-chart",
    },
    {
      title: "Notifications",
      description: "Status change alerts via email with optional Slack integration.",
      icon: "lucide:bell",
    },
    {
      title: "Enterprise security",
      description: "SSO options, MFA, RBAC, and audit logs for traceability.",
      icon: "lucide:lock",
    },
    {
      title: "Integration-ready",
      description: "Designed for existing creative workflows, DAM, and PM systems.",
      icon: "lucide:plug",
    },
  ],
}

export const differentiators = {
  sectionLabel: "WHY Symbiora",
  headline: "Built for real enterprise complexity",
  subheadline: "Symbiora is designed as a configurable framework, not a one-off build.",
  items: [
    {
      title: "Configurable rulesets without redevelopment",
      description:
        "Adapt Symbiora to any brand's unique guidelines as a framework, not a one-off build. No engineering required to customize rules.",
      icon: "lucide:settings-2",
    },
    {
      title: "Compliance + workflow in one place",
      description:
        "Checks don't stop at flagging issues—they trigger the right review and approval steps. Everything happens in one tool.",
      icon: "lucide:workflow",
    },
    {
      title: "Designed for enterprise complexity",
      description:
        "Multi-market rules, agency ecosystems, and regulated contexts are first-class scenarios, not afterthoughts.",
      icon: "lucide:building-2",
    },
    {
      title: "Accountability by design",
      description:
        "Audit trail + reporting create objective visibility for leadership, agencies, and brand governance teams.",
      icon: "lucide:file-check",
    },
  ],
}

export const useCases = {
  sectionLabel: "USE CASES",
  headline: "From daily content to global campaigns",
  subheadline:
    "Symbiora adapts to your workflow, whether you're a single team or a global enterprise.",
  items: [
    {
      title: "Day-to-day content creation",
      description: "Faster internal review cycles for routine content.",
    },
    {
      title: "Campaign-specific exceptions",
      description: "Seasonal guideline changes without cross-contamination to other work.",
    },
    {
      title: "High-stakes rebrands",
      description: 'Prevent "old vs new" brand fragmentation during transitions.',
    },
    {
      title: "Agency partner onboarding",
      description: "Guided, self-serve learning with immediate feedback for new partners.",
    },
    {
      title: "Co-branding collaborations",
      description: "Satisfy two brands' rules simultaneously in joint campaigns.",
    },
    {
      title: "Global campaigns",
      description: "Regional regulatory/cultural requirements with oversight, not micromanagement.",
    },
    {
      title: "Influencer content",
      description: "Brand safety without sharing full internal guidelines.",
    },
  ],
}

export const idealCustomer = {
  sectionLabel: "WHO IT'S FOR",
  headline: "Built for enterprise scale",
  subheadline: "Symbiora is designed for organizations where brand integrity is business-critical.",
  bestFit: {
    title: "Best fit",
    items: [
      {
        title: "Large enterprises",
        description:
          "High brand equity, high content volume, multiple stakeholders, multi-market operations, and/or regulated constraints.",
        icon: "lucide:building",
      },
      {
        title: "Creative & marketing agencies",
        description:
          "Managing enterprise clients who need predictable approvals, fewer revisions, and clearer compliance expectations.",
        icon: "lucide:palette",
      },
      {
        title: "IT, Security & Procurement",
        description:
          "Stakeholders who require SSO/RBAC/MFA, audit logs, and clear data-handling principles.",
        icon: "lucide:shield-check",
      },
    ],
  },
  notFit: {
    title: "Not the best fit",
    items: [
      {
        title: "Fully automated expectations",
        description:
          'Teams expecting zero-human-review brand decisions. Our system includes "Review Required" states for ambiguous cases.',
      },
      {
        title: "Proven ROI requirements today",
        description:
          "Buyers requiring proven ROI metrics immediately. We're in prototype stage with qualitative validation.",
      },
    ],
  },
}

export const whyItMatters = {
  sectionLabel: "WHY IT MATTERS",
  headline: "Protect brand value at scale",
  subheadline:
    "Brand value can represent a substantial share of company value, but modern content velocity, stakeholder complexity, and regional regulation make manual compliance unscalable.",
  description:
    "Manual compliance creates bottlenecks, launch risk, and strained agency relationships. Symbiora is built to protect brand integrity while reducing friction: less time spent policing, more time spent creating, shipping, and improving the brand system itself.",
  stats: [
    {
      value: "Minutes",
      label: "not days for compliance checks",
    },
    {
      value: "One tool",
      label: "replaces email chains and calls",
    },
    {
      value: "Full audit",
      label: "trail for every decision",
    },
  ],
}

export const faq = {
  headline: "Got questions?",
  subheadline: "Everything you need to know about Symbiora.",
  categories: [
    {
      title: "Product",
      questions: [
        {
          question: "What file formats does Symbiora support?",
          answer:
            "Symbiora supports common creative formats including images (PNG, JPG, SVG, WebP), documents (PDF, DOCX), and plain text. We're expanding format support based on customer needs.",
        },
        {
          question: "How does the compliance evaluation work?",
          answer:
            "Our multi-layer compliance engine checks content against your brand styleguide, plus optional concept, seasonal/campaign, and regional/regulatory layers. Each check returns Pass, Fail, Review Required, or Not Applicable with explanations and suggested fixes.",
        },
        {
          question: "Can I customize the rules for my brand?",
          answer:
            "Yes. Symbiora is designed as a configurable framework. You can adapt rules to match your unique brand guidelines without any redevelopment or engineering work.",
        },
      ],
    },
    {
      title: "Security & Privacy",
      questions: [
        {
          question: "What security features are available?",
          answer:
            "Symbiora includes enterprise-grade security: SSO options, MFA, role-based access control (RBAC), and comprehensive audit logs for traceability.",
        },
        {
          question: "How is my data handled?",
          answer:
            "Client data will not be used to train public AI models or shared across client boundaries. We maintain data isolation and audit intentions. Note: prototype uses standard AI APIs; production requires DPAs.",
        },
      ],
    },
    {
      title: "Getting started",
      questions: [
        {
          question: "What is the current product status?",
          answer:
            "Symbiora is currently in Phase 1 (prototype validation/specification). We have MVP and market-ready phases defined in our roadmap. Join the waitlist to get early access.",
        },
        {
          question: "How can I try Symbiora?",
          answer:
            "Join our waitlist to be notified when we're ready for early access users. We're looking for design partners who want to shape the product.",
        },
      ],
    },
  ],
}

export const cta = {
  headline: "Ready to protect your brand at scale?",
  subheadline: "Join the waitlist for early access and help shape the future of brand compliance.",
  buttonLabel: "Join the waitlist",
  buttonHref: "/signup",
}
