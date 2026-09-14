// Renders every route to static HTML, then writes the SEO and agent-facing files that sit
// alongside it: sitemap.xml, per-page JSON-LD, raw *.md mirrors of every skill, and
// llms.txt / llms-full.txt (see https://llmstxt.org) so agents can fetch content directly.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const serverDir = join(root, 'dist-server')

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const { render, routes, SKILLS, GROUPS, SITE_URL, SITE_NAME, REPO_URL, AUTHOR } = await import(
  pathToFileURL(join(serverDir, 'entry-server.js')).href
)

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')
const meta = (attr, key, content) => `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`

function headTags(head) {
  const url = `${SITE_URL}${head.path}`
  const image = `${SITE_URL}/og-image.png`
  const tags = [
    `<title>${escapeText(head.title)}</title>`,
    meta('name', 'description', head.description),
    // Skip canonical on pages we tell crawlers not to index (404): there's no real URL to point to.
    head.index ? `<link rel="canonical" href="${url}" />` : '',
    meta('name', 'robots', head.index ? 'index, follow' : 'noindex, follow'),

    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:type', head.type),
    meta('property', 'og:url', url),
    meta('property', 'og:title', head.title),
    meta('property', 'og:description', head.description),
    meta('property', 'og:image', image),
    meta('property', 'og:image:width', '1200'),
    meta('property', 'og:image:height', '630'),
    meta('property', 'og:locale', 'en_US'),

    meta('name', 'twitter:card', 'summary_large_image'),
    meta('name', 'twitter:title', head.title),
    meta('name', 'twitter:description', head.description),
    meta('name', 'twitter:image', image),

    // Escape "<" so a field that ever contains "</script>" can't break out of the tag.
    ...head.jsonLd.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`),
  ]
  return tags.filter(Boolean).join('\n    ')
}

function page(url) {
  const { html, head } = render(url)
  return template.replace('<!--app-head-->', headTags(head)).replace('<!--app-html-->', html)
}

for (const url of routes) {
  const file = url === '/' ? join(dist, 'index.html') : join(dist, url, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(url))
  console.log(`  ${url}`)
}

writeFileSync(join(dist, '404.html'), page('/404'))
console.log('  /404.html (noindex)')

// --- Raw markdown mirrors ---------------------------------------------------
// Same content as GitHub, served from the site's own domain so an agent can `curl` a skill
// without leaving skills.heyaviral.com. Path mirrors the HTML route with a .md extension
// (the llms.txt convention), so it never collides with the route's own /skills/<name>/ folder.
for (const skill of SKILLS) {
  const file = join(dist, 'skills', `${skill.name}.md`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, skill.raw)
}
console.log(`  ${SKILLS.length} raw skills/*.md mirrors`)

// --- sitemap.xml -------------------------------------------------------------
const urlEntries = routes
  .map((path) => {
    const priority = path === '/' ? '1.0' : '0.8'
    return `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`
  })
  .join('\n')
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`,
)
console.log('  /sitemap.xml')

// --- llms.txt & llms-full.txt (https://llmstxt.org) --------------------------
const groupSections = GROUPS.map((group) => {
  const skills = SKILLS.filter((s) => s.group === group.id)
  if (!skills.length) return ''
  const items = skills.map((s) => `- [${s.name}](${SITE_URL}/skills/${s.name}.md): ${s.summary}`).join('\n')
  return `## ${group.title}\n\n${items}`
}).filter(Boolean)

const llmsTxt = `# ${SITE_NAME}

> Agent skills for how interfaces behave — states, failures, flows, focus, and recovery — not just how they look. ${SKILLS.length} skills, each producing a concrete artifact (a state matrix, an action spec, a focus map, and so on). Start with feature-completeness; it routes every gap it finds to the skill that fixes it.

Install the whole pack: \`npx skills add ${REPO_URL.replace('https://github.com/', '')}\`. Full instructions: ${SITE_URL}/

${groupSections.join('\n\n')}

## Optional

- [Source and contributing guide](${REPO_URL})
- [Every skill's full content in one file](${SITE_URL}/llms-full.txt)
- Author: ${AUTHOR.name} (${AUTHOR.site})
`
writeFileSync(join(dist, 'llms.txt'), llmsTxt)
console.log('  /llms.txt')

const llmsFullTxt = SKILLS.map((s) => `<!-- ${SITE_URL}/skills/${s.name} -->\n\n${s.raw}`).join('\n\n---\n\n')
writeFileSync(join(dist, 'llms-full.txt'), `# ${SITE_NAME} — full content\n\n${llmsFullTxt}\n`)
console.log('  /llms-full.txt')

rmSync(serverDir, { recursive: true, force: true })
console.log(`\nPre-rendered ${routes.length + 1} pages, ${SKILLS.length} markdown mirrors, sitemap, and llms.txt.`)
