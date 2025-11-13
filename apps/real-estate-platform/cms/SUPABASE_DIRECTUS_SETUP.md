# Using Supabase as the Database for Directus

This guide explains how to use your existing Supabase PostgreSQL database as the backend for Directus CMS.

## 🎯 Why This Combination?

### Benefits

✅ **Single Database**: One PostgreSQL instance instead of managing two separate databases

✅ **Cost Effective**: Use Supabase's free tier for both auth and CMS data

✅ **Leverage Both Ecosystems**:
- Supabase: Authentication, real-time subscriptions, storage, Edge Functions
- Directus: Powerful admin UI, content modeling, REST + GraphQL APIs

✅ **Flexibility**: Can query the same data from both Supabase client and Directus API

✅ **Developer Experience**: Supabase Studio + Directus Admin for different use cases

### Use Cases

- **This Real Estate Platform**:
  - Supabase handles user authentication (agents login)
  - Directus manages content (properties, listings, blog posts)
  - Shared database means agents can have relationships to properties

- **Other Applications**:
  - E-commerce with user accounts + product catalog
  - SaaS with auth + marketing content
  - Apps needing both user data and CMS content

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                   │
│                    (Supabase Backend)                    │
│                                                          │
│  ┌─────────────────────┐  ┌─────────────────────────┐  │
│  │   Supabase Tables   │  │   Directus Tables       │  │
│  │                     │  │                         │  │
│  │  • auth.users       │  │  • directus_users       │  │
│  │  • public.profiles  │  │  • directus_files       │  │
│  │  • storage.objects  │  │  • directus_collections │  │
│  │                     │  │  • properties           │  │
│  │                     │  │  • agents               │  │
│  │                     │  │  • articles             │  │
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
```

---

## 🚀 Setup Guide

### Step 1: Get Your Supabase Connection Details

1. Go to your Supabase project dashboard
2. Click "Project Settings" → "Database"
3. Find "Connection String" → "URI" format
4. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

5. Also note:
   - Host: `db.[PROJECT-REF].supabase.co`
   - Port: `5432`
   - Database: `postgres`
   - User: `postgres`
   - Password: Your project password

### Step 2: Install Directus

**Option A: Using Docker (Recommended)**

Create `docker-compose.yml`:

```yaml
version: '3'
services:
  directus:
    image: directus/directus:latest
    ports:
      - 8055:8055
    environment:
      KEY: 'replace-with-random-secret-key'
      SECRET: 'replace-with-random-secret-key'

      # Supabase Database Connection
      DB_CLIENT: 'pg'
      DB_HOST: 'db.[YOUR-PROJECT-REF].supabase.co'
      DB_PORT: '5432'
      DB_DATABASE: 'postgres'
      DB_USER: 'postgres'
      DB_PASSWORD: 'your-supabase-password'
      DB_SSL: 'true'

      # Admin Account
      ADMIN_EMAIL: 'admin@example.com'
      ADMIN_PASSWORD: 'changeme'

      # Optional: Use Supabase for file storage too
      STORAGE_LOCATIONS: 'supabase'
      STORAGE_SUPABASE_DRIVER: 'supabase'
      STORAGE_SUPABASE_PROJECT_ID: 'your-project-ref'
      STORAGE_SUPABASE_KEY: 'your-service-role-key'
      STORAGE_SUPABASE_BUCKET: 'directus-files'
    volumes:
      - ./directus/uploads:/directus/uploads
      - ./directus/extensions:/directus/extensions
```

**Option B: Using npm**

```bash
npm install directus

# Create .env file
cat > .env << EOF
KEY="replace-with-random-secret-key"
SECRET="replace-with-random-secret-key"

DB_CLIENT="pg"
DB_HOST="db.[YOUR-PROJECT-REF].supabase.co"
DB_PORT="5432"
DB_DATABASE="postgres"
DB_USER="postgres"
DB_PASSWORD="your-supabase-password"
DB_SSL="true"

ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="changeme"
EOF

