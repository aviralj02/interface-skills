---
name: user-flows
description: Design complete user journeys across screens — entry points, decision points, success and failure branches, interruptions (refresh, back button, session expiry, closed tab), returning users, and exit points — instead of isolated screens. Produces a flow diagram, step table, and interruption table. Use when planning a multi-step feature (signup, checkout, onboarding, upload, invite, import, wizard), when a feature spans pages or modals, or when users get stuck, lose progress, or land mid-flow from a link or notification. Triggers on "user flow", "journey", "wizard", "multi-step", "onboarding flow", "what happens after", "deep link". Not for the layout of a single screen.
---

# User Flows

## Purpose

Screens are designed one at a time; users experience them as a sequence that can be entered from anywhere, interrupted at any moment, and resumed days later. This skill designs the sequence — including every branch the happy-path mockup leaves out.

## When to Use

- A feature has more than one step, screen, or modal
- Users can arrive at a step from somewhere other than step one (email link, notification, bookmark, shared URL)
- A process takes long enough that users might leave and come back
- Support reports "I got stuck", "I lost my progress", "I don't know if it worked"

## Core Principles

1. **Start from the goal, end at the outcome.** A flow ends when the user's goal is met and they know it — not when the last form submits.
2. **Every step has an exit and a back.** Users must be able to leave without penalty and return without starting over, unless there is a stated reason not to.
3. **Every decision point has all its branches drawn.** If a step can fail, the failure is a branch with a destination, not a footnote.
4. **Interruption is the normal case.** Refresh, back button, closed tab, expired session, lost network, and switching devices will happen.
5. **The URL is part of the flow.** Steps that users may share, bookmark, or return to need addresses; steps that must not be re-entered need guards.
6. **Returning users are a different user.** Someone resuming a flow needs orientation, not step one.

## Workflow

### 1. Define the goal and the actors

- **Goal:** what the user is trying to achieve, in their words
- **Outcome:** the observable end state (account exists, file processed, teammate joined)
- **Actors:** everyone involved — e.g. an invite flow has an inviter and an invitee, each with their own flow

### 2. List entry points

For each: where does it land, what context does it carry, and what if the user is not signed in, lacks permission, or the target no longer exists?

| Entry point | Lands on | Context carried | If signed out | If target invalid |
|---|---|---|---|---|
| Primary nav | step 1 | none | sign-in → back to step 1 | — |
| Empty-state CTA | step 1 | source = empty state | — | — |
| Email link | step 3 | token | sign-in → back to step 3 with token | expired-link page with resend |
| Notification | result | job id | sign-in → result | "This job was deleted" |

### 3. Map steps and decision points

Draw the flow. Use text or Mermaid — whichever the team can maintain.

```text
Import contacts
    ↓
Choose source ── [CSV] ── Upload file
    │                        ↓
    │                    Validate file
    │                      ├── Unreadable → error: "Not a valid CSV" → Upload file
    │                      ├── Too large  → error with limit → Upload file
    │                      └── Valid
    │                            ↓
    └── [Google] ── OAuth ──┬── Denied → explain what's needed → Choose source
                            └── Granted
                                  ↓
                            Map columns ── (auto-mapped ≥ 90%?) ── skip to Review
                                  ↓
                               Review (show conflicts: 12 duplicates)
                                  ├── Cancel → confirm discard → Contacts list
                                  └── Import
                                        ↓
                                   Processing (background, can leave)
                                     ├── Partial: 480 imported, 20 failed → download error rows
                                     ├── Failed → reason + retry (no duplicates)
                                     └── Complete → Contacts list, filtered to new
```

For every decision point, confirm each branch has a destination and a way forward.

### 4. Write the step table

| Step | User intent | Required input | Can go back? | Persisted? | URL | Failure branches |
|---|---|---|---|---|---|---|
| Choose source | pick where contacts come from | source | — | no | `/import` | — |
| Upload | provide file | file | yes | file id on server | `/import/upload` | invalid, too large, network |
| Map columns | confirm fields | mapping | yes | draft | `/import/:id/map` | required field unmapped |
| Review | verify before commit | decision on conflicts | yes | draft | `/import/:id/review` | stale draft (file expired) |
| Processing | wait / leave | — | no | job | `/import/:id` | partial, failed |

