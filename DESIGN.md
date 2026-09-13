---
name: Interface Skills
description: A state specimen sheet for an open-source pack of agent skills about interface behavior.
colors:
  paper: "#fcfcfb"
  surface: "#ffffff"
  well: "#f2f3f4"
  ink: "#111315"
  ink-2: "#4c5258"
  ink-3: "#686e75"
  line: "#e4e6e9"
  line-strong: "#cfd3d7"
  accent: "#2f5fe0"
  accent-ink: "#ffffff"
  accent-soft: "#eaf0ff"
  danger: "#b8321f"
  danger-soft: "#fdeeeb"
  warn: "#975800"
  warn-soft: "#fdf3e2"
  ok: "#1d7446"
typography:
  display:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "4.25rem"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.04em"
    fontFeature: "'ss01' on"
  headline:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline-mono:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "2.5rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.375
  lead:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.375
  label:
    fontFamily: "Schibsted Grotesk Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
  identifier:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.9375rem"
    fontWeight: 500
    letterSpacing: "-0.01em"
  command:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7143
rounded:
  sm: "4px"
  code: "5px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  full: "9999px"
spacing:
  gutter-mobile: "20px"
  gutter: "32px"
  container: "76rem"
  column-gap: "56px"
  group-gap: "48px"
  section: "80px"
  section-lg: "112px"
  tile-gap: "12px"
  well-inset: "16px"
components:
  specimen-well:
    backgroundColor: "{colors.well}"
    rounded: "{rounded.2xl}"
    padding: "16px"
  specimen-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "12px"
  view-switch:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-3}"
    typography: "{typography.label}"
    rounded: "{rounded.lg}"
    padding: "2px"
  view-switch-option-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "6px 12px"
  install-block:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.command}"
    rounded: "{rounded.xl}"
    padding: "14px 16px 12px"
  install-tab:
    textColor: "{colors.ink-3}"
    typography: "{typography.label}"
    padding: "10px"
  install-tab-active:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "10px"
  copy-button-accent:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 8px"
  copy-button-accent-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.accent}"
  copy-button-muted:
    textColor: "{colors.ink-3}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 8px"
  copy-button-muted-hover:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
  skill-row:
    textColor: "{colors.ink}"
    typography: "{typography.identifier}"
    padding: "18px 0"
  code-block:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "14px 16px"
  inline-code:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.code}"
    padding: "0.1em 0.35em"
  pager-link:
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "16px"
  pager-link-hover:
    backgroundColor: "{colors.surface}"
---

# Design System: Interface Skills

## Overview

**Creative North Star: "The State Specimen Sheet"**

The system is a specimen sheet. The pages lay real interface parts out for inspection, the way a type foundry lays out a face. The ground is near-white paper, or graphite in dark mode. Specimens and code sit in tinted wells with hairline frames, and every exhibit gets a small plain caption. Hierarchy comes from size and weight in one grotesk. Mono only appears where a string is typed into a machine: commands, code, and skill identifiers.

Density is calm and editorial. Sections are separated by full-width hairlines and generous vertical space (80px, 112px on large screens). Indexes are ruled rows, never card grids. The only decorative color is one blue, and it marks what you can act on or what is selected. Red, amber, and green appear only when they report a real state.

Motion has one authored moment: the specimen sheet flips from "Happy path" to "Every state". Missing states come into focus from a blur with a short stagger. Everything else is a quick color change. Both color schemes follow the operating system through `prefers-color-scheme`. There is no manual theme toggle.

**Key Characteristics:**
- Paper ground, tinted wells, white panels, 1px hairlines.
- One blue accent for the primary action, selection, focus, and link hover.
- State colors carry meaning, never decoration.
- A single grotesk (Schibsted Grotesk) for hierarchy; JetBrains Mono for machine strings only.
- Rows over cards for anything that is a list.
- Nearly flat: two whisper shadows, no others.
- One signature motion, with reduced-motion and no-JavaScript fallbacks that show every state immediately.

## Colors

A cool, nearly neutral grayscale on warm-white paper, with one saturated blue and a small set of state hues. Light values live in the Tailwind `@theme`. The dark scheme redefines the same token names under `prefers-color-scheme: dark`, so components never branch on theme.

### Primary
- **Specimen Blue** (accent): the primary action (the "Copy command" control), the selected option in the view switch, the active install-tab underline, the focus ring, text selection (24% mix), and hover color for skill identifiers and links. Dark scheme: `#86a4ff`.
- **Accent Ink** (accent-ink): text on solid blue fills. Dark scheme: `#0b1020`, because the dark accent is light.
- **Accent Wash** (accent-soft): the hover background of accent-toned ghost buttons. Dark scheme: `#19223b`.

