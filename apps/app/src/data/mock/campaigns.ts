// Campaign and Artefact Types
export type ArtefactType =
  | "brochure"
  | "social-post"
  | "ad"
  | "banner"
  | "email-template"
  | "poster"
  | "flyer"
  | "presentation"

export type CampaignStatus = "draft" | "active" | "completed" | "archived"
export type ArtefactStatus = "draft" | "review" | "approved" | "published"

export interface Artefact {
  id: string
  campaignId: string
  name: string
  type: ArtefactType
  description?: string
  src: string
  format?: string
  dimensions?: { width: number; height: number }
  status: ArtefactStatus
  createdAt: string
  updatedAt: string
}

export interface Campaign {
  id: string
  title: string
  description: string
  status: CampaignStatus
  startDate: string
  endDate?: string
  thumbnail?: string
  artefactCount: number
  createdAt: string
  updatedAt: string
}

// Artefact type configuration
export const artefactTypes = [
  { value: "brochure", label: "Brochure", icon: "tabler:book" },
  { value: "social-post", label: "Social Post", icon: "tabler:brand-instagram" },
  { value: "ad", label: "Advertisement", icon: "tabler:ad" },
  { value: "banner", label: "Banner", icon: "tabler:rectangle" },
  { value: "email-template", label: "Email Template", icon: "tabler:mail" },
  { value: "poster", label: "Poster", icon: "tabler:photo" },
  { value: "flyer", label: "Flyer", icon: "tabler:file-text" },
  { value: "presentation", label: "Presentation", icon: "tabler:presentation" },
] as const

export const campaignStatuses = [
  { value: "draft", label: "Draft", icon: "tabler:pencil" },
  { value: "active", label: "Active", icon: "tabler:player-play" },
  { value: "completed", label: "Completed", icon: "tabler:circle-check" },
  { value: "archived", label: "Archived", icon: "tabler:archive" },
] as const

export const artefactStatuses = [
  { value: "draft", label: "Draft", icon: "tabler:pencil" },
  { value: "review", label: "In Review", icon: "tabler:eye" },
  { value: "approved", label: "Approved", icon: "tabler:circle-check" },
  { value: "published", label: "Published", icon: "tabler:world" },
] as const

