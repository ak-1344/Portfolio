import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'About',
  description: 'Learn more about Aditya - Backend developer passionate about building scalable systems, exploring AI/ML, and leading tech communities.',
  url: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
