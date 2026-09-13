---
name: async-interactions
description: Design the full lifecycle of user-triggered asynchronous actions — pending feedback, timing thresholds, double-submit prevention, race conditions and stale responses, optimistic updates with rollback, retry and idempotency, cancellation, long-running and background jobs, polling vs push, uploads, and leaving the page with work in flight. Produces an action spec per operation. Use when implementing save, submit, delete, send, upload, import, export, sync, search-as-you-type, toggles, or anything that calls a server and changes data. Triggers on "optimistic update", "double click submits twice", "race condition", "loading button", "retry", "cancel request", "upload progress", "polling", "background job". Not for the static states of a data view (use interface-states).
---

# Async Interactions

## Purpose

Every action that talks to a server has a lifecycle: the user acts, time passes, the result arrives — or does not, arrives twice, or arrives out of order. This skill designs that lifecycle so the user always knows what is happening and the system cannot end up in a state the user did not intend.

## When to Use

- Implementing any mutation: save, submit, send, delete, toggle, reorder, upload
- Search, filter, or autocomplete that fires requests as the user types
- Operations that take more than a second or run in the background
- Bugs involving duplicates, flicker, values reverting, or "it said saved but it wasn't"

## Core Principles

1. **Acknowledge every action immediately.** Within ~100ms the user should see that the input registered, even if the result is seconds away.
2. **Feedback scales with duration.** A 200ms save and a 3-minute import need different treatment.
3. **The latest intent wins.** Responses that arrive out of order must not overwrite newer user input.
4. **Retries must be safe.** Any action the user can retry, or the client retries automatically, must not duplicate side effects.
5. **Optimism is a bet; only bet when you usually win and losing is cheap.**
6. **Never claim success before it is true** — unless the action is optimistic, in which case a failure must be loud and reversible.
7. **Work the user started should not vanish when they navigate.** Long operations continue, or the user is told they will not.

## Workflow

### 1. Inventory the actions

List every async action in scope with: trigger, request, typical and worst-case duration, side effects, and whether it is idempotent.

### 2. Choose feedback by duration

| Expected duration | Feedback |
|---|---|
| < 100ms | None beyond the control's pressed/changed state |
| 100ms – 1s | Inline indicator on the control (button spinner, subtle pending style); keep label width stable |
| 1s – 10s | Explicit pending state with label ("Saving…"), block conflicting actions, keep the rest of the UI usable |
| 10s – 60s | Determinate progress where possible, cancel option, say what is happening |
| > 60s or unknown | Move to background: user can leave; show progress in a persistent place; notify on completion |

Design for the **worst case** duration on a slow connection, not the local dev number.

### 3. Prevent duplicate submission

- Disable or ignore the trigger while pending — but keep it focusable/announced (`aria-disabled` or `aria-busy`) so keyboard and screen reader users are not dropped.
- Also make the server operation idempotent (idempotency key per user intent), because disabling a button does not stop retries, double taps across devices, or network replays.

### 4. Handle races and stale responses

Common races and their fixes:

| Race | Fix |
|---|---|
| Typeahead: response for "ap" arrives after "apple" | Abort previous request (AbortController) or ignore responses whose request id is not the latest |
| Rapid toggles: on-off-on sends three requests, finishes out of order | Send latest desired state, debounce, or serialize per resource |
| Edit while refetch in flight: refetch overwrites local edit | Pause/cancel refetch on mutate; merge or revalidate after mutation settles |
| Two tabs / users edit same record | Version or ETag check; show conflict with both values rather than last-write-wins silently |
| Navigate away, response arrives, updates unmounted view | Cancel on unmount or ignore late results |

### 5. Decide on optimistic updates

Use optimistic UI when **all** are true:

- The server accepts the action the vast majority of the time
- The result is easy to predict client-side
- Failure is cheap to reverse and to explain
- No money, legal, security, or external side effect (email sent, payment made) is involved

Good fits: likes, toggles, reordering, renaming, marking read, adding a comment.
Poor fits: payments, sending messages to other people's inboxes, publishing, permission changes, anything where the server computes the result.

When optimistic:
- Snapshot previous state before applying
- Mark the item as pending if the delay could be noticed (dimmed, "Sending…")
- On failure: roll back, **tell the user what did not happen**, and offer retry — a silent revert looks like a bug
- On success: reconcile with the server response (ids, computed fields)

### 6. Design failure and retry

- **Classify errors:** retryable (network, timeout, 5xx, 429) vs. not (validation, 403, 404, conflict).
- **Automatic retry** only for retryable errors on idempotent operations, with exponential backoff and a cap. Show "Retrying…" if the user is waiting.
- **Manual retry** keeps the user's input intact and re-sends the same intent (same idempotency key).
- **Validation errors** map to fields, not a toast.
- **Rate limiting (429)** tells the user when they can try again.

