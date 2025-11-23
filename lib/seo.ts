import { Metadata } from 'next'

export const siteConfig = {
  name: 'Aditya Khatkar',
  title: 'Aditya Khatkar - Backend Developer, VIT Chennai | Tech Leader & Explorer',
  description: 'Backend Developer from VIT Chennai (8.74 CGPA) specializing in scalable systems, Node.js, Python, PostgreSQL. Nexus Club President. Explore projects in AI/ML, Docker, AWS & more.',
  url: 'https://adityak.dev',
  ogImage: 'https://adityak.dev/profilePic.jpg',
  links: {
    github: 'https://github.com/ak-1344',
    linkedin: 'https://linkedin.com/in/aditya1344',
    email: 'mailto:adityakhatkar97.3@gmail.com',
  },
  keywords: [
    // Core Identity
    'Aditya Khatkar',
    'Aditya',
    'Backend Developer',
    'Software Engineer',
    'Full Stack Developer',
    
    // Technologies
    'Node.js Developer',
    'Python Developer',
    'Express.js',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS Cloud',
    'Linux',
    'CI/CD',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    
    // AI/ML
    'Machine Learning',
    'AI Development',
    'Pandas',
    'scikit-learn',
    'ML Models',
    
    // Education & Location
    'VIT Chennai',
    'VIT Vellore',
    'Computer Science',
    'B.Tech CSE',
    'Sainik School',
    'India Developer',
    
    // Skills & Roles
    'Tech Leader',
    'Club President',
    'Nexus Club',
    'Backend Architecture',
    'Scalable Systems',
    'API Development',
    'Database Design',
    'DevOps',
    
    // Content
    'Developer Portfolio',
    'Tech Blog',
    'Programming Projects',
    'Certifications',
    'Open Source',
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
    title: {
      default: metaTitle,
      template: `%s | ${siteConfig.name}`,
    },
    description: metaDescription,
    keywords: siteConfig.keywords,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
    creator: siteConfig.author.name,
    publisher: siteConfig.author.name,
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
    verification: {
      google: 'verification_token', // Add actual Google Search Console token
    },
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
