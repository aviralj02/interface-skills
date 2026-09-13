---
name: destructive-actions
description: Design actions that delete, overwrite, revoke, cancel, reset, or otherwise permanently change user data — classify severity by reversibility and blast radius, choose the right safeguard (none, undo, soft delete with trash, confirmation dialog, type-to-confirm, delayed execution), write consequence-specific confirmations, handle bulk and cascading effects, and pair UI safeguards with server-side protection. Produces a destructive action inventory with a chosen pattern for each. Use when adding delete, remove, discard, reset, revoke, cancel subscription, overwrite, merge, bulk actions, or when reviewing confirmation dialogs. Triggers on "delete confirmation", "are you sure dialog", "undo", "soft delete", "trash", "irreversible", "bulk delete", "danger zone". Not for general form validation.
---

# Destructive Actions

## Purpose

The cost of a destructive action going wrong is paid entirely by the user. This skill matches the safeguard to the actual risk — so trivial deletions are fast, and catastrophic ones are hard to do by accident — and makes consequences explicit before, and recovery possible after.

## When to Use

- Adding any action that deletes, overwrites, discards, revokes, resets, cancels, or merges
- Adding bulk actions
- Reviewing "Are you sure?" dialogs
- A user has lost data by accident, or confirmation fatigue is causing users to click through warnings

## Core Principles

1. **Prefer recoverable over confirmable.** Undo and trash protect users better than dialogs they learn to dismiss.
2. **Friction proportional to harm.** Confirm rarely, and only where the action is irreversible or has a large blast radius. Over-confirming trains users to click "Yes" without reading.
3. **Name the object and the consequence.** "Delete 'Q3 plan' and its 24 tasks?" — not "Are you sure?"
4. **Show the blast radius.** Cascades (child records, shared links, other users affected, billing changes) are stated before the action, not discovered after.
5. **The destructive option is never the default.** Not the pre-focused button, not the Enter key target for irreversible actions, not visually primary next to routine actions.
6. **The server is the last safeguard.** Permissions, soft deletes, retention, and audit logs exist regardless of what the UI shows.

## Workflow

### 1. Inventory destructive actions

List every action that removes or changes data in a way the user might not want to keep:

delete, remove, discard draft, clear, reset to defaults, overwrite (import, replace file, restore version), revoke (tokens, access), cancel (subscription, order, job), merge, archive, unpublish, leave (workspace), transfer ownership, change a setting with side effects (disable 2FA, change region).

### 2. Classify severity

Assess each action on two axes:

**Reversibility**
- **R1 Reversible:** can be undone immediately with no loss (archive, hide, mark read)
- **R2 Recoverable:** can be restored for a period (soft delete to trash, version history)
- **R3 Irreversible:** gone or cannot be un-sent (hard delete, sent email, revoked key used by production, charge made)

**Blast radius**
- **B1 Self, single item**
- **B2 Many items or significant work** (bulk, large object, hours of input)
- **B3 Others affected** (shared data, team, customers, integrations, billing)

### 3. Choose the pattern

| Severity | Pattern |
|---|---|
| R1 × any | Act immediately; show undo when the result is not obvious |
| R2 × B1 | Act immediately + **undo toast** (5–10s) + restorable from trash |
| R2 × B2/B3 | Act + undo + trash; mention the count/impact in the toast; consider confirmation for B3 |
| R3 × B1 | **Confirmation dialog** with consequence, specific button label |
| R3 × B2 | Confirmation dialog listing what is affected (counts, names) |
| R3 × B3 | **Type-to-confirm** (name of the resource) or re-authentication; list who/what is affected; consider delayed execution with cancel window |

Other tools:
- **Delayed execution:** schedule deletion ("Your workspace will be deleted in 7 days. Cancel deletion") for account/workspace-level actions.
- **Hold-to-confirm:** for frequent but consequential actions on touch devices, with an accessible alternative.
- **Export before delete:** offer when users may need the data later.
- **Separation:** put catastrophic actions in a distinct "Danger zone" area, away from routine settings.

### 4. Write the confirmation (when one is needed)

Structure:

- **Title:** the action as a question with the object — "Delete project 'Q3 plan'?"
- **Body:** what will happen, what is affected, and whether it can be undone — "This permanently deletes 24 tasks and 8 files. Shared links will stop working. This can't be undone."
- **Primary destructive button:** specific verb + object — **Delete project**; styled as destructive
- **Secondary:** **Cancel** (or "Keep project")
- **Initial focus:** Cancel (or the dialog itself) for R3 actions
- **Type-to-confirm** (R3×B3 only): ask for the resource name, not "DELETE"; allow paste; button enabled only on exact match

Never: "Are you sure?" with "Yes/No", "OK/Cancel" for destruction, or dialogs that confirm routine reversible actions.

