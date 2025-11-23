import { siteConfig } from './seo'

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    email: siteConfig.author.email,
    jobTitle: 'Backend Developer',
    description: siteConfig.description,
    knowsAbout: siteConfig.keywords,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/projects?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function generateArticleSchema(params: {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  url: string
}) {
  const { title, description, image, datePublished, dateModified, url } = params
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image || siteConfig.ogImage,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${url}`,
    },
  }
}

export function generateProjectSchema(params: {
  name: string
  description: string
  image?: string
  url: string
  technologies?: string[]
  dateCreated?: string
}) {
  const { name, description, image, url, technologies, dateCreated } = params
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: name,
    description: description,
    image: image || siteConfig.ogImage,
    url: `${siteConfig.url}${url}`,
    author: {
      '@type': 'Person',
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
    dateCreated: dateCreated,
    programmingLanguage: technologies,
  }
}
