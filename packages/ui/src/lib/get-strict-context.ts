"use client"

import { createContext, createElement, type ReactNode, useContext } from "react"

export function getStrictContext<T>(
  name: string
): [({ children, value }: { children: ReactNode; value: T }) => ReactNode, () => T] {
  const Context = createContext<T | null>(null)
  Context.displayName = name

  function Provider({ children, value }: { children: ReactNode; value: T }) {
    return createElement(Context.Provider, { value }, children)
  }

  function useStrictContext(): T {
    const context = useContext(Context)
    if (context === null) {
      throw new Error(`use${name} must be used within a ${name}Provider`)
    }
    return context
  }

  return [Provider, useStrictContext]
}