# Start Directus
npx directus bootstrap
npx directus start
```

### Step 3: First Launch

```bash
docker-compose up -d
# OR
npx directus start
```

Directus will:
1. Connect to your Supabase database
2. Create its own tables (prefixed with `directus_`)
3. Create the admin user
4. Start the admin interface at `http://localhost:8055`

### Step 4: Verify Connection

1. Open Supabase Studio
2. Go to Table Editor
3. You should see new Directus tables:
   - `directus_users`
   - `directus_roles`
   - `directus_files`
   - `directus_folders`
   - `directus_collections`
   - etc.

### Step 5: Import Schema

1. Log into Directus: `http://localhost:8055`
2. Go to Settings → Data Model
3. Import the schema from `cms/directus/schema.json`

---

## 🔐 Security Considerations

### 1. Separate Schemas (Recommended)

Keep Directus tables in a separate schema:

```sql
-- In Supabase SQL Editor
CREATE SCHEMA directus;
```

Update Directus config:
```env
DB_SCHEMA="directus"
```

### 2. Database User Permissions

Create a dedicated user for Directus:

```sql
-- In Supabase SQL Editor
CREATE USER directus_user WITH PASSWORD 'secure-password';
GRANT ALL PRIVILEGES ON SCHEMA directus TO directus_user;
GRANT USAGE ON SCHEMA public TO directus_user;
```

### 3. Row Level Security (RLS)

Directus bypasses RLS by default (it has its own permission system). If you need RLS:

```sql
-- Example: Protect Supabase auth tables from Directus
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Only allow service role
CREATE POLICY "Service role only" ON auth.users
  FOR ALL
  USING (auth.role() = 'service_role');
```

---

## 🔗 Connecting Both Systems

### Shared Tables Approach

You can have tables accessed by both Supabase and Directus:

```sql
-- Create a properties table in public schema
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow Directus to manage (use service role key)
-- Allow authenticated users to read
CREATE POLICY "Public read" ON public.properties
  FOR SELECT
  USING (true);

CREATE POLICY "Service role full access" ON public.properties
  FOR ALL
  USING (auth.role() = 'service_role');
```

### Link Supabase Auth Users to Directus Content

```sql
-- Add creator relationship
ALTER TABLE directus.properties
  ADD COLUMN supabase_user_id UUID REFERENCES auth.users(id);

-- Query in your app
SELECT
  p.*,
  u.email as creator_email
FROM directus.properties p
LEFT JOIN auth.users u ON p.supabase_user_id = u.id;
```

---

## 📊 Data Access Patterns

### Pattern 1: Directus Manages, Supabase Reads

```typescript
// In your Next.js app - Create via Directus API
const createProperty = async (data: Property) => {
  const directus = createDirectus(process.env.DIRECTUS_URL!)
  return await directus.items('properties').createOne(data)
}

// Read via Supabase (faster, cached)
const getProperties = async () => {
  const supabase = createClient()
  return await supabase
    .from('properties')
    .select('*')
    .eq('status', 'published')
}
```

### Pattern 2: Supabase for Auth, Directus for Content

```typescript
// User authentication via Supabase
const { data: { user } } = await supabase.auth.getUser()

// Content management via Directus
const directus = createDirectus(process.env.DIRECTUS_URL!)
const properties = await directus.items('properties')
  .readByQuery({
    filter: { agent_id: { _eq: user.id } }
  })
```

### Pattern 3: Real-time Updates

```typescript
// Subscribe to changes via Supabase Realtime
const channel = supabase
  .channel('properties')
  .on('postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'properties'
    },
    (payload) => {
      console.log('Property changed:', payload)
    }
  )
  .subscribe()
```

---

## 🛠️ Next.js Integration

Update your environment variables:

```bash
# .env.local

# Supabase (for auth)
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Directus (for content)
DIRECTUS_URL=http://localhost:8055
DIRECTUS_TOKEN=your-directus-static-token

# CMS Type
NEXT_PUBLIC_CMS_TYPE=directus
```

Update the Directus adapter:

