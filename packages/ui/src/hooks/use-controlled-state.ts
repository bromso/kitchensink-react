"use client"

import { useCallback, useRef, useState } from "react"

interface UseControlledStateOptions<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

export function useControlledState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControlledStateOptions<T>): [T, (value: T) => void] {
  const [internalValue, setInternalValue] = useState<T>(defaultValue as T)
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const setValue = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChangeRef.current?.(newValue)
    },
    [isControlled]
  )

  return [value, setValue]
}
