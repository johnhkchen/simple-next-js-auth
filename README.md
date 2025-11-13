# Real Estate Platform with Authentication

A production-ready real estate platform with complete authentication using Next.js 16, Turborepo, and Supabase SSR.

## Project Structure

```
simple-next-js-auth/
├── apps/
│   └── real-estate-platform/   # Real estate platform with auth
│       ├── app/                # App Router pages
│       │   ├── page.tsx        # Public homepage
│       │   ├── admin/          # Protected admin dashboard
│       │   └── auth/           # Authentication pages
│       ├── components/         # UI components
│       │   ├── ui/             # shadcn/ui components
│       │   └── admin/          # Admin components
│       ├── lib/
│       │   └── supabase/       # Supabase client utilities
│       └── proxy.ts            # Auth proxy (Next.js 16+)
├── packages/                   # Shared packages (future use)
└── turbo.json                  # Turborepo configuration
```

## Package Versions (Dynamically Discovered)

- **Next.js**: 16.0.3
- **React**: 19.2.0
- **@supabase/supabase-js**: 2.81.1
- **@supabase/ssr**: 0.7.0
- **TypeScript**: 5.9.3
- **Turbo**: 2.6.1

## Prerequisites

- Node.js 18.0.0 or higher
- npm 10.2.4 or higher
- A Supabase account and project

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a new project at [Supabase](https://app.supabase.com)
2. Go to your project settings → API
3. Copy your project URL and anon key
4. Update `.env` in `apps/real-estate-platform/`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY=your-anon-key
```

5. Configure redirect URLs in Supabase Dashboard:
   - Go to Authentication → URL Configuration
   - Add: `http://localhost:3002/auth/confirm`
   - Add: `http://localhost:3002/admin`

### 3. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3002`

## Features

### Authentication Pages

- **Home** (`/`): Public real estate homepage with property listings
- **Login** (`/auth/login`): User login with email/password
- **Sign Up** (`/auth/sign-up`): New user registration
- **Forgot Password** (`/auth/forgot-password`): Request password reset
- **Update Password** (`/auth/update-password`): Set new password
- **Admin Dashboard** (`/admin`): Protected admin panel (requires authentication)

### Security Features

- **Automatic token refresh**: Proxy handles token refresh automatically
- **Protected routes**: Proxy redirects unauthenticated users to login
- **Secure cookie handling**: Uses latest `@supabase/ssr` package with `getAll`/`setAll` pattern
- **SSR support**: Full server-side rendering with authentication

### Supabase Integration

This project uses the **latest recommended patterns** from Supabase:

- ✅ `@supabase/ssr` package with `getAll`/`setAll` cookie methods
- ✅ Separate browser and server client utilities
- ✅ Proxy (Next.js 16+) for automatic token refresh
- ❌ **NOT using deprecated** `@supabase/auth-helpers-nextjs`
- ❌ **NOT using deprecated** individual cookie methods (`get`/`set`/`remove`)
- ❌ **NOT using deprecated** `middleware.ts` (migrated to `proxy.ts`)

## Project Scripts

```bash
# Development
npm run dev          # Start dev server for all apps
npm run build        # Build all apps
npm run lint         # Lint all apps
npm run clean        # Clean build artifacts

# Web app specific (from apps/web)
cd apps/web
npm run dev          # Start web app only
npm run build        # Build web app
npm start            # Start production server
```

## Architecture Decisions

### Why Turborepo?

- Monorepo structure for easy scaling
- Shared packages support (add UI libraries, utilities, etc.)
- Optimized build caching
- Easy to add more apps (mobile, admin panel, etc.)

### Why @supabase/ssr?

The `@supabase/ssr` package is the current recommended approach for Supabase authentication in Next.js:

- Works with Next.js App Router and Server Components
- Proper cookie handling for SSR
- Automatic session refresh via proxy
- No deprecated patterns

### File Structure

- **Browser Client** (`lib/supabase/client.ts`): For client components
- **Server Client** (`lib/supabase/server.ts`): For server components and API routes
- **Middleware** (`lib/supabase/middleware.ts`): Session update and route protection logic
- **Proxy** (`proxy.ts`): Handles automatic token refresh and route protection (Next.js 16+)

## Adding More Features

### Add a New App

```bash
mkdir apps/your-app
# Set up package.json with workspace reference
```

### Add a Shared Package

```bash
mkdir packages/ui
# Create shared UI components
```

### Add More Protected Routes

Edit `apps/real-estate-platform/lib/supabase/middleware.ts` to customize which routes require authentication.

## Troubleshooting

### "Invalid cookie" errors

Make sure you're using the correct pattern:
- ✅ Use `getAll()` and `setAll()`
- ❌ Don't use `get()`, `set()`, or `remove()`

### Session not persisting

Check that:
1. Environment variables are set correctly
2. Proxy is running (check `proxy.ts`)
3. Cookies are being set (check browser DevTools → Application → Cookies)

### Build errors

```bash
# Clean and reinstall
npm run clean
rm -rf node_modules apps/real-estate-platform/node_modules
npm install
```

### Port already in use

If port 3002 is already in use:
```bash
# Find and kill the process
lsof -ti:3002 | xargs kill -9
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Supabase Auth with SSR](https://supabase.com/docs/guides/auth/server-side-rendering)
- [shadcn/ui Components](https://ui.shadcn.com)

## Portfolio Piece

This project is designed as a functional portfolio piece showcasing:
- Modern authentication patterns
- Real estate platform UI
- Production-ready code structure
- Next.js 16 with Turbopack
- Server-side rendering (SSR)
- Protected routes with middleware

**See `CONSOLIDATION_COMPLETE.md` for detailed documentation.**

## License

See LICENSE file for details.
