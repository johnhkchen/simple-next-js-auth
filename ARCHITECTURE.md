# Architecture & Migration Strategy

## 🎯 Current Architecture (Phase 1: Portfolio)

**Stack:** Next.js 16 + React 19 + Supabase + Refine Admin

```
┌─────────────────────────────────────┐
│   Next.js Monolith (Vercel/CF)     │
│   ─────────────────────────────────  │
│   • Public site (/)                 │
│   • Admin panel (/admin)            │
│   • API routes (/api)               │
└─────────┬───────────────────────────┘
          │
          └──► Supabase (DB + Auth)
```

**Bundle Size:** ~200KB
**Build Time:** 30-60s
**First Contentful Paint:** ~1.2s

**Why this stack:**
- ✅ Fast iteration for portfolio piece
- ✅ React ecosystem (Refine admin)
- ✅ Easy deployment (Vercel/Cloudflare)
- ✅ Single codebase (simplicity)

---

## 🚀 Future Optimization Paths

### Path A: Next.js → Astro Migration

**When:** Site is content-heavy, need better Core Web Vitals

**Architecture:**
```
┌──────────────────┐    ┌─────────────────────┐
│  Admin (Vite)    │    │  Frontend (Astro)   │
│  admin.site.com  │    │  site.com           │
│  • React         │    │  • Static pages     │
│  • Refine        │    │  • React islands    │
└────────┬─────────┘    └──────────┬──────────┘
         │                         │
         └────────┬────────────────┘
                  ▼
         ┌─────────────────┐
         │    Supabase     │
         │  (Unchanged)    │
         └─────────────────┘
```

**Benefits:**
- 80% less JavaScript shipped
- 5x faster build times
- Better SEO scores
- Same admin panel (no rewrite)

**Migration Steps:**
1. Extract `/admin` to separate Vite app
2. Rewrite public pages as `.astro` files
3. Keep interactive components as React islands
4. Deploy admin to subdomain

**Estimated Effort:** 2-3 days

**Bundle Size:** 200KB → 50KB
**Build Time:** 60s → 15s
**FCP:** 1.2s → 0.5s

---

### Path B: Add Go API Layer

**When:** Need advanced caching, business logic, or high performance

**Architecture:**
```
┌──────────────┐    ┌──────────────┐
│   Admin      │    │  Frontend    │
│   (React)    │    │ (Astro/Next) │
└──────┬───────┘    └──────┬───────┘
       │                   │
       └────────┬──────────┘
                ▼
       ┌─────────────────┐
       │   Go API Layer  │
       │  (Cloudflare    │
       │   Workers)      │
       └────────┬────────┘
                ▼
       ┌─────────────────┐
       │    Supabase     │
       └─────────────────┘
```

**Use Cases:**
- Complex pricing calculations
- Advanced caching (Redis)
- Image processing
- Rate limiting
- Connection pooling

**Tech Options:**
- Fiber (Go web framework)
- Echo (lightweight)
- Chi (minimal)

**Deploy Options:**
- Cloudflare Workers (Go → WASM)
- Fly.io (Docker)
- Railway (Docker)

**Benefits:**
- 50ms → 5ms API responses
- Better concurrency (Go routines)
- Lower memory usage
- Type-safe (if using gRPC)

**Estimated Effort:** 1-2 weeks

---

### Path C: Full Static Generation

**When:** Content updates rarely (daily/weekly), max performance needed

**Architecture:**
```
Content (Git/Tina) → Build (Astro SSG) → CDN (Cloudflare)
Admin (React) → Supabase → Webhook → Rebuild
```

**Build Triggers:**
- Git commit (Tina CMS save)
- Scheduled (4x daily via GitHub Actions)
- Manual (webhook)

**Benefits:**
- Pure HTML/CSS (no JS needed)
- Instant load times (0.1-0.3s)
- $0 hosting (Cloudflare Pages)
- Maximum security (no server)

**Trade-offs:**
- Not suitable for user-generated content
- 1-2 min update delay
- Build times scale with content

**Estimated Effort:** 3-5 days

---

## 🏗️ Architectural Principles (For Migration-Friendliness)

### 1. API Abstraction Layer

Always use an interface between components and data source:

```typescript
// ✅ Good: Abstracted
interface PropertyRepository {
  getAll(): Promise<Property[]>
  getById(id: string): Promise<Property>
}

class SupabasePropertyRepo implements PropertyRepository {
  // Implementation
}

class GoAPIPropertyRepo implements PropertyRepository {
  // Can swap later
}

// ❌ Bad: Tightly coupled
function PropertyList() {
  const { data } = await supabase.from('properties').select('*')
  // Hard to change later
}
```