### 7. Support cancellation

- Provide cancel for anything over ~10s or anything the user might regret starting.
- Define what cancel means: abort request only, or also roll back server work already done? Say which.
- After cancel, return to a clear state — never leave a half-applied change without telling the user.

### 8. Long-running and background work

- Return a job id immediately; show the job in a persistent place (activity panel, notification, list row with status).
- Survive navigation and reload: job status comes from the server, not component memory.
- Completion notifies wherever the user is, with a link to the result.
- Partial success is a first-class result: "480 imported, 20 failed — download failed rows".
- **Polling vs push:** poll with backoff for short, infrequent jobs; use push (SSE/WebSocket) when many users watch progress or latency matters. Stop polling when the tab is hidden or the job is terminal.

### 9. Uploads

- Validate type and size **before** uploading; show limits up front.
- Per-file progress, cancel, and retry; one failed file does not fail the batch.
- Keep the form usable while uploads run; block submit only until required uploads finish, and say so.
- Resumable/chunked uploads for large files.

### 10. Leaving with work in flight

- Unsaved input: guard route changes and `beforeunload` only when there is real unsaved work — not on every page.
- Pending save: if the user navigates away, either finish the save in the background or warn.
- Offline: queue safe actions with visible "pending sync" status, or block with an explanation. Never silently drop.

## Checklist

- [ ] Every action acknowledges input within ~100ms
- [ ] Feedback matches worst-case duration
- [ ] Duplicate submission prevented in UI **and** idempotent on the server
- [ ] Out-of-order responses cannot overwrite newer intent
- [ ] Optimistic updates only where the criteria hold; each has rollback + visible failure message
- [ ] Errors classified retryable vs. not; retries preserve input and idempotency
- [ ] Long operations are cancellable with defined cancel semantics
- [ ] Background jobs survive navigation/reload and notify on completion
- [ ] Partial success is represented
- [ ] Uploads validate first and track per-file progress
- [ ] Unsaved/pending work is protected on navigation
- [ ] Pending state is announced to assistive tech (`aria-busy`, live region)

## Common Mistakes

- **Button disabled while loading but server not idempotent** — a flaky network retry creates two orders.
- **Toast says "Saved!" when the request is sent,** not when it succeeds.
- **Optimistic delete that silently reappears** on failure.
- **Search results flicker between old and new queries** because responses are not cancelled or sequenced.
- **Spinner replaces the button label,** the button shrinks, and layout jumps.
- **Progress bar that sits at 99%** because it was faked from time, not work.
- **Import job lives in component state;** closing the modal loses all visibility of it.
- **`beforeunload` on every page,** training users to ignore it.

## Example

**Action spec: "Save document title" (inline edit)**

| Aspect | Decision |
|---|---|
| Trigger | blur or Enter in title field |
| Duration | p50 120ms, p99 2s |
| Idempotent | yes (PUT with full value) |
| Optimistic | yes — new title shown immediately |
| Pending UI | none < 1s; after 1s show "Saving…" next to title |
| Duplicates | rapid edits: only latest value sent after current request settles |
| Race | refetch of document paused while title mutation pending |
| Success | subtle "Saved" for 2s; no toast |
| Failure (retryable) | auto-retry ×2 with backoff; then revert display to last saved, keep typed value in field, show inline "Couldn't save title. Retry" |
| Failure (validation) | keep field in edit mode with message "Title can't be empty" |
| Conflict | if server version changed: "This title was changed by Ana to 'Q3 plan'. Keep yours / Use theirs" |
| Leave page | pending save completes in background; if it fails, show toast on next page with retry |

## Implementation Notes

- Data libraries (TanStack Query, SWR, Apollo, RTK Query, Relay) provide mutation lifecycles, cancellation of in-flight queries, and rollback hooks; use them rather than hand-rolled flags.
- `AbortController` for fetch cancellation; pass the signal through to the request layer.
- Generate idempotency keys per user intent (on form open or first submit), not per request attempt.
- Keep the pending indicator inside the button without changing its width (reserve space or overlay the spinner).
- Announce completion/failure of non-focused actions via an `aria-live="polite"` region; use `assertive` only for failures that block the user.

## Output Expectations

Produce, per action:

1. **Action spec table** — trigger, duration, idempotency, optimistic (yes/no + why), pending UI, duplicate handling, race handling, success feedback, failure handling by error class, cancel semantics, navigation behavior.
2. **Lifecycle diagram** for complex actions (idle → pending → success | error → retry …).
3. **Server requirements** the UI depends on (idempotency keys, versioning, job ids, partial results).
4. **Gaps** in existing code, with file/line, when reviewing.
