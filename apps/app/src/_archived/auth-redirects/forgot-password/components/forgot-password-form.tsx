"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"
import type { HTMLAttributes } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgetPassword } from "@/lib/auth-client"

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
})

type ForgotPasswordFormValues = z.infer<typeof formSchema>

export function ForgotPasswordForm({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      })

      if (result.error) {
        setError(result.error.message ?? "Failed to send reset email")
        return
      }

      setSuccess(true)
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="text-sm text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-md">
                Check your email for a password reset link.
              </div>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@example.com"
                      disabled={isLoading || success}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" disabled={isLoading || success}>
              {isLoading ? "Sending..." : success ? "Email sent" : "Continue"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
