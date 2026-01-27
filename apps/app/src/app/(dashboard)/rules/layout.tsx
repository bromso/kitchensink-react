"use client"

import { AnimatePresence, motion } from "motion/react"
import type React from "react"
import { Header } from "@/components/layout/header"
import { BrandSidebar } from "./components/brand-sidebar"

interface Props {
  children: React.ReactNode
}

export default function BrandLayout({ children }: Props) {
  return (
    <div className="flex h-svh w-full flex-col">
      <Header />
      <div className="flex min-h-0 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key="brand-sidebar"
            className="h-full"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
          >
            <BrandSidebar />
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-1 flex-col gap-4 overflow-auto">{children}</div>
      </div>
    </div>
  )
}