### Tertiary (state colors)
- **Failure Red** (danger) on **Failure Wash** (danger-soft): error states, such as the failed-request specimen. Dark: `#ff8a78` on `#2a1614`.
- **Caution Amber** (warn) on **Caution Wash** (warn-soft): warnings, such as the copy-failed feedback. Dark: `#f0b653` on `#2a2010`.
- **Confirm Green** (ok): success feedback, such as "Copied". Dark: `#62d49c`.

### Neutral
- **Paper** (paper): the page ground and the translucent sticky header (85% with backdrop blur). Dark: `#0e1012`.
- **Surface** (surface): raised interactive panels on a well or on paper, including install blocks, specimen panels, the compose tree, and hovered pager links. Dark: `#1a1d21`.
- **Well** (well): the inset tint that holds exhibits, including the specimen sheet, code blocks, inline code, the compose section band, and skeleton bars. Dark: `#141619`, darker than surface, so wells stay recessed.
- **Ink** (ink): headings, identifiers, and primary text. Dark: `#eceef0`.
- **Ink 2** (ink-2): body prose, subheads, and captions. Dark: `#adb3b9`.
- **Ink 3** (ink-3): metadata, inactive tabs, list markers, and prompt glyphs. Dark: `#8b9299`.
- **Hairline** (line): every border and section divider. Dark: `#24282c`.
- **Strong Hairline** (line-strong): table header rules, blockquote rules, link underlines at rest, the dashed "Not handled" frame, and scrollbar thumbs. Dark: `#343a40`.

### Named Rules
**The One Blue Rule.** Blue marks the primary action, the current selection, focus, and link hover, and nothing else. It never fills a section, a heading, or an illustration. Solid blue fills appear only on a selected control or on a specimen's own primary button.

**The State-Colors-Report-State Rule.** Red, amber, and green appear only when something is actually in that state: inside a specimen, or as live feedback from a control (Copied, copy failed). They are never used as category colors or decoration.

**The Recessed Well Rule.** Exhibits sit in the well tint. Interactive panels placed on a well use the surface color. In both schemes the well is darker than the surface.

## Typography

**Display Font:** Schibsted Grotesk Variable (with ui-sans-serif, system-ui)
**Body Font:** Schibsted Grotesk Variable, with stylistic set `ss01` on for the whole page
**Label/Mono Font:** JetBrains Mono Variable (with ui-monospace, SFMono-Regular, Menlo, Consolas), ligatures off in code

**Character:** A compact, slightly editorial grotesk that carries every level of hierarchy through size and weight, paired with a mono that signals copyable text.

### Hierarchy
- **Display** (600, 2.75rem, then 3.75rem at sm and 4.25rem at xl, line-height 1.02, -0.04em): the home headline only. Balanced wrapping.
- **Headline** (600, 1.875rem, then 2.25rem at sm, leading tight, -0.025em): home section headings and the not-found heading (2rem).
- **Headline Mono** (mono 500, 1.875rem, then 2.5rem at sm, -0.03em, breaks anywhere): the skill-page title, because the title is a skill identifier.
- **Title** (600, 1.625rem, -0.015em): h2 in rendered SKILL.md. Sits under a hairline with 32px of padding above.
- **Subtitle** (600, 1.1875rem, snug): h3 in rendered SKILL.md.
- **Lead** (400, 1.1875rem to 1.25rem, relaxed or snug, ink-2): the subhead under a page title, capped at 42 to 48ch.
- **Body** (400, 1.0625rem): section intros at line-height 1.625. Rendered SKILL.md prose uses 1.7 at a 72ch measure.
- **Body Small** (400, 0.9375rem to 0.875rem, snug): skill summaries, group blurbs, tables, nav, and breadcrumbs.
- **Label** (500, 0.8125rem, sentence case): tabs, the view switch, state captions, small section labels ("Per feature", "On this page"), and copy controls.
- **Identifier** (mono 500, 0.9375rem, -0.01em): skill names in rows, pager links, and suggestions. The lead skill row enlarges to 1.25rem, then 1.375rem.
- **Command** (mono 400, 0.875rem, 24px line): install commands. Code blocks use 0.8125rem at 1.65, and language labels use 0.75rem.

