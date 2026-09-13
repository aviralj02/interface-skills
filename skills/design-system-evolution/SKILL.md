---
name: design-system-evolution
description: Grow a design system out of an existing product's code instead of designing one in the abstract — find duplicate and near-duplicate components, repeated behavioral patterns, and hard-coded values; decide what to abstract, what to leave alone, and when abstraction would hurt; define component boundaries and APIs that encode behavior (states, async, focus, destructive safeguards), extract tokens from real usage, and plan incremental adoption. Produces an extraction report with an abstraction verdict per candidate. Use in mature or fast-grown codebases with copy-pasted components, before building a component library, when a "Button" has 14 props, or when deciding whether to abstract something. Triggers on "duplicate components", "should I abstract this", "component library", "extract design tokens", "refactor components", "design system from existing code". Not for creating a design system from scratch in a design tool.
---

# Design System Evolution

## Purpose

Design systems built top-down often codify guesses. Systems grown from a real product codify what already works — but only if someone decides which repetitions are real patterns and which are coincidences. This skill finds candidates in the code, judges each one, and designs abstractions that carry behavior, not just styles.

## When to Use

- The codebase has several versions of the same component (three modals, five card styles, two table implementations)
- Values are hard-coded throughout (colors, spacing, z-indexes, durations)
- A shared component has grown so many props that no one knows how to use it
- Planning a component library or design system migration
- Deciding whether a piece of UI should become shared

## Core Principles

1. **Extract from evidence.** A pattern that appears three or more times with the same purpose is a candidate. Two instances is often a coincidence.
2. **Same look is not the same component.** Abstract things that change for the same reasons; two things that happen to look alike today may diverge tomorrow.
3. **Encode behavior, not only style.** The most valuable shared components carry the hard parts: states, focus, keyboard, async feedback, safeguards.
4. **Prefer composition over configuration.** A component with slots/children scales; one with 30 boolean props does not.
5. **Wrong abstraction costs more than duplication.** When in doubt, wait for more evidence.
6. **Adopt incrementally.** New code uses the system; old code migrates when touched or when prioritized by impact.

## Workflow

### 1. Scan for candidates

Look for:

| Signal | How to find |
|---|---|
| Duplicate components | Similar file names (`Modal`, `Dialog`, `Popup`); similar JSX/template structure; copied files with small diffs |
| Repeated markup patterns | Same element structure + class combinations appearing across features |
| Repeated behavior | Hand-rolled loading/empty/error rendering; custom dropdowns; repeated confirm-delete logic; repeated form field + label + error wrappers |
| Hard-coded values | Raw hex/rgb colors, pixel values, z-index numbers, durations, breakpoints in component styles |
| Prop explosion | Components with many booleans (`isPrimary`, `isSmall`, `hasIcon`, `isDanger`, `noPadding`) |
| Override pressure | Many call sites passing `className`/`style` overrides to the same shared component |

Count occurrences and note locations.

### 2. Judge each candidate

For each candidate, answer:

| Question | Abstract if… | Don't abstract if… |
|---|---|---|
| How many instances? | 3+ with the same purpose | 1–2, or same look but different purposes |
| Do they change for the same reasons? | A design/behavior change should apply to all | Owned by different features with different evolution |
| Is the behavior hard to get right? | Focus, keyboard, async, a11y, safeguards | Trivial markup |
| Is the variance small and nameable? | Differences fit a few named variants | Every instance is a special case |
| Is the domain stable? | Pattern has been stable for a while | Feature is still being explored |

**Verdicts:**
- **Extract now** — clear, stable, repeated, valuable
- **Extract primitive only** — share the behavior (hook, headless component) but let each feature own presentation
- **Consolidate tokens only** — values repeat, structure doesn't
- **Wait** — note it and revisit after more evidence
- **Leave duplicated** — similarity is coincidental; document why

### 3. Define boundaries and API

For each "extract" verdict:

- **Name it by purpose,** not appearance (`ConfirmDialog`, not `RedModal`)
- **Layer it:**
  - *Tokens* — color roles, spacing, radii, type, motion, z-layers
  - *Primitives* — behavior without opinionated styling (dialog, popover, listbox, focus scope)
  - *Components* — styled, product-level (Button, Dialog, DataTable, EmptyState)
  - *Patterns* — compositions encoding a product rule (DestructiveConfirm, AsyncButton, ResourceList with states)
