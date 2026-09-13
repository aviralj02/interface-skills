// Renders every route to static HTML so the site works on any static host.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const serverDir = join(root, 'dist-server')

const template = readFileSync(join(dist, 'index.html'), 'utf8')
const { render, routes } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href)

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function page(url) {
  const { html, head } = render(url)
  const tags = [
    `<title>${escape(head.title)}</title>`,
    `<meta name="description" content="${escape(head.description)}" />`,
    `<meta property="og:title" content="${escape(head.title)}" />`,
    `<meta property="og:description" content="${escape(head.description)}" />`,
    `<meta property="og:type" content="website" />`,
  ].join('\n    ')
  return template.replace('<!--app-head-->', tags).replace('<!--app-html-->', html)
}

for (const url of routes) {
  const file = url === '/' ? join(dist, 'index.html') : join(dist, url, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, page(url))
  console.log(`  ${url}`)
}

writeFileSync(join(dist, '404.html'), page('/404'))
console.log('  /404.html')

rmSync(serverDir, { recursive: true, force: true })
console.log(`Pre-rendered ${routes.length + 1} pages.`)
