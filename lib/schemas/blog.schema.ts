/**
 * Blog/Article Schema - BlogPosting structured data
 * For blog posts and articles
 */

import { siteConfig } from '../seo'

export interface ArticleSchemaParams {
  title: string
  description: string
  content?: string
  image?: string
  datePublished: string
  dateModified?: string
  url: string
  tags?: string[]
  readTime?: number
  author?: {
    name: string
    url?: string
  }
}

/**
 * Generates BlogPosting schema for blog articles
 */
export function generateBlogPostingSchema(params: ArticleSchemaParams) {
  const {
    title,
    description,
    content,
    image,
    datePublished,
    dateModified,
    url,
    tags = [],
    readTime,
    author
  } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${siteConfig.url}${url}#article`,
    headline: title,
    name: title,
    description: description,
    articleBody: content,
    image: {
      '@type': 'ImageObject',
      url: image || siteConfig.ogImage,
      width: '1200',
      height: '630',
      caption: title
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    dateCreated: datePublished,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: author?.name || siteConfig.author.name,
      url: author?.url || siteConfig.url,
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
      url: `${siteConfig.url}${url}`
    },
    keywords: tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    wordCount: content ? content.split(/\s+/).length : undefined,
    isFamilyFriendly: true,
    isAccessibleForFree: true,
    copyrightYear: new Date(datePublished).getFullYear(),
    copyrightHolder: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    about: tags.map(tag => ({
      '@type': 'Thing',
      name: tag
    })),
    genre: tags[0] || 'Technology',
  }
}

/**
 * Generates Article schema (more generic than BlogPosting)
 */
export function generateArticleSchema(params: ArticleSchemaParams) {
  const {
    title,
    description,
    image,
    datePublished,
    dateModified,
    url,
    tags = [],
    readTime
  } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${siteConfig.url}${url}#article`,
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
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}${url}`,
    },
    keywords: tags.join(', '),
    timeRequired: readTime ? `PT${readTime}M` : undefined,
    inLanguage: 'en-US',
  }
}

/**
 * Generates ItemList schema for blog post collections
 */
export function generateBlogListSchema(posts: Array<{
  title: string
  description: string
  url: string
  date: string
  image?: string
  tags?: string[]
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${siteConfig.url}/blogs#bloglist`,
    name: 'Tech Blog by Aditya ',
    description: 'Articles about backend development, machine learning, DevOps, and software engineering',
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
        },
        keywords: post.tags?.join(', ')
      }
    }))
  }
}

/**
 * Generates Blog schema (representing the entire blog)
 */
export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteConfig.url}/blogs#blog`,
    name: `${siteConfig.author.name}'s Tech Blog`,
    description: 'Technical articles about backend development, machine learning, DevOps, and modern web technologies',
    url: `${siteConfig.url}/blogs`,
    author: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    publisher: {
      '@type': 'Person',
      '@id': `${siteConfig.url}/#person`,
      name: siteConfig.author.name,
    },
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
    },
    about: [
      {
        '@type': 'Thing',
        name: 'Backend Development'
      },
      {
        '@type': 'Thing',
        name: 'Machine Learning'
      },
      {
        '@type': 'Thing',
        name: 'DevOps'
      },
      {
        '@type': 'Thing',
        name: 'Software Engineering'
      }
    ]
  }
}

/**
 * Generates TechArticle schema for technical tutorials
 */
export function generateTechArticleSchema(params: ArticleSchemaParams & {
  dependencies?: string[]
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced'
}) {
  const baseSchema = generateBlogPostingSchema(params)
  
  return {
    ...baseSchema,
    '@type': 'TechArticle',
    dependencies: params.dependencies?.join(', '),
    proficiencyLevel: params.proficiencyLevel || 'Intermediate',
  }
}

export default generateBlogPostingSchema
