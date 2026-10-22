---
name: Interface Skills
description: Small, focused agent skills, presented under one photograph of dawn over fog-filled ridges.
colors:
  paper: "#f6f5f2"
  surface: "#ffffff"
  well: "#eeede8"
  ink: "#17150f"
  ink-2: "#4b4840"
  ink-3: "#6c685e"
  line: "#e2e0d9"
  line-strong: "#c9c6bc"
  accent: "#9a5f17"
  accent-ink: "#ffffff"
  accent-soft: "#f4e8d5"
  danger: "#b8321f"
  danger-soft: "#fdeeeb"
  warn: "#975800"
  warn-soft: "#fdf3e2"
  ok: "#2f6b3f"
  paper-dark: "#11100d"
  surface-dark: "#1a1915"
  well-dark: "#151410"
  ink-dark: "#efede6"
  ink-2-dark: "#b7b3a8"
  ink-3-dark: "#918d82"
  line-dark: "#27251f"
  line-strong-dark: "#38352d"
  accent-dark: "#e7b46b"
  accent-ink-dark: "#1a1206"
  accent-soft-dark: "#2b2215"
  danger-dark: "#ff8a78"
  danger-soft-dark: "#2a1614"
  warn-dark: "#f0b653"
  warn-soft-dark: "#2a2010"
  ok-dark: "#8fd19e"
  photo-ink: "#17140f"
  photo-ink-2: "#3d3324"
  photo-dawn: "#e9c79d"
typography:
  display:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7.2vw, 5.75rem)"
    fontWeight: 520
    lineHeight: 0.98
    letterSpacing: "-0.04em"
    fontFeature: "'ss01' on"
  headline:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.6vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline-sm:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.8vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  body-sm:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
  command:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5rem
rounded:
  xs: "3px"
  sm: "5px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  pill: "9999px"
spacing:
  gutter: "20px"
  gutter-wide: "32px"
  column-gap: "32px"
  row: "28px"
  row-wide: "36px"
  group: "64px"
  group-wide: "80px"
  section: "96px"
  section-wide: "128px"
  container: "76rem"
components:
  command-pill:
    backgroundColor: "rgb(255 252 247 / 0.82)"
    textColor: "{colors.photo-ink}"
    typography: "{typography.command}"
    rounded: "{rounded.pill}"
    padding: "6px 6px 6px 20px"
  command-pill-button:
    backgroundColor: "rgb(23 20 15 / 0.06)"
    textColor: "{colors.photo-ink}"
    rounded: "{rounded.pill}"
    padding: "0 16px"
    height: "40px"
  command-pill-button-hover:
    backgroundColor: "rgb(23 20 15 / 0.11)"
  copy-button:
    textColor: "{colors.ink-3}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "32px"
  copy-button-hover:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
  copy-button-accent:
    textColor: "{colors.accent}"
    rounded: "{rounded.md}"
    padding: "0 8px"
    height: "32px"
  copy-button-accent-hover:
    backgroundColor: "{colors.accent-soft}"
  install-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.command}"
    rounded: "{rounded.xl}"
    padding: "14px 16px 12px"
  install-tab:
    textColor: "{colors.ink-3}"
    padding: "10px"
  install-tab-active:
    textColor: "{colors.ink}"
  skill-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "36px 0"
  skill-row-arrow:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.pill}"
    size: "40px"
  skill-row-arrow-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  nav-link:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  nav-link-hover:
    textColor: "{colors.ink}"
---

# Design System: Interface Skills

## Overview

**Creative North Star: "Dawn Over the Ridge"**

One photograph carries the whole promise, and everything else steps back. The landing opens on a full-bleed golden-hour photograph of sunrise over fog-filled ridges ("Golden sunrise illuminates a foggy mountain landscape" by Zetong Li, Unsplash MaeshPdBGV4, Unsplash License; served from `site/public/hero/` at 640, 1280 and 2400 widths in WebP and JPEG, with provenance embedded in the JPEGs and in `.webp.json` sidecars). Below the photograph the page becomes a quiet ground: stone white in light scheme, warm charcoal in dark, near-black ink, and hairline rules. One dawn-amber accent, sampled from the photograph, is spent sparingly on focus, hover rules, the active tab, and selection.

