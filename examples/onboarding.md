# Designing onboarding as a flow, not a carousel

Skills used: `user-flows` → `information-architecture` → `interface-states` → `ux-writing`

## The prompt

> Add onboarding for new users: create a workspace, invite teammates, connect an integration.

## 1. Goal and actors (user-flows)

- **Goal:** a new user reaches a workspace that does something useful for them.
- **Outcome:** workspace exists, at least one real object created; teammates and integrations are optional.
- **Actors:** signup user; invited teammates (separate flow); existing user creating a second workspace.

## 2. Entry points

| Entry | Lands on | Notes |
|---|---|---|
| Signup | Step 1: workspace name | email verified first, or allowed later with a banner |
| Invitation link | **skips onboarding** → joins workspace | invitees must not create a second workspace by accident |
| "New workspace" from switcher | Step 1 | existing user; skip profile questions |
| Returning mid-onboarding | the first incomplete step | with progress shown |

## 3. Flow

```text
Workspace name (required)
    ↓
Invite teammates (optional) ── Skip ──┐
    ↓                                  │
Connect integration (optional) ─ Skip ─┤
    ↓                                  │
    └──────────────→ Workspace home ←──┘
                        │
                        └── Setup checklist (persistent, dismissible)
                              ├── Invite teammates   [done / not done]
                              ├── Connect integration
                              └── Create first project
```

Decision: optional steps are **skippable and resumable from the checklist**, so the only required step is the one without which nothing works.

## 4. Interruptions

| Interruption | Behavior |
|---|---|
| Closes tab after step 1 | workspace exists; next visit lands on home with checklist, not back in the wizard |
| Integration OAuth denied | return to step with "Nothing was connected. You can connect later from Settings → Integrations." |
| Invite email bounces | checklist item shows "1 invite couldn't be delivered" |
| Invalid teammate email | inline field error; valid ones still send |

## 5. Placement (information-architecture)

- Wizard steps: full pages with URLs (`/onboarding/workspace`, `/onboarding/invite`) so refresh and back work.
- Setup checklist: persistent panel on home until dismissed; each item links to its canonical home in Settings — onboarding doesn't create a second place to manage invites.

## 6. Home states (interface-states)

| State | UI |
|---|---|
| Empty — first use, nothing connected | checklist + "Create your first project" primary action |
| Empty — integration connected, sync running | "Importing from GitHub · 120 of 480 issues" with progress |
| Partial — sync finished with errors | "460 issues imported, 20 skipped. See why" |
| Populated | checklist collapses to "Setup 3/3 · Hide" |

## 7. Copy (ux-writing)

| Moment | Copy |
|---|---|
| Step 1 title | Name your workspace |
| Step 1 helper | Usually your company or team name. You can change it later. |
| Skip | Skip for now |
| Invite success | Invites sent to 3 people |
| Checklist dismissed | Setup checklist hidden. Find it again in Help. |
