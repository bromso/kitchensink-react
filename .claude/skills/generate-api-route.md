# Generate API Route Skill

Create Next.js API routes with best practices. Use this skill when adding new API endpoints to any Next.js app in the monorepo.

## When to Use

- Creating new API endpoints
- Adding webhooks
- Building API integrations
- Creating server actions

## Directory Structure

API routes go in the `app/api/` directory:

```
apps/app/src/app/api/
├── auth/[...all]/route.ts    # Auth routes (better-auth)
├── users/route.ts            # /api/users
├── users/[id]/route.ts       # /api/users/:id
└── webhooks/stripe/route.ts  # /api/webhooks/stripe
```

## Basic Route Template

```typescript
// apps/app/src/app/api/example/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ message: "Success" })
  } catch (error) {
    console.error("GET /api/example error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    // Your logic here
    return NextResponse.json({ data: body }, { status: 201 })
  } catch (error) {
    console.error("POST /api/example error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

## Route with Validation

```typescript
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Define request schema
const createUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.enum(["admin", "user"]).optional().default("user"),
})

// Define response type
type CreateUserResponse = {
  id: string
  name: string
  email: string
  role: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const result = createUserSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, role } = result.data

    // Create user (replace with actual logic)
    const user: CreateUserResponse = {
      id: crypto.randomUUID(),
      name,
      email,
      role,
    }

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error("POST /api/users error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
```

## Dynamic Route Parameters

```typescript
// apps/app/src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"

type RouteParams = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params

  // Fetch user by id
  const user = await getUserById(id)

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(user)
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const body = await request.json()

  // Update user
  const user = await updateUser(id, body)

  return NextResponse.json(user)
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params

  await deleteUser(id)

  return new NextResponse(null, { status: 204 })
}
```

## Query Parameters

```typescript
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  // Get query params
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)
  const search = searchParams.get("search") || ""

  // Validate pagination
  const validPage = Math.max(1, page)
  const validLimit = Math.min(100, Math.max(1, limit))

  // Fetch data with pagination
  const { data, total } = await getItems({
    page: validPage,
    limit: validLimit,
    search,
  })

  return NextResponse.json({
    data,
    pagination: {
      page: validPage,
      limit: validLimit,
      total,
      totalPages: Math.ceil(total / validLimit),
    },
  })
}
```

## Protected Routes (with Auth)

```typescript
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET(request: NextRequest) {
  // Get session from better-auth
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  // User is authenticated
  const userId = session.user.id

  // Your logic here
  return NextResponse.json({ userId })
}
```

## Webhook Handler

```typescript
// apps/app/src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session
      // Handle successful checkout
      break
    case "customer.subscription.deleted":
      // Handle subscription cancellation
      break
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
```

## File Upload

```typescript
import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import { join } from "path"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    )
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type" },
      { status: 400 }
    )
  }

  // Validate file size (5MB max)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: "File too large" },
      { status: 400 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Save to uploads directory (in production, use cloud storage)
  const filename = `${Date.now()}-${file.name}`
  const path = join(process.cwd(), "public/uploads", filename)
  await writeFile(path, buffer)

  return NextResponse.json({
    url: `/uploads/${filename}`,
  })
}
```

## HTTP Status Codes

| Code | Meaning | When to Use |
|------|---------|-------------|
| 200 | OK | Successful GET, PATCH |
| 201 | Created | Successful POST that creates resource |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid input/validation error |
| 401 | Unauthorized | Missing or invalid auth |
| 403 | Forbidden | Auth valid but no permission |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate resource |
| 422 | Unprocessable | Valid JSON but semantic error |
| 500 | Server Error | Unexpected error |

## Error Response Format

```typescript
// Standard error response
{
  "error": "Human-readable message",
  "code": "VALIDATION_ERROR",  // Optional: machine-readable code
  "details": {                 // Optional: additional info
    "field": ["error message"]
  }
}
```

## Route Configuration

```typescript
// Disable body parsing for webhooks
export const config = {
  api: {
    bodyParser: false,
  },
}

// Set runtime
export const runtime = "edge" // or "nodejs"

// Revalidation for cached responses
export const revalidate = 60 // seconds
```

## Best Practices

1. **Always validate input** - Use Zod for request body validation
2. **Return proper status codes** - Don't return 200 for errors
3. **Log errors** - Include context for debugging
4. **Handle edge cases** - Empty arrays, null values
5. **Type your responses** - Define response types
6. **Sanitize output** - Don't leak sensitive data
7. **Rate limit** - Protect public endpoints
8. **CORS headers** - Configure if needed for external access
