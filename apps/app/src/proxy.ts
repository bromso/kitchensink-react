import { createServerClient } from "@supabase/ssr"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

// Legacy auth URLs that redirect to unified /auth page
const authRedirects: Record<string, string> = {
  "/login": "/auth?tab=login",
  "/signup": "/auth?tab=signup",
  "/forgot-password": "/auth?tab=forgot-password",
}

// Public routes that don't require authentication
const publicRoutes = ["/reset-password", "/auth", "/auth/callback"]

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/reset-password"]

// Security headers configuration
const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://api.iconify.design https://*.supabase.co wss://*.supabase.co",
    "frame-ancestors 'none'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; "),
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value)
  }
  return response
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect legacy auth URLs to unified /auth page
  if (pathname in authRedirects) {
    return NextResponse.redirect(new URL(authRedirects[pathname], request.url))
  }

  // Bypass authentication in development mode
  const bypassAuth = process.env.BYPASS_AUTH === "true"
  if (bypassAuth) {
    return addSecurityHeaders(NextResponse.next())
  }

  // Allow public routes
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  // Check if it's an auth-related route
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  // Create response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // If Supabase is not configured, allow all requests (development mode)
    return addSecurityHeaders(response)
  }

  // Create Supabase client for middleware
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options)
        }
      },
    },
  })

  // Refresh session if exists (this will set new cookies if needed)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthenticated = !!user

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/campaigns/overview", request.url))
  }

  // Redirect unauthenticated users to login
  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL("/auth?tab=login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return addSecurityHeaders(response)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
