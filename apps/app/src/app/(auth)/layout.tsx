import type React from "react"

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="bg-base min-h-svh flex flex-col items-center justify-center lg:max-w-none lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center sm:w-[480px] lg:p-8">
        {children}
      </div>
    </div>
  )
}
