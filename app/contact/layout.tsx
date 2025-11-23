import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Contact',
  description: 'Get in touch with Aditya for collaborations, job opportunities, or general inquiries.',
  url: '/contact',
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
