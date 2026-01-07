# Deploying Sanity Studio to Vercel

This guide explains how to deploy the Sanity Studio to Vercel.

## Option 1: Deploy from Repository Root (Recommended for Monorepo)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your repository
3. Configure the project:
   - **Root Directory**: Leave blank (repository root)
   - **Framework Preset**: Other
   - **Build Command**: `pnpm --filter @kpf/sanity-studio build` (auto-detected from vercel.json)
   - **Install Command**: `pnpm install --frozen-lockfile` (auto-detected from vercel.json)
   - **Output Directory**: `apps/sanity-studio/dist` (auto-detected from vercel.json)

## Option 2: Deploy from App Directory

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your repository
3. Configure the project:
   - **Root Directory**: `apps/sanity-studio`
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build` (or `cd ../.. && pnpm install && pnpm --filter @kpf/sanity-studio build`)
   - **Install Command**: `cd ../.. && pnpm install --frozen-lockfile`
   - **Output Directory**: `dist`

## Environment Variables

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

### Required:
- `SANITY_STUDIO_PROJECT_ID` - Your Sanity project ID
  - Alternative: `NEXT_PUBLIC_SANITY_PROJECT_ID` or `VITE_SANITY_PROJECT_ID`

- `SANITY_STUDIO_DATASET` - Your Sanity dataset name (defaults to "production")
  - Alternative: `NEXT_PUBLIC_SANITY_DATASET` or `VITE_SANITY_DATASET`

### Optional:
- `SANITY_STUDIO_API_TOKEN` - API token for authenticated requests
  - Alternative: `VITE_SANITY_STUDIO_API_TOKEN`

## Notes

- The `vercel.json` file is configured for Option 1 (deploying from repository root)
- Sanity Studio builds to the `dist` directory
- The rewrite rule ensures all routes serve `index.html` for client-side routing
- Make sure your Sanity project has CORS configured to allow your Vercel domain

