"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify/react"
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsContents,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@repo/ui/components/animated-ui/animate/tabs"
import { Button } from "@repo/ui/components/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Separator } from "@repo/ui/components/separator"
import { cn } from "@repo/ui/lib/utils"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgetPassword, signIn, signUp } from "@/lib/auth-client"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Please enter your email" })
    .email({ message: "Invalid email address" }),
})

type LoginFormValues = z.infer<typeof loginSchema>
type SignupFormValues = z.infer<typeof signupSchema>
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export function AuthTabs({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") ?? "login"

  const [activeTab, setActiveTab] = useState(defaultTab)
  const [loginView, setLoginView] = useState<"buttons" | "email">("buttons")
  const [signupView, setSignupView] = useState<"buttons" | "email">("buttons")
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [signupError, setSignupError] = useState<string | null>(null)
  const [forgotError, setForgotError] = useState<string | null>(null)
  const [forgotSuccess, setForgotSuccess] = useState(false)

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  })

  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  async function onLoginSubmit(data: LoginFormValues) {
    setIsLoading(true)
    setLoginError(null)

    try {
      const result = await signIn.email({
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        setLoginError(result.error.message ?? "Invalid credentials")
        return
      }

      router.push("/")
      router.refresh()
    } catch {
      setLoginError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  async function onSignupSubmit(data: SignupFormValues) {
    setIsLoading(true)
    setSignupError(null)

    try {
      const result = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      })

      if (result.error) {
        setSignupError(result.error.message ?? "Failed to create account")
        return
      }

      router.push("/")
      router.refresh()
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  async function onForgotSubmit(data: ForgotPasswordFormValues) {
    setIsLoading(true)
    setForgotError(null)
    setForgotSuccess(false)

    try {
      const result = await forgetPassword({
        email: data.email,
        redirectTo: "/reset-password",
      })

      if (result.error) {
        setForgotError(result.error.message ?? "Failed to send reset email")
        return
      }

      setForgotSuccess(true)
    } catch {
      setForgotError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSocialSignIn(provider: "google" | "github" | "apple") {
    setIsLoading(true)
    setLoginError(null)
    setSignupError(null)

    try {
      await signIn.social({
        provider,
        callbackURL: "/campaigns/overview",
      })
    } catch {
      const error = `Failed to sign in with ${provider}`
      if (activeTab === "login") {
        setLoginError(error)
      } else {
        setSignupError(error)
      }
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    setLoginError(null)
    setSignupError(null)
    setForgotError(null)
    setForgotSuccess(false)
    setLoginView("buttons")
    setSignupView("buttons")

    // Update URL to reflect the selected tab
    router.replace(`/auth?tab=${value}`, { scroll: false })
  }

  const getDescription = () => {
    if (activeTab === "login") {
      return loginView === "buttons"
        ? "Login with your Apple or Google account"
        : "Enter your email and password"
    }
    if (activeTab === "signup") {
      return signupView === "buttons"
        ? "Sign up with your Apple or Google account"
        : "Create your account with email"
    }
    return "Enter your email to reset your password"
  }

  return (
    <section className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="shadow-card">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl">
            {activeTab === "login" && "Welcome back"}
            {activeTab === "signup" && "Create an account"}
            {activeTab === "forgot-password" && "Forgot password"}
          </CardTitle>
          <CardDescription>{getDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatedTabs
            defaultValue={defaultTab}
            value={activeTab}
            onValueChange={handleTabChange}
            className="gap-4"
          >
            <AnimatedTabsList>
              <AnimatedTabsTrigger value="login">Login</AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="signup">Sign up</AnimatedTabsTrigger>
              <AnimatedTabsTrigger value="forgot-password">Forgot</AnimatedTabsTrigger>
            </AnimatedTabsList>

            <AnimatedTabsContents>
              <AnimatedTabsContent value="login">
                <AnimatedTabs
                  defaultValue="buttons"
                  value={loginView}
                  onValueChange={(v) => setLoginView(v as "buttons" | "email")}
                  className="gap-0"
                >
                  <AnimatedTabsContents>
                    <AnimatedTabsContent value="buttons">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled={isLoading}
                            onClick={() => handleSocialSignIn("apple")}
                          >
                            <Icon icon="devicon:apple" width={24} height={24} />
                            Login with Apple
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled={isLoading}
                            onClick={() => handleSocialSignIn("google")}
                          >
                            <Icon icon="devicon:google" width={24} height={24} />
                            Login with Google
                          </Button>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                              Or continue with
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={isLoading}
                          onClick={() => setLoginView("email")}
                        >
                          <Icon icon="lucide:mail" width={20} height={20} />
                          Email
                        </Button>
                      </div>
                    </AnimatedTabsContent>

                    <AnimatedTabsContent value="email">
                      <div className="grid gap-4">
                        <Form {...loginForm}>
                          <form
                            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                            className="grid gap-4"
                          >
                            {loginError && (
                              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                                {loginError}
                              </div>
                            )}
                            <FormField
                              control={loginForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem className="grid gap-1.5">
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="m@example.com"
                                      disabled={isLoading}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={loginForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem className="grid gap-1.5">
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                              {isLoading ? "Signing in..." : "Login"}
                            </Button>
                          </form>
                        </Form>
                        <button
                          type="button"
                          onClick={() => setLoginView("buttons")}
                          className="inline-flex items-center justify-center gap-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors"
                        >
                          <Icon icon="lucide:arrow-left" width={16} height={16} />
                          Back to options
                        </button>
                      </div>
                    </AnimatedTabsContent>
                  </AnimatedTabsContents>
                </AnimatedTabs>
              </AnimatedTabsContent>

              <AnimatedTabsContent value="signup">
                <AnimatedTabs
                  defaultValue="buttons"
                  value={signupView}
                  onValueChange={(v) => setSignupView(v as "buttons" | "email")}
                  className="gap-0"
                >
                  <AnimatedTabsContents>
                    <AnimatedTabsContent value="buttons">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled={isLoading}
                            onClick={() => handleSocialSignIn("apple")}
                          >
                            <Icon icon="devicon:apple" width={24} height={24} />
                            Sign up with Apple
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full"
                            disabled={isLoading}
                            onClick={() => handleSocialSignIn("google")}
                          >
                            <Icon icon="devicon:google" width={24} height={24} />
                            Sign up with Google
                          </Button>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <Separator className="w-full" />
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                              Or continue with
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full"
                          disabled={isLoading}
                          onClick={() => setSignupView("email")}
                        >
                          <Icon icon="lucide:mail" width={20} height={20} />
                          Email
                        </Button>
                      </div>
                    </AnimatedTabsContent>

                    <AnimatedTabsContent value="email">
                      <div className="grid gap-4">
                        <Form {...signupForm}>
                          <form
                            onSubmit={signupForm.handleSubmit(onSignupSubmit)}
                            className="grid gap-4"
                          >
                            {signupError && (
                              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                                {signupError}
                              </div>
                            )}
                            <FormField
                              control={signupForm.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem className="grid gap-1.5">
                                  <FormLabel>Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="John Doe" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={signupForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem className="grid gap-1.5">
                                  <FormLabel>Email</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="m@example.com"
                                      disabled={isLoading}
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={signupForm.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem className="grid gap-1.5">
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={signupForm.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem className="grid gap-1.5">
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <Input type="password" disabled={isLoading} {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                              {isLoading ? "Creating account..." : "Create account"}
                            </Button>
                          </form>
                        </Form>
                        <button
                          type="button"
                          onClick={() => setSignupView("buttons")}
                          className="text-center text-muted-foreground text-sm hover:text-foreground transition-colors"
                        >
                          <Icon icon="lucide:arrow-left" width={16} height={16} />
                          Back to options
                        </button>
                      </div>
                    </AnimatedTabsContent>
                  </AnimatedTabsContents>
                </AnimatedTabs>
              </AnimatedTabsContent>

              <AnimatedTabsContent value="forgot-password">
                <div className="grid gap-4">
                  <Form {...forgotForm}>
                    <form onSubmit={forgotForm.handleSubmit(onForgotSubmit)} className="grid gap-4">
                      {forgotError && (
                        <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                          {forgotError}
                        </div>
                      )}
                      {forgotSuccess && (
                        <div className="text-sm text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-md">
                          Check your email for a password reset link.
                        </div>
                      )}
                      <FormField
                        control={forgotForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="grid gap-1.5">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="m@example.com"
                                disabled={isLoading || forgotSuccess}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading || forgotSuccess}
                      >
                        {isLoading
                          ? "Sending..."
                          : forgotSuccess
                            ? "Email sent"
                            : "Send reset link"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </AnimatedTabsContent>
            </AnimatedTabsContents>
          </AnimatedTabs>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <Link href="/">Terms of Service</Link> and{" "}
        <Link href="/">Privacy Policy</Link>.
      </div>
    </section>
  )
}