// Mock Artefacts
const artefacts: Artefact[] = [
  // Summer 2024 Launch Campaign Artefacts
  {
    id: "art-001",
    campaignId: "camp-001",
    name: "Instagram Launch Announcement",
    type: "social-post",
    description: "Hero announcement post for Instagram feed",
    src: "/mock/campaigns/summer-ig-post",
    format: "PNG",
    dimensions: { width: 1080, height: 1080 },
    status: "published",
    createdAt: "2024-05-20T09:00:00Z",
    updatedAt: "2024-06-01T11:00:00Z",
  },
  {
    id: "art-002",
    campaignId: "camp-001",
    name: "LinkedIn Banner",
    type: "banner",
    description: "Professional banner for LinkedIn company page",
    src: "/mock/campaigns/summer-linkedin-banner",
    format: "PNG",
    dimensions: { width: 1584, height: 396 },
    status: "published",
    createdAt: "2024-05-22T10:00:00Z",
    updatedAt: "2024-06-02T14:00:00Z",
  },
  {
    id: "art-003",
    campaignId: "camp-001",
    name: "Product Brochure",
    type: "brochure",
    description: "4-page product overview brochure for print and digital",
    src: "/mock/campaigns/summer-brochure.pdf",
    format: "PDF",
    status: "approved",
    createdAt: "2024-05-25T08:00:00Z",
    updatedAt: "2024-06-05T16:00:00Z",
  },
  {
    id: "art-004",
    campaignId: "camp-001",
    name: "Facebook Ad - Carousel",
    type: "ad",
    description: "5-image carousel ad showcasing product features",
    src: "/mock/campaigns/summer-fb-carousel",
    format: "PNG",
    dimensions: { width: 1080, height: 1080 },
    status: "published",
    createdAt: "2024-05-28T11:00:00Z",
    updatedAt: "2024-06-10T09:00:00Z",
  },
  {
    id: "art-005",
    campaignId: "camp-001",
    name: "Email Newsletter Template",
    type: "email-template",
    description: "Launch announcement email for subscriber list",
    src: "/mock/campaigns/summer-email.html",
    format: "HTML",
    status: "published",
    createdAt: "2024-05-30T13:00:00Z",
    updatedAt: "2024-06-12T10:00:00Z",
  },

  // Brand Refresh Campaign Artefacts
  {
    id: "art-006",
    campaignId: "camp-002",
    name: "Brand Guidelines Presentation",
    type: "presentation",
    description: "Internal presentation deck for brand refresh rollout",
    src: "/mock/campaigns/brand-presentation.pptx",
    format: "PPTX",
    status: "approved",
    createdAt: "2024-03-10T09:00:00Z",
    updatedAt: "2024-03-25T15:00:00Z",
  },
  {
    id: "art-007",
    campaignId: "camp-002",
    name: "Partner Announcement Email",
    type: "email-template",
    description: "Email template for notifying partners of brand changes",
    src: "/mock/campaigns/brand-partner-email.html",
    format: "HTML",
    status: "published",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-04-01T11:00:00Z",
  },
  {
    id: "art-008",
    campaignId: "camp-002",
    name: "Press Release Banner",
    type: "banner",
    description: "Media kit banner for press release distribution",
    src: "/mock/campaigns/brand-press-banner",
    format: "PNG",
    dimensions: { width: 1200, height: 630 },
    status: "published",
    createdAt: "2024-03-18T14:00:00Z",
    updatedAt: "2024-04-02T09:00:00Z",
  },
  {
    id: "art-009",
    campaignId: "camp-002",
    name: "Social Media Announcement",
    type: "social-post",
    description: "Brand refresh announcement for all social platforms",
    src: "/mock/campaigns/brand-social-post",
    format: "PNG",
    dimensions: { width: 1080, height: 1080 },
    status: "published",
    createdAt: "2024-03-20T08:00:00Z",
    updatedAt: "2024-04-05T12:00:00Z",
  },

  // Holiday Promotion Campaign Artefacts
  {
    id: "art-010",
    campaignId: "camp-003",
    name: "Holiday Sale Flyer",
    type: "flyer",
    description: "Printable flyer for in-store holiday promotion",
    src: "/mock/campaigns/holiday-flyer.pdf",
    format: "PDF",
    dimensions: { width: 612, height: 792 },
    status: "approved",
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2024-11-15T14:00:00Z",
  },
  {
    id: "art-011",
    campaignId: "camp-003",
    name: "Instagram Story Ad",
    type: "ad",
    description: "Animated story ad for Instagram promotions",
    src: "/mock/campaigns/holiday-ig-story.mp4",
    format: "MP4",
    dimensions: { width: 1080, height: 1920 },
    status: "review",
    createdAt: "2024-11-05T11:00:00Z",
    updatedAt: "2024-11-18T10:00:00Z",
  },
  {
    id: "art-012",
    campaignId: "camp-003",
    name: "Holiday Gift Guide",
    type: "brochure",
    description: "Digital gift guide featuring seasonal products",
    src: "/mock/campaigns/holiday-gift-guide.pdf",
    format: "PDF",
    status: "draft",
    createdAt: "2024-11-08T13:00:00Z",
    updatedAt: "2024-11-20T16:00:00Z",
  },
  {
    id: "art-013",
    campaignId: "camp-003",
    name: "Twitter Promo Post",
    type: "social-post",
    description: "Holiday sale announcement for Twitter/X",
    src: "/mock/campaigns/holiday-twitter",
    format: "PNG",
    dimensions: { width: 1200, height: 675 },
    status: "draft",
    createdAt: "2024-11-10T10:00:00Z",
    updatedAt: "2024-11-22T09:00:00Z",
  },
  {
    id: "art-014",
    campaignId: "camp-003",
    name: "Store Window Poster",
    type: "poster",
    description: "Large format poster for retail store windows",
    src: "/mock/campaigns/holiday-poster.pdf",
    format: "PDF",
    dimensions: { width: 2400, height: 3600 },
    status: "review",
    createdAt: "2024-11-12T08:00:00Z",
    updatedAt: "2024-11-25T11:00:00Z",
  },

  // Q1 Partner Outreach Campaign Artefacts
  {
    id: "art-015",
    campaignId: "camp-004",
    name: "Partner Solutions Brochure",
    type: "brochure",
    description: "Comprehensive partner program overview",
    src: "/mock/campaigns/partner-brochure.pdf",
    format: "PDF",
    status: "approved",
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-01-20T15:00:00Z",
  },
  {
    id: "art-016",
    campaignId: "camp-004",
    name: "Partnership Deck",
    type: "presentation",
    description: "Sales presentation for potential partners",
    src: "/mock/campaigns/partner-deck.pptx",
    format: "PPTX",
    status: "approved",
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-22T14:00:00Z",
  },
  {
    id: "art-017",
    campaignId: "camp-004",
    name: "LinkedIn Partner Post",
    type: "social-post",
    description: "Partner program announcement for LinkedIn",
    src: "/mock/campaigns/partner-linkedin",
    format: "PNG",
    dimensions: { width: 1200, height: 627 },
    status: "published",
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-01-28T09:00:00Z",
  },
  {
    id: "art-018",
    campaignId: "camp-004",
    name: "Partner Welcome Email",
    type: "email-template",
    description: "Onboarding email series for new partners",
    src: "/mock/campaigns/partner-welcome-email.html",
    format: "HTML",
    status: "published",
    createdAt: "2024-01-15T13:00:00Z",
    updatedAt: "2024-02-01T10:00:00Z",
  },

  // Product Launch Q2 2025 Campaign Artefacts
  {
    id: "art-019",
    campaignId: "camp-005",
    name: "Product Teaser Video",
    type: "ad",
    description: "15-second teaser video for upcoming product launch",
    src: "/mock/campaigns/q2-teaser.mp4",
    format: "MP4",
    dimensions: { width: 1920, height: 1080 },
    status: "draft",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-10T14:00:00Z",
  },
  {
    id: "art-020",
    campaignId: "camp-005",
    name: "Launch Countdown Banner",
    type: "banner",
    description: "Website hero banner with countdown timer",
    src: "/mock/campaigns/q2-countdown-banner",
    format: "PNG",
    dimensions: { width: 1920, height: 600 },
    status: "draft",
    createdAt: "2024-12-05T10:00:00Z",
    updatedAt: "2024-12-12T11:00:00Z",
  },

  // Social Media Blitz Campaign Artefacts
  {
    id: "art-021",
    campaignId: "camp-006",
    name: "Instagram Carousel - Features",
    type: "social-post",
    description: "10-slide carousel showcasing key product features",
    src: "/mock/campaigns/social-ig-carousel",
    format: "PNG",
    dimensions: { width: 1080, height: 1080 },
    status: "published",
    createdAt: "2024-11-20T09:00:00Z",
    updatedAt: "2024-12-01T10:00:00Z",
  },
  {
    id: "art-022",
    campaignId: "camp-006",
    name: "TikTok Video Series",
    type: "social-post",
    description: "Series of 5 short-form videos for TikTok",
    src: "/mock/campaigns/social-tiktok-series.mp4",
    format: "MP4",
    dimensions: { width: 1080, height: 1920 },
    status: "published",
    createdAt: "2024-11-22T11:00:00Z",
    updatedAt: "2024-12-03T14:00:00Z",
  },
  {
    id: "art-023",
    campaignId: "camp-006",
    name: "Twitter Thread Graphics",
    type: "social-post",
    description: "Visual assets for educational Twitter thread",
    src: "/mock/campaigns/social-twitter-thread",
    format: "PNG",
    dimensions: { width: 1200, height: 675 },
    status: "approved",
    createdAt: "2024-11-25T10:00:00Z",
    updatedAt: "2024-12-05T09:00:00Z",
  },
  {
    id: "art-024",
    campaignId: "camp-006",
    name: "LinkedIn Article Banner",
    type: "banner",
    description: "Featured image for thought leadership article",
    src: "/mock/campaigns/social-linkedin-article",
    format: "PNG",
    dimensions: { width: 1200, height: 627 },
    status: "published",
    createdAt: "2024-11-28T08:00:00Z",
    updatedAt: "2024-12-06T15:00:00Z",
  },
  {
    id: "art-025",
    campaignId: "camp-006",
    name: "Facebook Stories Pack",
    type: "social-post",
    description: "5-day story sequence for Facebook",
    src: "/mock/campaigns/social-fb-stories",
    format: "PNG",
    dimensions: { width: 1080, height: 1920 },
    status: "review",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-08T11:00:00Z",
  },
  {
    id: "art-026",
    campaignId: "camp-006",
    name: "YouTube Community Post",
    type: "social-post",
    description: "Engagement post for YouTube community tab",
    src: "/mock/campaigns/social-youtube-community",
    format: "PNG",
    dimensions: { width: 1200, height: 1200 },
    status: "draft",
    createdAt: "2024-12-03T10:00:00Z",
    updatedAt: "2024-12-09T14:00:00Z",
  },
  {
    id: "art-027",
    campaignId: "camp-006",
    name: "Pinterest Pin Collection",
    type: "social-post",
    description: "Collection of 8 vertical pins for Pinterest boards",
    src: "/mock/campaigns/social-pinterest-pins",
    format: "PNG",
    dimensions: { width: 1000, height: 1500 },
    status: "approved",
    createdAt: "2024-12-05T11:00:00Z",
    updatedAt: "2024-12-10T16:00:00Z",
  },
  {
    id: "art-028",
    campaignId: "camp-006",
    name: "Instagram Reels Template",
    type: "ad",
    description: "Editable template for Instagram Reels content",
    src: "/mock/campaigns/social-reels-template.psd",
    format: "PSD",
    dimensions: { width: 1080, height: 1920 },
    status: "published",
    createdAt: "2024-12-06T09:00:00Z",
    updatedAt: "2024-12-11T10:00:00Z",
  },

  // Email Nurture Series Campaign Artefacts
  {
    id: "art-029",
    campaignId: "camp-007",
    name: "Welcome Email Template",
    type: "email-template",
    description: "Day 1 welcome email with brand introduction",
    src: "/mock/campaigns/email-welcome.html",
    format: "HTML",
    status: "published",
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2024-11-15T10:00:00Z",
  },
  {
    id: "art-030",
    campaignId: "camp-007",
    name: "Feature Highlight Email",
    type: "email-template",
    description: "Day 3 email showcasing key product features",
    src: "/mock/campaigns/email-features.html",
    format: "HTML",
    status: "published",
    createdAt: "2024-11-03T10:00:00Z",
    updatedAt: "2024-11-17T11:00:00Z",
  },
  {
    id: "art-031",
    campaignId: "camp-007",
    name: "Case Study Email",
    type: "email-template",
    description: "Day 7 email with customer success story",
    src: "/mock/campaigns/email-case-study.html",
    format: "HTML",
    status: "published",
    createdAt: "2024-11-07T09:00:00Z",
    updatedAt: "2024-11-20T14:00:00Z",
  },
  {
    id: "art-032",
    campaignId: "camp-007",
    name: "Tips & Tricks Email",
    type: "email-template",
    description: "Day 10 email with product tips",
    src: "/mock/campaigns/email-tips.html",
    format: "HTML",
    status: "approved",
    createdAt: "2024-11-10T08:00:00Z",
    updatedAt: "2024-11-22T15:00:00Z",
  },
  {
    id: "art-033",
    campaignId: "camp-007",
    name: "Exclusive Offer Email",
    type: "email-template",
    description: "Day 14 email with special discount",
    src: "/mock/campaigns/email-offer.html",
    format: "HTML",
    status: "review",
    createdAt: "2024-11-14T10:00:00Z",
    updatedAt: "2024-11-25T11:00:00Z",
  },
  {
    id: "art-034",
    campaignId: "camp-007",
    name: "Re-engagement Email",
    type: "email-template",
    description: "Day 21 follow-up for inactive subscribers",
    src: "/mock/campaigns/email-reengage.html",
    format: "HTML",
    status: "draft",
    createdAt: "2024-11-21T09:00:00Z",
    updatedAt: "2024-11-28T10:00:00Z",
  },

  // Trade Show Prep Campaign Artefacts
  {
    id: "art-035",
    campaignId: "camp-008",
    name: "Red Bull Racing Billboard",
    type: "poster",
    description: "Large format billboard design for race track display",
    src: "/ads/redbull-ad-1.webp",
    format: "WEBP",
    dimensions: { width: 1920, height: 1080 },
    status: "approved",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-08T14:00:00Z",
  },
  {
    id: "art-036",
    campaignId: "camp-008",
    name: "Red Bull Energy Ad",
    type: "ad",
    description: "High-energy promotional ad for digital channels",
    src: "/ads/redbull-ad-2.webp",
    format: "WEBP",
    dimensions: { width: 1200, height: 1200 },
    status: "published",
    createdAt: "2024-12-02T10:00:00Z",
    updatedAt: "2024-12-09T11:00:00Z",
  },
  {
    id: "art-037",
    campaignId: "camp-008",
    name: "Red Bull Athlete Spotlight",
    type: "social-post",
    description: "Athlete feature post for Instagram",
    src: "/ads/redbull-ad-3.webp",
    format: "WEBP",
    dimensions: { width: 1080, height: 1350 },
    status: "approved",
    createdAt: "2024-12-03T11:00:00Z",
    updatedAt: "2024-12-10T10:00:00Z",
  },
  {
    id: "art-038",
    campaignId: "camp-008",
    name: "Red Bull Event Banner",
    type: "banner",
    description: "Event announcement banner for website hero",
    src: "/ads/redbull-ad-4.webp",
    format: "WEBP",
    dimensions: { width: 1920, height: 600 },
    status: "published",
    createdAt: "2024-12-04T09:00:00Z",
    updatedAt: "2024-12-10T15:00:00Z",
  },
  {
    id: "art-039",
    campaignId: "camp-008",
    name: "Red Bull Product Shot",
    type: "ad",
    description: "Product-focused promotional image",
    src: "/ads/redbull-ad-5.webp",
    format: "WEBP",
    dimensions: { width: 1080, height: 1080 },
    status: "review",
    createdAt: "2024-12-05T10:00:00Z",
    updatedAt: "2024-12-11T09:00:00Z",
  },
  {
    id: "art-040",
    campaignId: "camp-008",
    name: "Red Bull Action Sports",
    type: "social-post",
    description: "Extreme sports action shot for social channels",
    src: "/ads/redbull-ad-6.webp",
    format: "WEBP",
    dimensions: { width: 1080, height: 1080 },
    status: "published",
    createdAt: "2024-12-06T08:00:00Z",
    updatedAt: "2024-12-11T14:00:00Z",
  },
  {
    id: "art-041",
    campaignId: "camp-008",
    name: "Red Bull Motorsport Ad",
    type: "ad",
    description: "F1 racing themed advertisement",
    src: "/ads/redbull-ad-7.webp",
    format: "WEBP",
    dimensions: { width: 1920, height: 1080 },
    status: "approved",
    createdAt: "2024-12-07T09:00:00Z",
    updatedAt: "2024-12-12T10:00:00Z",
  },
  {
    id: "art-042b",
    campaignId: "camp-008",
    name: "Red Bull Festival Poster",
    type: "poster",
    description: "Music festival promotional poster",
    src: "/ads/redbull-ad-8.webp",
    format: "WEBP",
    dimensions: { width: 1080, height: 1920 },
    status: "draft",
    createdAt: "2024-12-08T09:00:00Z",
    updatedAt: "2024-12-13T10:00:00Z",
  },
  {
    id: "art-042c",
    campaignId: "camp-008",
    name: "Red Bull Gaming Ad",
    type: "ad",
    description: "Esports and gaming targeted advertisement",
    src: "/ads/redbull-ad-9.webp",
    format: "WEBP",
    dimensions: { width: 1200, height: 628 },
    status: "review",
    createdAt: "2024-12-09T09:00:00Z",
    updatedAt: "2024-12-14T10:00:00Z",
  },

  // Annual Report 2024 Campaign Artefacts
  {
    id: "art-042",
    campaignId: "camp-009",
    name: "Annual Report PDF",
    type: "brochure",
    description: "Full annual report document for stakeholders",
    src: "/mock/campaigns/annual-report-2024.pdf",
    format: "PDF",
    status: "published",
    createdAt: "2024-12-15T09:00:00Z",
    updatedAt: "2025-01-10T14:00:00Z",
  },
  {
    id: "art-043",
    campaignId: "camp-009",
    name: "Investor Presentation",
    type: "presentation",
    description: "Executive summary presentation for investors",
    src: "/mock/campaigns/annual-investor-deck.pptx",
    format: "PPTX",
    status: "published",
    createdAt: "2024-12-18T10:00:00Z",
    updatedAt: "2025-01-12T11:00:00Z",
  },
  {
    id: "art-044",
    campaignId: "camp-009",
    name: "Press Release Banner",
    type: "banner",
    description: "Media kit banner for press release distribution",
    src: "/mock/campaigns/annual-press-banner",
    format: "PNG",
    dimensions: { width: 1200, height: 630 },
    status: "published",
    createdAt: "2024-12-20T09:00:00Z",
    updatedAt: "2025-01-13T10:00:00Z",
  },
  {
    id: "art-045",
    campaignId: "camp-009",
    name: "Social Highlights Carousel",
    type: "social-post",
    description: "Key achievements carousel for LinkedIn and Instagram",
    src: "/mock/campaigns/annual-social-carousel",
    format: "PNG",
    dimensions: { width: 1080, height: 1080 },
    status: "published",
    createdAt: "2024-12-22T11:00:00Z",
    updatedAt: "2025-01-14T09:00:00Z",
  },
  {
    id: "art-046",
    campaignId: "camp-009",
    name: "Employee Newsletter",
    type: "email-template",
    description: "Internal newsletter with year highlights",
    src: "/mock/campaigns/annual-newsletter.html",
    format: "HTML",
    status: "published",
    createdAt: "2024-12-28T10:00:00Z",
    updatedAt: "2025-01-15T15:00:00Z",
  },

  // Customer Testimonials Campaign Artefacts
  {
    id: "art-047",
    campaignId: "camp-010",
    name: "Video Testimonial - Enterprise Client",
    type: "ad",
    description: "2-minute video testimonial from enterprise customer",
    src: "/mock/campaigns/testimonial-enterprise.mp4",
    format: "MP4",
    dimensions: { width: 1920, height: 1080 },
    status: "published",
    createdAt: "2024-11-25T09:00:00Z",
    updatedAt: "2024-12-05T14:00:00Z",
  },
  {
    id: "art-048",
    campaignId: "camp-010",
    name: "Case Study - SMB Success",
    type: "brochure",
    description: "Written case study for small business customer",
    src: "/mock/campaigns/testimonial-smb-case.pdf",
    format: "PDF",
    status: "approved",
    createdAt: "2024-11-28T10:00:00Z",
    updatedAt: "2024-12-08T11:00:00Z",
  },
  {
    id: "art-049",
    campaignId: "camp-010",
    name: "Quote Graphics Pack",
    type: "social-post",
    description: "Collection of customer quote graphics for social",
    src: "/mock/campaigns/testimonial-quotes",
    format: "PNG",
    dimensions: { width: 1080, height: 1080 },
    status: "published",
    createdAt: "2024-12-01T09:00:00Z",
    updatedAt: "2024-12-10T10:00:00Z",
  },
  {
    id: "art-050",
    campaignId: "camp-010",
    name: "Testimonial Landing Page Banner",
    type: "banner",
    description: "Hero banner for testimonials page on website",
    src: "/mock/campaigns/testimonial-hero",
    format: "PNG",
    dimensions: { width: 1920, height: 600 },
    status: "review",
    createdAt: "2024-12-05T11:00:00Z",
    updatedAt: "2024-12-12T09:00:00Z",
  },
]

