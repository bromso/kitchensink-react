export interface SidebarUser {
  name: string
  email: string
  avatar: string
}

export interface SidebarTeam {
  name: string
  logo: string
  plan: string
}

interface BaseNavItem {
  title: string
  badge?: string
  icon?: string
}

export type NavItem =
  | (BaseNavItem & {
      items: (BaseNavItem & { url: string })[]
      url?: never
    })
  | (BaseNavItem & {
      url: string
      items?: never
    })

export interface NavGroup {
  title: string
  items: NavItem[]
}

export interface NavSecondaryItem {
  title: string
  url: string
  icon: string
}

export interface CampaignItem {
  title: string
  icon: string
  url: string
  badge?: string
}

export interface RulesGroupItem {
  title: string
  url: string
  badge?: string
}

export interface RulesGroup {
  title: string
  icon: string
  items: RulesGroupItem[]
}

export interface SidebarData {
  user: SidebarUser
  teams: SidebarTeam[]
  navGroups: NavGroup[]
  navSecondary: NavSecondaryItem[]
  campaignItems: CampaignItem[]
  rulesGroups: RulesGroup[]
}
