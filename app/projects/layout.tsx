import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Projects',
  description: 'Explore projects built by Aditya including backend systems, machine learning applications, and open-source contributions.',
  url: '/projects',
})

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
