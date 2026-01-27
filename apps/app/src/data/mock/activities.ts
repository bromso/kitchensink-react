import { faker } from "@faker-js/faker"
import { z } from "zod"

// Recent Activities Schema (Dashboard 2)
const recentActivityStatusSchema = z.enum(["New", "Delete", "Invited", "Suspended"])

export type RecentActivityStatus = z.infer<typeof recentActivityStatusSchema>

const recentActivitySchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  amount: z.number(),
  status: recentActivityStatusSchema,
  createdAt: z.coerce.date(),
})

export type RecentActivity = z.infer<typeof recentActivitySchema>

export const recentActivityListSchema = z.array(recentActivitySchema)

// Recent Activities generation (Dashboard 2)
const generateRecentActivities = () =>
  Array.from({ length: 5 }, () => {
    const name = faker.person.firstName()
    return {
      id: faker.string.uuid(),
      username: name,
      email: faker.internet.email({ firstName: name }).toLocaleLowerCase(),
      amount: Number(faker.finance.amount()),
      status: faker.helpers.arrayElement([
        "New",
        "Delete",
        "Invited",
        "Suspended",
      ]) as RecentActivityStatus,
      createdAt: faker.date.past(),
    }
  })

// Singleton data
let recentActivities: RecentActivity[] | null = null

export const getRecentActivites = () => {
  if (!recentActivities) {
    recentActivities = generateRecentActivities()
  }
  return recentActivities
}

// Developer Activities (static data)
export const developerActivities = [
  {
    id: 1,
    type: "pull-request" as const,
    title: "Update user authentication",
    description: "Improved security measures and fixed login bugs",
    user: { name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
    time: "2 hours ago",
    status: "open" as const,
  },
  {
    id: 2,
    type: "issue-closed" as const,
    title: "Fix responsive layout on mobile",
    description: "Resolved layout issues for small screen devices",
    user: { name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
    time: "5 hours ago",
    status: "closed" as const,
  },
  {
    id: 3,
    type: "commit" as const,
    title: "Refactor API endpoints",
    description: "Improved performance and reduced redundancy",
    user: {
      name: "Mike Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    time: "1 day ago",
    status: "merged" as const,
  },
  {
    id: 4,
    type: "issue-opened" as const,
    title: "Performance optimization needed",
    description: "Identified areas for improving application speed",
    user: { name: "Alex Lee", avatar: "/placeholder.svg?height=32&width=32" },
    time: "3 days ago",
    status: "open" as const,
  },
] as const

export type DeveloperActivity = (typeof developerActivities)[number]
export type DeveloperActivityType = DeveloperActivity["type"]

// Icon mapping helper for developer activities
export const developerActivityIconMap: Record<
  DeveloperActivityType,
  { icon: string; color: string }
> = {
  "pull-request": { icon: "lucide:git-pull-request", color: "text-blue-500" },
  "issue-closed": { icon: "lucide:git-merge", color: "text-green-500" },
  commit: { icon: "lucide:git-commit", color: "text-purple-500" },
  "issue-opened": { icon: "lucide:alert-circle", color: "text-red-500" },
}
