import { Card } from "@repo/ui/components/card"
import Link from "next/link"
import { Suspense } from "react"
import { Logo } from "@/components/logo"
import { ResetPasswordForm } from "./components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link href="/" className="mb-4">
        <Logo symbol color="primary" size="lg" />
      </Link>
      <Card className="w-full max-w-sm p-6">
        <div className="mb-2 flex flex-col space-y-2 text-left">
          <h1 className="text-md font-semibold tracking-tight">Reset Password</h1>
          <p className="text-muted-foreground text-sm">Enter your new password below.</p>
        </div>
        <Suspense fallback={<div className="h-[200px] animate-pulse bg-muted rounded-md" />}>
          <ResetPasswordForm />
        </Suspense>
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Remember your password?{" "}
          <Link href="/login" className="hover:text-primary underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </Card>
    </section>
  )
}
