# Bend Home Resources

Production-ready starter for **bendhomeresources.com** built with Astro and designed for static deployment on Cloudflare Pages through GitHub.

## What is included

The v2 launch build uses the long-term SEO architecture rather than a handful of standalone keyword URLs:

- `/buying/`
- `/professionals/`
- `/costs/`
- `/neighborhoods/`
- `/homeownership/`
- `/tools/`

The project currently contains the homepage, 6 hub pages, 27 supporting guides/tools, 4 trust/editorial pages and a 404 page.

## GitHub: where to put these files

Create a GitHub repository named something like:

`bend-home-resources`

Upload **the contents of this folder directly to the root of the repo**.

Correct:

```text
bend-home-resources/
├── package.json
├── astro.config.mjs
├── README.md
├── CONTENT-BACKLOG.md
├── src/
├── public/
└── docs/
```

Avoid an extra nested folder such as `bend-home-resources/bend-home-resources/src`.

## Local development

Current project configuration targets Node 22.12+.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Astro writes the static site to `dist/`.

## Cloudflare Pages

Connect the GitHub repository in Cloudflare Pages and use:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`

Official Cloudflare Astro guide:
https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

Connect `bendhomeresources.com` as the production custom domain. If you also connect `www.bendhomeresources.com`, add a Cloudflare redirect rule so one hostname consistently redirects to the preferred canonical hostname.

## Optional environment variables

Copy `.env.example` to `.env` locally if needed. Do not commit secrets.

```text
PUBLIC_GA_ID=
PUBLIC_GSC_VERIFICATION=
PUBLIC_BING_VERIFICATION=
```

For Cloudflare production values, add the variables in the Pages project settings rather than committing a real `.env` file.

## SEO / technical setup included

- Static HTML output
- Clean hub-and-spoke URL architecture
- Unique title/meta description on every page
- Canonical tags
- `robots.txt`
- XML sitemap through `@astrojs/sitemap`
- Breadcrumb navigation + BreadcrumbList schema
- Article schema on guides
- CollectionPage schema on hubs
- WebSite/Organization schema on homepage
- Open Graph/Twitter metadata and default 1200×630 image
- Internal related-content linking
- Responsive navigation
- 404 page set to noindex
- Cloudflare security headers
- Pre-launch redirects from the original v1 URL ideas
- Primary-source links on pages involving Oregon rules, licensing or local programs
- Visible review date on resource pages

## How content works

Most of the site copy lives in:

`src/data/content.json`

Reusable route templates generate the final pages from that data:

```text
src/pages/[section]/index.astro
src/pages/[section]/[slug].astro
```

That keeps the rendered site fully static while making expansion much easier. To add a future professional or cost guide, add the content record and it automatically uses the same page layout, metadata pattern, breadcrumb structure and related-content system.

## Editorial roadmap

See:

- `CONTENT-BACKLOG.md` — prioritized future content ideas
- `docs/SITE-ARCHITECTURE.md` — current and 6–12 month structure
- `docs/LAUNCH-CHECKLIST.md` — deployment and post-launch tasks

## Important editorial note

Bend Home Resources is positioned as an independent educational resource, not as a brokerage, contractor directory pretending to be editorial, or a source of invented local statistics. When local cost data is added, document the quote/project methodology and keep sponsorship or commercial relationships transparent.
