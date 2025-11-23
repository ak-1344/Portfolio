"use client"

import { useTheme } from "next-themes"
import { DynamicBackground } from "./dynamic-background"
import { DynamicBackgroundLight } from "./dynamic-background-light"
import { useEffect, useState } from "react"

export function DynamicBackgroundWrapper() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return theme === "dark" ? <DynamicBackground /> : <DynamicBackgroundLight />
}
