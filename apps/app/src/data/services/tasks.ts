import { type Task, taskSchema } from "@/app/(dashboard)/tasks/data/schema"
import { tasks as mockTasks } from "@/app/(dashboard)/tasks/data/tasks"

// Check if Supabase is configured
const USE_REAL_DATA = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * Get all tasks
 * Currently uses mock data. When a tasks table is added to Supabase,
 * this function will be updated to fetch from GraphQL.
 */
export async function getTasks(): Promise<Task[]> {
  // TODO: When tasks table is added to Supabase, implement GraphQL fetch
  // For now, always use mock data
  // Parse through Zod schema to coerce string dates to Date objects
  return mockTasks.map((task) => taskSchema.parse(task))
}

/**
 * Get a single task by ID
 */
export async function getTaskById(id: string): Promise<Task | undefined> {
  const tasks = await getTasks()
  return tasks.find((t) => t.id === id)
}

/**
 * Get tasks by status
 */
export async function getTasksByStatus(status: Task["status"]): Promise<Task[]> {
  const tasks = await getTasks()
  return tasks.filter((t) => t.status === status)
}

/**
 * Get tasks by priority
 */
export async function getTasksByPriority(priority: Task["priority"]): Promise<Task[]> {
  const tasks = await getTasks()
  return tasks.filter((t) => t.priority === priority)
}

// Re-export types and schema
export type { Task } from "@/app/(dashboard)/tasks/data/schema"
export { taskListSchema, taskSchema } from "@/app/(dashboard)/tasks/data/schema"
