import { siteConfig } from './seo'

/**
 * Generates comprehensive Person schema for the portfolio owner
 * Includes education, work, skills, and social profiles
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    alternateName: 'Aditya',
    givenName: 'Aditya',
    familyName: 'Khatkar',
    url: siteConfig.url,
    image: {
      '@type': 'ImageObject',
      url: siteConfig.ogImage,
      width: '400',
      height: '400',
      caption: 'Aditya Khatkar - Backend Developer'
    },
    email: siteConfig.author.email,
    jobTitle: 'Backend Developer',
    description: siteConfig.description,
    knowsAbout: [
      'Backend Development',
      'Node.js',
      'Python',
      'PostgreSQL',
      'Docker',
      'AWS',
      'Machine Learning',
      'API Design',
      'Database Architecture',
      'DevOps',
      'System Design'
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Backend Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'India'
      },
      skills: 'Node.js, Python, PostgreSQL, Docker, AWS, Express.js, Machine Learning',
      description: 'Specializing in scalable backend systems and API development'
    },
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'VIT Chennai',
        alternateName: 'Vellore Institute of Technology - Chennai Campus',
        sameAs: 'https://chennai.vit.ac.in/',
        url: 'https://chennai.vit.ac.in/'
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Sainik School'
      }
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Nexus Club',
      description: 'Backend-oriented technical club at VIT Chennai',
      url: siteConfig.url
    },
    memberOf: {
      '@type': 'Organization',
      name: 'Nexus Club',
      description: 'President of Backend-oriented technical club'
    },
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    nationality: {
      '@type': 'Country',
      name: 'India'
    },
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'English',
        alternateName: 'en'
      },
      {
        '@type': 'Language',
        name: 'Hindi',
        alternateName: 'hi'
      }
    ],
    award: [
      'Club President - Nexus Club',
      'VIT Chennai - 8.74 CGPA'
    ]
  }
}


/**
 * Generates WebSite schema with search functionality
 * Helps search engines understand the site structure
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    alternateName: 'Aditya Portfolio',
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    creator: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/projects?q={search_term_string}`,
        },
        'query-input': {
          '@type': 'PropertyValueSpecification',
          valueRequired: true,
          valueName: 'search_term_string'
        }
      },
      {
        '@type': 'ReadAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteConfig.url}/blogs`,
        }
      }
    ],
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`
    }
  }
}


/**
 * Generates Breadcrumb schema for navigation
 * Improves site structure understanding for search engines
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url === '/' ? siteConfig.url : `${siteConfig.url}${item.url}`,
    })),
  }
}


/**
 * Generates Article/BlogPosting schema for blog posts
 * Helps search engines understand blog content
 */
export function generateArticleSchema(params: {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  url: string
  tags?: string[]
  readTime?: number
}) {
  const { title, description, image, datePublished, dateModified, url, tags, readTime } = params
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: image || siteConfig.ogImage,
      width: '1200',
      height: '630'
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${url}`,
    },
    keywords: tags?.join(', '),
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    inLanguage: 'en-US',
    articleSection: 'Technology',
  }
}


/**
 * Generates CreativeWork schema for projects
 * Uses SoftwareSourceCode for code projects and CreativeWork for others
 */
export function generateProjectSchema(params: {
  name: string
  description: string
  image?: string
  url: string
  technologies?: string[]
  dateCreated?: string
  category?: string
  github?: string
  demo?: string
}) {
  const { name, description, image, url, technologies, dateCreated, category, github, demo } = params
  
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': category === 'ML' ? 'SoftwareApplication' : 'SoftwareSourceCode',
    name: name,
    description: description,
    image: {
      '@type': 'ImageObject',
      url: image || siteConfig.ogImage,
      width: '800',
      height: '600'
    },
    url: `${siteConfig.url}${url}`,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    creator: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    dateCreated: dateCreated,
    datePublished: dateCreated,
    inLanguage: 'en',
    keywords: technologies?.join(', '),
    genre: category || 'Software Development',
  }

  // Add specific properties based on type
  if (category === 'ML') {
    return {
      ...baseSchema,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Machine Learning',
      operatingSystem: 'Cross-platform',
    }
  }

  return {
    ...baseSchema,
    programmingLanguage: technologies,
    codeRepository: github,
    runtimePlatform: 'Cross-platform',
    targetProduct: demo ? {
      '@type': 'WebApplication',
      url: demo,
      browserRequirements: 'Requires JavaScript. Requires HTML5.'
    } : undefined,
  }
}

/**
 * Generates ItemList schema for project collections
 * Useful for project listing pages
 */
export function generateProjectListSchema(projects: Array<{
  name: string
  description: string
  url: string
  image?: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Projects by Aditya Khatkar',
    description: 'Portfolio of backend development, machine learning, and web development projects',
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        '@id': `${siteConfig.url}${project.url}`,
        name: project.name,
        description: project.description,
        url: `${siteConfig.url}${project.url}`,
        image: project.image || siteConfig.ogImage,
        author: {
          '@type': 'Person',
          '@id': `${siteConfig.url}/#person`,
          name: siteConfig.author.name,
        }
      }
    }))
  }
}

/**
 * Generates CollectionPage schema for blog listing
 * Helps search engines understand blog structure
 */
export function generateBlogListSchema(posts: Array<{
  title: string
  description: string
  url: string
  date: string
  image?: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tech Blog by Aditya Khatkar',
    description: 'Articles about backend development, machine learning, DevOps, and software engineering',
    url: `${siteConfig.url}/blogs`,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'BlogPosting',
          '@id': `${siteConfig.url}${post.url}`,
          headline: post.title,
          description: post.description,
          url: `${siteConfig.url}${post.url}`,
          datePublished: post.date,
          image: post.image || siteConfig.ogImage,
          author: {
            '@type': 'Person',
            '@id': `${siteConfig.url}/#person`,
            name: siteConfig.author.name,
          }
        }
      }))
    }
  }
}

/**
 * Generates ProfilePage schema for about page
 * Combines Person and ProfilePage for better SEO
 */
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: `About ${siteConfig.author.name}`,
    description: siteConfig.description,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
    },
    inLanguage: 'en-US',
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
  }
}

/**
 * Generates ContactPage schema
 * Helps search engines understand contact information
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Aditya Khatkar',
    description: 'Get in touch with Aditya Khatkar for backend development, machine learning projects, or collaboration opportunities',
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
    },
    inLanguage: 'en-US',
  }
}

/**
 * Generates Organization schema (for future use if needed)
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nexus Club',
    description: 'Backend-oriented technical club at VIT Chennai',
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    member: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
      jobTitle: 'President'
    },
    location: {
      '@type': 'Place',
      name: 'VIT Chennai',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
      }
    }
  }
}
