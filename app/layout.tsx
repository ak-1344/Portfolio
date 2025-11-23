import type React from "react"
import { Inter, JetBrains_Mono } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { DynamicBackground } from "@/components/dynamic-background"
import { Analytics } from "@vercel/analytics/next"
import { generateMetadata } from "@/lib/seo"
import { StructuredData } from "@/components/structured-data"
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/structured-data"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata = generateMetadata({
  title: 'Home',
  description: 'Backend Developer from VIT Chennai (8.74 CGPA) specializing in scalable systems, Node.js, Python, PostgreSQL. Nexus Club President. Explore projects in AI/ML, Docker, AWS & more.',
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
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
