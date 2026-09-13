---
name: feature-completeness
description: Evaluate whether a feature is actually finished by walking it through eight paths — happy, error, empty, loading, permission, mobile, accessibility, and recovery — and produce a completeness scorecard with a prioritized gap list. Use before calling a feature done, when planning a feature from a spec or PRD, when reviewing a pull request that adds UI, or when something "works" but feels incomplete. Triggers on "is this done", "ready to ship", "what am I missing", "review this feature", "definition of done", "edge cases". This is the entry point of the interface-skills collection and routes each gap to the skill that fixes it. Not for visual polish reviews.
---

# Feature Completeness

## Purpose

Most features ship with the happy path finished and every other path improvised. This skill turns "done" into a checkable claim by reviewing the feature across eight paths, recording evidence for each, and routing every gap to a specific fix.

## When to Use

- **Before building:** turning a spec, ticket, or PRD into a definition of done
- **Before shipping:** final review of a feature branch or PR
- **After shipping:** a feature generates support tickets, confusion, or "it's broken" reports that turn out to be unhandled cases
- An AI agent has just generated a feature and you need to know what it skipped

## Core Principles

1. **A path is complete only with evidence.** "Handled" means you can point to the code, the rendered state, or the test. Otherwise it is "assumed".
2. **Name the feature by the user's goal, not the component.** "Invite a teammate", not "InviteModal". Goals cross components; that is where gaps hide.
3. **Gaps are ranked by user harm, not effort.** Data loss and dead ends outrank cosmetic inconsistency.
4. **Every gap has an owner skill.** A review that only lists problems is half a review.
5. **Not applicable is a decision.** Record why a path does not apply.

## Workflow

### 1. Define the feature

Write one sentence: *who* does *what* to achieve *which outcome*. Then list:

- **Entry points** — every way a user reaches it (nav, link, notification, deep link, empty state CTA, keyboard shortcut)
- **Actions** — every verb the user can perform
- **Data** — what it reads and writes
- **Roles** — who can see it, who can act

If you cannot write these, the feature is under-specified. Stop and resolve that first (see `user-flows`, `information-architecture`).

### 2. Walk the eight paths

For each path, answer the questions, mark a status, and record evidence.

**Status values:** `complete` · `partial` · `missing` · `n/a (reason)` · `unknown` (could not verify)

#### Happy path
- Can the primary goal be completed end to end without workarounds?
- Is success confirmed to the user in a way they will notice?
- After success, is the next step obvious (view result, do another, return)?

#### Error path
- What happens when each request fails: network, timeout, validation, 4xx, 5xx?
- Is user input preserved after an error?
- Does every error state name a next action?
- Can a failed action be retried without duplicating side effects?

#### Empty path
- What does a first-time user see before any data exists?
- What does a filtered or searched-to-nothing view show?
- Does the empty state lead to the action that fills it?

#### Loading path
- Is there feedback for every wait over ~300ms?
- Are double submissions prevented?
- Does background refresh keep existing content visible?
- What happens if the user navigates away mid-request?

#### Permission path
- What does each role see — including roles that cannot act?
- Are forbidden actions hidden, disabled with a reason, or discoverable with a request path? Is that choice consistent?
- Is the server enforcing what the UI hides?
- What happens when permission changes while the page is open?

#### Mobile path
- Does the feature work at ~360px width and with touch only?
- Do hover-only affordances have a touch equivalent?
- Does the on-screen keyboard cover inputs or primary buttons?
- Are tables, toolbars, and multi-pane layouts transformed rather than squeezed?

#### Accessibility path
- Can the whole goal be completed with a keyboard alone?
- Where does focus go after opening, closing, submitting, deleting, and navigating?
- Are state changes (errors, success, loading complete) announced to screen readers?
- Are all controls labeled, and is nothing conveyed by color alone?

#### Recovery path
- Can the user undo or reverse what they just did? If not, were they warned?
- Is unsaved work protected from refresh, back button, tab close, and session expiry?
- Can a user who abandoned midway resume later?
- If something is deleted or broken, is there a route back (trash, history, support)?

### 3. Gather evidence

In a codebase, look for concrete signals rather than reading everything:

