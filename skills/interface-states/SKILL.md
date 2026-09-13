---
name: interface-states
description: Enumerate and design every state a UI surface can be in — initial, loading, empty, populated, partial, error, stale, offline, disabled, permission-denied — and produce a state matrix before or alongside implementation. Use when building or reviewing any page, panel, list, table, dashboard, widget, or component that renders data, depends on a request, or varies by user permission. Triggers on "loading state", "empty state", "error state", "what if the API fails", "skeleton", "no data", "blank screen", "state matrix". Not for visual styling of those states; not for the lifecycle of a single user-triggered action (use async-interactions).
---

# Interface States

## Purpose

A surface that has only been designed in its populated state is unfinished. This skill makes every state explicit, gives each one defined UI and a next action, and models states so that impossible combinations cannot render.

The output is a **state matrix**: the shared artifact the rest of this collection reads and writes.

## When to Use

- Building a new page, panel, or data-driven component
- Wiring a component to an API, database, cache, or realtime source
- Reviewing a surface that "looks done" in screenshots
- A bug report mentions a blank screen, infinite spinner, flash of empty content, or a stale value

Scope: **a surface** (something that renders data). For **an action** the user triggers (save, delete, upload), use `async-interactions`. For **a journey across surfaces**, use `user-flows`.

## Core Principles

1. **States are mutually exclusive; model them that way.** `isLoading`, `isError`, and `data` as independent booleans allow 8 combinations, most of them nonsense. Use one discriminated status.
2. **Never render nothing.** A blank region is the worst state: the user cannot tell loading from broken from empty.
3. **Every non-happy state names a next action.** Retry, create, clear filters, request access, go back. If there is truly no action, say what will happen and when.
4. **Keep what you have.** A failed refetch should not replace valid data with an error screen. Show the data, mark it stale, surface the failure inline.
5. **Scope failure to the smallest region.** One failed widget must not blank the dashboard.
6. **Empty is not one state.** "Never had data", "filtered to nothing", and "cleared everything" need different messages and actions.
7. **Permission is a state, not an afterthought.** Decide whether unauthorized users see nothing, a locked preview, or a request-access path.

## Workflow

### 1. Name the surface and its data sources

List every independent source the surface depends on. Each independently failing source is a candidate for its own state region.

```text
Project dashboard
├── project metadata   (GET /projects/:id)     blocking
├── activity feed      (GET /activity)         non-blocking
├── usage chart        (GET /usage?range=30d)  non-blocking
└── presence           (websocket)             decorative
```

Classify each: **blocking** (surface is meaningless without it), **non-blocking** (surface works, region degrades), **decorative** (fail silently).

### 2. Walk the state checklist for each region

| State | Question to answer |
|---|---|
| Initial | What renders before any request starts (SSR, no params yet, not yet authenticated)? |
| Loading (first) | Skeleton, spinner, or nothing? How long before it appears? |
| Loading (refetch) | Does existing data stay visible? Is there a subtle indicator? |
| Empty — first use | What does a new user see? What is the one action that fills it? |
| Empty — no results | Filters/search returned nothing. Show the active criteria and a way to clear them. |
| Empty — cleared | User deleted/archived everything. Confirm it is intentional; point to archive/trash if one exists. |
| Populated | Typical volume. Also: 1 item, and the maximum realistic count (see `content-resilience`). |
| Partial | Some items or regions loaded, others failed. How is the failed part marked? |
| Error — recoverable | Network/timeout/5xx. Message + retry. Is anything cached to show? |
| Error — not found | 404/deleted. Different from a network error: retry will not help. |
| Error — unauthenticated | Session expired. Re-auth without losing the user's place or unsaved input. |
| Permission denied | Authenticated but not allowed. Hide, lock, or offer request access? |
| Stale | Data older than it should be (cache, offline, failed refresh). Is age shown? |
| Offline | Connection lost. What still works? What is queued? What is disabled? |
| Disabled / read-only | Feature off, plan limit, archived record, locked by another user. Say why. |

Skip states that genuinely cannot occur, and write down **why** they cannot. "Cannot occur" is a claim that should survive review.

### 3. Decide timing and transitions

- **< ~300ms expected:** show no loader; avoid a flash. Delay the indicator ~150–300ms.
- **Once shown, keep a loader for a minimum (~300–500ms)** so it does not flicker.
- **Skeletons** when the layout is known and the wait is short-to-medium. **Spinners** for unknown layout or small regions. **Progress with text** for long or multi-step waits.
- Transitions from loading to populated should not shift layout. Reserve space.
- Refetch must not return to the first-load skeleton.

