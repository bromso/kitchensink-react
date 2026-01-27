"use client"

import { Icon } from "@iconify/react"
import { Button } from "@repo/ui/components/button"
import { Logo } from "@repo/ui/components/logo"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@repo/ui/components/navigation-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const ITEMS = [
  {
    label: "Features",
    href: "#features",
    dropdownItems: [
      {
        title: "Core Features",
        href: "/#features",
        description: "Upload, evaluate, and track compliance for text and visual creatives.",
      },
      {
        title: "Why Symbiora",
        href: "/#differentiators",
        description: "Configurable rulesets, workflow management, and enterprise-ready design.",
      },
    ],
  },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  return (
    <header
      className={cn(
        "bg-background/70 absolute left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md",
        "top-5 lg:top-12"
      )}
    >
      <nav aria-label="Main navigation" className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Symbiora home">
          <Logo height={16} decorative />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="max-lg:hidden">
          <NavigationMenuList>
            {ITEMS.map((link) =>
              link.dropdownItems ? (
                <NavigationMenuItem key={link.label} className="">
                  <NavigationMenuTrigger className="data-[state=open]:bg-accent/50 bg-transparent! px-1.5">
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[400px] space-y-2 p-4">
                      {link.dropdownItems.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex items-center gap-4 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none"
                            >
                              <div className="space-y-1.5 transition-transform duration-300 group-hover:translate-x-1">
                                <div className="text-sm leading-none font-medium">{item.title}</div>
                                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                                  {item.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label} className="">
                  <Link
                    href={link.href}
                    className={cn(
                      "relative bg-transparent px-1.5 text-sm font-medium transition-opacity hover:opacity-75",
                      pathname === link.href && "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link href="/signup" className="max-lg:hidden">
            <Button>
              <span className="relative z-10">Join waitlist</span>
            </Button>
          </Link>

          {/* Hamburger Menu Button (Mobile Only) */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground relative size-8 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition-transform duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition-opacity duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition-transform duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </div>
          </Button>
        </div>
      </nav>

      {/*  Mobile Menu Navigation */}
      <div
        className={cn(
          "bg-background fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border p-6 transition-[transform,opacity,visibility] duration-300 ease-in-out lg:hidden",
          isMenuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
        )}
      >
        <nav className="divide-border flex flex-1 flex-col divide-y">
          {ITEMS.map((link) =>
            link.dropdownItems ? (
              <div key={link.label} className="py-4 first:pt-0 last:pb-0">
                <Button
                  variant="ghost"
                  onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                  className="text-primary h-auto w-full justify-between p-0 text-base font-medium hover:bg-transparent"
                >
                  {link.label}
                  <Icon
                    icon="lucide:chevron-right"
                    className={cn(
                      "size-4 transition-transform duration-200",
                      openDropdown === link.label ? "rotate-90" : ""
                    )}
                  />
                </Button>
                <div
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity,margin] duration-300",
                    openDropdown === link.label
                      ? "mt-4 max-h-[1000px] opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                    {link.dropdownItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="group hover:bg-accent block rounded-md p-2 transition-colors"
                        onClick={() => {
                          setIsMenuOpen(false)
                          setOpenDropdown(null)
                        }}
                      >
                        <div className="transition-transform duration-200 group-hover:translate-x-1">
                          <div className="text-primary font-medium">{item.title}</div>

                          <p className="text-muted-foreground mt-1 text-sm">{item.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-primary hover:text-primary/80 py-4 text-base font-medium transition-colors first:pt-0 last:pb-0",
                  pathname === link.href && "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  )
}
