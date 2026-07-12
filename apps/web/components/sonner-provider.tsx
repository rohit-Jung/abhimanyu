"use client"

import { useTheme } from "next-themes"
import { Toaster } from "sonner"

export function SonnerToaster() {
  const { theme = "system" } = useTheme()

  return (
    <Toaster
      position="top-right"
      theme={theme as "light" | "dark" | "system"}
    />
  )
}
