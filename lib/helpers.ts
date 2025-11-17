// Portfolio v2.0 - Helper Functions
// Utility functions for data formatting and processing

import type { Blog, Certification } from '../types'

/**
 * Format date string to readable format
 * @param dateString - ISO date string
 * @param format - 'short' | 'long' | 'full'
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  format: 'short' | 'long' | 'full' = 'long'
): string => {
  const date = new Date(dateString)

  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    case 'long':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    case 'full':
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    default:
      return date.toLocaleDateString()
  }
}

/**
 * Truncate text to specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text with ellipsis
 */
export const truncateText = (text: string, maxLength: number = 150): string => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate excerpt from content (fallback for blogs)
 * @param content - Full content text
 * @param maxLength - Maximum length
 * @returns Excerpt text
 */
export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  if (!content) return ''
  // Strip HTML tags
  const plainText = content.replace(/<[^>]*>/g, '')
  return truncateText(plainText, maxLength)
}

/**
 * Calculate reading time from content (fallback for blogs)
 * @param content - Full content text
 * @returns Reading time in minutes
 */
export const calculateReadTime = (content: string): number => {
  if (!content) return 1
  const wordsPerMinute = 225
  const wordCount = content.split(/\s+/).length
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readTime) // Minimum 1 minute
}

/**
 * Check if certification is expired
 * @param certification - Certification object
 * @returns True if expired, false otherwise
 */
export const isCertificationExpired = (certification: Certification): boolean => {
  if (!certification.expiry_date || certification.never_expires) return false
  return new Date(certification.expiry_date) < new Date()
}

/**
 * Get certification status with styling
 * @param certification - Certification object
 * @returns Status object with label and className
 */
export const getCertificationStatus = (certification: Certification): { 
  label: string
  className: string 
} => {
  if (certification.never_expires || !certification.expiry_date) {
    return { label: 'No Expiry', className: 'status-active' }
  }
  
  const expiryDate = new Date(certification.expiry_date)
  const now = new Date()
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysUntilExpiry < 0) {
    return { label: 'Expired', className: 'status-expired' }
  } else if (daysUntilExpiry <= 30) {
    return { label: 'Expiring Soon', className: 'status-warning' }
  } else {
    return { label: 'Active', className: 'status-active' }
  }
}

/**
 * Validate email format
 * @param email - Email string to validate
 * @returns True if valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get fallback value for optional fields
 * @param value - Optional value
 * @param fallback - Fallback value
 * @returns Value or fallback
 */
export const getFallback = <T>(value: T | null | undefined, fallback: T): T => {
  return value ?? fallback
}

/**
 * Get blog excerpt (use excerpt field or generate from content)
 * @param blog - Blog object
 * @returns Excerpt string
 */
export const getBlogExcerpt = (blog: { excerpt?: string; content: string; summary?: string }): string => {
  return blog.excerpt || blog.summary || generateExcerpt(blog.content, 150)
}

/**
 * Get blog read time (use read_time field or calculate from content)
 * @param blog - Blog object
 * @returns Read time in minutes
 */
export const getBlogReadTime = (blog: { read_time?: number; content: string }): number => {
  return blog.read_time || calculateReadTime(blog.content)
}

/**
 * Format progress percentage for display
 * @param progress - Progress value (0-100)
 * @returns Formatted progress string
 */
export const formatProgress = (progress: number): string => {
  return `${Math.min(100, Math.max(0, progress))}%`
}

/**
 * Get status badge color class
 * @param status - Status string
 * @returns Tailwind color class
 */
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    expired: 'bg-red-100 text-red-800',
    'no-expiry': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    planning: 'bg-yellow-100 text-yellow-800',
    paused: 'bg-gray-100 text-gray-800',
    completed: 'bg-green-100 text-green-800',
    unread: 'bg-blue-100 text-blue-800',
    read: 'bg-gray-100 text-gray-800',
    replied: 'bg-green-100 text-green-800',
    archived: 'bg-gray-100 text-gray-800',
  }
  return statusMap[status.toLowerCase()] || 'bg-gray-100 text-gray-800'
}
