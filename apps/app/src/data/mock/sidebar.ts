// Sidebar Mock Data
// Types are imported from @/components/layout/types.ts

import type {
  CampaignItem,
  NavGroup,
  NavItem,
  NavSecondaryItem,
  RulesGroup,
  SidebarData,
  SidebarTeam,
  SidebarUser,
} from "@/components/layout/types"

export type {
  CampaignItem,
  NavGroup,
  NavItem,
  NavSecondaryItem,
  RulesGroup,
  SidebarData,
  SidebarTeam,
  SidebarUser,
}

export const sidebarData: SidebarData = {
  user: {
    name: "Max Verstappen",
    email: "max.verstappen@redbull.com",
    avatar: "/avatars/avatar-7.webp",
  },
  teams: [
    {
      name: "Redbull.com",
      logo: "logo",
      plan: "Nextjs + shadcn/ui",
    },
    {
      name: "Acme Inc",
      logo: "lucide:gallery-vertical-end",
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: "lucide:audio-waveform",
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "Campaign",
      items: [
        {
          title: "Add New Campaign",
          icon: "ph:plus-circle-fill",
          url: "/settings",
        },
        {
          title: "Campaign Archive",
          icon: "ph:list-checks-bold",
          url: "/settings",
        },
      ],
    },
    {
      title: "Compliance Rules",
      items: [
        {
          title: "Visual Identity",
          icon: "ph:shapes-fill",
          items: [
            {
              title: "Logotype",
              url: "/rules/logotype",
            },
            {
              title: "Palette",
              url: "/rules/palette",
            },
            {
              title: "Typography",
              url: "/rules/typography",
            },
          ],
        },
        {
          title: "Visual Assets",
          icon: "ph:image-square-fill",
          items: [
            {
              title: "Iconography",
              url: "/rules/iconography",
            },
            {
              title: "Imagery",
              url: "/rules/imagery",
            },
            {
              title: "Illustrations",
              url: "/rules/illustrations",
            },
          ],
        },
        {
          title: "Voice & Tone",
          icon: "ph:chat-text-fill",
          items: [
            {
              title: "Copywriting",
              url: "/rules/copywriting",
            },
            {
              title: "Channels",
              url: "/rules/channels",
            },
            {
              title: "Keywords",
              url: "/rules/keywords",
            },
          ],
        },
        {
          title: "Legal",
          icon: "ph:scales-fill",
          items: [
            {
              title: "Regions",
              url: "/rules/regions",
            },
            {
              title: "Trademarks",
              url: "/rules/trademarks",
            },
            {
              title: "Checklists",
              url: "/rules/checklists",
            },
            {
              title: "Disclaimers",
              url: "/rules/disclaimers",
            },
            {
              title: "Accessibility",
              url: "/rules/accessibility",
            },
          ],
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: "ph:lifebuoy-fill",
    },
    {
      title: "Feedback",
      url: "#",
      icon: "ph:paper-plane-right-bold",
    },
  ],
  campaignItems: [
    {
      title: "Add New Campaign",
      icon: "ph:plus-circle-fill",
      url: "/campaigns/new",
    },
    {
      title: "Campaign Archive",
      icon: "ph:list-checks-bold",
      url: "/campaigns",
    },
  ],
  rulesGroups: [
    {
      title: "Visual Identity",
      icon: "ph:shapes-fill",
      items: [
        { title: "Logotype", url: "/rules/logotype" },
        { title: "Palette", url: "/rules/palette" },
        { title: "Typography", url: "/rules/typography" },
      ],
    },
    {
      title: "Visual Assets",
      icon: "ph:image-square-fill",
      items: [
        { title: "Iconography", url: "/rules/iconography" },
        { title: "Imagery", url: "/rules/imagery" },
        { title: "Illustrations", url: "/rules/illustrations" },
      ],
    },
    {
      title: "Voice & Tone",
      icon: "ph:chat-text-fill",
      items: [
        { title: "Copywriting", url: "/rules/copywriting" },
        { title: "Channels", url: "/rules/channels" },
        { title: "Keywords", url: "/rules/keywords" },
      ],
    },
    {
      title: "Legal",
      icon: "ph:scales-fill",
      items: [
        { title: "Regions", url: "/rules/regions" },
        { title: "Trademarks", url: "/rules/trademarks" },
        { title: "Checklists", url: "/rules/checklists" },
        { title: "Disclaimers", url: "/rules/disclaimers" },
        { title: "Accessibility", url: "/rules/accessibility" },
      ],
    },
  ],
}
