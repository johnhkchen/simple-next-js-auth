-- Seed Data for Real Estate Platform
-- Run this after the main migration

-- =============================================================================
-- SAMPLE PROPERTIES
-- =============================================================================

INSERT INTO properties (
  title, slug, description, price,
  address_street, address_city, address_state, address_zip,
  location, latitude, longitude,
  property_type, listing_type, bedrooms, bathrooms, sqft,
  features, amenities, main_image_url, status
) VALUES
(
  'Modern Loft in SOMA',
  'modern-loft-soma',
  'Beautiful modern loft with stunning city views, high ceilings, and hardwood floors. Recently renovated with top-of-the-line appliances and finishes.',
  1850000,
  '123 Howard Street', 'San Francisco', 'CA', '94105',
  'San Francisco, CA', 37.7749, -122.4194,
  'residential', 'sale', 2, 2, 1650,
  '["Hardwood Floors", "High Ceilings", "City Views", "Recently Renovated"]'::jsonb,
  '["In-unit Laundry", "Gym", "Rooftop Deck", "Doorman"]'::jsonb,
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
  'published'
),
(
  'Victorian Charmer in Noe Valley',
  'victorian-charmer-noe-valley',
  'Charming Victorian home with original details, bay windows, and private garden. Walking distance to cafes and shops.',
  2950000,
  '456 24th Street', 'San Francisco', 'CA', '94114',
  'San Francisco, CA', 37.7510, -122.4282,
  'residential', 'sale', 3, 2.5, 2200,
  '["Original Details", "Bay Windows", "Private Garden", "Updated Kitchen"]'::jsonb,
  '["Deck", "Garage", "Fireplace"]'::jsonb,
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  'published'
),
(
  'Contemporary Estate in Palo Alto',
  'contemporary-estate-palo-alto',
  'Stunning contemporary estate with chef''s kitchen, wine cellar, and resort-style pool. Smart home features throughout.',
  6750000,
  '789 University Avenue', 'Palo Alto', 'CA', '94301',
  'Palo Alto, CA', 37.4419, -122.1430,
  'residential', 'sale', 5, 4.5, 4800,
  '["Smart Home", "Wine Cellar", "Chef Kitchen", "Pool"]'::jsonb,
  '["Home Theater", "Gym", "Guest House", "3-Car Garage"]'::jsonb,
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  'published'
),
(
  'Waterfront Condo in Sausalito',
  'waterfront-condo-sausalito',
  'Bright waterfront condo with panoramic bay views, modern kitchen, and private balcony. Resort-style amenities.',
  1450000,
  '321 Bridgeway', 'Sausalito', 'CA', '94965',
  'Sausalito, CA', 37.8590, -122.4852,
  'residential', 'sale', 2, 2, 1400,
  '["Water Views", "Modern Kitchen", "Private Balcony", "Open Floor Plan"]'::jsonb,
  '["Pool", "Gym", "Concierge", "Bike Storage"]'::jsonb,
  'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&q=80',
  'published'
),
(
  'Hillside Retreat in Berkeley',
  'hillside-retreat-berkeley',
  'Peaceful hillside home with stunning views, large deck, and landscaped gardens. Close to hiking trails and UC Berkeley.',
  2250000,
  '555 Grizzly Peak Blvd', 'Berkeley', 'CA', '94708',
  'Berkeley, CA', 37.8715, -122.2730,
  'residential', 'sale', 4, 3, 2800,
  '["Hill Views", "Large Deck", "Landscaped Gardens", "Vaulted Ceilings"]'::jsonb,
  '["Hot Tub", "Office", "Workshop", "2-Car Garage"]'::jsonb,
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
  'published'
),
(
  'Penthouse in Mission Bay',
  'penthouse-mission-bay',
  'Luxurious penthouse with floor-to-ceiling windows, gourmet kitchen, and private rooftop terrace. Walk to ballpark and waterfront.',
  3250000,
  '888 4th Street', 'San Francisco', 'CA', '94158',
  'San Francisco, CA', 37.7749, -122.3894,
  'residential', 'sale', 3, 3, 2400,
  '["Floor-to-Ceiling Windows", "Gourmet Kitchen", "Rooftop Terrace", "Smart Home"]'::jsonb,
  '["Concierge", "Valet", "Pool", "Pet Spa"]'::jsonb,
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'published'
);

-- =============================================================================
-- SAMPLE TESTIMONIALS
-- =============================================================================

INSERT INTO testimonials (client_name, client_title, quote, rating, featured, status) VALUES
(
  'Sarah Johnson',
  'First-time Home Buyer',
  'Working with Bay Area Realty was an absolute pleasure. They helped us find our dream home and made the entire process smooth and stress-free.',
  5,
  true,
  'published'
),
(
  'Michael Chen',
  'Property Investor',
  'Professional, knowledgeable, and responsive. They helped me identify great investment opportunities and negotiate excellent deals.',
  5,
  true,
  'published'
),
(
  'Emily Rodriguez',
  'Home Seller',
  'Sold our home above asking price within a week! Their marketing strategy and expertise in the local market made all the difference.',
  5,
  false,
  'published'
);

-- =============================================================================
-- SAMPLE INQUIRIES
-- =============================================================================

-- Get the first property ID for sample inquiries
DO $$
DECLARE
  first_property_id UUID;
BEGIN
  SELECT id INTO first_property_id FROM properties LIMIT 1;

  INSERT INTO inquiries (name, email, phone, inquiry_type, message, property_id, status) VALUES
  (
    'John Smith',
    'john.smith@example.com',
    '(415) 555-0123',
    'property-viewing',
    'Hi, I''m interested in scheduling a viewing of this property this weekend. Please let me know what times are available.',
    first_property_id,
    'new'
  ),
  (
    'Jessica Brown',
    'jessica.brown@example.com',
    '(415) 555-0456',
    'general-info',
    'Can you provide more information about the HOA fees and what amenities are included?',
    first_property_id,
    'new'
  );
END $$;

-- =============================================================================
-- SAMPLE ARTICLES
-- =============================================================================

INSERT INTO articles (
  title, slug, excerpt, content,
  category, tags, featured_image_url, status
) VALUES
(
  '2025 Bay Area Real Estate Market Forecast',
  '2025-bay-area-forecast',
  'What to expect in the Bay Area real estate market this year.',
  '# Market Overview\n\nThe Bay Area real estate market continues to evolve...\n\n## Key Trends\n\n1. Interest rates stabilizing\n2. Inventory slowly increasing\n3. Tech sector recovery boosting demand',
  'Market Analysis',
  ARRAY['market trends', 'forecast', '2025'],
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  'published'
),
(
  'First-Time Home Buyer Guide',
  'first-time-buyer-guide',
  'Everything you need to know about buying your first home in the Bay Area.',
  '# Getting Started\n\nBuying your first home is an exciting journey...\n\n## Steps to Success\n\n1. Get pre-approved for a mortgage\n2. Work with a trusted realtor\n3. Understand your budget',
  'Buyer Tips',
  ARRAY['buying guide', 'first-time buyer', 'tips'],
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80',
  'published'
);
