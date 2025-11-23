/**
 * Person Schema - Detailed structured data for portfolio owner
 * This file contains comprehensive Person schema with all professional details
 */

import { siteConfig } from '../seo'

export interface PersonSchemaOptions {
  includeAwards?: boolean
  includeEducation?: boolean
  includeWorkExperience?: boolean
  customSkills?: string[]
}

/**
 * Generates a comprehensive Person schema with customizable options
 */
export function generateDetailedPersonSchema(options: PersonSchemaOptions = {}) {
  const {
    includeAwards = true,
    includeEducation = true,
    includeWorkExperience = true,
    customSkills = []
  } = options

  const skills = customSkills.length > 0 ? customSkills : [
    'Backend Development',
    'Node.js',
    'Python',
    'PostgreSQL',
    'MongoDB',
    'Docker',
    'AWS',
    'Machine Learning',
    'API Design',
    'Database Architecture',
    'DevOps',
    'System Design',
    'Express.js',
    'TypeScript',
    'CI/CD',
    'Linux Administration'
  ]

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    alternateName: 'Aditya',
    givenName: 'Aditya',
    familyName: 'Ak',
    url: siteConfig.url,
    image: {
      '@type': 'ImageObject',
      url: siteConfig.ogImage,
      width: '400',
      height: '400',
      caption: `${siteConfig.author.name} - Backend Developer`
    },
    email: siteConfig.author.email,
    jobTitle: 'Backend Developer',
    description: siteConfig.description,
    knowsAbout: skills,
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Backend Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'India'
      },
      skills: skills.slice(0, 10).join(', '),
      description: 'Specializing in scalable backend systems, API development, and database architecture',
      responsibilities: [
        'Designing and implementing scalable backend systems',
        'Building RESTful APIs and microservices',
        'Database design and optimization',
        'DevOps and deployment automation',
        'Machine learning model integration'
      ]
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
  }

  // Conditionally add education
  if (includeEducation) {
    schema.alumniOf = [
      {
        '@type': 'EducationalOrganization',
        name: 'VIT Chennai',
        alternateName: 'Vellore Institute of Technology - Chennai Campus',
        sameAs: 'https://chennai.vit.ac.in/',
        url: 'https://chennai.vit.ac.in/',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Chennai',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN'
        }
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Sainik School'
      }
    ]

    schema.hasCredential = {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      educationalLevel: 'Bachelor',
      name: 'B.Tech in Computer Science and Engineering',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: 'VIT Chennai'
      }
    }
  }

  // Conditionally add work experience
  if (includeWorkExperience) {
    schema.worksFor = {
      '@type': 'Organization',
      name: 'Nexus Club',
      description: 'Backend-oriented technical club at VIT Chennai',
      url: siteConfig.url,
      location: {
        '@type': 'Place',
        name: 'VIT Chennai'
      }
    }

    schema.memberOf = {
      '@type': 'Organization',
      name: 'Nexus Club',
      description: 'President of Backend-oriented technical club',
      member: {
        '@type': 'OrganizationRole',
        roleName: 'President',
        startDate: '2024-01-01',
        member: {
          '@type': 'Person',
          name: siteConfig.author.name
        }
      }
    }
  }

  // Conditionally add awards
  if (includeAwards) {
    schema.award = [
      'Club President - Nexus Club VIT Chennai',
      'Academic Excellence - 8.74 CGPA',
      'Technical Leadership Award'
    ]

    schema.hasOfferCatalog = {
      '@type': 'OfferCatalog',
      name: 'Services Offered',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Backend Development',
            description: 'Building scalable backend systems and APIs'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Database Architecture',
            description: 'Designing and optimizing database systems'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DevOps & Cloud',
            description: 'Cloud infrastructure and CI/CD pipeline setup'
          }
        }
      ]
    }
  }

  return schema
}

/**
 * Generates a minimal Person schema for embedding in other schemas
 */
export function generateMinimalPersonSchema() {
  return {
    '@type': 'Person',
    '@id': `${siteConfig.url}/#person`,
    name: siteConfig.author.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: 'Backend Developer',
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ]
  }
}

export default generateDetailedPersonSchema