The type is one grotesk, Schibsted Grotesk, at regular to medium weight with tight display tracking. Large headlines stay at regular weight; hierarchy comes from size and tracking, not from bold. JetBrains Mono appears only where the reader would type: install commands. Density is low. Sections breathe on 96 to 128px of vertical space, and the skill index is a ruled list, not a card grid.

This world replaces an illustrated garden world that the user rejected as childish. The pinned direction is "minimal and elegant over a real photograph". The skill pages (`site/src/pages/SkillPage.tsx`) were not redesigned; they inherit this system's tokens, header, footer, copy button, and install block, and render SKILL.md through the `.doc` prose styles.

**Key Characteristics:**
- One real photograph, full bleed, used once on the hero and nowhere else on the page.
- Stone and charcoal neutrals with a warm cast; never pure white or pure black grounds.
- A single dawn-amber accent, rare by design.
- One grotesk at regular to medium weight; mono reserved for commands.
- Hairline rules and tonal steps for structure; soft, low shadows only on the two floating command surfaces.
- Motion eases out on one exponential curve and always respects reduced motion.

## Colors

A warm, desaturated stone palette that borrows its single accent from the sunrise in the photograph.

### Primary
- **Dawn Amber** (accent; dark scheme Pale Sunrise, accent-dark): the only chromatic voice. Focus rings (2px outline, 3px offset), the hairline that draws under a hovered skill row, the active install-tab underline, the accent copy button, the logo's sun, inline-code links in prose, and text selection at 24% mix. In dark scheme it lifts to a pale gold so it reads on charcoal.
- **Dawn Wash** (accent-soft): hover fill behind the accent copy button only.
- **Accent Ink** (accent-ink): text on a filled accent surface.

### Neutral
- **Stone Paper** (paper / paper-dark): the page ground below the hero. The hero's bottom gradient fades the fog into this exact value, so the photograph lands on the page without a seam.
- **Surface White** (surface / surface-dark): the install block and hovered skill-page link cards; the only surface lifted above paper.
- **Well** (well / well-dark): inline code and the muted copy button's hover fill.
- **Ink** (ink / ink-dark): headlines, skill names, active states, and the filled row arrow on hover.
- **Ink 2** (ink-2): body copy, row summaries, nav links at rest.
- **Ink 3** (ink-3): metadata, captions, group counts, inactive tabs, prompt glyphs.
- **Hairline** (line): every rule, divider, and border at rest.
- **Strong Hairline** (line-strong): hover borders, blockquote rules, scrollbar thumbs.

### Photo Ink
- **Photo Ink** (photo-ink) and **Photo Ink 2** (photo-ink-2): the type on the photograph. The hero headline, supporting line, command pill, and the transparent overlay header keep this dark ink in both color schemes, because the photograph is bright in both.
- **Photo Dawn** (photo-dawn): the hero's background color while the photograph loads, matched to its average tone.

### Status
- **Danger, Warn, Ok** (danger, warn, ok and their soft and dark variants): reserved for state feedback. Ok colors the "Copied" confirmation; warn colors a failed copy. They are never decorative.

### Named Rules
**The One Sunrise Rule.** Dawn Amber is the only chromatic color in the interface. It marks focus, hover, active, and selection; it never fills a block, a card, or a section.

**The Photo Keeps Its Own Ink Rule.** Anything set on the photograph uses Photo Ink in both schemes. Never let a scheme-switching token flip text on the photograph to light.

## Typography

**Display Font:** Schibsted Grotesk Variable (with ui-sans-serif, system-ui)
**Body Font:** Schibsted Grotesk Variable
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SFMono-Regular, Menlo, Consolas), commands only

**Character:** One newsy, slightly condensed grotesk carries every role, kept light in weight and tight in tracking so large lines feel calm rather than loud. Stylistic set `ss01` is on site-wide.

