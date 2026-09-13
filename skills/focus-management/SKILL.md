---
name: focus-management
description: Design where keyboard focus goes after every change in the interface — opening and closing dialogs, drawers, and menus; deleting, adding, and reordering items; route changes in single-page apps; form submission and validation errors; inline editing; dynamic and lazily loaded content; toasts; and composite widgets with roving focus — plus what gets announced to screen readers. Produces a focus map for each interaction. Use when building dialogs, menus, lists with delete, SPA navigation, multi-step forms, inline editors, or when keyboard or screen reader users lose their place. Triggers on "focus trap", "focus lost", "return focus", "keyboard navigation", "tab order", "focus after delete", "route change announcement", "aria-live". Not a full WCAG audit.
---

# Focus Management

## Purpose

Focus is the keyboard and screen reader user's position in the interface. Every time the DOM changes — a dialog opens, an item is deleted, a route changes — focus either moves somewhere intentional or falls back to `<body>` and the user is lost at the top of the page. This skill decides the destination for every change.

## When to Use

- Building dialogs, drawers, popovers, menus, comboboxes, tabs
- Lists where items can be deleted, added, moved, or filtered
- Client-side routing
- Forms with async submission or error summaries
- Inline editing, expand/collapse, "load more", infinite scroll
- Bug reports: "after closing the modal I'm at the top of the page", "screen reader didn't say anything"

## Core Principles

1. **Every DOM change that removes or replaces the focused element needs a planned destination.** Otherwise focus is lost.
2. **Move focus only when the user's context changed.** Opening a dialog changes context; a toast appearing does not. Unrequested focus moves are disorienting.
3. **Return focus to where the user came from** when a temporary context closes — or to the nearest logical substitute if that element is gone.
4. **Announce what the user cannot see.** Changes that don't move focus but matter (results updated, saved, error) are announced through live regions.
5. **Visible focus is non-negotiable.** A focus destination the user cannot see is not a destination.
6. **Tab order follows visual and logical order.** Use DOM order; avoid positive `tabindex`.

## Workflow

### 1. List the focus events

For the feature, list every interaction that opens, closes, adds, removes, or replaces content.

### 2. Decide the destination for each

Reference rules:

| Event | Focus goes to | Announce |
|---|---|---|
| **Open modal dialog** | First meaningful element: the first input for forms; the dialog heading/container for content; the **least destructive** button for destructive confirmations | Dialog role + label (automatic when labeled) |
| **Close dialog** (cancel/Escape/close) | The element that opened it | — |
| **Close dialog after action** | The element that opened it, or the result of the action if the trigger no longer exists (e.g. new item row) | Result via live region if not visible from focus |
| **Open drawer / non-modal panel** | Panel heading or first control if the user opened it to act; leave focus if it opens passively | — |
| **Open menu / listbox** | First item (or selected item) | — |
| **Close menu by selecting** | The menu button (or the control whose value changed) | — |
| **Delete item in a list** | Next item → previous item → list heading or empty state's action | "'Q3 plan' deleted" + undo reachable |
| **Add item** | The new item (or its first field if it needs input) — unless adding many in succession, then keep focus in the add field | "Item added" |
| **Reorder item (keyboard)** | Stays on the moved item | New position: "Moved to position 3 of 8" |
| **Filter / search results update** | Stays in the search field | Result count: "12 results" (debounced) |
| **Load more** | First newly loaded item | "20 more items loaded" |
| **Infinite scroll** | Unchanged; provide a "load more" button or skip link as keyboard alternative | — |
| **Route change (SPA)** | Page `<h1>` (with `tabindex="-1"`) or main landmark; skip for in-page tab/query changes | New page title |
| **Form submit — validation errors** | Error summary at top (with links to fields), or first invalid field for short forms | Error count / first error |
| **Form submit — success, same page** | Success message container, or the next logical control | Success message |
| **Form submit — success, navigates** | Follow route change rule; show confirmation on new page | Confirmation |
| **Multi-step form next/back** | Heading of the new step | "Step 2 of 4: Address" |
| **Inline edit — enter** | The input, with text selected if replacing is likely | — |
| **Inline edit — save / cancel** | The element that entered edit mode (the displayed value or edit button) | "Saved" on save |
| **Expand / collapse (disclosure)** | Stays on the toggle | State via `aria-expanded` |
| **Tab widget** | Arrow keys move between tabs; Tab moves into the panel | — |
| **Toast / notification appears** | Unchanged — never steal focus | Message via `role="status"` (or `alert` for errors); actions reachable via a known shortcut or landmark |
| **Async content replaces focused element** (e.g. skeleton → content) | Equivalent element in the new content | — |
| **Session expiry / re-auth dialog** | Dialog; after re-auth, return to prior element with state intact | — |

