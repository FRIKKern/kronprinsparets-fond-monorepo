# Kronprinsparets Fond Monorepo

This is a Turborepo monorepo containing the FLYT program applications.

## Structure

```
├── apps/
│   ├── flyt-idrett/      # Sports program Next.js app
│   ├── flyt-programmet/  # Main program Next.js app
│   └── sanity-studio/    # Sanity CMS Studio
├── packages/
│   └── ui/               # Shared UI components package
└── turbo.json            # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9+

### Installation

```bash
pnpm install
```

### Development

Run all apps in development mode:

```bash
pnpm dev
```

Run a specific app:

```bash
pnpm dev --filter=flyt-idrett
pnpm dev --filter=flyt-programmet
pnpm dev --filter=sanity-studio
```

### Build

Build all apps:

```bash
pnpm build
```

Build a specific app:

```bash
pnpm build --filter=flyt-idrett
```

## Apps

### flyt-idrett

The sports program application. Runs on port 3000 by default.

### flyt-programmet

The main program application. Runs on port 3002 by default.

### sanity-studio

Sanity CMS Studio for content management.

## Packages

### @kpf/ui

Shared UI components package used by all apps. Contains:

- Typography components (Heading1-6, Subtitle1-2, Body1-2, Caption)
- Button component
- Icon component
- Footer component
- SanityImage component
- BlockContent component
- ListView component
- FileDownload component

## Environment Variables

Each app may require environment variables. Check individual app directories for `.env.example` files.

Common variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
