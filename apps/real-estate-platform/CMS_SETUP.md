# CMS Setup Guide - Supabase + Directus

Quick start guide for setting up Directus CMS with your existing Supabase database.

## 🎯 Overview

This real estate platform uses:
- **Supabase** - Authentication & Database (PostgreSQL)
- **Directus** - Content Management Interface

Benefits:
- ✅ Single database architecture
- ✅ Leverage Supabase's free tier
- ✅ Professional admin interface
- ✅ Best of both platforms

---

## 🚀 5-Minute Quick Start

### Step 1: Get Supabase Connection Details

1. Go to your Supabase Dashboard
2. Settings → Database
3. Note these values:
   - Host: `db.[your-ref].supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres`
   - Password: [your-password]

### Step 2: Create Docker Compose File

Create `docker-compose.yml` in project root:

```yaml
version: '3'
services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    environment:
      # Security Keys (generate random 32+ character strings)
      KEY: 'your-random-key-here-min-32-chars'
      SECRET: 'your-random-secret-here-min-32-chars'

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

      # Public URL
      PUBLIC_URL: 'http://localhost:8055'
    restart: unless-stopped
```

**Important**: Replace these values:
- `KEY` and `SECRET` - Generate random 32+ character strings
- `DB_HOST` - Your Supabase database host
- `DB_PASSWORD` - Your Supabase postgres password
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` - Your Directus admin credentials

### Step 3: Start Directus

```bash
docker-compose up -d
```

Wait 30 seconds, then visit: http://localhost:8055

Login with your admin credentials.

### Step 4: Import Schema

1. In Directus Admin, go to Settings (gear icon) → Data Model
2. Click the three dots menu (⋮) → "Load from File"
3. Upload `cms/directus/schema.json`
4. Review and click "Import"

You now have:
- Properties collection
- Agents collection
- Articles collection
- Testimonials collection
- Inquiries collection
- Site Settings

### Step 5: Add Environment Variables

Update `.env.local`:

```bash
# Supabase (existing - no changes needed)
NEXT_PUBLIC_SUPABASE_URL=https://[your-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Directus (new)
DIRECTUS_URL=http://localhost:8055
DIRECTUS_EMAIL=admin@example.com
DIRECTUS_PASSWORD=changeme
```

### Step 6: Verify Setup

1. Check Supabase Studio → Table Editor
2. You should see new tables starting with `directus_`
3. These are Directus's system tables
4. Your content will also be stored here

---

## 📝 Adding Your First Property

1. Log into Directus: http://localhost:8055
2. Click "Content" in the sidebar
3. Select "Properties"
4. Click the "+" button
5. Fill in the form:
   - Title: "Modern Loft in SOMA"
   - Price: 1850000
   - Address: "123 Howard Street, San Francisco, CA 94105"
   - Bedrooms: 2
   - Bathrooms: 2
   - Square Feet: 1500
   - Description: [Your description]
   - Status: "published"
6. Click "Save"

---

## 🔧 Using the CMS in Your App

### Install Directus SDK

```bash
npm install @directus/sdk
```

### Create Directus Adapter

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

  // Add other methods as needed...
  async getProperty(id: string): Promise<Property | null> {
    // Implementation
  }

  async createProperty(data: Partial<Property>): Promise<Property> {
    // Implementation
  }

  // ... etc
}
```

### Use in Server Components

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

## 🔗 Connecting Supabase Auth Users to Content

Link authenticated agents to their properties:

```sql
-- In Supabase SQL Editor
ALTER TABLE properties
  ADD COLUMN supabase_user_id UUID REFERENCES auth.users(id);
```

Then query:

```typescript
// Get current agent
const { data: { user } } = await supabase.auth.getUser()

// Get their properties
const { items } = await cms.getProperties({
  filter: { supabase_user_id: { _eq: user.id } }
})
```

---

## 🚀 Deployment

### Directus Deployment

**Option 1: Directus Cloud** (Easiest)
1. Sign up at https://directus.cloud
2. Create project
3. Connect to your Supabase database
4. Import schema
5. Done!

**Option 2: Self-Host**
- Deploy to Railway, Render, or DigitalOcean
- Use same docker-compose.yml
- Update `PUBLIC_URL` to your domain

### Next.js Deployment

Deploy to Vercel as usual:

```bash
vercel deploy
```

Add environment variables in Vercel:
- All Supabase variables
- `DIRECTUS_URL` (your deployed Directus URL)
- `DIRECTUS_EMAIL` and `DIRECTUS_PASSWORD`

**Recommended**: Use static token instead of email/password in production.

Generate token in Directus:
1. Settings → Access Tokens
2. Create new token
3. Use `DIRECTUS_TOKEN` environment variable

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Directus admin loads at http://localhost:8055
- [ ] Can log in with admin credentials
- [ ] Schema imported successfully
- [ ] Can create/edit properties in Directus
- [ ] Directus tables appear in Supabase Studio
- [ ] Environment variables set in `.env.local`
- [ ] Can query data from Next.js app

---

## 🆘 Troubleshooting

### Can't Connect to Directus

```bash
# Check if Directus is running
docker-compose ps

# View logs
docker-compose logs -f directus

# Restart
docker-compose restart directus
```

### Database Connection Failed

- Verify Supabase database credentials
- Check if Supabase allows external connections
- Ensure `DB_SSL: 'true'` is set

### Schema Import Failed

- Use Directus v10 or later
- Import collections one at a time if needed
- Check for table name conflicts in Supabase

### Images Not Loading

- Check `PUBLIC_URL` is set correctly
- Verify file permissions in Directus
- Consider using Supabase Storage (see main README)

---

## 📚 Next Steps

1. **Read Full Documentation**: See [cms/README.md](./cms/README.md)
2. **Review TypeScript Types**: See [types/cms.ts](./types/cms.ts)
3. **Advanced Setup**: See [cms/SUPABASE_DIRECTUS_SETUP.md](./cms/SUPABASE_DIRECTUS_SETUP.md)
4. **Start Adding Content**: Create properties, agents, articles in Directus
5. **Build Features**: Query CMS data in your Next.js components

---

## 💡 Pro Tips

### Use Supabase for Reads, Directus for Writes

```typescript
// Fast reads via Supabase
const { data } = await supabase
  .from('properties')
  .select('*')
  .eq('status', 'published')

// Content management via Directus
await directus.createProperty({ ...data })
```

### Real-time Updates

```typescript
// Subscribe to changes via Supabase
supabase
  .channel('properties')
  .on('postgres_changes', { table: 'properties' }, (payload) => {
    console.log('Property updated:', payload)
  })
  .subscribe()
```

### Use Static Tokens in Production

Never use email/password in production:
1. Generate static token in Directus Admin
2. Store in environment variable
3. Use token authentication in your app

---

## 🎉 You're All Set!

Your CMS is configured and ready to use. Key points:

- **Supabase** handles auth, database, storage
- **Directus** provides admin UI and content API
- **Single database** keeps everything simple
- **Production ready** for your portfolio

Start building your real estate platform! 🚀
