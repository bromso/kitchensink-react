import Link from "next/link"
import { Suspense } from "react"
import { AuthTabs } from "@/components/auth-tabs"
import { Logo } from "@/components/logo"

export default function AuthPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href="/" className="mb-4">
        <Logo symbol color="primary" size="lg" />
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Suspense fallback={null}>
          <AuthTabs />
        </Suspense>
      </div>
    </div>
  )
}