### 4. Model the states in code

Prefer a single status field over independent flags.

```ts
type RegionState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "empty"; reason: "first-use" | "no-results" | "cleared" }
  | { status: "ready"; data: T; stale?: { since: Date; error?: AppError } }
  | { status: "partial"; data: T; failed: string[] }
  | { status: "error"; error: AppError; retry: () => void }
  | { status: "forbidden"; canRequestAccess: boolean };
```

Render with an exhaustive switch so adding a state forces every consumer to handle it. Most data libraries (TanStack Query, SWR, Apollo, RTK Query) expose flags; derive the union from them in one place rather than branching on raw flags in every component.

Distinguish error kinds at the boundary where the response is parsed — `network`, `timeout`, `not-found`, `unauthenticated`, `forbidden`, `validation`, `server`, `rate-limited` — because each maps to different UI.

### 5. Write the state matrix

This is the deliverable. See Output Expectations.

## Checklist

- [ ] Every data source is classified blocking / non-blocking / decorative
- [ ] No state renders an empty region with no explanation
- [ ] Loading indicators are delayed, and do not flicker once shown
- [ ] Refetch keeps existing data visible
- [ ] Empty states are split by reason, each with its own action
- [ ] "No results" shows the active filters and a clear-filters action
- [ ] Recoverable errors offer retry; not-found errors do not
- [ ] Session expiry preserves location and unsaved input
- [ ] Permission-denied behavior is an explicit decision
- [ ] A failure in one region leaves the others working
- [ ] Stale data is labeled when staleness matters to decisions
- [ ] State is modeled as one discriminated status, not parallel booleans
- [ ] Layout does not jump between loading and loaded

## Common Mistakes

- **Only the populated state exists.** The loading state is `null`, which renders a blank card.
- **`if (loading) return <Spinner/>` placed above the data check,** so every background refetch wipes the screen.
- **`data.length === 0` treated as one empty state** — a new user and a user with over-narrow filters see the same "No items yet. Create one!"
- **Generic catch-all error** that offers "Try again" for a 403 or a deleted record.
- **Error boundary at the root only,** so one chart throwing takes down the whole app.
- **Spinner for 80ms requests,** producing flicker on every navigation.
- **Disabled controls with no explanation** of why, or what would enable them.
- **Optimistic assumption that the user has permission,** discovered only when the save fails.

## Example

**Surface:** team members table in a settings page.

| Region | State | Trigger | UI | Next action |
|---|---|---|---|---|
| Table | Loading (first) | page open | 5 skeleton rows after 200ms | — |
| Table | Loading (refetch) | invite accepted elsewhere | rows stay; thin progress bar in header | — |
| Table | Empty — first use | only the owner exists | "You're the only member" + illustration-free text | **Invite teammates** |
| Table | Empty — no results | search "zz" | "No members match 'zz'" | **Clear search** |
| Table | Populated | ≥ 1 other member | rows, sorted by role then name | row actions |
| Table | Partial | avatars CDN fails | initials fallback per row | — (silent) |
| Table | Error — recoverable | 5xx / timeout | inline panel: "Couldn't load members." | **Retry** |
| Table | Stale | refetch fails with data present | rows stay; banner "Showing members as of 10:42" | **Retry** |
| Invite button | Disabled | seat limit reached | button disabled + helper "5 of 5 seats used" | **Upgrade plan** link |
| Page | Permission denied | role = viewer | table read-only; row actions hidden; note "Only admins can manage members" | **Ask an admin** |
| Page | Unauthenticated | session expired | re-auth modal over page, page state kept | **Sign in** |

## Implementation Notes

- Place error boundaries around each non-blocking region, not only at the root.
- Keep "last good data" in the cache on refetch failure; most query libraries do this by default — do not clear it manually.
- SSR/streaming: decide which regions stream in and give each its own fallback.
- Realtime sources need a "reconnecting" state distinct from "offline".
- Tests: render each state from the union directly (story, fixture, or test) rather than relying on a live API to produce it.

## Output Expectations

Produce:

1. **Data source list** with blocking / non-blocking / decorative classification.
2. **State matrix** — one row per region × state with columns: `Region | State | Trigger | UI | Next action`. Mark states that cannot occur, with the reason.
3. **State model** — the discriminated union (or equivalent) for the framework in use.
4. **Gaps** — if reviewing existing code, list each missing state with the file and line where it should be handled.

When a row involves a user-triggered action, hand it to `async-interactions`. When a row needs copy, hand it to `ux-writing`.