| Path | Where to look |
|---|---|
| Error | request calls without `catch`/error branches; error boundaries; how `error` from the data hook is rendered |
| Empty | conditions on `length === 0`, `!data`; whether they distinguish filters |
| Loading | disabled state on submit buttons; `isPending`/`isLoading` usage; skeleton components |
| Permission | role checks in UI vs. server handlers; routes without guards |
| Mobile | breakpoint/container-query usage in the feature's components; `:hover`-only styles; fixed widths |
| Accessibility | `<div onClick>`; dialogs without focus handling; missing `aria-live`; unlabeled icon buttons |
| Recovery | `beforeunload` / route-leave guards; draft persistence; soft-delete flags; undo handlers |

If the app is runnable, exercise each path: throttle the network, block a request, log in as a lower role, resize to 360px, unplug the mouse.

### 4. Score and rank gaps

Rank each gap:

- **P0 — harm:** data loss, security exposure, irreversible mistake possible, user stuck with no way forward
- **P1 — failure:** goal cannot be completed on a supported path (mobile, keyboard, a role)
- **P2 — confusion:** goal completable but user is uncertain what happened or what to do
- **P3 — inconsistency:** works, but differs from the rest of the product

### 5. Route each gap

| Gap type | Skill |
|---|---|
| Missing states on a surface | `interface-states` |
| Action feedback, retries, races, optimistic updates | `async-interactions` |
| Dead ends, missing branches, interruption, resume | `user-flows` |
| Wrong placement, unclear hierarchy, page vs modal | `information-architecture` |
| Delete/overwrite without safeguards | `destructive-actions` |
| Focus lost or misplaced | `focus-management` |
| Breaks at small widths or with touch | `responsive-behavior` |
| Breaks with long/missing/unusual content | `content-resilience` |
| Unclear messages, labels, errors | `ux-writing` |
| Behaves differently from similar features | `pattern-consistency` |

## Checklist

- [ ] Feature defined as a user goal with entry points, actions, data, and roles
- [ ] All eight paths have a status and evidence (or a reason for n/a)
- [ ] `unknown` statuses are listed as things to verify, not treated as passes
- [ ] Every gap is ranked P0–P3
- [ ] Every gap is routed to a skill or a concrete fix
- [ ] P0 gaps are flagged as ship blockers

## Common Mistakes

- **Reviewing the component, not the goal.** The modal is complete; the flow that opens it from a notification is broken.
- **Counting "the button is disabled while loading" as the loading path.** What about page load, refetch, and navigation mid-request?
- **Checking permission in the UI only.** Hidden is not forbidden.
- **Marking mobile complete because the layout reflows.** Reflowing is not the same as usable with a thumb and an on-screen keyboard.
- **Treating accessibility as a lint pass.** Automated checks catch labels and contrast, not focus order after deleting a row.
- **No recovery path considered** because nothing went wrong during the demo.

## Example

**Feature:** "Export a report as CSV"

| Path | Status | Evidence / Gap | Rank | Route |
|---|---|---|---|---|
| Happy | complete | Click Export → file downloads | — | — |
| Error | missing | `fetch('/export')` has no error branch; failure is silent | P1 | async-interactions |
| Empty | partial | Exporting 0 rows downloads an empty CSV with no warning | P2 | interface-states |
| Loading | missing | Large exports take 40s+; no indicator; users click repeatedly → duplicate jobs | P0 | async-interactions |
| Permission | complete | Button hidden for viewers; `/export` returns 403 for viewers | — | — |
| Mobile | partial | Button lives in a hover toolbar unreachable on touch | P1 | responsive-behavior |
| Accessibility | partial | Icon-only button without accessible name | P2 | focus-management / a11y |
| Recovery | n/a | Export is read-only; nothing to undo | — | — |

**Ship blockers:** duplicate export jobs from missing loading feedback.

## Implementation Notes

- Turn the scorecard into a PR template or definition-of-done checklist so the paths are asked every time.
- Encode states as fixtures/stories so the empty, error, and permission paths are reviewable without breaking a real backend.
- For agents: run this skill after generating a feature and before reporting it as finished.

## Output Expectations

Produce:

1. **Feature definition** — goal sentence, entry points, actions, data, roles.
2. **Completeness scorecard** — `Path | Status | Evidence / Gap | Rank | Route` for all eight paths (split a path into multiple rows when it has multiple gaps).
3. **Ship blockers** — all P0 gaps.
4. **Next steps** — gaps grouped by the skill that owns them, in priority order.

State plainly when evidence was unavailable (for example, the app could not be run), and which statuses are therefore `unknown`.
