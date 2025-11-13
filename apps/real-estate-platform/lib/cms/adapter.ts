/**
 * CMS Adapter Interface
 * Provides a unified interface for working with different CMS backends
 */

import type {
  Property,
  Agent,
  Client,
  Inquiry,
  Article,
  Testimonial,
  SiteSettings,
  CMSCollection,
  CMSQueryOptions,
  BaseContent,
} from '@/types/cms'

/**
 * Base CMS Adapter Interface
 * Implement this interface for each CMS backend (Decap, Directus, etc.)
 */
export interface CMSAdapter {
  // Connection
  connect(): Promise<void>
  disconnect(): Promise<void>
  isConnected(): boolean

  // Properties
  getProperties(options?: CMSQueryOptions): Promise<CMSCollection<Property>>
  getProperty(id: string): Promise<Property | null>
  getPropertyBySlug(slug: string): Promise<Property | null>
  createProperty(data: Partial<Property>): Promise<Property>
  updateProperty(id: string, data: Partial<Property>): Promise<Property>
  deleteProperty(id: string): Promise<void>

  // Agents
  getAgents(options?: CMSQueryOptions): Promise<CMSCollection<Agent>>
  getAgent(id: string): Promise<Agent | null>
  getAgentBySlug(slug: string): Promise<Agent | null>
  createAgent(data: Partial<Agent>): Promise<Agent>
  updateAgent(id: string, data: Partial<Agent>): Promise<Agent>
  deleteAgent(id: string): Promise<void>

  // Clients (for admin use)
  getClients(options?: CMSQueryOptions): Promise<CMSCollection<Client>>
  getClient(id: string): Promise<Client | null>
  createClient(data: Partial<Client>): Promise<Client>
  updateClient(id: string, data: Partial<Client>): Promise<Client>
  deleteClient(id: string): Promise<void>

  // Inquiries
  getInquiries(options?: CMSQueryOptions): Promise<CMSCollection<Inquiry>>
  getInquiry(id: string): Promise<Inquiry | null>
  createInquiry(data: Partial<Inquiry>): Promise<Inquiry>
  updateInquiry(id: string, data: Partial<Inquiry>): Promise<Inquiry>
  deleteInquiry(id: string): Promise<void>

  // Articles
  getArticles(options?: CMSQueryOptions): Promise<CMSCollection<Article>>
  getArticle(id: string): Promise<Article | null>
  getArticleBySlug(slug: string): Promise<Article | null>
  createArticle(data: Partial<Article>): Promise<Article>
  updateArticle(id: string, data: Partial<Article>): Promise<Article>
  deleteArticle(id: string): Promise<void>

  // Testimonials
  getTestimonials(options?: CMSQueryOptions): Promise<CMSCollection<Testimonial>>
  getTestimonial(id: string): Promise<Testimonial | null>
  createTestimonial(data: Partial<Testimonial>): Promise<Testimonial>
  updateTestimonial(id: string, data: Partial<Testimonial>): Promise<Testimonial>
  deleteTestimonial(id: string): Promise<void>

  // Settings
  getSettings(): Promise<SiteSettings>
  updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings>

  // Media/File Upload
  uploadFile(file: File | Buffer, filename?: string): Promise<string>
  deleteFile(fileId: string): Promise<void>

  // Search
  search(query: string, collections?: string[]): Promise<any[]>
}

/**
 * Helper function to get CMS instance
 *
 * For this demo/portfolio, we're using Directus with Supabase as the database.
 * Import and create the DirectusAdapter in your code:
 *
 * @example
 * import { DirectusAdapter } from '@/lib/cms/directus-adapter'
 * const cms = new DirectusAdapter()
 * await cms.connect()
 */
export function getCMS(): CMSAdapter {
  // Implement DirectusAdapter and import it here
  // For now, this is a placeholder
  throw new Error('CMS not configured. See cms/README.md for setup instructions.')
}
