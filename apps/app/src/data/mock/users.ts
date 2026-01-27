import { faker } from "@faker-js/faker"
import { z } from "zod"

// Schema definitions
const userStatusSchema = z.union([
  z.literal("active"),
  z.literal("inactive"),
  z.literal("invited"),
  z.literal("suspended"),
])
export type UserStatus = z.infer<typeof userStatusSchema>

const userRoleSchema = z.union([
  z.literal("superadmin"),
  z.literal("admin"),
  z.literal("cashier"),
  z.literal("manager"),
])

const userSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: userStatusSchema,
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  lastLoginAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof userSchema>

export const userListSchema = z.array(userSchema)

// User generation
const generateUsers = () => {
  return Array.from({ length: 30 }, () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const createdAt = faker.date.past()
    const lastLoginAt = faker.date.between({ from: createdAt, to: new Date() })
    return {
      id: faker.string.uuid(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName }).toLocaleLowerCase(),
      phoneNumber: faker.phone.number({ style: "international" }),
      status: faker.helpers.arrayElement([
        "active",
        "inactive",
        "invited",
        "suspended",
      ]) as UserStatus,
      role: faker.helpers.arrayElement([
        "superadmin",
        "admin",
        "cashier",
        "manager",
      ]) as User["role"],
      createdAt,
      lastLoginAt,
      updatedAt: faker.date.recent(),
    }
  })
}

// Singleton data
let users: User[] | null = null

export const getUsers = () => {
  if (!users) {
    users = generateUsers()
  }
  return users
}

// User status styling
export const callTypes = new Map<UserStatus, string>([
  ["active", "bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200"],
  ["inactive", "bg-neutral-300/40 border-neutral-300"],
  ["invited", "bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300"],
  [
    "suspended",
    "bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10",
  ],
])

// User role types
export const userTypes = [
  {
    label: "Superadmin",
    value: "superadmin",
    icon: "tabler:shield",
  },
  {
    label: "Admin",
    value: "admin",
    icon: "tabler:user-shield",
  },
  {
    label: "Manager",
    value: "manager",
    icon: "tabler:users-group",
  },
  {
    label: "Cashier",
    value: "cashier",
    icon: "tabler:cash",
  },
] as const

// User stats
export interface UserStatProps {
  title: string
  desc: string
  stat: string
  statDesc: string
  icon: string
}

export const userStats: UserStatProps[] = [
  {
    title: "Total Users",
    desc: "Total number of users",
    stat: "12,000",
    statDesc: "+5% than last month",
    icon: "tabler:users-group",
  },
  {
    title: "New Users",
    desc: "Total number of users who joined this month",
    stat: "+350",
    statDesc: "+10% vs last month",
    icon: "tabler:users-plus",
  },
  {
    title: "Pending Verifications",
    desc: "Total number of users pending verification",
    stat: "42",
    statDesc: "2% of users",
    icon: "tabler:user-scan",
  },
  {
    title: "Active Users",
    desc: "Number of active users in the last 30 days",
    stat: "7800",
    statDesc: "65% of all users",
    icon: "tabler:user-check",
  },
]
