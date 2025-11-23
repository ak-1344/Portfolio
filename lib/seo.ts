import { Metadata } from 'next'

export const siteConfig = {
  name: 'Aditya',
  title: 'Aditya - Backend Developer & Tech Explorer',
  description: 'Backend Developer passionate about building scalable systems, exploring AI/ML, and leading tech communities. Check out my projects, certifications, and blog.',
  url: 'https://adityak.dev',
  ogImage: 'https://adityak.dev/profilePic.jpg',
  links: {
    github: 'https://github.com/ak-1344',
    linkedin: 'https://linkedin.com/in/aditya1344',
    email: 'mailto:adityakhatkar97.3@gmail.com',
  },
  keywords: [
    'Backend Developer',
    'Full Stack Developer',
    'Node.js Developer',
    'Python Developer',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Machine Learning',
    'AI',
    'Tech Leader',
    'Software Engineer',
    'Portfolio',
    'Aditya',
  ],
  author: {
    name: 'Aditya',
    email: 'adityakhatkar97.3@gmail.com',
    url: 'https://adityak.dev',
  },
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  url?: string
  noIndex?: boolean
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: metaUrl,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@ak_1344',
    },
    icons: {
      icon: [
        { url: '/icons8-portfolio-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/icons8-portfolio-64.png', sizes: '64x64', type: 'image/png' },
      ],
      shortcut: '/icons8-portfolio-32.png',
      apple: '/icons8-portfolio-64.png',
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
  }
}
