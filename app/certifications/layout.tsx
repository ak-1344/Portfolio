import { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata({
  title: 'Certifications',
  description: 'Professional certifications and credentials earned by Aditya in software development, cloud computing, and machine learning.',
  url: '/certifications',
})

export default function CertificationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
