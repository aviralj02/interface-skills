---
name: responsive-behavior
description: Decide how each part of an interface transforms — not just reflows — across viewport and container sizes and input modalities — component priority, what collapses or moves, sidebar to drawer, table to cards or priority columns, filters to bottom sheet, toolbar to overflow menu, multi-pane to stacked navigation, hover-dependent actions on touch, on-screen keyboard, and state preserved across breakpoint changes. Produces a transformation matrix per surface. Use when building layouts that must work on phones and desktops, adapting a desktop-first design, reviewing mobile usability, or choosing container vs viewport queries. Triggers on "responsive", "mobile version", "breakpoints", "table on mobile", "sidebar on mobile", "touch", "container queries", "adaptive". Not for fluid typography or spacing scales alone.
---

# Responsive Behavior

## Purpose

"Make it responsive" usually produces a desktop layout squeezed into a column. This skill decides, component by component, what each part of the interface becomes at each size and input type — based on what matters most to the user at that size.

## When to Use

- Designing or building a layout that must work from ~360px phones to wide desktops
- A desktop design exists and the mobile behavior is undefined
- Tables, toolbars, sidebars, multi-pane views, or dense forms need to work on small screens
- Components are reused in containers of different widths (sidebar vs. main column)
- Mobile users report actions they cannot reach

## Core Principles

1. **Priority decides the transformation.** Rank content and actions; lower priorities collapse, move, or hide first — the primary task never does.
2. **Transform, don't shrink.** A sidebar becomes a drawer, a table becomes a list, a toolbar becomes a menu. Smaller versions of the same thing rarely work.
3. **Components respond to their container; pages respond to the viewport.** A card does not know the window size, and should not need to.
4. **Input modality is independent of width.** A large touchscreen has no hover; a small window on a laptop has a keyboard. Query capability (`hover`, `pointer`), not just width.
5. **Hidden is not removed.** Anything hidden at a size must still be reachable, or deliberately unavailable with a reason.
6. **Resizing must not destroy state.** Crossing a breakpoint must not reset form input, selections, scroll, or open panels without reason.

## Workflow

### 1. Rank the surface

For the page or component, list regions and actions with a priority:

| Element | Priority | Rationale |
|---|---|---|
| Message list | 1 | the job |
| Compose | 1 | the job |
| Conversation sidebar | 2 | navigation, needed often |
| Contact details panel | 3 | reference |
| Formatting toolbar | 3 | occasional |

### 2. Define size classes from content, not devices

Pick breakpoints where the layout actually breaks, typically 3–4 classes:

- **Compact** (~< 640px): single column, one primary region visible
- **Medium** (~640–1024px): two regions, or one with a persistent secondary
- **Expanded** (~> 1024px): full multi-region layout
- **Container classes** for reusable components (e.g. card narrow < 320px, wide ≥ 320px)

### 3. Choose transformations

Common patterns:

| Desktop | Compact transformation | Notes |
|---|---|---|
| Persistent sidebar nav | Drawer behind a menu button, or bottom tab bar for 3–5 top destinations | Bottom tabs for frequent switching; drawer for many items |
| Multi-pane (list + detail) | Stacked: list → detail as separate views with back | Selection must map to a URL so back works |
| Right-side inspector panel | Full-screen sheet or separate view | |
| Data table | (a) priority columns + row expand; (b) card list; (c) horizontal scroll with frozen first column | (a) for scanning, (b) for reading, (c) for comparison across columns |
| Filter sidebar | Filter button with active count → bottom sheet or full-screen panel with Apply | Show active filters as chips above results |
| Toolbar with many actions | Primary 1–2 visible; rest in overflow menu | Overflow based on available space, not a fixed breakpoint |
| Hover-revealed row actions | Always-visible compact action or long-press/swipe **plus** a visible menu button | Gestures alone are not discoverable |
| Tooltips | Tap-to-reveal info buttons, or inline helper text | Tooltips do not exist on touch |
| Wide form (2–3 columns) | Single column; related short fields may stay paired | Keep logical order when columns stack |
| Modal dialog | Full-screen sheet for anything with more than a few fields | |
| Horizontal tabs overflowing | Scrollable tabs with visible overflow cue, or a select | |
| Dense dashboard grid | Stack by priority; collapse low-priority widgets to summary with "View" | |

### 4. Handle input modalities

