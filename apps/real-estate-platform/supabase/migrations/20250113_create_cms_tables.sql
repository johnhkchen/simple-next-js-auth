-- Real Estate Platform Database Schema
-- Creates tables for properties, agents, inquiries, testimonials, and site settings

-- =============================================================================
-- PROPERTIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Information
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,

  -- Pricing
  price NUMERIC NOT NULL,

  -- Location
  address_street TEXT,
  address_city TEXT,
  address_state TEXT,
  address_zip TEXT,
  address_country TEXT DEFAULT 'USA',
  location TEXT, -- Short display like "San Francisco, CA"
  latitude NUMERIC,
  longitude NUMERIC,

  -- Property Details
  property_type TEXT DEFAULT 'residential', -- residential, commercial, land, multi-family
  listing_type TEXT DEFAULT 'sale', -- sale, rent, lease
  bedrooms INTEGER,
  bathrooms NUMERIC,
  sqft INTEGER,
  lot_size INTEGER,
  year_built INTEGER,

  -- Features (stored as JSON arrays)
  features JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,

  -- Media
  images JSONB DEFAULT '[]'::jsonb, -- Array of image objects
  main_image_url TEXT,
  virtual_tour_url TEXT,
  video_url TEXT,

  -- Relationships
  agent_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- SEO
  seo_title TEXT,
  seo_description TEXT,

  -- Status & Analytics
  status TEXT DEFAULT 'draft', -- draft, published, archived, sold
  views INTEGER DEFAULT 0,
  inquiries_count INTEGER DEFAULT 0,

  -- Additional
  tags TEXT[] DEFAULT '{}',
  neighborhood TEXT,
  school_district TEXT,
  hoa_fees NUMERIC,
  parking_spaces INTEGER,
  pet_policy TEXT, -- allowed, not-allowed, case-by-case

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Add index for common queries
CREATE INDEX IF NOT EXISTS properties_status_idx ON properties(status);
CREATE INDEX IF NOT EXISTS properties_price_idx ON properties(price);
CREATE INDEX IF NOT EXISTS properties_location_idx ON properties(location);
CREATE INDEX IF NOT EXISTS properties_agent_idx ON properties(agent_id);
CREATE INDEX IF NOT EXISTS properties_created_at_idx ON properties(created_at DESC);

-- =============================================================================
-- AGENTS TABLE (extends auth.users)
-- =============================================================================
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  -- Professional
  title TEXT,
  bio TEXT,
  license_number TEXT,
  specializations TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT '{}',

  -- Media
  avatar_url TEXT,

  -- Social Media
  linkedin_url TEXT,
  twitter_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,

  -- Stats
  properties_sold INTEGER DEFAULT 0,
  years_experience INTEGER,
  rating NUMERIC(3, 2),
  review_count INTEGER DEFAULT 0,

  -- SEO
  seo_title TEXT,
  seo_description TEXT,

  -- Status
  status TEXT DEFAULT 'active', -- active, inactive

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INQUIRIES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Information
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,

  -- Inquiry Details
  inquiry_type TEXT DEFAULT 'general-info', -- property-viewing, general-info, agent-contact, other
  subject TEXT,
  message TEXT NOT NULL,

  -- Relationships
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,

  -- Status
  status TEXT DEFAULT 'new', -- new, contacted, qualified, showing, offer, closed
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  response TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries(status);
CREATE INDEX IF NOT EXISTS inquiries_property_idx ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS inquiries_agent_idx ON inquiries(agent_id);
CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries(created_at DESC);

-- =============================================================================
-- TESTIMONIALS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Client Information
  client_name TEXT NOT NULL,
  client_title TEXT,
  client_avatar_url TEXT,

  -- Content
  quote TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),

  -- Relationships
  property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,

  -- Display
  featured BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'draft', -- draft, published

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS testimonials_featured_idx ON testimonials(featured);
CREATE INDEX IF NOT EXISTS testimonials_status_idx ON testimonials(status);

