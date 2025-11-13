# Supabase Database Setup

## Running Migrations

### Option 1: Via Supabase Dashboard (Easiest)

1. Go to your Supabase project: https://app.supabase.com
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the contents of `migrations/20250113_create_cms_tables.sql`
5. Paste into the query editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. Wait for confirmation (~5-10 seconds)

### Option 2: Via Supabase CLI (Local Development)

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref qpnmoccmnikndcwikxuu

# Run migration
supabase db push

# Or run SQL file directly
supabase db execute -f migrations/20250113_create_cms_tables.sql
```

---

## Adding Seed Data

After running the migration, add sample data:

1. Go to **SQL Editor** in Supabase Dashboard
2. Copy contents of `seed.sql`
3. Paste and click **Run**

This will create:
- 6 sample properties
- 3 testimonials
- 2 sample inquiries
- 2 blog articles

---

## Database Schema Overview

### Tables Created

- **properties** - Real estate listings
- **agents** - Agent profiles (linked to auth.users)
- **inquiries** - Contact form submissions and leads
- **testimonials** - Client reviews
- **articles** - Blog posts
- **site_settings** - Global site configuration

### Row Level Security (RLS)

All tables have RLS enabled with these policies:

**Public users can:**
- View published properties
- View active agents
- View published testimonials
- View published articles
- Submit inquiries

**Authenticated users can:**
- View all content
- Create/edit/delete content
- Manage inquiries
- Update their own agent profile

---

## Verifying the Migration

Run this query in SQL Editor to verify tables were created:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('properties', 'agents', 'inquiries', 'testimonials', 'articles', 'site_settings');
```

Should return 6 rows.

---

## Generating TypeScript Types

After running migrations, generate TypeScript types for your Next.js app:

```bash
# Install Supabase CLI types generator
npm install -g supabase

# Generate types
npx supabase gen types typescript --project-id qpnmoccmnikndcwikxuu > ../../types/database.ts
```

Or via dashboard:
1. Settings → API → Generate Types
2. Copy TypeScript types
3. Paste into `types/database.ts`

---

## Troubleshooting

### "relation already exists" error
- Tables already exist, migration already ran
- Safe to ignore or drop tables first: `DROP TABLE IF EXISTS properties CASCADE;`

### Permission denied
- Make sure you're logged into Supabase CLI
- Verify project ref is correct: `qpnmoccmnikndcwikxuu`

### RLS blocking queries
- Check policies are created correctly
- For testing, you can temporarily disable RLS: `ALTER TABLE properties DISABLE ROW LEVEL SECURITY;` (not recommended for production)

---

## Next Steps

After running migrations:
1. ✅ Verify tables exist in Supabase Dashboard → Table Editor
2. ✅ Run seed data (optional)
3. ✅ Generate TypeScript types
4. ✅ Proceed to install Refine admin
