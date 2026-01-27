"use client"

import { Icon } from "@iconify/react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@repo/ui/components/animate-ui/components/radix/sidebar"
import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsContents,
  AnimatedTabsList,
  AnimatedTabsTrigger,
} from "@repo/ui/components/animated-ui/animate/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu"
import { Label } from "@repo/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/radio-group"
import { Skeleton } from "@repo/ui/components/skeleton"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut } from "@/lib/auth-client"

interface Props {
  /** Optional user data - if not provided, will fetch from auth */
  user?: {
    name: string
    email: string
    avatar: string
  }
}

export function NavUser({ user: propUser }: Props) {
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()
  const [density, setDensity] = useState("comfortable")
  const router = useRouter()
  const { user: authUser, loading } = useCurrentUser()

  // Use prop user if provided, otherwise use authenticated user
  const user = propUser || authUser

  const handleLogout = async () => {
    await signOut()
    router.push("/auth")
  }

  // Show loading skeleton while fetching user
  if (loading && !propUser) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="cursor-default">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="grid flex-1 gap-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  // Show nothing if no user
  if (!user) {
    return null
  }

  // Get user initials for avatar fallback
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <Icon icon="lucide:chevron-up-down" className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-64 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <AnimatedTabs defaultValue="account" className="w-full px-1">
              <AnimatedTabsList className="w-full">
                <AnimatedTabsTrigger value="account">Account</AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="settings">Settings</AnimatedTabsTrigger>
                <AnimatedTabsTrigger value="display">Display</AnimatedTabsTrigger>
              </AnimatedTabsList>

              <AnimatedTabsContents className="mt-2 h-[200px] overflow-y-auto">
                <AnimatedTabsContent value="account">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/profile">
                        <Icon icon="lucide:user" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/notifications">
                        <Icon icon="lucide:bell" />
                        Notifications
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/billing">
                        <Icon icon="lucide:credit-card" />
                        Billing
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/plans">
                        <Icon icon="mdi:format-list-checks" />
                        Plans
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </AnimatedTabsContent>

                <AnimatedTabsContent value="settings">
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/">
                        <Icon icon="mdi:cog" />
                        General
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings/connected-apps">
                        <Icon icon="mdi:apps" />
                        Connected Apps
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </AnimatedTabsContent>

                <AnimatedTabsContent value="display">
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Theme</Label>
                      <RadioGroup
                        value={theme ?? "system"}
                        onValueChange={setTheme}
                        className="grid grid-cols-3 gap-2"
                      >
                        <Label
                          htmlFor="theme-light"
                          className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center rounded-md border-2 p-2 cursor-pointer has-[[data-state=checked]]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                          <Icon icon="lucide:sun" className="mb-1 size-4" />
                          <span className="text-xs">Light</span>
                        </Label>
                        <Label
                          htmlFor="theme-dark"
                          className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center rounded-md border-2 p-2 cursor-pointer has-[[data-state=checked]]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                          <Icon icon="lucide:moon" className="mb-1 size-4" />
                          <span className="text-xs">Dark</span>
                        </Label>
                        <Label
                          htmlFor="theme-system"
                          className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center rounded-md border-2 p-2 cursor-pointer has-[[data-state=checked]]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                          <Icon icon="lucide:laptop" className="mb-1 size-4" />
                          <span className="text-xs">System</span>
                        </Label>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-muted-foreground text-xs">Density</Label>
                      <RadioGroup
                        value={density}
                        onValueChange={setDensity}
                        className="grid grid-cols-3 gap-2"
                      >
                        <Label
                          htmlFor="density-compact"
                          className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center rounded-md border-2 p-2 cursor-pointer has-[[data-state=checked]]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem
                            value="compact"
                            id="density-compact"
                            className="sr-only"
                          />
                          <Icon icon="lucide:align-justify" className="mb-1 size-4" />
                          <span className="text-xs">Compact</span>
                        </Label>
                        <Label
                          htmlFor="density-comfortable"
                          className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center rounded-md border-2 p-2 cursor-pointer has-[[data-state=checked]]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem
                            value="comfortable"
                            id="density-comfortable"
                            className="sr-only"
                          />
                          <Icon icon="lucide:align-center" className="mb-1 size-4" />
                          <span className="text-xs">Default</span>
                        </Label>
                        <Label
                          htmlFor="density-spacious"
                          className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground flex flex-col items-center justify-center rounded-md border-2 p-2 cursor-pointer has-[[data-state=checked]]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          <RadioGroupItem
                            value="spacious"
                            id="density-spacious"
                            className="sr-only"
                          />
                          <Icon icon="lucide:expand" className="mb-1 size-4" />
                          <span className="text-xs">Spacious</span>
                        </Label>
                      </RadioGroup>
                    </div>
                  </div>
                </AnimatedTabsContent>
              </AnimatedTabsContents>
            </AnimatedTabs>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <Icon icon="lucide:log-out" className="text-destructive" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