### Named Rules
**The Machine String Rule.** Mono is only for text a person would type or paste: commands, code, file-like skill identifiers, and code-language labels. Prose, labels, and headings never use mono.

**The Sentence-Case Label Rule.** Small labels are sentence case at 0.8125rem weight 500. The system has no uppercase tracked labels.

## Layout

Content sits in a centered container (max 76rem) with 20px gutters, widening to 32px at sm. The home page uses asymmetric two-column grids at lg: the hero is 0.85fr text and 1.15fr specimen sheet, the compose section is 0.8fr and 1.2fr, and install is 1:1. Column gaps are 56px. Below lg every grid stacks, with the specimen sheet under the install command.

Sections are full-bleed bands divided by a top hairline, with 80px of vertical padding (96px to 112px at lg). Alternate bands can take the well tint. The skill index pairs a 15rem group column with a row list at lg. Groups are 48px apart. Rows use a three-column grid (18rem identifier, summary, arrow) that collapses to identifier-over-summary on small screens.

The specimen sheet is a 3-column grid at lg and 2 columns below. Gaps are 10px, or 12px from sm up, and every tile has a minimum height of 9.75rem. Skill pages use a 1fr / 30rem header grid and a 1fr / 13rem reading grid with a sticky table of contents (top 80px). Below lg the table of contents becomes a collapsible `details` panel. Anchor jumps respect a 5rem scroll padding under the 56px sticky header.

## Elevation & Depth

