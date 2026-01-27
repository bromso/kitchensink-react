import { getUsers, userListSchema } from "@/data/services/users"
import { UserPrimaryActions } from "./components/user-primary-actions"
import { columns } from "./components/users-columns"
import { UsersStats } from "./components/users-stats"
import { UsersTable } from "./components/users-table"

export default async function UsersPage() {
  // Fetch users using GraphQL service (falls back to mock data if Supabase not configured)
  const users = await getUsers()
  const userList = userListSchema.parse(users)
  return (
    <>
      <div className="mb-4 flex flex-col gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex-none text-xl font-bold tracking-tight">User List</h2>
          <UserPrimaryActions />
        </div>
        <UsersStats />
      </div>
      <div className="flex-1">
        <UsersTable data={userList} columns={columns} />
      </div>
    </>
  )
}
