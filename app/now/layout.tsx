import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Now',
  description: 'What Aditya is currently working on - recent projects, learning goals, and ongoing initiatives.',
  url: '/now',
})

export default function NowLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
