// Mock Data - Central Export
// All mock data files are exported from here for easy imports

// Activities
export {
  type DeveloperActivity,
  type DeveloperActivityType,
  developerActivities,
  developerActivityIconMap,
  getRecentActivites,
  type RecentActivity,
  type RecentActivityStatus,
  recentActivityListSchema,
} from "./activities"
// Campaigns
export {
  type Artefact,
  type ArtefactStatus,
  type ArtefactType,
  artefactStatuses,
  artefacts,
  artefactTypes,
  type Campaign,
  type CampaignStatus,
  campaignStatuses,
  campaigns,
  type GroupedCampaigns,
  getArtefactById,
  getArtefacts,
  getArtefactsByCampaign,
  getCampaignById,
  getCampaigns,
  groupCampaignsByDate,
} from "./campaigns"
// Connected Apps
export {
  type ConnectedApp,
  connectedApps,
} from "./connected-apps"
// Dashboard Stats
export {
  type Dashboard1Stats,
  type Dashboard3StatData,
  dashboard1Stats,
  dashboard3Stats,
} from "./dashboard-stats"
// Emails
export {
  type Email,
  emails,
  type MailUser,
  mailNavItems,
  mailUser,
  type NavMailItem,
} from "./emails"
// Events & Logs
export {
  containsLevelOptions,
  environmentOptions,
  eventTypeOptions,
  getLevelVariant,
  logEntries,
  mockRoutes,
  pageViews,
  referrers,
  routeViews,
  type Timeline,
  timelines,
} from "./events-logs"
// Notifications
export {
  getUnreadCount,
  markAllAsRead,
  markAsRead,
  type Notification,
  notifications,
} from "./notifications"
// Pricing Plans
export {
  getPlan,
  type PaymentAccount,
  type Plan,
  type PlanType,
  paymentAccounts,
  plans,
} from "./pricing-plans"
// Quiz Questions
export {
  calculateScore,
  getQuestionById,
  type QuizQuestion,
  type QuizResult,
  quizQuestions,
  shuffleOptions,
} from "./quiz-questions"
// Sidebar
export {
  type NavGroup,
  type NavItem,
  type SidebarData,
  type SidebarTeam,
  type SidebarUser,
  sidebarData,
} from "./sidebar"
// Tasks
export {
  estimatedTimes,
  generateTaskDates,
  getTasks,
  labels,
  priorities,
  sprintCycles,
  statuses,
  type Task,
  tasks,
} from "./tasks"
// Users
export {
  callTypes,
  getUsers,
  type User,
  type UserStatProps,
  type UserStatus,
  userListSchema,
  userStats,
  userTypes,
} from "./users"
// Webhooks
export {
  getWebhookData,
  type Webhook,
  type WebhookLog,
  webhookAuthTypeSchema,
  webhookEventSchema,
  webhookEvents,
  webhookListSchema,
} from "./webhooks"
