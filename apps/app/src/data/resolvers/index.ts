import {
  artefactStatuses,
  artefactTypes,
  campaignStatuses,
  connectedApps,
  dashboard1Stats,
  dashboard3Stats,
  developerActivities,
  emails,
  getArtefactById,
  getArtefactsByCampaign,
  getCampaignById,
  getCampaigns,
  getRecentActivites,
  getTasks,
  getUnreadCount,
  getUsers,
  getWebhookData,
  labels,
  logEntries,
  mailNavItems,
  mailUser,
  mockRoutes,
  notifications,
  pageViews,
  paymentAccounts,
  plans,
  priorities,
  quizQuestions,
  referrers,
  routeViews,
  sidebarData,
  sprintCycles,
  statuses,
  timelines,
  userStats,
} from "@/data/mock"

// Local resolvers for Apollo Client
// These provide mock data for @client queries
export const resolvers = {
  Query: {
    // Users
    users: () => getUsers(),
    user: (_: unknown, { id }: { id: string }) => getUsers().find((u) => u.id === id) ?? null,
    userStats: () => userStats,

    // Tasks
    tasks: () => getTasks(),
    task: (_: unknown, { id }: { id: string }) => getTasks().find((t) => t.id === id) ?? null,
    labels: () => labels,
    statuses: () => statuses,
    priorities: () => priorities,
    sprintCycles: () => sprintCycles,

    // Webhooks
    webhooks: () => getWebhookData(),
    webhook: (_: unknown, { id }: { id: string }) =>
      getWebhookData().find((w) => w.id === id) ?? null,

    // Activities
    recentActivities: () => getRecentActivites(),
    developerActivities: () => developerActivities,

    // Dashboard
    dashboard1Stats: () => dashboard1Stats,
    dashboard3Stats: () => dashboard3Stats,

    // Connected Apps
    connectedApps: () => connectedApps,
    connectedApp: (_: unknown, { name }: { name: string }) =>
      connectedApps.find((a) => a.name === name) ?? null,

    // Pricing
    pricingPlans: () => plans,
    paymentAccounts: () => paymentAccounts,

    // Events & Logs
    routeViews: () => routeViews,
    pageViews: () => pageViews,
    referrers: () => referrers,
    timelines: () => timelines,
    logEntries: () => logEntries,
    mockRoutes: () => mockRoutes,

    // Notifications
    notifications: () => notifications,
    unreadNotificationCount: () => getUnreadCount(notifications),

    // Emails
    emails: () => emails,
    mailNavItems: () => mailNavItems,
    mailUser: () => mailUser,

    // Sidebar
    sidebarData: () => sidebarData,

    // Quiz
    quizQuestions: () => quizQuestions,
    quizQuestion: (_: unknown, { id }: { id: number }) =>
      quizQuestions.find((q) => q.id === id) ?? null,

    // Campaigns
    campaigns: () => getCampaigns(),
    campaign: (_: unknown, { id }: { id: string }) => getCampaignById(id) ?? null,
    campaignStatuses: () => campaignStatuses,
    artefactsByCampaign: (_: unknown, { campaignId }: { campaignId: string }) =>
      getArtefactsByCampaign(campaignId),
    artefact: (_: unknown, { id }: { id: string }) => getArtefactById(id) ?? null,
    artefactTypes: () => artefactTypes,
    artefactStatuses: () => artefactStatuses,
  },
}
