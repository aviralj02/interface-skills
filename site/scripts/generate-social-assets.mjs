// Renders the favicon PNGs, apple-touch-icon, and og-image.png from real HTML/CSS with the
// project's own fonts, using a local Chrome — so the output matches the shipped design exactly
// instead of being redrawn by hand in an image editor.
//
// Not part of `npm run build`: it needs a Chrome/Chromium binary on the machine that runs it,
// and its output (site/public/*.png) is committed, so CI and other contributors never need to
// run it. Re-run it only when the logo, palette, or OG copy changes:
//
//   node scripts/generate-social-assets.mjs
//
// Chrome is located via $PUPPETEER_EXECUTABLE_PATH, or the common install paths below.
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const pub = join(root, 'public')
const fonts = join(root, 'node_modules/@fontsource-variable')

function findChrome() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH
  const candidates = [
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ]
  const found = candidates.find(existsSync)
  if (!found) {
    throw new Error('No Chrome/Chromium found. Set PUPPETEER_EXECUTABLE_PATH to a browser binary and re-run.')
  }
  return found
}

// Embedded as base64 data URIs rather than file:// URLs: Chrome blocks a non-file:// document
// (which is what page.setContent() produces) from loading file:// sub-resources, so an
// @font-face pointing at a local path fails silently and the image falls back to a serif default.
const fontFace = (family, file, weight = '400 900') => `
  @font-face {
    font-family: '${family}';
    src: url('data:font/woff2;base64,${readFileSync(join(fonts, file)).toString('base64')}') format('woff2');
    font-weight: ${weight};
  }
`

const FONTS = /* css */ `
  ${fontFace('Schibsted Grotesk Variable', 'schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2')}
  ${fontFace('JetBrains Mono Variable', 'jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')}
`

// Same 4-square mark as SiteChrome.tsx's <Logo>, at a given pixel size.
const logo = (size, { ink = '#111315', accent = '#2f5fe0', gapOpacity = 0.3 } = {}) => `
  <svg width="${size}" height="${size}" viewBox="0 0 32 32">
    <rect x="3" y="3" width="11" height="11" rx="2.5" fill="${ink}" />
    <rect x="18" y="3" width="11" height="11" rx="2.5" fill="${ink}" opacity="${gapOpacity}" />
    <rect x="3" y="18" width="11" height="11" rx="2.5" fill="${ink}" opacity="${gapOpacity}" />
    <rect x="18" y="18" width="11" height="11" rx="2.5" fill="${accent}" />
  </svg>
`