### 5. Design undo

- Toast with **Undo** that stays long enough to act (5–10s, pausing on hover/focus), reachable by keyboard, and announced to screen readers.
- Implementation choices:
  - **Deferred commit:** hide locally, commit after the undo window — simple, but lost if the tab closes; commit on unload or accept the risk for low-stakes items
  - **Soft delete:** commit immediately with `deleted_at`; undo clears it; purge later — robust and supports trash
- After undo, restore the item to the same position and restore focus to it.
- Multiple rapid deletions: stack or merge toasts ("3 items deleted · Undo") — do not let a new toast silently remove the undo for the previous one.

### 6. Handle bulk and cascades

- Show exact counts ("Delete 47 files") and, when mixed, what is excluded ("3 files are locked and won't be deleted").
- Where selection may include unseen items (select all across pages), state it: "All 1,204 matching items, not just the 50 on this page."
- Partial failure reports what was and wasn't deleted.
- Before cascades, list dependent objects and effects on others (assignees lose tasks, integrations stop, invoices remain).

### 7. Protect against accidental triggers

- Destructive buttons are separated from primary actions and not adjacent to frequently clicked controls.
- Keyboard shortcuts for destruction require confirmation or support undo.
- Swipe-to-delete has undo.
- Discarding unsaved work (close editor, cancel form) confirms only when there is meaningful unsaved input.

### 8. Server-side safeguards

- Authorize every destructive endpoint; do not rely on hidden buttons.
- Soft delete with retention for user content where feasible; hard-delete jobs for compliance.
- Audit log entries: who, what, when.
- Rate limits or anomaly checks for mass deletion.
- Idempotent delete endpoints (deleting twice is not an error the user sees).

## Checklist

- [ ] Every destructive action inventoried and classified (reversibility × blast radius)
- [ ] Pattern chosen per severity; no confirmation for R1 actions
- [ ] Undo available for recoverable actions, keyboard-reachable and announced
- [ ] Confirmations name the object, count, and consequence
- [ ] Destructive buttons use specific labels, not Yes/OK
- [ ] Irreversible dialogs do not default focus to the destructive button
- [ ] Cascading effects and affected people listed before acting
- [ ] Bulk actions state exact scope, including unseen items
- [ ] Partial failures reported
- [ ] Destructive controls separated from routine actions
- [ ] Server enforces permission, keeps audit log, and soft-deletes where feasible

## Common Mistakes

- **Confirming everything,** so users click through the one confirmation that mattered.
- **"Are you sure?" with Yes/No** — the user has to reconstruct what they're confirming.
- **Delete button placed next to Save,** same size and style.
- **Undo toast that disappears in 3 seconds** or cannot be reached by keyboard.
- **Optimistic hard delete** with no undo and no trash.
- **"Select all" that silently includes items on other pages.**
- **Type "DELETE" to confirm** — tests typing, not understanding which resource is being deleted.
- **Cascade discovered after:** deleting a user silently unassigns 300 tasks.

## Example

**Inventory for a project management app**

| Action | Reversibility | Blast radius | Pattern | Button label |
|---|---|---|---|---|
| Archive task | R1 | B1 | immediate + undo toast | Archive |
| Delete comment | R2 | B1 | immediate + undo toast | Delete |
| Delete task | R2 | B1 | immediate + undo toast + trash (30 days) | Delete |
| Bulk delete tasks | R2 | B2 | confirm with count + undo + trash | Delete 47 tasks |
| Remove member | R1 | B3 | confirm: lists tasks that will be unassigned | Remove Sam |
| Revoke API key | R3 | B3 | confirm: shows last-used time and "integrations using this key will stop working" | Revoke key |
| Delete project | R2 | B3 | confirm with counts, trash 30 days | Delete project |
| Delete workspace | R3 | B3 | type workspace name + re-auth + 7-day delayed deletion with cancel | Delete workspace |

## Implementation Notes

- Native `<dialog>` with `showModal()` handles focus containment and Escape; set initial focus explicitly for destructive dialogs.
- Toasts with undo need `role="status"` (or a live region) and must not auto-dismiss while focused or hovered.
- Return focus after deletion to the next logical item (see `focus-management`).
- Model soft delete in the data layer (`deleted_at`) and filter it out by default in queries.
- Use `ux-writing` for confirmation and toast copy.

## Output Expectations

Produce:

1. **Destructive action inventory** — `Action | Reversibility | Blast radius | Pattern | Label | Recovery path`.
2. **Confirmation copy** for every action that needs one (title, body, buttons, focus).
3. **Undo and trash design** — window, implementation strategy, restore behavior.
4. **Server requirements** — soft delete, retention, audit, permission checks.
5. **Findings** — when reviewing, each unsafe or over-guarded action with the fix and file/line.
