# Deploying Sanity Studio to Vercel

This guide explains how to deploy the Sanity Studio to Vercel.

## Option 1: Deploy from App Directory (Current Configuration)

The `vercel.json` is configured for deploying from `apps/sanity-studio` directory.

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Import your repository
3. Configure the project:
   - **Root Directory**: `apps/sanity-studio`
   - **Framework Preset**: Other
   - **Build Command**: `cd ../.. && pnpm install --frozen-lockfile && pnpm --filter @kpf/sanity-studio build` (auto-detected from vercel.json)
   - **Install Command**: `cd ../.. && pnpm install --frozen-lockfile` (auto-detected from vercel.json)
   - **Output Directory**: `dist` (auto-detected from vercel.json)

## Option 2: Deploy from Repository Root

If you prefer to deploy from the repository root, update `vercel.json`:

```json
{
  "buildCommand": "pnpm --filter @kpf/sanity-studio build",
  "installCommand": "pnpm install --frozen-lockfile",
  "outputDirectory": "apps/sanity-studio/dist",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Then configure in Vercel:
- **Root Directory**: Leave blank (repository root)
- **Output Directory**: `apps/sanity-studio/dist`

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

