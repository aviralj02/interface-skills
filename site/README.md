# Interface Skills site

The website for the skill pack, deployed at [skills.heyaviral.com](https://skills.heyaviral.com). Built with React, TypeScript, Vite, Tailwind CSS, and lucide-react.

Content comes straight from `../skills/*/SKILL.md` at build time, so the site always matches the skills. Every route is pre-rendered to static HTML, which means `dist/` can be deployed to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check, build, pre-render every page into dist/
npm run preview   # serve dist/ locally
```

## Where things live

| Path | What |
|---|---|
| `src/content/skills.ts` | Loads SKILL.md files; grouping, order, and one-line summaries for the index |
| `src/content/site.ts` | Repo name, site URL, and install commands |
| `src/head.ts` | Title, description, and JSON-LD for every route |
| `src/components/Specimens.tsx` | The home page's six-state component sheet |
| `src/pages/SkillPage.tsx` | Per-skill page: install commands, rendered SKILL.md, table of contents |
| `scripts/prerender.mjs` | Renders every route, plus sitemap/llms.txt/markdown mirrors, after the build |
| `scripts/generate-social-assets.mjs` | One-off: renders the favicons, app icons, and OG image from the real design |

A new skill folder in `skills/` gets a page automatically. Add it to `CATALOG` in `src/content/skills.ts` to give it a group and a summary.

## SEO and agent accessibility

Every route is real, crawlable HTML — nothing here depends on JavaScript running before content appears — plus:

- **Per-page metadata:** unique `<title>`, description, canonical link, Open Graph and Twitter Card tags, generated in `scripts/prerender.mjs` from `src/head.ts`. The 404 page is marked `noindex`.
- **Structured data:** `WebSite` + `SoftwareSourceCode` JSON-LD on the home page; `TechArticle` + `BreadcrumbList` on every skill page.
- **`/sitemap.xml`** and **`/robots.txt`** (the latter is a static file in `public/`, allowing all crawlers).
- **`/llms.txt`** and **`/llms-full.txt`** ([llmstxt.org](https://llmstxt.org)): a curated index and a single-file concatenation of every skill, for agents that read a site before acting on it.
- **`/skills/<name>.md`**: the raw `SKILL.md` for every skill, served from this domain (not just GitHub), so an agent can fetch one skill directly with `curl` — no HTML parsing needed.
- **Real favicons and social image:** `favicon.svg` + PNG fallbacks, an `apple-touch-icon`, a `site.webmanifest`, and `og-image.png`, all rendered from the actual design system (not hand-drawn) by `scripts/generate-social-assets.mjs`. Re-run it after a visual change:

  ```bash
  node scripts/generate-social-assets.mjs   # needs a local Chrome/Chromium
  ```

  It's not part of `npm run build` — its output is committed under `public/`, so CI and other contributors never need Chrome installed to build the site.
