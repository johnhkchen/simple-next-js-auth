# Content Management System - Supabase + Directus

This real estate platform uses **Supabase** for both authentication and database, with **Directus** as the content management interface.

## 🎯 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│              Supabase PostgreSQL Database                │
│                                                          │
│  ┌─────────────────────┐  ┌─────────────────────────┐  │
│  │   Supabase Tables   │  │   Directus Tables       │  │
│  │                     │  │                         │  │
│  │  • auth.users       │  │  • directus_users       │  │
│  │  • public.profiles  │  │  • directus_files       │  │
│  │  • storage.objects  │  │  • properties           │  │
│  │                     │  │  • agents               │  │
│  │                     │  │  • articles             │  │
│  │                     │  │  • testimonials         │  │
│  └─────────────────────┘  └─────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
                  ▲                      ▲
                  │                      │
         ┌────────┴────────┐    ┌───────┴────────┐
         │  Supabase API   │    │  Directus API  │
         │                 │    │                │
         │  Auth, Storage, │    │  Content CRUD, │
         │  Realtime       │    │  Admin UI      │
         └─────────────────┘    └────────────────┘
                  ▲                      ▲
                  │                      │
         ┌────────┴──────────────────────┴────────┐
         │         Next.js Application             │
         │                                         │
         │  • Public site (Supabase queries)      │
         │  • Admin dashboard (Directus queries)  │
         │  • Authentication (Supabase Auth)      │
         └─────────────────────────────────────────┘
```

## 🌟 Why This Combination?

### Benefits

✅ **Single Database** - One PostgreSQL instance managed by Supabase

✅ **Cost Effective** - Supabase free tier covers both auth and CMS data

✅ **Unified Development** - Supabase SDK for frontend, Directus API for admin

✅ **Best of Both Worlds**:
- Supabase: Authentication, real-time subscriptions, storage, Edge Functions
- Directus: Powerful admin UI, content modeling, REST + GraphQL APIs

✅ **No Vendor Lock-in** - Standard PostgreSQL, can migrate anytime

✅ **Professional Setup** - Production-ready architecture for portfolio piece

### For This Real Estate Platform

- **Supabase handles**: Agent authentication, public data queries, storage
- **Directus manages**: Property listings, blog posts, testimonials, content editing
- **Shared database**: Agents (Supabase users) can be linked to properties (Directus content)

---

## 📁 Project Structure

```
cms/
├── README.md                     # This file
├── SUPABASE_DIRECTUS_SETUP.md   # Detailed setup guide
├── directus/
│   └── schema.json              # Directus data model
types/
└── cms.ts                       # TypeScript types for all content
lib/
└── cms/
    ├── adapter.ts               # CMS adapter interface
    └── directus-adapter.ts      # Directus implementation (create this)
```

---

## 🗂️ Content Models

The following content types are defined and ready to use:

### Core Models

**1. Properties** - Real estate listings
- Basic info (title, description, price)
- Location data (address, coordinates)
- Property specs (beds, baths, sqft, year built)
- Features and amenities
- Multiple images and virtual tours
- SEO metadata
- Agent relationships

**2. Agents** - Real estate agent profiles
- Personal information
- Professional credentials
- Bio and specializations
- Contact and social media
- Stats (properties sold, years experience)
- Profile image

**3. Inquiries** - Contact form submissions
- Contact details
- Inquiry type and message
- Related property/agent
- Resolution status

### Optional Models

**4. Articles** - Blog posts
- Title, slug, content (markdown)
- Featured image
- Categories and tags
- Author relationship
- SEO metadata

**5. Testimonials** - Client reviews
- Client name and quote
- Rating (1-5)
- Related property/agent
- Featured flag

**6. Site Settings** - Global configuration
- Company information
- Contact details
- Office hours
- Social media links

---

## 🚀 Quick Start

### Prerequisites

- Existing Supabase project (already set up for auth)
- Docker installed (for Directus)
- Node.js 18+ (already installed)

### Step 1: Get Supabase Connection Details

1. Go to your Supabase project dashboard
2. Click "Project Settings" → "Database"
3. Copy the connection details:
   ```
   Host: db.[PROJECT-REF].supabase.co
   Port: 5432
   Database: postgres
   User: postgres
   Password: [your-password]
   ```

### Step 2: Set Up Directus with Docker

Create `docker-compose.yml` in project root:

```yaml
version: '3'
services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    environment:
      KEY: 'replace-with-random-secret-key-min-32-chars'
      SECRET: 'replace-with-another-random-secret-key-min-32-chars'

      # Supabase Database Connection
      DB_CLIENT: 'pg'
      DB_HOST: 'db.your-project-ref.supabase.co'
      DB_PORT: '5432'
      DB_DATABASE: 'postgres'
      DB_USER: 'postgres'
      DB_PASSWORD: 'your-supabase-password'
      DB_SSL: 'true'

      # Admin Account
      ADMIN_EMAIL: 'admin@example.com'
      ADMIN_PASSWORD: 'changeme'

      # Public URL (for webhooks, file links)
      PUBLIC_URL: 'http://localhost:8055'
    restart: unless-stopped