Depth comes from tone, not shadow. The paper, well, and surface colors create layers, and hairlines outline each layer. Only two shadows exist. Both are nearly invisible and neither changes on interaction.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.04)`): specimen panels and the compose tree panel, which sit on a tinted well.
- **Command Lift** (`box-shadow: 0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px -12px rgb(0 0 0 / 0.08)`): the install block only, the primary action.

### Named Rules
**The Near-Flat Rule.** Shadows are limited to the two values above and are never used for hover feedback. Hover feedback changes color, border strength, or background.

## Shapes

Corners are gently and consistently rounded, and the radius scales with the size of the container. Inner controls use 6px, specimen panels and the view-switch track use 8px, install blocks, code blocks, pager links, and the mobile table of contents use 12px, and the specimen well uses 16px. Inline code uses 5px. Focus rings round to 4px. Avatars and tab underlines are fully round. Every border is 1px solid hairline. The one exception is the dashed Strong Hairline frame of a "Not handled" placeholder, which reads as a missing part. The logo is a 2×2 grid of rounded squares: one ink, two ink at 30%, and one blue in the bottom-right corner.

## Components

### Buttons
Quiet, text-weight controls. The system has no large filled call-to-action button.
- **Shape:** 6px radius, 32px tall for copy controls.
- **Accent ghost (Copy command):** blue label and a 15px lucide icon at stroke 1.75. Hover adds the accent wash. On small screens the label is visually hidden but still read by screen readers.
- **Muted ghost (Copy code, Copy SKILL.md):** ink-3 label. Hover adds the well background and ink text.
- **Feedback:** the label swaps to "Copied" (ok) or "Select and copy" (warn) for 2 seconds, and a live region announces the result. Color transitions take 150ms.
- **Text links as actions:** 500-weight ink with a trailing arrow icon. Hover turns them blue.

### View Switch (signature)
A segmented radio group: a 2px-padded surface track with an 8px radius and a hairline border. The selected option is solid blue with accent-ink text. Unselected options are ink-3 and turn ink on hover. Arrow keys move the selection. A polite live caption next to the switch describes the current view.

### Tabs (install block)
Label-size tabs with 10px padding. The active tab is ink and has a 2px fully rounded blue underline sitting on the header hairline. Inactive tabs are ink-3 and turn ink-2 on hover. Arrow, Home, and End keys work. The copy control sits at the right end of the tab bar.

### Micro-interactions
These are routine state transitions, not authored moments. Each one explains a change and has a reduced-motion path.
- **Sliding indicators:** the install-tab underline and the view-switch thumb are single measured elements. They slide between options over 300ms with `cubic-bezier(0.16, 1, 0.3, 1)`. Until JavaScript measures them, a static per-item fallback renders.
- **Copy feedback:** copy, check, and warning icons cross-fade with a scale and 2px blur over 200ms, and the button presses to 0.96 scale. On success, the copied command flashes the text-selection color (accent mixed 22%) for 900ms, showing exactly what was copied. Switching tabs replays a 260ms settle (fade, 3px rise).
- **Gap preview:** in Happy path view, hovering or focusing a "Not handled" tile previews its designed state using the flip's blur cross-fade, with no stagger.
- **Rows and trees:** a 1px blue hairline draws left to right along a hovered skill row (500ms). In the handoff tree, the hovered skill's connector elbow turns blue.
- **Text links:** `.link-draw` draws a 1px underline in the current text color from left to right (320ms). Arrow icons move 1–2px in the direction they point.
- **Mark:** hovering the logo fills the two faded tiles (the gaps), 75ms apart.
- **Header:** the bottom hairline only appears once the page has scrolled.

### Cards / Containers
- **Corner Style:** 8px for specimen panels, 12px for install, code, pager, and table-of-contents panels, 16px for the specimen well.
- **Background:** surface on paper or well. Code blocks use the well.
- **Shadow Strategy:** see Elevation & Depth. Most containers have none.
- **Border:** 1px hairline. Pager links strengthen to Strong Hairline and fill with surface on hover.
- **Internal Padding:** 12px in specimen panels, 16px in install and pager panels, 20px to 28px in the compose panel.

### Install Block
A surface panel with the Command Lift shadow. A hairline separates the tab bar from the body. Commands are mono and prefixed with an ink-3 `$`, or `›` for slash commands. Commands wrap only at spaces or after a slash. An optional ink-3 note sits below the command.

### Skill Index Rows
A list ruled with a hairline above and below every row. Each row has a mono identifier, a summary in ink-2 with a "Produces:" line in ink-3, and a 17px arrow. On hover the identifier and arrow turn blue and the arrow shifts 2px right. No backgrounds and no cards.

### Specimen Sheet
A 16px-radius well holding tiles. Each tile is a real component panel with a caption underneath: the state name as a label, plus the mono skill identifier (linked, blue on hover) or "the happy path". In Happy path view, missing states are dashed "Not handled" frames and their captions are struck through in ink-3. Hovering or focusing a tile dims the other tiles to 45% opacity and 0.4 saturation (hover-capable devices only). The flip cross-fades the layers over 520ms with `cubic-bezier(0.16, 1, 0.3, 1)`: opacity, 6px blur, and a 0.97 scale, staggered 55ms per tile. With reduced motion the flip is a 150ms linear fade with no blur or scale. Without JavaScript every state shows.

### Navigation
- **Header:** a 56px sticky bar on 85% paper with backdrop blur and a bottom hairline. Links are 0.875rem ink-2, ink on hover, with 6px-radius hit areas. The GitHub label is hidden on mobile and the mark remains.
- **Table of contents:** a list on a left hairline. The current section gets a 1px ink border and 500 weight. Other entries are ink-3 and turn ink-2 on hover.
- **Breadcrumb:** 0.875rem ink-3 with chevron separators. The current page is ink-2.
- **Link underlines:** 1px thick, offset 0.2em, Strong Hairline at rest, blue on hover.

### Rendered Prose
Rendered SKILL.md: h2 sections are divided by a hairline. Heading anchor icons appear on hover or focus. Inline code sits in a well-tint chip with a hairline border. Inline code that names a skill links to it and turns blue. Blockquotes have a 1px Strong Hairline rule. Tables use a Strong Hairline header rule and hairline row rules. Checkboxes use the accent color.

## Do's and Don'ts

### Do:
- **Do** reference token names (`paper`, `well`, `ink-2`, `line`), never raw hex, so the dark scheme follows automatically.
- **Do** put exhibits in the well tint and interactive panels on surface, with 1px hairline borders.
- **Do** use a 2px accent outline offset 3px for every focus-visible state.
- **Do** list collections as hairline-ruled rows with a mono identifier and an arrow.
- **Do** keep hover feedback to color, background, or border-strength changes lasting 150–200ms.
- **Do** give every authored motion a reduced-motion path and a no-JavaScript final state.
- **Do** use lucide icons at stroke 1.75 (2 inside miniature specimens), sized 14–17px beside text.

### Don't:
- **Don't** use blue for anything except the primary action, selection, focus, and link hover.
- **Don't** use danger, warn, or ok colors except to report a real state.
- **Don't** set prose, headings, or labels in mono, or set commands and identifiers in the grotesk.
- **Don't** add shadows beyond Rest and Command Lift, or use a shadow as a hover effect.
- **Don't** present a list of skills as a grid of identical cards.
- **Don't** add uppercase tracked labels above headings. Labels are sentence case.
- **Don't** add a second authored motion that competes with the specimen flip.
