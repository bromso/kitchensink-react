import { gql } from "@apollo/client"

// User Queries
export const GET_USERS = gql`
  query GetUsers {
    users @client {
      id
      firstName
      lastName
      username
      email
      phoneNumber
      status
      role
      createdAt
      updatedAt
    }
  }
`

export const GET_USER = gql`
  query GetUser($id: String!) {
    user(id: $id) @client {
      id
      firstName
      lastName
      username
      email
      phoneNumber
      status
      role
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_STATS = gql`
  query GetUserStats {
    userStats @client {
      title
      total
      rate
      levelUp
      icon
      color
    }
  }
`

// Task Queries
export const GET_TASKS = gql`
  query GetTasks {
    tasks @client {
      id
      title
      status
      label
      priority
    }
  }
`

export const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) @client {
      id
      title
      status
      label
      priority
    }
  }
`

export const GET_TASK_CONFIG = gql`
  query GetTaskConfig {
    labels @client {
      value
      label
      color
      icon
    }
    statuses @client {
      value
      label
      icon
    }
    priorities @client {
      value
      label
      icon
    }
    sprintCycles @client {
      label
      value
    }
    assignees @client {
      id
      name
      avatarUrl
    }
    linkedItems @client {
      id
      type
      title
      icon
    }
  }
`

// Webhook Queries
export const GET_WEBHOOKS = gql`
  query GetWebhooks {
    webhooks @client {
      id
      url
      name
      status
      createdAt
      updatedAt
      events {
        timestamp
        status
        statusCode
        message
      }
    }
  }
`

export const GET_WEBHOOK = gql`
  query GetWebhook($id: String!) {
    webhook(id: $id) @client {
      id
      url
      name
      status
      createdAt
      updatedAt
      events {
        timestamp
        status
        statusCode
        message
      }
    }
  }
`

// Activity Queries
export const GET_RECENT_ACTIVITIES = gql`
  query GetRecentActivities {
    recentActivities @client {
      id
      user
      action
      target
      time
      icon
    }
  }
`

export const GET_DEVELOPER_ACTIVITIES = gql`
  query GetDeveloperActivities {
    developerActivities @client {
      title
      description
      time
    }
  }
`

// Dashboard Queries
export const GET_DASHBOARD1_STATS = gql`
  query GetDashboard1Stats {
    dashboard1Stats @client {
      title
      value
      change
      icon
      data {
        name
        value
      }
    }
  }
`

export const GET_DASHBOARD3_STATS = gql`
  query GetDashboard3Stats {
    dashboard3Stats @client {
      label
      value
      icon
      color
    }
  }
`

// Connected Apps Queries
export const GET_CONNECTED_APPS = gql`
  query GetConnectedApps {
    connectedApps @client {
      id
      name
      description
      icon
      connected
      url
    }
  }
`

// Pricing Queries
export const GET_PRICING_PLANS = gql`
  query GetPricingPlans {
    pricingPlans @client {
      id
      name
      price
      period
      description
      features {
        text
        included
      }
      cta
      highlighted
    }
  }
`

export const GET_PAYMENT_ACCOUNTS = gql`
  query GetPaymentAccounts {
    paymentAccounts @client {
      id
      type
      last4
      expiry
      isDefault
      icon
    }
  }
`

// Events & Logs Queries
export const GET_ROUTE_VIEWS = gql`
  query GetRouteViews {
    routeViews @client {
      route
      viewCount
    }
  }
`

export const GET_PAGE_VIEWS = gql`
  query GetPageViews {
    pageViews @client {
      route
      viewCount
    }
  }
`

export const GET_REFERRERS = gql`
  query GetReferrers {
    referrers @client {
      name
      icon
      visitors
    }
  }
`

export const GET_LOG_ENTRIES = gql`
  query GetLogEntries {
    logEntries @client {
      id
      timestamp
      level
      message
      source
    }
  }
`

export const GET_MOCK_ROUTES = gql`
  query GetMockRoutes {
    mockRoutes @client {
      route
      viewCount
      avgTimeOnPage
      bounceRate
      lastVisited
    }
  }
`

// Notification Queries (Local/Mock)
export const GET_LOCAL_NOTIFICATIONS = gql`
  query GetLocalNotifications {
    notifications @client {
      id
      type
      user {
        name
        avatar
      }
      message
      timestamp
      read
    }
    unreadNotificationCount @client
  }
`

// Email Queries
export const GET_EMAILS = gql`
  query GetEmails {
    emails @client {
      name
      email
      subject
      date
      teaser
    }
  }
`

export const GET_MAIL_NAV_ITEMS = gql`
  query GetMailNavItems {
    mailNavItems @client {
      title
      url
      icon
      isActive
    }
  }
`

export const GET_MAIL_USER = gql`
  query GetMailUser {
    mailUser @client {
      name
      email
      avatar
    }
  }
`

// Sidebar Queries
export const GET_SIDEBAR_DATA = gql`
  query GetSidebarData {
    sidebarData @client {
      user {
        name
        email
        avatar
      }
      teams {
        name
        logo
        plan
      }
      navGroups {
        title
        items {
          title
          badge
          icon
          url
        }
      }
    }
  }
`

// Quiz Queries
export const GET_QUIZ_QUESTIONS = gql`
  query GetQuizQuestions {
    quizQuestions @client {
      id
      question
      options
      correctAnswer
    }
  }
`

export const GET_QUIZ_QUESTION = gql`
  query GetQuizQuestion($id: Int!) {
    quizQuestion(id: $id) @client {
      id
      question
      options
      correctAnswer
    }
  }
`
