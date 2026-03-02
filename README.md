# IEEE Computer Society at USF - Official Website

The official website for the **IEEE Computer Society** student branch chapter at the **University of South Florida** (Tampa, Florida). Built with a modern stack to serve as the chapter's public face - showcasing events, news, leadership, partners, and more - while giving officers a powerful admin panel to manage content without touching code.

<img width="2054" height="628" alt="image" src="https://github.com/user-attachments/assets/3c916974-33d1-49dc-af51-583c7e852b69" />



## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **UI** | React 19, [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| **CMS** | [Payload CMS 3](https://payloadcms.com/) (self-hosted, headless) |
| **Database** | PostgreSQL on [Neon](https://neon.tech/) |
| **Storage** | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| **Email** | [Resend](https://resend.com/) |
| **Analytics** | [PostHog](https://posthog.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## Features

- **Home** - Hero section with live chapter stats, an About overview, image gallery, TechX AI Conference recap, achievements counter, membership benefits, and FAQ.
- **Events** - Automatically synced from BullsConnect via a daily Vercel cron job. No manual entry required.
- **News** - Rich-text articles authored in Payload CMS with a Lexical editor, social sharing, and slug-based routing.
- **People** - Browse the executive board across semesters (Fall 2024 → Spring 2026) with filterable member cards.
- **Partners** - Showcase of industry and organization partners.
- **Contact** - Role-aware contact form protected by Cloudflare Turnstile, with email delivery via Resend and webhook notifications through n8n.
- **Admin Panel** - Full-featured Payload CMS dashboard at `/admin` for managing articles, media, and users.
- **Dark Mode** - System-aware theme toggle.
- **SEO** - Dynamic sitemap and robots.txt generation.

## Project Structure

```
app/
├── (site)/              # Public-facing pages and layouts
│   ├── home-components/ # Hero, About, Gallery, TechX, FAQ, etc.
│   ├── events/          # Events listing (auto-synced from BullsConnect)
│   ├── news/            # News articles from Payload CMS
│   ├── people/          # Executive board directory
│   ├── partners/        # Partner showcase
│   ├── contact/         # Contact form
│   └── data/            # Static data (e-board rosters, FAQ, hero stats)
├── (payload)/           # Payload CMS admin panel and API routes
├── api/                 # Custom API routes (contact, events, cron)
└── components/          # Shared UI components
collections/             # Payload CMS collection schemas
scripts/                 # Utility scripts (event sync, image processing)
public/                  # Static assets (logos, member photos, images)
```

## Architecture Highlights

- **BullsConnect Integration** - A daily cron job scrapes the USF BullsConnect platform and syncs chapter events into the Neon database, keeping the events page always up to date with zero manual effort.
- **PostHog Analytics Proxy** - PostHog ingestion is proxied through `/ingest` rewrites to avoid ad blockers and improve data accuracy.
- **Payload CMS as a First-Class Citizen** - Payload runs alongside the Next.js app in the same deployment, providing a `/admin` dashboard, REST API, and GraphQL endpoint out of the box.
- **Vercel-Native** - Optimized for Vercel with Blob storage, cron jobs, and edge-friendly configuration.

## License

This project is maintained by the IEEE Computer Society chapter at the University of South Florida.
