import { faker } from "@faker-js/faker"
import { z } from "zod"

// Webhook events
export const webhookEvents = [
  "user.created",
  "order.placed",
  "payment.failed",
  "user.deleted",
] as const

// Schema definitions
export const webhookAuthTypeSchema = z.union([
  z.literal("none"),
  z.literal("application"),
  z.literal("platform"),
])

export const webhookEventSchema = z.enum(webhookEvents)

const webhookAuthStatusSchema = z.union([z.literal("enabled"), z.literal("disabled")])

const webhookLogSchema = z.object({
  succeeded: z.boolean(),
  action: z.string(),
  datetime: z.coerce.date(),
})
export type WebhookLog = z.infer<typeof webhookLogSchema>

const webhookSchema = z.object({
  id: z.string(),
  url: z.string().url(),
  name: z.string(),
  description: z.string().optional(),
  authType: webhookAuthTypeSchema,
  status: webhookAuthStatusSchema,
  events: z.array(webhookEventSchema),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  logs: z.array(webhookLogSchema),
})
export type Webhook = z.infer<typeof webhookSchema>

export const webhookListSchema = z.array(webhookSchema)

// Webhook generation
const generateWebhookData = (count: number): Webhook[] => {
  const createdAt = faker.date.past()
  const updatedAt = faker.date.between({ from: createdAt, to: new Date() })
  const logCount = faker.number.int({ min: 1, max: 20 })
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    url: faker.internet.url(),
    name: faker.lorem.words({ min: 1, max: 2 }),
    description: faker.lorem.sentence(),
    authType: faker.helpers.arrayElement([
      "none",
      "application",
      "platform",
    ]) as Webhook["authType"],
    status: faker.helpers.arrayElement(["enabled", "disabled"]) as Webhook["status"],
    events: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() =>
      faker.helpers.arrayElement(webhookEvents)
    ),
    createdAt,
    updatedAt,
    logs: Array.from({ length: logCount }).map(() => ({
      succeeded: faker.datatype.boolean(),
      action: faker.helpers.arrayElement(webhookEvents),
      datetime: faker.date.past(),
    })),
  }))
}

// Singleton data
let webhooks: Webhook[] | null = null

export const getWebhookData = (count = 7) => {
  if (!webhooks) {
    webhooks = generateWebhookData(count)
  }
  return webhooks
}
