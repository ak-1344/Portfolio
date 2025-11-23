import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Blog',
  description: 'Technical articles and insights about backend development, system design, machine learning, and software engineering by Aditya.',
  url: '/blogs',
})

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
