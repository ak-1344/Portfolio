/**
 * Schema Index - Central export for all structured data schemas
 * Import from this file to access any schema type
 */

// Person schemas
export {
  generateDetailedPersonSchema,
  generateMinimalPersonSchema,
  type PersonSchemaOptions
} from './person.schema'

// Website schemas
export {
  generateWebSiteSchema,
  generateWebPageSchema,
  generateProfilePageSchema,
  generateContactPageSchema,
  generateCollectionPageSchema,
  type WebSiteSchemaOptions
} from './website.schema'

// Project schemas
export {
  generateProjectSchema,
  generateProjectListSchema,
  generateSoftwareSourceCodeSchema,
  generateSoftwareApplicationSchema,
  generateCreativeWorkSchema,
  type ProjectSchemaParams
} from './project.schema'

// Blog schemas
export {
  generateBlogPostingSchema,
  generateArticleSchema,
  generateBlogListSchema,
  generateBlogSchema,
  generateTechArticleSchema,
  type ArticleSchemaParams
} from './blog.schema'

// Re-export commonly used schemas from the main structured-data file
export {
  generatePersonSchema,
  generateWebSiteSchema as generateBasicWebSiteSchema,
  generateBreadcrumbSchema,
  generateArticleSchema as generateBasicArticleSchema,
  generateProjectSchema as generateBasicProjectSchema,
  generateProjectListSchema as generateBasicProjectListSchema,
  generateBlogListSchema as generateBasicBlogListSchema,
  generateProfilePageSchema as generateBasicProfilePageSchema,
  generateContactPageSchema as generateBasicContactPageSchema,
  generateOrganizationSchema,
} from '../structured-data'

/**
 * Quick reference guide for schema usage:
 * 
 * PERSON SCHEMA:
 * - Use generateDetailedPersonSchema() for comprehensive person info
 * - Use generateMinimalPersonSchema() for embedding in other schemas
 * - Use generatePersonSchema() for basic person schema (from main file)
 * 
 * WEBSITE SCHEMA:
 * - Use generateWebSiteSchema() for the main website
 * - Use generateWebPageSchema() for individual pages
 * - Use generateProfilePageSchema() for about pages
 * - Use generateContactPageSchema() for contact pages
 * - Use generateCollectionPageSchema() for listing pages
 * 
 * PROJECT SCHEMA:
 * - Use generateProjectSchema() for individual projects (CreativeWork)
 * - Use generateProjectListSchema() for project listing pages
 * - Use generateSoftwareSourceCodeSchema() for open source code
 * - Use generateSoftwareApplicationSchema() for deployed apps
 * - Use generateCreativeWorkSchema() for non-code creative work
 * 
 * BLOG SCHEMA:
 * - Use generateBlogPostingSchema() for blog posts
 * - Use generateArticleSchema() for general articles
 * - Use generateBlogListSchema() for blog listing pages
 * - Use generateBlogSchema() for the entire blog section
 * - Use generateTechArticleSchema() for technical tutorials
 * 
 * NAVIGATION SCHEMA:
 * - Use generateBreadcrumbSchema() for breadcrumb navigation
 * 
 * ORGANIZATION SCHEMA:
 * - Use generateOrganizationSchema() for organizational info
 */

// Default exports for convenience
export { generateDetailedPersonSchema as PersonSchema } from './person.schema'
export { generateWebSiteSchema as WebSiteSchema } from './website.schema'
export { generateProjectSchema as ProjectSchema } from './project.schema'
export { generateBlogPostingSchema as BlogSchema } from './blog.schema'