- **Build behavior in:** the component handles its states (loading, disabled with reason, error), focus and keyboard, and safeguards by default — consumers shouldn't be able to forget them
- **API shape:** variants as an enum (`variant: "primary" | "secondary" | "danger"`), not stacked booleans; composition via children/slots for content; controlled/uncontrolled only where needed
- **Escape hatches** exist but are explicit and rare

### 4. Extract tokens from usage

1. Collect all raw values by type (colors, spacing, radii, shadows, durations, z-index).
2. Cluster near-duplicates (`#1f2937`, `#1e293b`, `#20293a` → one role).
3. Name by **role**, not value (`color-text-muted`, `space-4`, `z-overlay`), with a primitive scale underneath if theming is needed.
4. Map every existing value to a token or flag it as an intentional exception.
5. Include behavioral tokens: durations and easings, z-index layers, breakpoints/container sizes, focus ring.

### 5. Plan adoption

- Build the component with the canonical behavior (from `pattern-consistency` rules where they exist).
- Migrate highest-impact call sites first (most used, most defective).
- Codemods for mechanical replacements; manual for behavioral changes.
- Deprecate old versions with a clear marker and a lint rule once migration is feasible.
- Document usage with **when to use / when not to use**, states, and do/don't examples.

## Checklist

- [ ] Candidates found with counts and locations
- [ ] Every candidate has a verdict with reasoning
- [ ] "Leave duplicated" and "wait" decisions are recorded, not silently skipped
- [ ] Extracted components named by purpose
- [ ] Behavior (states, focus, keyboard, async, safeguards) built into components
- [ ] APIs use variants and composition, not boolean piles
- [ ] Tokens named by role, mapped from real values, exceptions flagged
- [ ] Adoption plan prioritized; deprecation path defined
- [ ] Usage docs include when not to use

## Common Mistakes

- **Abstracting after two occurrences,** then adding a boolean for every new case.
- **Merging components that only look alike** (a marketing card and a data card) into one with a `type` prop.
- **Styling-only components** — the shared Dialog looks consistent but every feature still implements focus return and Escape differently.
- **Tokens named by value** (`blue-500-button`), which break the moment the brand changes.
- **Big-bang migration** that stalls halfway, leaving two systems.
- **No escape hatch,** so teams fork the component instead.
- **Abstracting unstable features** still in product discovery.

## Example

**Extraction report (excerpt)**

| Candidate | Instances | Evidence | Verdict | Notes |
|---|---|---|---|---|
| Modal/Dialog/Popup | 3 components, 41 usages | Different Escape/outside-click/focus behavior | **Extract now** | One `Dialog` with built-in focus return + unsaved guard; see pattern-consistency rule |
| Delete confirmation | 9 hand-rolled | Mix of `window.confirm` and custom | **Extract pattern** | `DestructiveConfirm` requiring `objectName`, `consequence` |
| Loading/empty/error wrappers | 23 inline conditionals | Different empty copy, no retry in 14 | **Extract pattern** | `ResourceView` rendering the state union from interface-states |
| Settings card vs. pricing card | 2 | Similar look, different purpose & owners | **Leave duplicated** | Will diverge; marketing owns pricing |
| Status badge | 6 | Same structure, 4 color variants | **Extract now** | `variant: "neutral" \| "success" \| "warning" \| "danger"` |
| Spacing values | 212 raw px | 17 distinct values, 6 cover 90% | **Consolidate tokens** | Map 17 → 8-step scale; flag 3 exceptions |
| Dashboard widgets | 4 | Still being redesigned | **Wait** | Revisit after Q3 redesign |

## Implementation Notes

- Headless primitive libraries (Radix, React Aria, Ark, Headless UI, Melt, Reka) can supply primitives so the system focuses on product-level behavior.
- Keep tokens in a format that compiles to CSS custom properties; reference roles in components.
- Visual regression and story coverage for every state of every shared component.
- Measure adoption (imports of new vs. deprecated components) to track migration.

## Output Expectations

Produce:

1. **Candidate inventory** — `Candidate | Instances | Locations | Evidence`.
2. **Verdicts** — extract now / primitive only / tokens only / wait / leave duplicated, each with reasoning.
3. **Component specs** for extracted items — purpose, layer, API (variants, slots), built-in behavior, states.
4. **Token map** — raw values → role tokens, with exceptions.
5. **Adoption plan** — order, codemods, deprecation, docs.