- **Touch targets** at least ~44×44px (24×24 CSS px minimum per WCAG 2.2 with spacing); spacing between adjacent targets.
- **No hover-only functionality.** Use `@media (hover: hover)` to add hover enhancements, not to provide the only access.
- **On-screen keyboard:** inputs and the submit button must remain visible when the keyboard opens; avoid fixed bottom bars that cover inputs; use the right `inputmode`/`type` and `autocomplete`.
- **Keyboard on large screens:** shortcuts and focus order still work in the desktop layout (see `focus-management`).
- **Gestures** (swipe, long-press, pinch) always have a visible alternative.
- **Safe areas:** respect device insets for fixed headers/footers.

### 5. Preserve state across changes

Decide per element what happens when the size class changes (rotation, window resize, split-screen):

- Selected item in a list/detail layout: stays selected; compact shows detail view
- Open drawer on compact → expanded: becomes persistent sidebar, not a stuck overlay
- Form input: never reset by a layout swap (don't render two separate form trees)
- Scroll position: kept where feasible

### 6. Write the transformation matrix

One row per element, one column per size class. This is the deliverable.

## Checklist

- [ ] Regions and actions ranked by priority
- [ ] Breakpoints chosen where content breaks
- [ ] Every region has a defined behavior in every size class
- [ ] Primary task fully available at the smallest supported width
- [ ] Reusable components use container queries or intrinsic layout
- [ ] Tables have a chosen compact strategy matched to the task
- [ ] No hover-only or gesture-only functionality
- [ ] Touch targets meet size and spacing minimums
- [ ] On-screen keyboard does not cover inputs or primary actions
- [ ] Hidden elements are reachable or deliberately unavailable
- [ ] State survives breakpoint changes
- [ ] No page-level horizontal scroll at 320–360px

## Common Mistakes

- **Hiding features on mobile with `display: none`** that users need (export, settings, filters).
- **Tables squeezed to 360px** with 8 truncated columns.
- **Rendering desktop and mobile trees separately** and toggling with CSS — double data fetching, duplicated IDs, and lost input on resize.
- **Breakpoints on device names** ("iPad") instead of content needs.
- **Viewport media queries inside reusable components,** so the card breaks when placed in a narrow sidebar on a wide screen.
- **Fixed bottom CTA** covering the input the user is typing into.
- **Drawer that stays open as an overlay** after rotating to landscape.
- **`hover:` styles that hide actions** until hover, on a touch device.

## Example

**Surface:** issue tracker board with filters.

| Element | Compact (< 640) | Medium (640–1024) | Expanded (> 1024) |
|---|---|---|---|
| App nav | bottom bar: Issues, Search, Inbox, Me | icon rail | full sidebar with labels |
| Board columns | one column at a time, swipe **and** column picker select | 2 columns visible, horizontal scroll | all columns |
| Issue card | title, assignee avatar, priority icon | + labels (max 2, "+N") | + estimate, due date |
| Filters | "Filters (3)" button → bottom sheet with Apply; active chips above board | collapsible panel above board | persistent left panel |
| Card actions | "⋯" button always visible | "⋯" always visible | "⋯" on hover **and** on focus; always visible for touch-capable pointers |
| Drag to move | disabled; "Move to…" in card menu | drag + menu | drag + menu |
| Issue detail | full-screen view, back returns to same column and scroll | side sheet 60% | side panel 40% |
| New issue | full-screen sheet | modal | modal |

## Implementation Notes

- CSS container queries (`@container`) for components; viewport media queries for page shell.
- `@media (hover: hover) and (pointer: fine)` for hover enhancements; `(pointer: coarse)` to enlarge targets.
- Prefer intrinsic layout (`grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr))`, flex-wrap) before adding breakpoints.
- Use `dvh`/`svh` units and the `VirtualKeyboard`/`visualViewport` APIs where the on-screen keyboard matters.
- For toolbars, measure available space (ResizeObserver) to move actions into overflow.
- Keep one component tree; change presentation, not identity, so state persists.

## Output Expectations

Produce:

1. **Priority ranking** of regions and actions.
2. **Size classes** with chosen breakpoints (viewport and container).
3. **Transformation matrix** — `Element | Compact | Medium | Expanded`.
4. **Input modality notes** — touch, hover, keyboard, on-screen keyboard.
5. **State preservation rules** across size changes.
6. **Findings** — when reviewing, each issue with the size/modality that triggers it and file/line.
