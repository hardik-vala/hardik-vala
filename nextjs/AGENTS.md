# AGENTS.md

## Overview

Personal site (hardikvala.com) built with Next.js 15 (App Router), React 19, Tailwind v4, and Contentlayer2 for MDX-driven blog posts. The repo root (`hardik-vala.github.io/`) also contains a legacy `jekyll/` site and a `send_email.py` script — the active site lives entirely under `nextjs/`. Work from `nextjs/` as the project root.

## Commands

```
npm run dev      # next dev (local at :3000)
npm run build    # production build (runs contentlayer build via next-contentlayer2)
npm run start    # serve the production build
npm run lint     # next lint (eslint flat config)
```

There is no test suite.

When developing inside the devcontainer on the `scale-1` host, tunnel from the client: `ssh -L 3001:172.17.0.2:3000 hardik@scale-1`, then open `localhost:3001`.

## Architecture

**Content pipeline (Contentlayer).** `contentlayer.config.js` defines a single `Post` document type sourced from `src/content/posts/*.mdx`. Frontmatter fields: `title` and `date` are required; `description`, `image`, `imageMeta`, `alt`, `tag` are optional. Computed `slug` (last path segment) and `url` (flattened path) are exposed on each post. The MDX pipeline runs `remark-gfm` + `remark-math`, then `rehype-slug` → `rehype-katex` → `rehype-autolink-headings` (anchors get the `subheading-anchor` class). `next.config.ts` wraps the Next config with both `withContentlayer` and `@next/mdx`'s `createMDX`, and adds `md`/`mdx` to `pageExtensions`. Import generated posts from `contentlayer/generated` — they are regenerated automatically on `next dev`/`next build`.

**Routing (App Router).** `src/app/` holds the routes:


- `page.tsx` — home
- `blog/page.tsx` and `blog/[slug]/page.tsx` — index + post pages, rendered from Contentlayer's `allPosts`
- `projects/page.tsx`
- `api/v1/subscribe/route.ts` — POST handler for the newsletter form

Shared chrome lives in `src/components/` (`Navigation`, `Footer`, `PageLayout`, `Subscribe`). MDX rendering customizations go in `mdx-components.tsx` at the repo root (required by `@next/mdx`).

**Subscribe API.** `src/app/api/v1/subscribe/route.ts` validates an email, then uses [Resend](https://resend.com) (`RESEND_KEY`) to send a notification from `FROM_EMAIL` to `TO_EMAIL`. All three env vars are required at runtime; the route returns 500 if `FROM_EMAIL`/`TO_EMAIL` are missing. Subscribers are not persisted anywhere — the "subscription" is just an email notification to the site owner.

**Drafts.** `drafts/` (sibling of `src/`) holds unpublished MDX. Contentlayer only indexes `src/content/posts/`, so drafts won't appear on the site until moved there.

## Conventions

- Posts: filename = slug; date must be ISO (`YYYY-MM-DD`); KaTeX is available in MDX via `$...$` / `$$...$$`.
- Tailwind v4 via `@tailwindcss/postcss`; global styles in `src/app/globals.css`. `@tailwindcss/typography` is loaded for prose content.
- Analytics: `@vercel/analytics` is wired in `app/layout.tsx`.