### 2. Schema as Source of Truth

Database schema drives everything:

```
Supabase Schema (SQL)
    ↓
Auto-generate TypeScript types
    ↓
Use in: Next.js, Astro, Go, Admin
```

```bash
# Generate types from schema
npx supabase gen types typescript --local > types/database.ts
```

### 3. Separate Admin from Frontend

Even in a monolith, maintain clear boundaries:

```
app/
├── (public)/         ← Public routes (can be migrated)
│   ├── page.tsx
│   └── properties/
├── admin/            ← Admin routes (stays stable)
│   ├── layout.tsx
│   └── properties/
└── api/              ← API routes (can become Go)
    └── revalidate/
```

### 4. Feature Flags for Gradual Migration

```typescript
// .env
NEXT_PUBLIC_USE_GO_API=false

// lib/api/client.ts
export const api = process.env.NEXT_PUBLIC_USE_GO_API
  ? new GoAPIClient()
  : new SupabaseClient()
```

Allows testing Go API on subset of traffic before full migration.

---

## 📊 Decision Matrix

| Scenario | Recommended Stack | Why |
|----------|------------------|-----|
| **Portfolio showcase** | Next.js + Supabase | Fast dev, looks professional |
| **Content-heavy site** | Astro + React Islands | 80% static, 20% interactive |
| **High traffic production** | Go API + Astro | Max performance, scalability |
| **Pure marketing site** | Astro SSG + Tina CMS | No server needed, ultra-fast |
| **Complex web app** | Next.js + React | Need full interactivity |

---

## 🔧 Technical Debt to Avoid

### ❌ Don't Do This:

1. **Mixing admin and public logic**
   ```typescript
   // Bad
   function PropertyPage({ isAdmin }) {
     if (isAdmin) { /* admin stuff */ }
     else { /* public stuff */ }
   }
   ```

2. **Direct database queries in components**
   ```typescript
   // Bad
   function MyComponent() {
     const { data } = await supabase.from('properties')...
   }
   ```

3. **Hard-coded URLs**
   ```typescript
   // Bad
   fetch('https://mysite.com/api/properties')

   // Good
   fetch(`${process.env.API_URL}/properties`)
   ```

### ✅ Do This:

1. **Clear separation of concerns**
   ```typescript
   // Admin routes
   app/admin/properties/page.tsx

   // Public routes
   app/(public)/properties/page.tsx
   ```

2. **Repository pattern**
   ```typescript
   // lib/repositories/property-repository.ts
   export const propertyRepo = createRepository<Property>('properties')
   ```

3. **Environment-based configuration**
   ```typescript
   // lib/config.ts
   export const config = {
     apiUrl: process.env.API_URL,
     supabaseUrl: process.env.SUPABASE_URL,
   }
   ```

---

## 🎯 Migration Checklist

When you're ready to optimize:

### Pre-Migration
- [ ] Audit current bundle size (`npx @next/bundle-analyzer`)
- [ ] Measure Core Web Vitals (Lighthouse)
- [ ] Identify static vs dynamic pages
- [ ] Document current API calls
- [ ] List all dependencies

### During Migration
- [ ] Set up new project in parallel (don't break current site)
- [ ] Migrate database schema (if needed)
- [ ] Port static pages first
- [ ] Add feature flags for gradual rollout
- [ ] Test admin panel independently

### Post-Migration
- [ ] Compare bundle sizes
- [ ] Measure performance improvements
- [ ] Update documentation
- [ ] Monitor error rates
- [ ] Celebrate! 🎉

---

## 📚 Further Reading

- **Astro Docs:** https://docs.astro.build
- **Astro Islands:** https://docs.astro.build/en/concepts/islands/
- **Go Fiber:** https://gofiber.io
- **Cloudflare Workers (Go):** https://developers.cloudflare.com/workers/languages/go/
- **Vercel to Astro Migration:** https://astro.build/guides/migrate-to-astro/

---

## 💡 Final Notes

**Remember:** Premature optimization is the root of all evil.

- Phase 1 (NOW): Build quickly with Next.js + React
- Phase 2 (LATER): Optimize only when you have real performance data

**The architecture above ensures:**
- ✅ Fast iteration NOW (React ecosystem)
- ✅ Clear migration path LATER (when needed)
- ✅ No technical debt (clean separation of concerns)

**When to migrate:**
- Site has proven traction (worth optimizing)
- Performance is measurably impacting users
- You have time to invest in optimization

**When NOT to migrate:**
- Just built the site (let it prove itself first)
- No performance complaints from users
- Site works fine as-is

---

*Last Updated: 2025-11-13*
*Architecture designed for: Real Estate Platform Portfolio Project*
