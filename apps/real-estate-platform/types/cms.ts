/**
 * CMS-Agnostic Type Definitions
 * These types work with both Decap CMS (Git-based) and Directus (Database-based)
 */

// ============================================================================
// Base Types
// ============================================================================

export interface BaseContent {
  id: string
  createdAt: Date | string
  updatedAt: Date | string
  publishedAt?: Date | string | null
  status: 'draft' | 'published' | 'archived'
}

export interface MediaAsset {
  id: string
  url: string
  alt?: string
  title?: string
  width?: number
  height?: number
  size?: number
  mimeType?: string
}

// ============================================================================
// Property Content Model
// ============================================================================

export interface Property extends BaseContent {
  // Basic Information
  title: string
  slug: string
  description: string

  // Pricing
  price: number
  priceDisplay?: string // Formatted price like "$1,850,000"

  // Location
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    fullAddress?: string
  }
  location: string // Short location like "San Francisco, CA"
  coordinates?: {
    lat: number
    lng: number
  }

  // Property Details
  propertyType: 'residential' | 'commercial' | 'land' | 'multi-family'
  listingType: 'sale' | 'rent' | 'lease'
  bedrooms: number
  bathrooms: number
  sqft: number
  lotSize?: number
  yearBuilt?: number

  // Features
  features: string[]
  amenities: string[]

  // Media
  images: MediaAsset[]
  mainImage?: MediaAsset
  virtualTourUrl?: string
  videoUrl?: string
  floorPlanImages?: MediaAsset[]

  // Relationships
  agentId?: string
  agent?: Agent

  // SEO
  seoTitle?: string
  seoDescription?: string

  // Analytics
  views?: number
  inquiries?: number
  savedCount?: number

  // Additional
  tags?: string[]
  neighborhood?: string
  schoolDistrict?: string
  hoaFees?: number
  parkingSpaces?: number
  petPolicy?: 'allowed' | 'not-allowed' | 'case-by-case'
}

// ============================================================================
// Agent Content Model
// ============================================================================

export interface Agent extends BaseContent {
  // Personal Information
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string

  // Professional
  title?: string
  bio?: string
  licenseNumber?: string
  specializations?: string[]
  languages?: string[]

  // Media
  avatar?: MediaAsset
  profileImage?: MediaAsset

  // Social
  social?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }

  // Stats
  propertiesSold?: number
  yearsExperience?: number
  rating?: number
  reviewCount?: number

  // SEO
  seoTitle?: string
  seoDescription?: string
}

// ============================================================================
// Client/Lead Content Model
// ============================================================================

export interface Client extends BaseContent {
  // Personal
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone?: string

  // Type
  clientType: 'buyer' | 'seller' | 'renter' | 'investor'

  // Preferences
  preferences?: {
    minPrice?: number
    maxPrice?: number
    bedrooms?: number
    bathrooms?: number
    locations?: string[]
    propertyTypes?: string[]
  }

  // Relationships
  assignedAgentId?: string
  assignedAgent?: Agent
  interestedProperties?: string[] // Property IDs

  // Communication
  preferredContact?: 'email' | 'phone' | 'text'
  notes?: string

  // Activity
  lastContact?: Date | string
  nextFollowUp?: Date | string
  leadSource?: string
  leadScore?: number
}

// ============================================================================
// Inquiry/Contact Content Model
// ============================================================================

export interface Inquiry extends BaseContent {
  // Contact Info
  name: string
  email: string
  phone?: string

  // Inquiry Details
  inquiryType: 'property-viewing' | 'general-info' | 'agent-contact' | 'other'
  subject?: string
  message: string

  // Related
  propertyId?: string
  property?: Property
  agentId?: string
  agent?: Agent

  // Status
  resolved: boolean
  resolvedAt?: Date | string
  resolvedBy?: string
  response?: string
}

// ============================================================================
// Blog/Article Content Model (Optional)
// ============================================================================

export interface Article extends BaseContent {
  title: string
  slug: string
  excerpt?: string
  content: string

  // Media
  featuredImage?: MediaAsset

  // Organization
  category?: string
  tags?: string[]

  // Author
  authorId?: string
  author?: Agent

  // SEO
  seoTitle?: string
  seoDescription?: string

  // Analytics
  views?: number
}

// ============================================================================
// Testimonial/Review Content Model
// ============================================================================

export interface Testimonial extends BaseContent {
  // Client Info
  clientName: string
  clientTitle?: string
  clientAvatar?: MediaAsset

  // Content
  quote: string
  rating?: number // 1-5

  // Related
  propertyId?: string
  agentId?: string

  // Display
  featured: boolean
}

// ============================================================================
// Site Settings Content Model
// ============================================================================

export interface SiteSettings {
  // Company Info
  companyName: string
  companyLogo?: MediaAsset
  companyDescription?: string

  // Contact
  contactEmail: string
  contactPhone: string
  contactAddress?: string

  // Office Hours
  officeHours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }

  // Social Media
  social?: {
    facebook?: string
    instagram?: string
    twitter?: string
    linkedin?: string
    youtube?: string
  }

  // SEO Defaults
  defaultSeoTitle?: string
  defaultSeoDescription?: string
  seoKeywords?: string[]

  // Features
  featuresEnabled?: {
    virtualTours?: boolean
    chatSupport?: boolean
    mortgageCalculator?: boolean
    neighborhoods?: boolean
  }
}

// ============================================================================
// Helper Types
// ============================================================================

export type ContentType =
  | 'property'
  | 'agent'
  | 'client'
  | 'inquiry'
  | 'article'
  | 'testimonial'
  | 'settings'

export interface CMSCollection<T extends BaseContent = BaseContent> {
  items: T[]
  total: number
  page?: number
  pageSize?: number
}

export interface CMSQueryOptions {
  filter?: Record<string, any>
  sort?: string | string[]
  limit?: number
  offset?: number
  fields?: string[]
  search?: string
}
