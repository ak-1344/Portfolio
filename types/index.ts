// Portfolio v2.0 - TypeScript Type Definitions
// All interfaces for Supabase database tables

// ============================================
// PROJECTS
// ============================================
export interface Project {
  id: string
  name: string
  description: string              // Short description for cards
  detailed_description: string     // Full description for detail pages
  tags: string[]
  codebase_link: string | null
  deployment_link: string | null
  cover_image: string | null
  timeline: string | null
  challenges: string | null
  learnings: string | null
  category: string | null
  // v2.0 fields
  is_pinned: boolean
  pin_order: number | null         // 1, 2, or 3 for pinned projects
  display_order: number
  created_at: string
  updated_at: string
}

// ============================================
// BLOGS
// ============================================
export interface Blog {
  id: string
  title: string
  content: string
  summary?: string                 // Legacy field
  author: string
  date: string
  cover_image: string | null       // Blog cover image
  images: string[]
  tags: string[]
  // v2.0 fields
  excerpt: string                  // Short summary for cards
  read_time: number                // Auto-calculated reading time (minutes)
  display_order: number
  created_at: string
  updated_at: string
}

// ============================================
// CERTIFICATIONS (NEW in v2.0)
// ============================================
export interface Certification {
  id: string
  name: string                     // Certification name
  issuing_organization: string     // Organization that issued it
  issue_date: string
  expiry_date: string | null
  never_expires: boolean
  credential_id: string | null
  credential_url: string | null
  certificate_image: string | null
  description: string
  skills: string[]
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// ============================================
// CONTACT MESSAGES (NEW in v2.0)
// ============================================
export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  phone: string | null
  status: 'unread' | 'read' | 'replied' | 'archived'
  is_starred?: boolean
  replied_at?: string | null
  reply_message?: string | null
  ip_address?: string | null
  user_agent?: string | null
  metadata?: Record<string, any> | null
  created_at: string
}

// ============================================
// NOW PROJECTS
// ============================================
export interface NowProject {
  id: string
  name: string
  description: string
  tag: string                      // Status tag
  progress: number                 // 0-100
  comments: string | null
  // v2.0 field
  display_order: number
  created_at: string
  updated_at: string
}

// ============================================
// NOW META
// ============================================
export interface NowMeta {
  id: string
  currently_learning: string
  recent_reads: string
  current_philosophy: string
  updated_at: string
}

// ============================================
// HELPER TYPES
// ============================================
export type ProjectCategory = 'Backend' | 'ML' | 'Club' | 'Personal' | 'All'
export type MessageStatus = 'unread' | 'read' | 'replied' | 'archived'
export type NowStatus = 'planning' | 'in-progress' | 'paused' | 'completed'

// ============================================
// FORM TYPES
// ============================================
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  phone: string
}

export interface ProjectFilters {
  category?: string
  techStack?: string[]
  pinnedOnly?: boolean
}

export interface BlogFilters {
  tags?: string[]
  author?: string
  dateRange?: {
    start: string
    end: string
  }
}

// ============================================
// COMPONENT PROP TYPES
// ============================================
export interface ProjectCardProps {
  project: Project
  isPinned?: boolean
  showPinBadge?: boolean
}

export interface BlogCardProps {
  blog: Blog
  showExcerpt?: boolean
  showReadTime?: boolean
}

export interface CertificationCardProps {
  certification: Certification
  showExpiry?: boolean
}
