/**
 * WebSite Schema - Structured data for the portfolio website
 * Helps search engines understand the site structure and capabilities
 */

import { siteConfig } from '../seo'

export interface WebSiteSchemaOptions {
  includeSearchAction?: boolean
  includeReadAction?: boolean
  additionalActions?: any[]
}

/**
 * Generates comprehensive WebSite schema with search functionality
 */
export function generateWebSiteSchema(options: WebSiteSchemaOptions = {}) {
  const {
    includeSearchAction = true,
    includeReadAction = true,
    additionalActions = []
  } = options

  const potentialActions: any[] = []

  // Add search functionality
  if (includeSearchAction) {
    potentialActions.push({
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
    })
  }

  // Add read action for blog
  if (includeReadAction) {
    potentialActions.push({
      '@type': 'ReadAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/blogs`,
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      }
    })
  }

  // Add any custom actions
  potentialActions.push(...additionalActions)

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
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
    copyrightHolder: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    copyrightYear: new Date().getFullYear(),
    potentialAction: potentialActions.length > 0 ? potentialActions : undefined,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`
    },
    about: {
      '@type': 'Thing',
      name: 'Backend Development & Software Engineering',
      description: 'Portfolio showcasing backend development, machine learning, and full-stack projects'
    },
    keywords: siteConfig.keywords.join(', '),
    license: 'All Rights Reserved',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
  }
}

/**
 * Generates WebPage schema for individual pages
 */
export function generateWebPageSchema(params: {
  name: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
  breadcrumbs?: Array<{ name: string; url: string }>
}) {
  const { name, description, url, datePublished, dateModified, breadcrumbs } = params

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${siteConfig.url}${url}`,
    name: name,
    description: description,
    url: `${siteConfig.url}${url}`,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name
    },
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
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString(),
    potentialAction: {
      '@type': 'ReadAction',
      target: [`${siteConfig.url}${url}`]
    }
  }

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schema.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url === '/' ? siteConfig.url : `${siteConfig.url}${item.url}`
      }))
    }
  }

  return schema
}

/**
 * Generates ProfilePage schema
 */
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteConfig.url}/about#profilepage`,
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
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`
    },
    about: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`
    }
  }
}

/**
 * Generates ContactPage schema
 */
export function generateContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${siteConfig.url}/contact#contactpage`,
    name: 'Contact Aditya ',
    description: 'Get in touch with Aditya  for backend development, machine learning projects, or collaboration opportunities',
    url: `${siteConfig.url}/contact`,
    mainEntity: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
    },
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`
    },
    about: {
      '@type': 'ContactPoint',
      contactType: 'Professional',
      email: siteConfig.author.email,
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'Worldwide'
    }
  }
}

/**
 * Generates CollectionPage schema (for listings like projects, blogs)
 */
export function generateCollectionPageSchema(params: {
  name: string
  description: string
  url: string
  numberOfItems: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteConfig.url}${params.url}#collectionpage`,
    name: params.name,
    description: params.description,
    url: `${siteConfig.url}${params.url}`,
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`
    },
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
    },
    inLanguage: 'en-US',
    numberOfItems: params.numberOfItems
  }
}

export default generateWebSiteSchema