// Helper to get relative dates for mock data
const today = new Date()
const thisWeek = new Date(today)
thisWeek.setDate(today.getDate() - 3)
const thisMonth = new Date(today)
thisMonth.setDate(today.getDate() - 15)
const lastMonth = new Date(today)
lastMonth.setMonth(today.getMonth() - 1)

// Mock Campaigns
const campaigns: Campaign[] = [
  {
    id: "camp-001",
    title: "Summer 2024 Product Launch",
    description:
      "Multi-channel campaign for new product line introduction. Targeting social media, email, and paid advertising channels.",
    status: "active",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    thumbnail: "/mock/campaigns/summer-2024-thumb.jpg",
    artefactCount: 5,
    createdAt: "2024-05-15T10:00:00Z",
    updatedAt: "2024-06-20T14:30:00Z",
  },
  {
    id: "camp-002",
    title: "Brand Refresh Announcement",
    description:
      "Internal and external communication campaign for company rebrand. Includes partner notifications and press outreach.",
    status: "completed",
    startDate: "2024-03-01",
    endDate: "2024-04-30",
    thumbnail: "/mock/campaigns/brand-refresh-thumb.jpg",
    artefactCount: 4,
    createdAt: "2024-02-20T09:00:00Z",
    updatedAt: "2024-05-01T11:00:00Z",
  },
  {
    id: "camp-003",
    title: "Holiday Promotion 2024",
    description:
      "Seasonal promotional campaign featuring special offers, gift guides, and festive creative across all channels.",
    status: "draft",
    startDate: "2024-11-15",
    endDate: "2024-12-31",
    thumbnail: "/mock/campaigns/holiday-2024-thumb.jpg",
    artefactCount: 5,
    createdAt: "2024-10-01T08:00:00Z",
    updatedAt: "2024-11-25T16:00:00Z",
  },
  {
    id: "camp-004",
    title: "Q1 Partner Outreach",
    description:
      "B2B focused campaign to expand partner network. Includes sales enablement materials and co-marketing assets.",
    status: "completed",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    thumbnail: "/mock/campaigns/partner-q1-thumb.jpg",
    artefactCount: 4,
    createdAt: "2023-12-15T10:00:00Z",
    updatedAt: "2024-04-05T09:00:00Z",
  },
  {
    id: "camp-005",
    title: "Product Launch Q2 2025",
    description:
      "Upcoming product launch campaign for next quarter. Preparing all channels for coordinated release.",
    status: "draft",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    thumbnail: "/mock/campaigns/q2-2025-thumb.jpg",
    artefactCount: 2,
    createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: thisWeek.toISOString(),
  },
  {
    id: "camp-006",
    title: "Social Media Blitz",
    description:
      "Intensive social media campaign to boost engagement and follower growth across all platforms.",
    status: "active",
    startDate: new Date(thisMonth.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    thumbnail: "/mock/campaigns/social-blitz-thumb.jpg",
    artefactCount: 8,
    createdAt: thisMonth.toISOString(),
    updatedAt: thisWeek.toISOString(),
  },
  {
    id: "camp-007",
    title: "Email Nurture Series",
    description:
      "Automated email sequence for lead nurturing and customer onboarding. 6-part educational series.",
    status: "active",
    startDate: new Date(lastMonth.getTime()).toISOString().split("T")[0],
    endDate: new Date(today.getTime() + 60 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    thumbnail: "/mock/campaigns/email-nurture-thumb.jpg",
    artefactCount: 6,
    createdAt: lastMonth.toISOString(),
    updatedAt: thisMonth.toISOString(),
  },
  {
    id: "camp-008",
    title: "Trade Show Prep",
    description:
      "Materials and collateral for upcoming industry trade show. Booth design, handouts, and presentation decks.",
    status: "active",
    startDate: new Date(thisWeek.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    endDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    thumbnail: "/mock/campaigns/trade-show-thumb.jpg",
    artefactCount: 9,
    createdAt: thisWeek.toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "camp-009",
    title: "Annual Report 2024",
    description:
      "Year-end annual report campaign including investor communications, press releases, and social announcements.",
    status: "completed",
    startDate: "2024-12-01",
    endDate: "2025-01-15",
    thumbnail: "/mock/campaigns/annual-report-thumb.jpg",
    artefactCount: 5,
    createdAt: "2024-11-01T09:00:00Z",
    updatedAt: "2025-01-15T16:00:00Z",
  },
  {
    id: "camp-010",
    title: "Customer Testimonials",
    description:
      "Ongoing collection and promotion of customer success stories. Video testimonials and case studies.",
    status: "active",
    startDate: new Date(thisMonth.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    thumbnail: "/mock/campaigns/testimonials-thumb.jpg",
    artefactCount: 4,
    createdAt: thisMonth.toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Getter functions
export const getCampaigns = (): Campaign[] => {
  return campaigns
}

export const getCampaignById = (id: string): Campaign | undefined => {
  return campaigns.find((c) => c.id === id)
}

export const getArtefacts = (): Artefact[] => {
  return artefacts
}

export const getArtefactsByCampaign = (campaignId: string): Artefact[] => {
  return artefacts.filter((a) => a.campaignId === campaignId)
}

export const getArtefactById = (id: string): Artefact | undefined => {
  return artefacts.find((a) => a.id === id)
}

export const getArtefactsByStatus = (status: ArtefactStatus): Artefact[] => {
  return artefacts.filter((a) => a.status === status)
}

// Date grouping helper
export interface GroupedCampaigns {
  thisWeek: Campaign[]
  thisMonth: Campaign[]
  lastMonth: Campaign[]
  older: Campaign[]
}

export const groupCampaignsByDate = (campaignList: Campaign[]): GroupedCampaigns => {
  const now = new Date()
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  startOfWeek.setHours(0, 0, 0, 0)

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)

  const result: GroupedCampaigns = {
    thisWeek: [],
    thisMonth: [],
    lastMonth: [],
    older: [],
  }

  for (const campaign of campaignList) {
    const updatedAt = new Date(campaign.updatedAt)

    if (updatedAt >= startOfWeek) {
      result.thisWeek.push(campaign)
    } else if (updatedAt >= startOfMonth) {
      result.thisMonth.push(campaign)
    } else if (updatedAt >= startOfLastMonth) {
      result.lastMonth.push(campaign)
    } else {
      result.older.push(campaign)
    }
  }

  // Sort each group by updatedAt descending
  const sortByUpdated = (a: Campaign, b: Campaign) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()

  result.thisWeek.sort(sortByUpdated)
  result.thisMonth.sort(sortByUpdated)
  result.lastMonth.sort(sortByUpdated)
  result.older.sort(sortByUpdated)

  return result
}

// Export default data
export { campaigns, artefacts }
