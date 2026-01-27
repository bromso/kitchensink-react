import { Badge } from "@repo/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/breadcrumb"
import Link from "next/link"
import { redirect } from "next/navigation"
import { getUserById } from "@/data/services/users"
import { UserDetailForm } from "./components/user-detail-form"

interface Props {
  params: Promise<{ id: string }>
}

export default async function UserDetailPage({ params }: Props) {
  const id = (await params).id

  // Fetch user using GraphQL service (falls back to mock data if Supabase not configured)
  const user = await getUserById(id)

  if (!user) {
    return redirect("/users")
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/users">Users</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4 space-y-1">
        <div className="flex flex-wrap gap-2">
          <h1 className="text-lg font-bold">
            User Details: {`${user.firstName} ${user.lastName}`}
          </h1>
          <Badge variant="outline" className="text-muted-foreground">
            {user.id}
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Comprehensive user information, including details, role, status, and management options.
        </p>
      </div>

      <div className="mt-4">
        <UserDetailForm user={user} />
      </div>
    </div>
  )
}