### 5. Design interruptions

For each step, decide what happens on:

| Interruption | Decide |
|---|---|
| Refresh | Does the step restore? From URL, local draft, or server draft? |
| Back button | Previous step with input intact, or leave the flow? Never "Confirm form resubmission". |
| Tab closed / navigated away | Warn only if unsaved input would be lost. Save drafts where cheap. |
| Session expires | Re-authenticate and return to the same step with input intact. |
| Network lost | Which steps still work? Is submission queued, blocked, or retried? |
| Another tab/device | Can the flow be continued elsewhere? What if both submit? |
| Long delay | Does anything expire (tokens, uploads, reservations, prices)? Tell the user before, not after. |

### 6. Design the return

- **Resume:** where does a returning user land? Show progress ("Step 3 of 4 — mapping columns") and what was already done.
- **Abandoned drafts:** how long are they kept, where can users find them, how are they discarded?
- **Completed flows:** a second visit to a finished flow's URL should show the result, not restart it.

### 7. Define exit points

- **Success exit:** where the user lands, what confirms success, the obvious next action
- **Cancel exit:** what is discarded, whether it is confirmed, where the user lands
- **Failure exit:** what the user can do now (retry, contact support, save and exit)

## Checklist

- [ ] Goal and observable outcome written
- [ ] Every entry point listed with signed-out and invalid-target handling
- [ ] Every decision point has all branches drawn to a destination
- [ ] Every failure branch has a way forward
- [ ] Back works on every step that allows it, with input intact
- [ ] Refresh, session expiry, and closed tab are designed per step
- [ ] Steps that should be linkable have URLs; steps that should not be re-entered are guarded
- [ ] Anything that expires is communicated before it expires
- [ ] Returning users land with orientation, not at step one
- [ ] Success, cancel, and failure exits all have destinations
- [ ] Multi-actor flows have a flow per actor

## Common Mistakes

- **The flow ends at "Submit".** No confirmation screen, no destination, no next step.
- **Wizard state in memory only.** Refresh at step 4 of 5 restarts from step 1.
- **Deep links that assume a fresh session**, dropping the token or target after sign-in.
- **Validation only on the final step,** sending the user back through three screens to fix one field.
- **Cancel with no confirmation after significant input,** or confirmation for cancelling an empty form.
- **Background jobs that disappear** when the user navigates away, with no place to find the result.
- **Invitee flow never designed** because the inviter's flow was the ticket.

## Example

**Flow:** accept a team invitation (invitee side)

```text
Email "Join Acme on Product"
    ↓ click link (token)
Has account?
 ├── No → Sign up (email prefilled, locked) → verify email → [Join]
 └── Yes → Signed in?
            ├── No → Sign in → return with token
            └── Yes, but different email → "This invite is for jo@acme.com" → switch account / request new invite
                ↓
Token valid?
 ├── Expired → "Invite expired" → [Ask Sam to resend] (notifies inviter)
 ├── Revoked → "This invitation is no longer active" → go to your workspaces
 ├── Already accepted → go straight to workspace
 └── Valid → Join → workspace home with "Welcome to Acme" and 3 getting-started links
```

Interruptions: if the invitee closes the tab during sign-up, the link still works (token not consumed until join). If the seat limit was reached after sending, show "Acme has no free seats" and notify the inviter.

## Implementation Notes

- Encode step in the URL (`/import/:id/map`) when steps must survive refresh or be shared; guard steps whose prerequisites are missing and redirect to the earliest incomplete one.
- Preserve the intended destination through authentication (`?next=` or server-side stash), validating it to avoid open redirects.
- Server drafts for high-effort input; local storage for low-stakes forms; nothing for trivial ones.
- Make final submission idempotent so a retried or double-clicked submit cannot create two results.
- Use `user-flows` output as input to `interface-states` (per step) and `async-interactions` (per submit).

## Output Expectations

Produce:

1. **Goal, outcome, actors.**
2. **Entry point table.**
3. **Flow diagram** (text or Mermaid) with all branches.
4. **Step table** — intent, input, back, persistence, URL, failure branches.
5. **Interruption table** — per step or per class of step.
6. **Return and exit design.**
7. **Open questions** — decisions that need a product owner (retention period for drafts, whether cancel needs confirmation, token expiry).
