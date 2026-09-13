# Interface Skills site

The website for the skill pack. Built with React, TypeScript, Vite, Tailwind CSS, and lucide-react.

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
| `src/content/site.ts` | Repo name and install commands |
| `src/components/Specimens.tsx` | The home page's six-state component sheet |
| `src/pages/SkillPage.tsx` | Per-skill page: install commands, rendered SKILL.md, table of contents |
| `scripts/prerender.mjs` | Renders every route to static HTML after the build |

A new skill folder in `skills/` gets a page automatically. Add it to `CATALOG` in `src/content/skills.ts` to give it a group and a summary.