-- =============================================================================
-- ARTICLES TABLE (Blog/News)
-- =============================================================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Information
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,

  -- Media
  featured_image_url TEXT,

  -- Organization
  category TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Author
  author_id UUID REFERENCES agents(id) ON DELETE SET NULL,

  -- SEO
  seo_title TEXT,
  seo_description TEXT,

  -- Status
  status TEXT DEFAULT 'draft', -- draft, published

  -- Analytics
  views INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Add indexes
CREATE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug);
CREATE INDEX IF NOT EXISTS articles_status_idx ON articles(status);
CREATE INDEX IF NOT EXISTS articles_author_idx ON articles(author_id);
CREATE INDEX IF NOT EXISTS articles_created_at_idx ON articles(created_at DESC);

-- =============================================================================
-- SITE SETTINGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Company Information
  company_name TEXT,
  company_logo_url TEXT,
  company_description TEXT,

  -- Contact
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,

  -- Office Hours (JSON object)
  office_hours JSONB DEFAULT '{}'::jsonb,

  -- Social Media
  social_facebook TEXT,
  social_instagram TEXT,
  social_twitter TEXT,
  social_linkedin TEXT,
  social_youtube TEXT,

  -- SEO Defaults
  default_seo_title TEXT,
  default_seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',

  -- Features
  features_enabled JSONB DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (company_name, contact_email, company_description)
VALUES (
  'Bay Area Realty',
  'info@bayarearealty.com',
  'Premier real estate services in the San Francisco Bay Area'
) ON CONFLICT DO NOTHING;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- PROPERTIES POLICIES
-- Public can read published properties
CREATE POLICY "Public can view published properties"
  ON properties FOR SELECT
  USING (status = 'published');

-- Authenticated users can view all properties
CREATE POLICY "Authenticated users can view all properties"
  ON properties FOR SELECT
  USING (auth.role() = 'authenticated');

-- Authenticated users can create properties
CREATE POLICY "Authenticated users can create properties"
  ON properties FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Authenticated users can update their own properties
CREATE POLICY "Authenticated users can update properties"
  ON properties FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Authenticated users can delete their own properties
CREATE POLICY "Authenticated users can delete properties"
  ON properties FOR DELETE
  USING (auth.role() = 'authenticated');

-- AGENTS POLICIES
-- Public can view active agents
CREATE POLICY "Public can view active agents"
  ON agents FOR SELECT
  USING (status = 'active');

-- Authenticated users can view all agents
CREATE POLICY "Authenticated users can view all agents"
  ON agents FOR SELECT
  USING (auth.role() = 'authenticated');

-- Users can update their own agent profile
CREATE POLICY "Users can update own agent profile"
  ON agents FOR UPDATE
  USING (id = auth.uid());

-- INQUIRIES POLICIES
-- Authenticated users can view all inquiries
CREATE POLICY "Authenticated users can view inquiries"
  ON inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

-- Anyone can create inquiries (public form submissions)
CREATE POLICY "Anyone can create inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Authenticated users can update inquiries
CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');

-- TESTIMONIALS POLICIES
-- Public can view published testimonials
CREATE POLICY "Public can view published testimonials"
  ON testimonials FOR SELECT
  USING (status = 'published');

-- Authenticated users can manage testimonials
CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated');

-- ARTICLES POLICIES
-- Public can view published articles
CREATE POLICY "Public can view published articles"
  ON articles FOR SELECT
  USING (status = 'published');

-- Authenticated users can manage articles
CREATE POLICY "Authenticated users can manage articles"
  ON articles FOR ALL
  USING (auth.role() = 'authenticated');

-- SITE SETTINGS POLICIES
-- Public can view site settings
CREATE POLICY "Public can view site settings"
  ON site_settings FOR SELECT
  USING (true);

-- Authenticated users can update site settings
CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- FUNCTIONS & TRIGGERS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- View for published properties with agent info
CREATE OR REPLACE VIEW published_properties_with_agents AS
SELECT
  p.*,
  a.first_name || ' ' || a.last_name AS agent_name,
  a.email AS agent_email,
  a.phone AS agent_phone,
  a.avatar_url AS agent_avatar
FROM properties p
LEFT JOIN agents a ON p.agent_id = a.id
WHERE p.status = 'published';

-- Grant access to views
GRANT SELECT ON published_properties_with_agents TO anon, authenticated;
