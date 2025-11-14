import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { DynamicBackground } from "@/components/dynamic-background"
import { Analytics } from "@vercel/analytics/next"

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ak (Portfolio)",
  description: "Backend Developer | Leader | Explorer",
  generator: 'Ak',
  icons: {
    icon: [
      { url: '/icons8-portfolio-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons8-portfolio-64.png', sizes: '64x64', type: 'image/png' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={jetbrainsMono.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <DynamicBackground />
          <Navigation />
          <main className="pt-16 min-h-screen relative z-10">{children}</main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
