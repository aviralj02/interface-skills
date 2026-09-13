---
name: content-resilience
description: Design and verify interfaces against real content — long and short names, missing images and avatars, huge numbers, long unbroken strings and URLs, user-generated content, translated and RTL text, dates and currencies, and lists with 0, 1, many, or thousands of items. Produces a content contract (min/typical/max per field with overflow rules) and a stress-test fixture set. Use when building components that display user or API data (cards, tables, lists, headers, avatars, badges, navigation labels), when designs were made with placeholder text, or when layouts break in production. Triggers on "long text breaks layout", "truncate", "overflow", "ellipsis", "missing image", "i18n", "German text too long", "large numbers", "user generated content". Not for choosing type styles.
---

# Content Resilience

## Purpose

Mockups use "Jane Doe", a perfectly cropped photo, and three list items. Production has a 90-character company name, no photo, a count of 1,284,332, a title in German, and a URL with no spaces. This skill defines what content each component must survive and how it behaves at the extremes — before production discovers it.

## When to Use

- Building any component that renders content you do not control
- Converting a design made with ideal placeholder content
- Supporting multiple languages or user-generated content
- Bugs: overlapping text, blown-out cards, squashed buttons, horizontal scroll on mobile

## Core Principles

1. **Design with a range, not a sample.** Every field has a minimum, typical, and maximum. Know all three.
2. **Truncation hides information; only truncate what can be recovered.** If users need the full value, it must be reachable (title, tooltip on focus, detail view, expand).
3. **Some content must never be truncated.** Amounts, prices, dates, error messages, legal text, and identifiers users need to match.
4. **Layouts give way; content keeps its meaning.** Containers wrap, grow, or scroll; they do not clip meaning or overlap.
5. **Absence is content too.** Missing avatar, missing description, null value — each needs a defined rendering.
6. **Quantity changes layout.** 0, 1, a few, many, and thousands are different designs.
7. **Format for the user's locale,** not the developer's.

## Workflow

### 1. Write the content contract

For each component, list every piece of dynamic content.

| Field | Source | Min | Typical | Max | Can be empty? | Overflow rule |
|---|---|---|---|---|---|---|
| Project name | user | 1 char | 12–30 | 100 | no | wrap to 2 lines, then clamp; full name in title + detail page |
| Owner avatar | user upload | — | image | — | yes | initials on colored background derived from id |
| Description | user | 0 | 80–200 | 5,000 | yes | clamp 3 lines in card; "No description" in muted text only on detail page |
| Task count | computed | 0 | 5–200 | 1,000,000+ | no | compact ("1.2M") in badge; exact in tooltip/detail |
| Updated | system | — | — | — | no | relative < 7 days ("3h ago"), absolute otherwise; exact timestamp on hover/focus |
| Tags | user | 0 | 1–3 | 50 | yes | show first 3 + "+N" |

Get real maxima from the database schema, API validation, or production data — not guesses. If there is no maximum, that is a finding: add one or design for unbounded.

### 2. Choose overflow behavior per field

| Behavior | Use for | Rules |
|---|---|---|
| Wrap | Names, titles, headings, messages | Allow `overflow-wrap: anywhere` for long unbroken strings |
| Clamp N lines | Descriptions, previews | Full content must be reachable |
| Truncate end | Single-line labels in dense lists | Full value in accessible name / tooltip |
| Truncate middle | File names, paths, hashes, emails where the end matters | `report-final-v…-2024.pdf` |
| Compact | Large numbers in badges/charts | Exact value accessible |
| Scroll | Code, logs, wide tables | Scroll within its own container, never the page |
| Fade / "Show more" | Long user content | Expand in place; keep position |
| Never truncate | Money, dates, error text, legal, IDs to match | Let the layout adapt |

### 3. Handle absence and failure

| Content | Missing / failed rendering |
|---|---|
| Avatar | Initials or generic icon; stable color per user; same size as image |
| Hero / thumbnail | Neutral placeholder with preserved aspect ratio; no broken-image icon |
| Optional text | Omit the row, or show "—" in tables; don't show "null", "undefined", "N/A" inconsistently |
| Name | Fallback chain: display name → email → "Unnamed user" |
| Numbers | Distinguish 0 from unknown ("—") |
| Dates | Distinguish "never" from unknown |

Reserve image space with `aspect-ratio` or width/height to avoid layout shift, and handle `onerror`.

### 4. Design for quantity

For every list, grid, tag set, avatar stack, or menu:

| Count | Question |
|---|---|
| 0 | Empty state (see `interface-states`) |
| 1 | Does singular grammar and layout look intentional? |
| Few (2–5) | Typical design |
| Many (20–100) | Scrolling, grouping, "show more"? |
| Huge (1,000+) | Pagination, virtualization, search, filters, server-side counts |

