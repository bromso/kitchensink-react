"use client"

import { Icon } from "@iconify/react"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"
import type { ComponentProps } from "react"

interface SearchInputProps extends Omit<ComponentProps<typeof Input>, "onChange"> {
  placeholder?: string
  onChange?: (value: string) => void
  className?: string
}

export function SearchInput({
  placeholder = "Search...",
  onChange,
  className = "",
  ...rest
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Icon
        icon="lucide:search"
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
      />
      <Input
        type="search"
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        className="pr-4 pl-10"
        {...rest}
      />
    </div>
  )
}