### Hierarchy
- **Display** (400, clamp(2.75rem, 7.2vw, 5.75rem), 0.98, -0.04em): the hero headline only, centered in the sky, max 15ch, balanced.
- **Headline** (400, clamp(2.25rem, 4.6vw, 3.5rem), 1.02, -0.035em): section openers, max 18ch. A smaller step (clamp(2rem, 3.8vw, 2.75rem), 1.05) heads secondary sections such as the install section.
- **Title** (500, 2rem, 1.5rem below 640px, -0.03em): skill names in the index. Skill names are words, set in the grotesk.
- **Lead** (400, 1.1875rem, relaxed): the hero supporting line, kept to one short sentence ("Small, focused skills for your coding agent.").
- **Body** (400, 1.0625rem, 1.625): section copy, max 44 to 46ch; prose on skill pages at 1.7 line-height, max 72ch.
- **Body Small** (400, 1rem, snug): skill-row summaries, max 52ch.
- **Label** (500, 0.9375rem): group titles, header wordmark (600), text links. Tabs and buttons drop to 0.8125 to 0.875rem at 500.
- **Caption** (400, 0.8125 to 0.875rem): "Produces ..." lines, group blurbs, footer notes, in Ink 3.
- **Command** (JetBrains Mono, 0.875rem, 1.5rem line): install commands, with ligatures off and a muted `$` prompt.

### Named Rules
**The Regular Weight Rule.** Section headlines above 2.5rem are set at weight 400. The hero display alone sits a touch firmer at 520 so it holds against the photograph. Size and negative tracking make the hierarchy; bold does not.

**The Mono Means Type-This Rule.** Monospace is used only for text the reader copies into a terminal. Names, titles, and labels are set in the grotesk.

## Layout

A single centered container (max 76rem) with 20px side gutters, 32px from 640px up. The hero fills the viewport (min of 38rem or 100svh) and centers its stack in the sky at clamp(8rem, 22vh, 13rem) from the top: headline, one supporting line, then the command pill. Nothing else sits in the first viewport besides the transparent header.

Below the hero, sections run on 96px vertical padding (128px from 1024px). Content uses a two-column ruled grid from 768px: a 21rem left column for names and group titles and a fluid right column for descriptions, with a 32px gap; from 1280px a 8.5rem photograph window column and an action column follow. Section intros and group blurbs sit in the same right column so the page has one consistent inner left edge. Groups separate on 64px (80px wide). Skill rows pad 28px vertically (36px from 768px). The install section splits into two equal columns from 1024px. Below 480px the command pill stacks its command over a full-width copy button.

## Elevation & Depth

The system is flat and ruled. Structure comes from hairlines and from the paper/surface/well tonal steps. Depth in the hero comes from the photograph itself: a soft parallax (scroll at 0.32x, pointer drift up to 14px, eased) and a slight settle-in zoom on load. Two floating command surfaces carry a soft, low, warm shadow; nothing else lifts. The sticky header gains a translucent paper fill with backdrop blur and a hairline once the page scrolls.