```typescript
// lib/cms/directus-adapter.ts
import { createDirectus, rest, authentication } from '@directus/sdk'
import { createClient } from '@/lib/supabase/server'

export class DirectusAdapter implements CMSAdapter {
  private directus
  private supabase

  constructor() {
    this.directus = createDirectus(process.env.DIRECTUS_URL!)
      .with(authentication('json'))
      .with(rest())

    this.supabase = createClient()
  }

  async getProperties(options?: CMSQueryOptions): Promise<CMSCollection<Property>> {
    // Use Directus for CRUD
    const items = await this.directus.request(
      readItems('properties', options)
    )

    // Or use Supabase for reads (faster)
    const { data } = await this.supabase
      .from('properties')
      .select('*')
      .eq('status', 'published')

    return { items: data || [], total: data?.length || 0 }
  }
}
```

---

## 🎨 Using Supabase Storage with Directus

Configure Directus to use Supabase Storage:

```bash
# Install Supabase storage driver for Directus
npm install @supabase/storage-js
```

```javascript
// directus/extensions/storage/supabase.js
import { createClient } from '@supabase/supabase-js'

export default {
  async read(location) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    )
    const { data } = await supabase.storage
      .from('directus-files')
      .download(location)
    return data
  },
  async write(location, contents) {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    )
    await supabase.storage
      .from('directus-files')
      .upload(location, contents)
  }
}
```

---

## 🔍 Monitoring & Debugging

### Check Database Connection

```sql
-- In Supabase SQL Editor
-- See active connections
SELECT
  datname,
  usename,
  application_name,
  client_addr
FROM pg_stat_activity
WHERE datname = 'postgres';
```

### View Directus Tables

```sql
-- List all Directus tables
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
AND tablename LIKE 'directus_%';
```

### Debug Connection Issues

```bash
# Test PostgreSQL connection
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# Check Directus logs
docker-compose logs -f directus
# OR
npx directus start --log-level debug
```

---

## ⚠️ Important Considerations

### 1. Migration Strategy

- Directus manages its own schema migrations
- Keep Directus tables separate from app tables
- Use Supabase migrations for app-specific tables
- Document which system owns which tables

### 2. Authentication Separation

- **Supabase Auth**: For app users (agents, customers)
- **Directus Users**: For content editors/admins
- These are separate user tables
- Can link via foreign keys if needed

### 3. Backup Strategy

```bash
# Backup includes both Supabase and Directus data
pg_dump "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres" \
  > backup-$(date +%Y%m%d).sql
```

### 4. Performance

- Directus adds overhead compared to direct queries
- Use Supabase directly for high-frequency reads
- Use Directus for content management and admin
- Consider caching layer for production

---

## 🆚 Alternative Approach: Separate Databases

If you prefer isolation:

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: directus
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: directus
    volumes:
      - ./data/postgres:/var/lib/postgresql/data

  directus:
    image: directus/directus:latest
    environment:
      DB_CLIENT: 'pg'
      DB_HOST: 'postgres'
      DB_DATABASE: 'directus'
      # ... rest of config
```

Then sync data between them as needed.

---

## 📚 Best Practices

### ✅ Do:
- Use separate schemas for Directus and app tables
- Document table ownership clearly
- Use Directus for content, Supabase for app data
- Implement proper backup strategy
- Monitor database connections
- Use connection pooling

### ❌ Don't:
- Mix content editing in both systems
- Let Directus manage auth tables
- Modify Directus system tables manually
- Skip RLS policies on shared tables
- Use same credentials for everything

---

## 🎓 Learning Resources

- [Directus Database Docs](https://docs.directus.io/self-hosted/config-options.html#database)
- [Supabase Connection Guide](https://supabase.com/docs/guides/database/connecting-to-postgres)
- [PostgreSQL Schema Guide](https://www.postgresql.org/docs/current/ddl-schemas.html)

---

## 🎉 Conclusion

Using Supabase as the database for Directus is a powerful combination that:
- Reduces infrastructure complexity
- Leverages strengths of both platforms
- Provides flexibility for different use cases
- Remains cost-effective

For this real estate platform:
- ✅ Supabase: Handles agent authentication
- ✅ Directus: Manages property content, blog posts, testimonials
- ✅ Single PostgreSQL database for everything
- ✅ Best of both ecosystems

Now you can get the content management power of Directus with the developer experience of Supabase! 🚀