```

### Step 3: Start Directus

```bash
docker-compose up -d
```

Wait ~30 seconds for initialization, then access:
- **Directus Admin**: http://localhost:8055
- Login with the admin credentials from docker-compose.yml

### Step 4: Import Schema

1. Log into Directus Admin
2. Go to Settings (gear icon) → Data Model
3. Click the three dots menu → "Load from File"
4. Upload `cms/directus/schema.json`
5. Review and confirm import

### Step 5: Configure Environment Variables

Update `.env.local`:

```bash
# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Directus (new)
DIRECTUS_URL=http://localhost:8055
DIRECTUS_EMAIL=admin@example.com
DIRECTUS_PASSWORD=changeme

# Or use a static token (recommended for production)
# DIRECTUS_TOKEN=your-static-token
```

### Step 6: Create Directus Adapter

Create `lib/cms/directus-adapter.ts`:

```typescript
import { createDirectus, rest, authentication, readItems } from '@directus/sdk'
import type { CMSAdapter, Property, CMSCollection } from '@/types/cms'

export class DirectusAdapter implements CMSAdapter {
  private client

  constructor() {
    this.client = createDirectus(process.env.DIRECTUS_URL!)
      .with(authentication('json'))
      .with(rest())
  }

  async connect(): Promise<void> {
    await this.client.login(
      process.env.DIRECTUS_EMAIL!,
      process.env.DIRECTUS_PASSWORD!
    )
  }

  isConnected(): boolean {
    return true
  }

  async disconnect(): Promise<void> {
    await this.client.logout()
  }

  async getProperties(options?: any): Promise<CMSCollection<Property>> {
    const items = await this.client.request(
      readItems('properties', {
        filter: options?.filter,
        sort: options?.sort,
        limit: options?.limit,
      })
    )

    return {
      items: items as Property[],
      total: items.length
    }
  }

  // Implement other methods...
}
```

### Step 7: Use in Your App

```typescript
// app/properties/page.tsx
import { DirectusAdapter } from '@/lib/cms/directus-adapter'