async function shoot(browser, { html, width, height, out, transparent = false }) {
  const page = await browser.newPage()
  // 1x: favicons and the apple-touch-icon must be exactly their declared pixel size, and
  // the OG image's declared og:image:width/height must match the real file.
  await page.setViewport({ width, height, deviceScaleFactor: 1 })
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${FONTS}</style></head><body>${html}</body></html>`, {
    waitUntil: 'networkidle0',
  })
  await page.evaluate(() => document.fonts.ready)
  mkdirSync(dirname(out), { recursive: true })
  await page.screenshot({ path: out, omitBackground: transparent })
  await page.close()
  console.log('  wrote', out.replace(root + '\\', '').replace(root + '/', ''))
}

const resetCss = `* { margin: 0; padding: 0; box-sizing: border-box; } body { -webkit-font-smoothing: antialiased; }`

async function main() {
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true })

  // --- Favicons & app icons: the mark alone, transparent, at its native proportions ---
  for (const size of [32, 192, 512]) {
    const out = size === 32 ? join(pub, 'favicon-32.png') : join(pub, 'icons', `icon-${size}.png`)
    await shoot(browser, {
      width: size,
      height: size,
      transparent: true,
      out,
      html: `<style>${resetCss} body{width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;}</style>${logo(size)}`,
    })
  }

  // --- Apple touch icon: opaque paper background, Apple applies its own corner mask ---
  await shoot(browser, {
    width: 180,
    height: 180,
    out: join(pub, 'apple-touch-icon.png'),
    html: `<style>${resetCss} body{width:180px;height:180px;background:#fcfcfb;display:flex;align-items:center;justify-content:center;}</style>${logo(120)}`,
  })

  // --- OG / Twitter card: the specimen-sheet idea in one frame, 1200x630 ---
  const tile = (inner) => `
    <div style="background:#ffffff;border:1px solid #e4e6e9;border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px;">
      <div style="font:600 12px 'Schibsted Grotesk Variable';color:#111315;">Team</div>
      ${inner}
    </div>
  `
  const row = (name, initials, bg, fg) => `
    <div style="display:flex;align-items:center;gap:6px;">
      <span style="width:16px;height:16px;border-radius:50%;background:${bg};color:${fg};font:700 7px 'Schibsted Grotesk Variable';display:flex;align-items:center;justify-content:center;">${initials}</span>
      <span style="font:400 10px 'Schibsted Grotesk Variable';color:#111315;">${name}</span>
    </div>
  `
  const ogHtml = `
    <style>
      ${resetCss}
      body {
        width: 1200px; height: 630px; background: #fcfcfb; padding: 64px;
        display: flex; flex-direction: column; justify-content: space-between;
        font-family: 'Schibsted Grotesk Variable';
      }
    </style>
    <div style="display:flex;align-items:center;gap:10px;">
      ${logo(26)}
      <span style="font:600 19px 'Schibsted Grotesk Variable';color:#111315;letter-spacing:-0.01em;">Interface Skills</span>
    </div>

    <div style="display:flex;align-items:center;gap:56px;">
      <div style="max-width:600px;">
        <h1 style="font:600 66px/1.04 'Schibsted Grotesk Variable';letter-spacing:-0.04em;color:#111315;">Beyond the<br/>happy path.</h1>
        <p style="margin-top:20px;font:400 22px/1.5 'Schibsted Grotesk Variable';color:#4c5258;max-width:520px;">UI patterns teach how interfaces look. These 12 agent skills teach how they behave.</p>
        <div style="margin-top:28px;display:inline-flex;align-items:center;gap:10px;background:#111315;color:#fcfcfb;border-radius:8px;padding:12px 16px;font:400 17px 'JetBrains Mono Variable';">
          <span style="color:#9aa1a6;">$</span> npx skills add aviralj02/interface-skills
        </div>
      </div>

      <div style="background:#f2f3f4;border-radius:16px;padding:16px;display:grid;grid-template-columns:1fr 1fr;gap:10px;width:400px;">
        ${tile(
          row('Ana Ruiz', 'AR', '#dfe7ff', '#2748a8') + row('Sam Okafor', 'SO', '#e3f1e8', '#23603c') + row('Priya Nair', 'PN', '#f6e9dc', '#7a4a17'),
        )}
        <div style="background:#ffffff;border:1px dashed #cfd3d7;border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px;">
          <div style="font:600 12px 'Schibsted Grotesk Variable';color:#686e75;">Team</div>
          <div style="flex:1;display:flex;align-items:center;justify-content:center;font:400 10px 'Schibsted Grotesk Variable';color:#686e75;">Not handled</div>
        </div>
        ${tile(`<div style="background:#fdeeeb;border-radius:6px;padding:8px;font:500 10px 'Schibsted Grotesk Variable';color:#b8321f;">Couldn't load members</div>`)}
        ${tile(row('Sam Okafor', 'SO', '#e3f1e8', '#23603c') + `<div style="font:400 9px 'Schibsted Grotesk Variable';color:#686e75;">+ 1,284 more</div>`)}
      </div>
    </div>

    <div style="font:400 16px 'Schibsted Grotesk Variable';color:#686e75;">skills.heyaviral.com &middot; 12 agent skills for interface behavior</div>
  `
  await shoot(browser, { width: 1200, height: 630, out: join(pub, 'og-image.png'), html: ogHtml })

  await browser.close()
}

await main()
