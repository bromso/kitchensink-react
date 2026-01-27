import { gql } from "@apollo/client"

export const typeDefs = gql`
  # User Types
  type User {
    id: String!
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    phoneNumber: String!
    status: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type UserStat {
    title: String!
    total: Int!
    rate: String!
    levelUp: Boolean!
    icon: String!
    color: String!
  }

  # Task Types
  type Task {
    id: String!
    title: String!
    status: String!
    label: String!
    priority: String!
  }

  type Label {
    value: String!
    label: String!
    color: String!
    icon: String!
  }

  type Status {
    value: String!
    label: String!
    icon: String!
  }

  type Priority {
    value: String!
    label: String!
    icon: String!
  }

  type SprintCycle {
    label: String!
    value: String!
  }

  type Assignee {
    id: String!
    name: String!
    avatarUrl: String!
  }

  type LinkedItem {
    id: String!
    type: String!
    title: String!
    icon: String!
  }

  # Webhook Types
  type WebhookEvent {
    timestamp: String!
    status: String!
    statusCode: Int!
    message: String!
  }

  type Webhook {
    id: String!
    url: String!
    name: String!
    status: String!
    createdAt: String!
    updatedAt: String!
    events: [WebhookEvent!]!
  }

  # Activity Types
  type RecentActivity {
    id: String!
    user: String!
    action: String!
    target: String!
    time: String!
    icon: String!
  }

  type DeveloperActivity {
    title: String!
    description: String!
    time: String!
  }

  # Dashboard Stats
  type ChartDataPoint {
    name: String!
    value: Int!
  }

  type Dashboard1Stat {
    title: String!
    value: String!
    change: Int!
    icon: String!
    data: [ChartDataPoint!]!
  }

  type Dashboard3Stat {
    label: String!
    value: String!
    icon: String!
    color: String!
  }

  # Connected App Types
  type ConnectedApp {
    id: String!
    name: String!
    description: String!
    icon: String!
    connected: Boolean!
    url: String
  }

  # Pricing Types
  type PlanFeature {
    text: String!
    included: Boolean!
  }

  type PricingPlan {
    id: String!
    name: String!
    price: String!
    period: String!
    description: String!
    features: [PlanFeature!]!
    cta: String!
    highlighted: Boolean!
  }

  type PaymentAccount {
    id: String!
    type: String!
    last4: String!
    expiry: String
    isDefault: Boolean!
    icon: String!
  }

  # Events & Logs Types
  type RouteView {
    route: String!
    viewCount: Int!
  }

  type PageView {
    route: String!
    viewCount: Int!
  }

  type Referrer {
    name: String!
    icon: String!
    visitors: Int!
  }

  type TimelineOption {
    label: String!
    value: String!
  }

  type FilterOption {
    label: String!
    value: Int!
  }

  type LogEntry {
    id: Int!
    timestamp: String!
    level: String!
    message: String!
    source: String!
  }

  type MockRoute {
    route: String!
    viewCount: Int!
    avgTimeOnPage: Int!
    bounceRate: Int!
    lastVisited: String!
  }

  # Notification Types
  type NotificationUser {
    name: String!
    avatar: String
  }

  type Notification {
    id: String!
    type: String!
    user: NotificationUser!
    message: String!
    timestamp: String!
    read: Boolean!
  }

  # Email Types
  type Email {
    name: String!
    email: String!
    subject: String!
    date: String!
    teaser: String!
  }

  type MailNavItem {
    title: String!
    url: String!
    icon: String!
    isActive: Boolean!
  }

  type MailUser {
    name: String!
    email: String!
    avatar: String!
  }

  # Sidebar Types
  type SidebarUser {
    name: String!
    email: String!
    avatar: String!
  }

  type SidebarTeam {
    name: String!
    logo: String!
    plan: String!
  }

  type NavItem {
    title: String!
    badge: String
    icon: String
    url: String
  }

  type NavGroup {
    title: String!
    items: [NavItem!]!
  }

  type SidebarData {
    user: SidebarUser!
    teams: [SidebarTeam!]!
    navGroups: [NavGroup!]!
  }

  # Quiz Types
  type QuizQuestion {
    id: Int!
    question: String!
    options: [String!]!
    correctAnswer: Int!
  }

  # Campaign Types
  type ArtefactDimensions {
    width: Int!
    height: Int!
  }

  type Artefact {
    id: String!
    campaignId: String!
    name: String!
    type: String!
    description: String
    src: String!
    format: String
    dimensions: ArtefactDimensions
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type Campaign {
    id: String!
    title: String!
    description: String!
    status: String!
    startDate: String!
    endDate: String
    thumbnail: String
    artefactCount: Int!
    createdAt: String!
    updatedAt: String!
  }

  type CampaignStatus {
    value: String!
    label: String!
    icon: String!
  }

  type ArtefactType {
    value: String!
    label: String!
    icon: String!
  }

  type ArtefactStatus {
    value: String!
    label: String!
    icon: String!
  }

  # Root Query
  type Query {
    # Users
    users: [User!]!
    user(id: String!): User
    userStats: [UserStat!]!

    # Tasks
    tasks: [Task!]!
    task(id: String!): Task
    labels: [Label!]!
    statuses: [Status!]!
    priorities: [Priority!]!
    sprintCycles: [SprintCycle!]!
    assignees: [Assignee!]!
    linkedItems: [LinkedItem!]!

    # Webhooks
    webhooks: [Webhook!]!
    webhook(id: String!): Webhook

    # Activities
    recentActivities: [RecentActivity!]!
    developerActivities: [DeveloperActivity!]!

    # Dashboard
    dashboard1Stats: [Dashboard1Stat!]!
    dashboard3Stats: [Dashboard3Stat!]!

    # Connected Apps
    connectedApps: [ConnectedApp!]!
    connectedApp(id: String!): ConnectedApp

    # Pricing
    pricingPlans: [PricingPlan!]!
    paymentAccounts: [PaymentAccount!]!

    # Events & Logs
    routeViews: [RouteView!]!
    pageViews: [PageView!]!
    referrers: [Referrer!]!
    timelines: [TimelineOption!]!
    logEntries: [LogEntry!]!
    mockRoutes: [MockRoute!]!

    # Notifications
    notifications: [Notification!]!
    unreadNotificationCount: Int!

    # Emails
    emails: [Email!]!
    mailNavItems: [MailNavItem!]!
    mailUser: MailUser!

    # Sidebar
    sidebarData: SidebarData!

    # Quiz
    quizQuestions: [QuizQuestion!]!
    quizQuestion(id: Int!): QuizQuestion

    # Campaigns
    campaigns: [Campaign!]!
    campaign(id: String!): Campaign
    campaignStatuses: [CampaignStatus!]!
    artefactsByCampaign(campaignId: String!): [Artefact!]!
    artefact(id: String!): Artefact
    artefactTypes: [ArtefactType!]!
    artefactStatuses: [ArtefactStatus!]!
  }
`
