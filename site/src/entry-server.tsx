import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { AUTHOR, REPO_URL, SITE_NAME, SITE_URL } from './content/site'
import { GROUPS, SKILLS } from './content/skills'
import { DEMOS } from './demos/registry'
import { headFor } from './head'

// Indexable pages: these get prerendered AND listed in the sitemap.
export const routes = ['/', ...SKILLS.map((s) => `/skills/${s.name}`)]

// Prerendered so a direct visit works on a static host, but noindex and not in the sitemap.
export const demoRoutes: string[] = DEMOS.map((d) => d.path)

// Re-exported so scripts/prerender.mjs (a plain Node script, not part of the Vite graph)
// can build the sitemap, llms.txt, and raw-markdown mirrors from the same data the app uses.
export { AUTHOR, GROUPS, REPO_URL, SITE_NAME, SITE_URL, SKILLS }

export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  return { html, head: headFor(url) }
}