### 3. Handle "the return target is gone"

The element that opened a dialog may no longer exist (it was the delete button of a row you just deleted). Define a fallback chain per case: next sibling → previous sibling → container heading → main heading. Never let it fall to `<body>`.

### 4. Contain focus where required

- **Modal dialogs:** focus cannot leave until closed; background is inert (`inert` attribute or native `showModal()`); Escape closes unless the dialog guards unsaved input.
- **Non-modal panels/popovers:** focus can leave; Escape closes and returns focus; clicking outside closes without stealing focus from the clicked element.
- **Nested dialogs:** avoid; if unavoidable, each level returns focus to its own trigger.

### 5. Composite widgets use roving focus

Toolbars, menus, tab lists, listboxes, grids, and radio groups are a single Tab stop; arrow keys move within. Track the active item with roving `tabindex` or `aria-activedescendant`.

### 6. Verify

Walk every event with keyboard only, then with a screen reader (VoiceOver, NVDA). At each step: *Where is focus? Can I see it? Did I hear what changed?*

## Checklist

- [ ] Every open/close/add/delete/replace event has a focus destination
- [ ] Dialogs return focus to their trigger, with a fallback if the trigger is gone
- [ ] Modal dialogs contain focus and make the background inert
- [ ] Destructive confirmations do not focus the destructive button first
- [ ] Deleting an item moves focus to a neighbor or logical fallback
- [ ] SPA route changes move focus to the page heading/main and announce the title
- [ ] Form errors move focus to a summary or first invalid field
- [ ] Toasts and background updates never steal focus, but are announced
- [ ] Composite widgets use arrow-key navigation with a single Tab stop
- [ ] Focus indicator visible on every focus destination (including `tabindex="-1"` headings)
- [ ] No positive `tabindex`; DOM order matches visual order
- [ ] Verified with keyboard and at least one screen reader

## Common Mistakes

- **Custom modal built from `div`s** without containment; Tab walks into the page behind.
- **Closing a dialog leaves focus on `<body>`,** so the next Tab starts at the top of the page.
- **Deleting a row removes the focused button;** focus is lost.
- **SPA navigation with no focus move,** so screen reader users hear nothing and are still at the old link.
- **Autofocus on page load** into a search field, skipping the page content and hijacking mobile keyboards.
- **Toasts with `role="alert"` for routine success,** interrupting whatever the screen reader is reading.
- **`outline: none` with no replacement.**
- **Live region added to the DOM at the same time as its message,** so nothing is announced (the region must exist before content changes).

## Example

**Focus map: task list with inline delete and undo**

| # | Event | Focus before | Focus after | Announcement |
|---|---|---|---|---|
| 1 | Press Delete on task 3 (R2, no confirm) | task 3 "Delete" button | task 4's title link (task 3 gone) | "Task 'Draft brief' deleted. Undo available, press Ctrl+Z" |
| 2 | Delete last task in list | task 8 "Delete" | task 7's title link | same pattern |
| 3 | Delete only remaining task | task 1 "Delete" | empty state's **Add task** button | "Task deleted. No tasks left." |
| 4 | Activate Undo in toast | toast Undo button | restored task's title link | "Task restored" |
| 5 | Press Ctrl+Z (shortcut) | anywhere in list | restored task's title link | "Task restored" |

## Implementation Notes

- Native `<dialog>` + `showModal()` provides focus containment, inert background, and Escape; you still set initial focus and return focus deliberately where the default is wrong.
- The `inert` attribute makes background content unfocusable and hidden from assistive tech for custom overlays.
- Store the trigger (`document.activeElement`) before opening; restore after closing, checking `isConnected`.
- For headings that receive programmatic focus: `tabindex="-1"` and a visible `:focus-visible` style.
- Keep a single persistent polite live region (and one assertive) mounted at the app root; write messages into it.
- Framework routers: add a route-change hook that focuses the new `<h1>` and updates `document.title`.
- After async DOM replacement, focus in `requestAnimationFrame` or after the framework commits, not synchronously before the element exists.

## Output Expectations

Produce:

1. **Focus event list** for the feature.
2. **Focus map** — `Event | Focus before | Focus after | Fallback | Announcement`.
3. **Containment rules** for each overlay.
4. **Live region plan** — which messages, polite vs assertive.
5. **Findings** — when reviewing, each lost/misplaced focus case with reproduction steps and file/line.
