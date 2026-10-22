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

// Same horizon mark as SiteChrome.tsx's <Logo>: a sun half-risen over a line.
const logo = (size, { ink = '#17150f', sun = '#9a5f17' } = {}) => `
  <svg width="${size}" height="${size}" viewBox="0 0 32 32">
    <defs><clipPath id="h"><rect x="0" y="0" width="32" height="20" /></clipPath></defs>
    <circle cx="16" cy="20" r="9" fill="${sun}" clip-path="url(#h)" />
    <rect x="3" y="21.5" width="26" height="2" rx="1" fill="${ink}" />
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
    html: `<style>${resetCss} body{width:180px;height:180px;background:#f6f5f2;display:flex;align-items:center;justify-content:center;}</style>${logo(120)}`,
  })

  // --- OG / Twitter card: the hero itself, the dawn photograph with the punchline and command, 1200x630 ---
  // Photograph: "Golden sunrise illuminates a foggy mountain landscape" by Zetong Li (Unsplash, MaeshPdBGV4).
  const photo = `data:image/jpeg;base64,${readFileSync(join(pub, 'hero', 'dawn-1280.jpg')).toString('base64')}`
  const ogHtml = `
    <style>
      ${resetCss}
      body {
        width: 1200px; height: 630px; position: relative; overflow: hidden;
        font-family: 'Schibsted Grotesk Variable'; color: #17140f;
        background: #e9c79d url('${photo}') 50% 62% / cover no-repeat;
        display: flex; flex-direction: column; align-items: center; text-align: center;
      }
      .glow { position: absolute; inset: 0; background: radial-gradient(60% 50% at 50% 40%, rgb(255 247 236 / 0.6), transparent 70%); }
      .foot { position: absolute; inset: auto 0 0 0; height: 160px; background: linear-gradient(to bottom, transparent, rgb(20 16 10 / 0.3)); }
      .top { position: relative; width: 100%; display: flex; align-items: center; gap: 10px; padding: 40px 56px 0; font: 600 19px 'Schibsted Grotesk Variable'; letter-spacing: -0.01em; }
      h1 { position: relative; margin-top: 74px; font: 500 82px/0.98 'Schibsted Grotesk Variable'; letter-spacing: -0.045em; max-width: 860px; }
      .cmd { position: relative; margin-top: 40px; display: inline-flex; align-items: center; gap: 12px; padding: 10px 10px 10px 24px; border-radius: 999px;
        background: rgb(255 252 247 / 0.88); border: 1px solid rgb(255 255 255 / 0.7); box-shadow: 0 20px 44px -22px rgb(60 40 10 / 0.5);
        font: 400 19px 'JetBrains Mono Variable'; }
      .cmd b { font: 500 16px 'Schibsted Grotesk Variable'; color: #fbf7f0; background: #17140f; border-radius: 999px; padding: 11px 20px; }
      .url { position: absolute; bottom: 34px; font: 400 17px 'Schibsted Grotesk Variable'; color: #fbf3e6; }
    </style>
    <div class="glow"></div>
    <div class="foot"></div>
    <div class="top">${logo(24)} Interface Skills</div>
    <h1>Teach your agent the parts it skips.</h1>
    <div class="cmd"><span style="color:#8a6a3f">$</span> npx skills add aviralj02/interface-skills <b>Copy</b></div>
    <div class="url">skills.heyaviral.com &middot; small, focused agent skills by Aviral Jain</div>
  `
  await shoot(browser, { width: 1200, height: 630, out: join(pub, 'og-image.png'), html: ogHtml })

  await browser.close()
}

await main()
