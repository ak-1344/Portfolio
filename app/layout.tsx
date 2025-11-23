import type React from "react"
import { JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { DynamicBackground } from "@/components/dynamic-background"
import { Analytics } from "@vercel/analytics/next"
import { generateMetadata } from "@/lib/seo"
import { StructuredData } from "@/components/structured-data"
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/structured-data"

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata = generateMetadata({
  title: 'Home',
  description: 'Backend Developer passionate about building scalable systems, exploring AI/ML, and leading tech communities. Check out my projects, certifications, and blog.',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const personSchema = generatePersonSchema()
  const websiteSchema = generateWebSiteSchema()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://adityak.dev" />
        <StructuredData data={personSchema} />
        <StructuredData data={websiteSchema} />
      </head>
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