export default async function PropertiesPage() {
  const cms = new DirectusAdapter()
  await cms.connect()

  const { items: properties } = await cms.getProperties({
    filter: { status: { _eq: 'published' } },
    limit: 20
  })

  return (
    <div>
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
}
```

---

## 💾 Adding Content

### Via Directus Admin UI

1. Log into http://localhost:8055
2. Click "Content" in sidebar
3. Select collection (Properties, Agents, etc.)
4. Click "+" to create new item
5. Fill in the form
6. Click "Save"

### Via API (Programmatic)

```typescript
import { createDirectus, rest, createItem } from '@directus/sdk'

const directus = createDirectus('http://localhost:8055').with(rest())

await directus.request(
  createItem('properties', {
    title: 'Modern Loft in SOMA',
    price: 1850000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    status: 'published'
  })
)
```

---

## 🔗 Connecting Supabase Auth to Directus Content

Link Supabase authenticated users (agents) to Directus properties:

```sql
-- In Supabase SQL Editor
-- Add foreign key to properties table
ALTER TABLE directus.properties
  ADD COLUMN supabase_user_id UUID REFERENCES auth.users(id);
```

Query in your app:

```typescript
// Get current user from Supabase
const { data: { user } } = await supabase.auth.getUser()

// Get their properties from Directus
const { items: properties } = await directusAdapter.getProperties({
  filter: { supabase_user_id: { _eq: user.id } }
})
```

---

## 🎨 Using Supabase Storage for Images

Configure Directus to use Supabase Storage for property images:

1. Create bucket in Supabase: `directus-files`
2. Make it public: Storage → Policies → New Policy
3. Configure Directus to use Supabase Storage (see SUPABASE_DIRECTUS_SETUP.md)

Or simply: Use Directus's built-in file management (stored in database)

---

## 📊 Data Flow Example

### Creating a Property Listing

1. Agent logs in → **Supabase Auth** validates
2. Agent navigates to admin → **Next.js** checks auth
3. Agent creates property → **Directus API** saves to database
4. Property appears in listings → **Next.js** queries via Directus/Supabase

### Public User Viewing Properties

1. User visits homepage → **Next.js Server Component**
2. Fetch published properties → **Supabase client** (faster for reads)
3. Display properties → **React components**
4. Click property → Navigate to `/properties/[id]`

---

## 🔐 Security Best Practices

### 1. Separate Schemas (Recommended)

```sql
-- In Supabase SQL Editor
CREATE SCHEMA directus;
```

Update docker-compose.yml:
```yaml
DB_SCHEMA: 'directus'
```

### 2. Row Level Security on Shared Tables

```sql
-- Protect auth tables from Directus
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON auth.users
  FOR ALL
  USING (auth.role() = 'service_role');
```

### 3. Use Static Tokens in Production

Generate in Directus Admin:
- Settings → Access Tokens → Create Token
- Copy and use `DIRECTUS_TOKEN` instead of email/password

---

## 🚀 Deployment

### Directus

**Option 1: Directus Cloud (Easiest)**
- Sign up at https://directus.cloud
- Connect to Supabase database
- No server management needed

**Option 2: Self-hosted (Docker)**
- Deploy to Railway, Render, DigitalOcean
- Use existing docker-compose.yml
- Update PUBLIC_URL to your domain

### Next.js App

Deploy to Vercel as normal:
```bash
vercel deploy
```

Add environment variables in Vercel dashboard:
- All Supabase variables
- `DIRECTUS_URL` (your deployed Directus URL)
- `DIRECTUS_TOKEN`

---

## 📚 API Usage Examples

### Fetch Properties

```typescript
const { items } = await directus.getProperties({
  filter: {
    status: { _eq: 'published' },
    price: { _lte: 3000000 }
  },
  sort: ['-created_at'],
  limit: 10
})
```

### Create Inquiry

```typescript
await directus.createInquiry({
  name: 'John Doe',
  email: 'john@example.com',
  message: 'Interested in viewing',
  property_id: propertyId,
  inquiry_type: 'property-viewing'
})
```

### Update Property

```typescript
await directus.updateProperty(propertyId, {
  status: 'sold',
  price: 1900000
})
```

---

## 🔍 Monitoring

### Check Database Connection

```sql
-- In Supabase SQL Editor
SELECT
  datname,
  usename,
  application_name,
  client_addr
FROM pg_stat_activity
WHERE datname = 'postgres'
AND application_name LIKE '%directus%';
```

### View Directus Tables

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename LIKE 'directus_%';
```

### Directus Logs

```bash
docker-compose logs -f directus
```

---

## 🆘 Troubleshooting

### Connection Issues

```bash
# Test database connection
docker-compose exec directus npx directus database install

# Check logs
docker-compose logs directus
```

### Schema Import Failed

- Ensure Directus version is v10+
- Import collections one by one if needed
- Check for existing table conflicts

### Images Not Loading

- Verify file permissions in Directus
- Check `PUBLIC_URL` is set correctly
- Ensure Supabase Storage bucket is public

---

## 📖 Further Reading

- [Detailed Setup Guide](./SUPABASE_DIRECTUS_SETUP.md) - Complete integration guide
- [Directus Documentation](https://docs.directus.io)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Types](../types/cms.ts) - All content type definitions
- [Directus SDK](https://docs.directus.io/guides/sdk/) - API reference

---

## 🎓 Key Concepts

### When to Use Supabase Client

- Public-facing queries (fast reads)
- Real-time subscriptions
- File uploads to storage
- Authentication

### When to Use Directus API

- Content management operations
- Complex filtering/relations
- Admin dashboard queries
- GraphQL queries (if needed)

### Best Practice

Use both! Query via Supabase for performance, manage via Directus for convenience.

---

## 🎉 You're Ready!

Your real estate platform now has:
- ✅ Professional authentication (Supabase)
- ✅ Powerful content management (Directus)
- ✅ Single database architecture
- ✅ Production-ready setup
- ✅ Perfect for portfolio demonstrations

Start adding content in Directus and watch it appear on your Next.js site! 🚀
