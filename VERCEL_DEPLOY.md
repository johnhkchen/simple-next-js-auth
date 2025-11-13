# 🚀 Vercel Deployment Guide

## ✅ Your Repo is Ready!

**GitHub Repository:** https://github.com/johnhkchen/simple-next-js-auth

---

## 📦 Step-by-Step Deployment

### 1. Go to Vercel

Visit: **https://vercel.com/new**

(Or click "Add New..." → "Project" from your Vercel dashboard)

---

### 2. Import Your GitHub Repository

1. **Connect GitHub account** (if not already connected)
2. Search for: `johnhkchen/simple-next-js-auth`
3. Click **"Import"**

---

### 3. Configure Project Settings

Vercel will **auto-detect** it's a Turborepo monorepo!

#### Project Settings:
- **Framework Preset:** `Next.js` ✅ (auto-detected)
- **Root Directory:** `apps/real-estate-platform` ⚠️ **IMPORTANT**
  - Click "Edit" next to Root Directory
  - Select `apps/real-estate-platform`
- **Build Command:** (leave default - Vercel handles Turborepo)
- **Output Directory:** `.next` (default)
- **Install Command:** (leave default)

#### Advanced Settings (click to expand):
- **Node.js Version:** `18.x` or `20.x` (recommended)

---

### 4. Add Environment Variables ⚠️ CRITICAL

Click **"Environment Variables"** and add:

| Name | Value | Where to Get It |
|------|-------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY` | `eyJhbGc...` (long key) | Supabase Dashboard → Project Settings → API → `anon` key |

**Environment:** Select `Production`, `Preview`, and `Development` for all

---

### 5. Deploy! 🎉

Click **"Deploy"**

Vercel will:
1. Install dependencies
2. Run Turborepo build (only for `real-estate-platform` app)
3. Deploy to a `.vercel.app` URL
4. Show you the deployment progress in real-time

⏱️ **First deployment takes 2-3 minutes**

---

## ✅ After Deployment

### Your Site Will Be Live At:
```
https://simple-next-js-auth-<random>.vercel.app
```

### Test Your Deployment:
1. Visit your Vercel URL
2. Go to `/admin` - should redirect to `/auth/login`
3. Try logging in with a Supabase user
4. Access admin dashboard

---

## 🔧 Post-Deployment Setup

### 1. Update Supabase Redirect URLs

Go to Supabase Dashboard → Authentication → URL Configuration:

Add your Vercel URL to:
- **Site URL:** `https://your-app.vercel.app`
- **Redirect URLs:** Add:
  ```
  https://your-app.vercel.app/auth/confirm
  https://your-app.vercel.app/auth/callback
  ```

### 2. Custom Domain (Optional)

In Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain (e.g., `myrealestate.com`)
3. Follow DNS instructions
4. Update Supabase redirect URLs with your custom domain

---

## 🔄 Automatic Deployments

Now every time you push to GitHub:
- **Main branch** → Deploys to **Production**
- **Other branches** → Creates **Preview** deployments
- **Pull Requests** → Auto-generates preview URLs

---

## 🐛 Troubleshooting

### "Build Failed"
- Check Vercel build logs
- Verify root directory is set to `apps/real-estate-platform`
- Ensure environment variables are set

### "Redirect Loop on /admin"
- Verify Supabase environment variables are correct
- Check that `NEXT_PUBLIC_SUPABASE_URL` includes `https://`
- Test Supabase auth in local environment first

### "Cannot find module"
- Vercel should auto-detect Turborepo
- Check that `turbo.json` and `package.json` are in the root
- Verify `apps/real-estate-platform/package.json` has all dependencies

---

## 📊 Monitoring

### View Deployments:
**Dashboard:** https://vercel.com/dashboard

Each deployment shows:
- Build logs
- Runtime logs
- Performance metrics
- Environment details

### Enable Analytics (Optional):
- Go to Project Settings → Analytics
- Enable **Vercel Analytics** for visitor tracking
- Enable **Speed Insights** for performance monitoring

---

## 🎯 Next Steps After First Deploy

1. ✅ Test authentication flow end-to-end
2. ✅ Verify Supabase connection works
3. ✅ Set up your custom domain
4. ✅ Create a Supabase user to test admin access
5. ✅ Run migrations: `npx supabase db push` (if using Supabase CLI)
6. ✅ Populate initial data (properties, etc.)

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Turborepo on Vercel:** https://vercel.com/docs/monorepos/turborepo
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Supabase Auth with Vercel:** https://supabase.com/docs/guides/auth/server-side/nextjs

---

## ✨ Your Stack

- **Frontend:** Next.js 16 (App Router)
- **Admin:** Refine Framework
- **Auth:** Supabase
- **Database:** Supabase PostgreSQL
- **Hosting:** Vercel
- **Monorepo:** Turborepo
- **Styling:** Tailwind CSS + shadcn/ui

---

**Happy Deploying! 🚀**
