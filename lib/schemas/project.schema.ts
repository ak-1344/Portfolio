/**
 * Project Schema - CreativeWork structured data for portfolio projects
 * Uses SoftwareSourceCode and SoftwareApplication schemas
 */

import { siteConfig } from '../seo'

export interface ProjectSchemaParams {
  name: string
  description: string
  longDescription?: string
  image?: string
  url: string
  technologies?: string[]
  dateCreated?: string
  dateModified?: string
  category?: string
  github?: string
  demo?: string
  challenges?: string
  learnings?: string
  timeline?: string
}

/**
 * Generates comprehensive CreativeWork/SoftwareSourceCode schema for projects
 */
export function generateProjectSchema(params: ProjectSchemaParams) {
  const {
    name,
    description,
    longDescription,
    image,
    url,
    technologies = [],
    dateCreated,
    dateModified,
    category = 'Software Development',
    github,
    demo,
    challenges,
    learnings,
    timeline
  } = params

  // Determine schema type based on category
  const schemaType = category === 'ML' ? 'SoftwareApplication' : 'SoftwareSourceCode'
  
  const baseSchema: any = {
    '@context': 'https://schema.org',
    '@type': schemaType,
    '@id': `${siteConfig.url}${url}#project`,
    name: name,
    headline: name,
    description: longDescription || description,
    abstract: description,
    image: {
      '@type': 'ImageObject',
      url: image || siteConfig.ogImage,
      width: '800',
      height: '600',
      caption: name
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
    contributor: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    dateCreated: dateCreated || new Date().toISOString().split('T')[0],
    datePublished: dateCreated || new Date().toISOString().split('T')[0],
    dateModified: dateModified || dateCreated || new Date().toISOString().split('T')[0],
    inLanguage: 'en',
    keywords: technologies.join(', '),
    genre: category,
    creativeWorkStatus: 'Published',
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    license: 'All Rights Reserved',
  }

  // Add technologies as keywords and topics
  if (technologies.length > 0) {
    baseSchema.about = technologies.map(tech => ({
      '@type': 'Thing',
      name: tech
    }))
  }

  // Add timeline if provided
  if (timeline) {
    baseSchema.temporalCoverage = timeline
  }

  // Type-specific properties
  if (schemaType === 'SoftwareApplication') {
    return {
      ...baseSchema,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: category,
      operatingSystem: 'Cross-platform',
      softwareVersion: '1.0',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      screenshot: image ? {
        '@type': 'ImageObject',
        url: image
      } : undefined,
    }
  }

  // SoftwareSourceCode specific properties
  return {
    ...baseSchema,
    programmingLanguage: technologies.length > 0 ? technologies : ['JavaScript'],
    codeRepository: github,
    codeSampleType: 'Full solution',
    runtimePlatform: 'Cross-platform',
    targetProduct: demo ? {
      '@type': 'WebApplication',
      name: `${name} - Live Demo`,
      url: demo,
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      operatingSystem: 'All',
      applicationCategory: 'WebApplication'
    } : undefined,
    sampleType: 'Full project',
    runtime: 'Modern browsers, Node.js',
  }
}

/**
 * Generates ItemList schema for project collections
 */
export function generateProjectListSchema(projects: Array<{
  name: string
  description: string
  url: string
  image?: string
  technologies?: string[]
  category?: string
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/projects#projectlist`,
    name: 'Projects by Aditya ',
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
        },
        keywords: project.technologies?.join(', '),
        genre: project.category || 'Software Development'
      }
    }))
  }
}

/**
 * Generates detailed SoftwareSourceCode schema with repository info
 */
export function generateSoftwareSourceCodeSchema(params: {
  name: string
  description: string
  url: string
  githubUrl: string
  programmingLanguages: string[]
  license?: string
  version?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: params.name,
    description: params.description,
    url: params.url,
    codeRepository: params.githubUrl,
    programmingLanguage: params.programmingLanguages,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    license: params.license || 'MIT',
    version: params.version || '1.0.0',
    datePublished: new Date().toISOString().split('T')[0],
  }
}

/**
 * Generates SoftwareApplication schema for deployed applications
 */
export function generateSoftwareApplicationSchema(params: {
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem?: string
  screenshot?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: params.name,
    description: params.description,
    url: params.url,
    applicationCategory: params.applicationCategory,
    operatingSystem: params.operatingSystem || 'Cross-platform',
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    screenshot: params.screenshot ? {
      '@type': 'ImageObject',
      url: params.screenshot
    } : undefined,
    datePublished: new Date().toISOString().split('T')[0],
  }
}

/**
 * Generates CreativeWork schema (generic, for non-code projects)
 */
export function generateCreativeWorkSchema(params: {
  name: string
  description: string
  url: string
  image?: string
  dateCreated?: string
  genre?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: params.name,
    description: params.description,
    url: `${siteConfig.url}${params.url}`,
    image: params.image || siteConfig.ogImage,
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
    dateCreated: params.dateCreated || new Date().toISOString().split('T')[0],
    datePublished: params.dateCreated || new Date().toISOString().split('T')[0],
    inLanguage: 'en',
    genre: params.genre || 'Technology',
    isAccessibleForFree: true,
  }
}

export default generateProjectSchema