### Shadow Vocabulary
- **Dawn Float** (`box-shadow: 0 1px 2px rgb(60 40 10 / 0.08), 0 20px 44px -22px rgb(60 40 10 / 0.5)`): the command pill on the photograph; warm-tinted to sit in the light.
- **Quiet Lift** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.08)`): the install block on paper.

### Named Rules
**The Ruled Not Raised Rule.** Lists and sections separate with 1px hairlines. Shadows belong only to a surface that holds a command to copy.

## Shapes

Shapes are soft and quiet. Pills (full radius) for the hero command pill, its button, and the round row arrow. Containers round at 12px (install block, skill-page link cards); the photograph windows at 8px; buttons, nav links and the focus ring at 4 to 6px; inline code at 5px. Every border is 1px. The logo is a sun disc clipped by a horizon bar, and the skill-index photograph windows open from their horizon line (a clip from the vertical center outward), so the horizon is the system's one recurring geometry.

## Components

### Buttons
Refined and restrained; they show their action in a word.
- **Shape:** gently rounded (6px) for in-page copy buttons; full pill on the photograph.
- **Hero copy (primary):** a soft tint of Photo Ink (6%, 11% on hover) with Photo Ink text, 40px tall, inside the command pill. It is deliberately light so the command, not the button, carries the pill. Press scales to 0.96.
- **Copy button, muted:** 32px tall, Ink 3 text with a 15px Copy icon; hover fills Well and darkens to Ink.
- **Copy button, accent:** Dawn Amber text; hover fills Dawn Wash. Used in the install block header.
- **Feedback:** every copy control on the site uses one morphing glyph (`CopyIcon`): the back sheet slides away, the front sheet folds to nothing, and a tick draws itself in its place (stroke-dashoffset, about 420ms on the page's ease), then reverses. A failure swaps in an alert in Warn, the label changes to "Copied" or "Select and copy", a polite status is announced, and the copied text gets a brief amber highlight that fades over 900ms.

### Hero Headline (signature)
"Teach your agent the parts it skips." in Display type at 520, Photo Ink, centered in the sky. The last word acts out its meaning: the letters of "skips." hop in a 55ms stagger (0.14em up with a slight tilt, 720ms) once, just after the photograph settles, and again whenever the pointer enters the word. Screen readers get the plain word; reduced motion keeps it still.

### Command Pill (signature)
A slim single-line pill on the photograph: translucent warm white (82%, 92% on hover) with a 70% white border, a 2px backdrop blur, the Dawn Float shadow, a muted amber `$`, the command in mono, and the soft-tint copy button. It sizes to its content (no fixed width), and its copy button fits its label exactly, so "Copy" and "Copied" each take only the room they need. Below 480px it becomes a full-width 20px-radius stack.

### Install Block
A Surface White panel (12px radius, hairline border, Quiet Lift shadow). A header row holds text tabs (Ink 3, active Ink) with a 2px Dawn Amber underline that slides between tabs, and the accent copy button. The body is a mono command list with muted prompts; commands wrap only at spaces or after a slash. Switching tabs morphs the panel: its height glides to the new content (480ms, measured with a ResizeObserver) while the content comes into focus from a 6px blur, a 6px rise, and a 0.985 scale (460ms). Reduced motion keeps only a fade.

### Skill Index (signature)
A ruled list. Each row: the skill name in Title type, a summary and a "Produces ..." caption, then the copy action and a 40px round arrow. On hover or focus-within: the name shifts 8px right, the summary darkens to Ink, a Dawn Amber hairline draws in along the bottom rule from the left (700ms), the arrow fills Ink and turns 45 degrees, and the copy action fades in. No image or card appears on hover. On touch devices the copy action is always shown. Hyphens in summaries are non-breaking so compound terms stay whole. The whole row is the link.

### Navigation
A sticky 56px header. Over the hero it is transparent and uses Photo Ink; once scrolled it takes an 85% paper fill with backdrop blur and a hairline. Wordmark at 600 weight with the horizon logo, whose sun rises 3px on hover. Nav links are Ink 2 at 0.875rem, darken to Ink on hover, and draw an underline in from the left. On the home page the Skills link glides to the index with smooth scrolling (instant under reduced motion). The footer is one sleek hairline-topped row: wordmark with the author credit, the Source / Contribute / Issues links with small up-right arrows, and the copyright and license. The photograph is not credited on the page (the Unsplash License does not require it); its provenance lives in the files and this document. It stacks on narrow screens.

### Text Links
Underlines draw in from the left over 320ms on hover and focus (1px, currentColor). Prose links on skill pages use a Strong Hairline underline that turns Dawn Amber on hover.

## Do's and Don'ts

### Do:
- **Do** let the photograph be the only image on the landing; don't echo it in hover cards or add new imagery.
- **Do** keep Dawn Amber to focus, hover rules, the active tab, selection, and the logo sun.
- **Do** set every line on the photograph in Photo Ink, in both color schemes.
- **Do** separate content with 1px hairlines and the paper/surface/well tonal steps.
- **Do** ease motion on cubic-bezier(0.16, 1, 0.3, 1) and give every animation a reduced-motion fallback.
- **Do** carry provenance (author, source URL, license) on every shipped photograph and generated raster.

### Don't:
- **Don't** use illustration, saturated color fills, tilted or rotated cards, or toy-like motifs; the user rejected an illustrated garden world as childish and pinned "minimal and elegant" over a real photograph.
- **Don't** add a second accent color or fill a section, card, or button background with amber.
- **Don't** set headlines bold; large type stays at weight 400.
- **Don't** use monospace for names, titles, or labels; mono is for commands only.
- **Don't** put hard offset shadows or heavy elevation on cards; only the two command surfaces float.
- **Don't** turn the skill index into a card grid.
