"use client"

import { Icon } from "@iconify/react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@repo/ui/components/animate-ui/components/radix/sidebar"
import { Badge } from "@repo/ui/components/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/collapsible"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { type ReactNode, useState } from "react"
import type { NavGroup, NavItem } from "./types"

export function NavigationGroup({ title, items }: NavGroup) {
  const { setOpenMobile } = useSidebar()
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (!item.items) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={checkIsActive(pathname, item, true)}
                  tooltip={item.title}
                >
                  <Link href={item.url} onClick={() => setOpenMobile(false)}>
                    {item.icon && <Icon icon={item.icon} />}
                    <span>{item.title}</span>
                    {item.badge && <NavBadge>{item.badge}</NavBadge>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }
          return (
            <CollapsibleNavItem
              key={item.title}
              item={item}
              pathname={pathname}
              setOpenMobile={setOpenMobile}
            />
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>
)

interface CollapsibleNavItemProps {
  item: NavItem & { items: { title: string; url: string; icon?: string; badge?: string }[] }
  pathname: string
  setOpenMobile: (open: boolean) => void
}

function CollapsibleNavItem({ item, pathname, setOpenMobile }: CollapsibleNavItemProps) {
  const [isOpen, setIsOpen] = useState(checkIsActive(pathname, item, true))

  return (
    <Collapsible asChild open={isOpen} onOpenChange={setIsOpen} className="group/collapsible">
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <Icon icon={item.icon} />}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
            <motion.span
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="ml-auto"
            >
              <Icon icon="lucide:chevron-right" />
            </motion.span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent forceMount className="overflow-hidden">
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={checkIsActive(pathname, subItem)}>
                        <Link href={subItem.url} onClick={() => setOpenMobile(false)}>
                          {subItem.icon && <Icon icon={subItem.icon} />}
                          <span>{subItem.title}</span>
                          {subItem.badge && <NavBadge>{subItem.badge}</NavBadge>}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </motion.div>
            )}
          </AnimatePresence>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  )
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  return (
    href === item.url || // /endpint?search=param
    href.split("?")[0] === item.url || // endpoint
    !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
    (mainNav && href.split("/")[1] !== "" && href.split("/")[1] === item?.url?.split("/")[1])
  )
}