### 5. Handle user-generated and unusual content

Include in fixtures:
- Long unbroken strings: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`, long URLs, email addresses
- Emoji and combined emoji (👩🏽‍💻), including in names and initials
- RTL text (Arabic, Hebrew) and mixed-direction strings
- CJK text (no spaces for wrapping)
- Accents and diacritics, including stacked combining marks
- Leading/trailing whitespace, multiple spaces, line breaks in single-line fields
- HTML/markdown-looking input (`<b>`, `**bold**`) — rendered as text unless intentionally supported
- Very short values: one character, one emoji

### 6. Handle translation and locale

- Budget 30–40% text expansion for short UI strings (more for very short ones: "OK" → "Aceptar")
- Buttons and tabs grow; do not fix their width
- Use logical CSS properties (`margin-inline-start`) for RTL
- Format numbers, currency, dates, and relative times with locale-aware APIs (`Intl`)
- Do not build sentences by concatenation; word order changes

### 7. Build and run the stress fixtures

Create a fixture set per component: minimum, typical, maximum, missing, unusual, and quantity cases. Render them together (story, test page, or visual regression) at the narrowest supported width.

## Checklist

- [ ] Content contract written with real min/typical/max
- [ ] Every field has an overflow rule
- [ ] Nothing that must not be truncated is truncated
- [ ] Truncated values are recoverable (including for keyboard and screen reader users)
- [ ] Long unbroken strings cannot overflow containers
- [ ] Every image has a sized placeholder and a failure fallback
- [ ] Missing values render consistently
- [ ] 0 vs unknown is distinguishable
- [ ] Lists designed for 0, 1, many, and huge
- [ ] Numbers, dates, currency formatted per locale
- [ ] Layout tested with ~40% longer strings and RTL
- [ ] Fixtures render together at narrowest width

## Common Mistakes

- **Flex children without `min-width: 0`,** so a long name pushes the action button off screen.
- **Ellipsis on a price or amount.**
- **Truncated text with no way to see the rest,** or a tooltip only reachable by mouse.
- **Fixed-width buttons** that clip translated labels.
- **Initials fallback that breaks on emoji or single-word names.**
- **"1000000" rendered raw** or "1.2M" with no way to see the exact value where precision matters.
- **Relative dates only** ("2 months ago") in contexts where the exact date matters (invoices, audit logs).
- **Rendering 5,000 DOM rows** because the design showed 8.

## Example

**Component:** notification item

Fixtures and expected behavior:

| Case | Content | Expected |
|---|---|---|
| Typical | "Ana commented on *Q3 plan*" | single line |
| Long actor | "Maximilian Alexander von Hohenberg-Schwarzenbach commented…" | wraps to 2 lines; timestamp stays right-aligned on its own line on narrow |
| Long object | object name 100 chars | object name clamps with ellipsis after 2 lines; full name in link's accessible name |
| Unbroken | "commented on *AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA*" | breaks anywhere, no horizontal overflow |
| No avatar | actor has no image | initials "MA" on stable color |
| Emoji name | actor "🦊 Fox" | initials use first grapheme "🦊" |
| Deleted actor | actor null | "A former member" + generic avatar |
| RTL | object name in Arabic | isolated with `<bdi>`, punctuation not reordered |
| Many | 2,400 unread | badge "99+", list virtualized, "Mark all as read" |

## Implementation Notes

- CSS: `min-width: 0` on flex/grid children that contain text; `overflow-wrap: anywhere` for user content; `line-clamp` for multi-line truncation; `text-overflow: ellipsis` with `white-space: nowrap` and `overflow: hidden` for single line.
- Wrap user-provided inline strings in `<bdi>` (or `dir="auto"`) inside mixed-direction sentences.
- Use `Intl.NumberFormat` with `notation: "compact"` and `Intl.RelativeTimeFormat` / `Intl.DateTimeFormat`.
- Split graphemes with `Intl.Segmenter` for initials, not `string[0]`.
- Put fixtures in stories or a test harness so the extremes are reviewed visually on every change.

## Output Expectations

Produce:

1. **Content contract** per component — `Field | Source | Min | Typical | Max | Empty? | Overflow rule`.
2. **Absence rules** — rendering for each missing/failed content type.
3. **Quantity plan** — 0 / 1 / many / huge behavior for each collection.
4. **Stress fixture set** — concrete values, ready to paste into stories or tests.
5. **Findings** — when reviewing, each break with the case that triggers it and the fix, with file/line.
