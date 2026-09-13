---
name: information-architecture
description: Decide where information and functionality live — object model, navigation hierarchy, grouping, page vs modal vs drawer vs inline placement, tabs vs sections vs separate pages, primary vs secondary actions, progressive disclosure, what gets a URL, and information density. Produces an object map, structure map, and placement decisions with rationale. Use when adding a feature to an existing app, starting a new product area, when settings or navigation feel cluttered, or when choosing whether something should be a modal, a page, or a tab. Triggers on "where should this go", "modal or page", "tabs or sections", "navigation structure", "sitemap", "too many menu items", "settings page organization", "progressive disclosure". Not for visual layout or spacing.
---

# Information Architecture

## Purpose

Without deliberate structure, every feature becomes another sidebar item, another tab, another card, another modal. This skill decides placement from the product's objects and the user's tasks, so the structure scales and each decision can be explained.

## When to Use

- Adding a feature and unsure where it belongs
- Choosing between page, modal, drawer, popover, inline expansion, or tab
- Navigation has grown past what users can scan
- Settings have become a long undifferentiated list
- Users cannot find features that exist
- Designing a new product or major area from scratch

## Core Principles

1. **Objects before screens.** Identify the nouns (project, invoice, member) and their relationships first. Most navigation is a view of objects; most actions are verbs on them.
2. **Structure follows frequency and importance, not the org chart or the database.** What users do daily goes near the top; what they do once goes deeper.
3. **Placement is a function of task length, context need, and linkability.** Short tasks that need the underlying context stay near it; long or shareable tasks get their own page.
4. **One home per thing.** A feature can have many entry points but one canonical location.
5. **Name things the way users do.** Labels come from user vocabulary; internal jargon stays internal.
6. **Disclose progressively, but never hide the primary task.** Advanced options can be one step away; the main job cannot.
7. **If it should survive refresh or be shared, it needs a URL.** That includes selected tab, filters, and open detail views when users would reasonably link to them.

## Workflow

### 1. Build the object map

List the core objects, their key attributes, relationships, and the verbs users perform on them.

```text
Workspace
 ├── has many Projects
 │    ├── has many Tasks ── assigned to Member
 │    │    └── has many Comments
 │    └── has many Files
 ├── has many Members (role: owner | admin | member | guest)
 └── has one Billing account
```

| Object | Key verbs | Frequency | Who |
|---|---|---|---|
| Task | create, update status, assign, comment | many/day | all |
| Project | browse, create, archive | weekly | all / admin |
| Member | invite, change role, remove | monthly | admin |
| Billing | view invoice, change plan | rarely | owner |

### 2. Group and rank

- Group objects and tasks by **user mental model** (what users expect together), validated where possible with real vocabulary from support tickets, search logs, or interviews.
- Rank by **frequency × importance**. High on both → primary navigation or always visible. Low frequency but high importance (billing failures, security) → reachable in one step and surfaced contextually when relevant.
- Limit top-level navigation to what users can scan (typically 5–9 items). Beyond that, introduce a level or a command menu.

### 3. Decide containers

Use the decision table for each feature or task.

| Container | Use when | Avoid when |
|---|---|---|
| **Inline** (edit in place, expand row) | Small edit, context essential, ≤ 2–3 fields | Validation is complex or the edit affects other regions |
| **Popover** | Quick choice from a short list; non-blocking | Contains a form, scrolls, or needs to be reached on touch reliably |
| **Modal dialog** | Short focused task (≤ ~1 minute), must complete or cancel before continuing, context behind is only reference | Long forms, multi-step processes, content users want to link to, anything opening another modal |
| **Drawer / side sheet** | Inspect or edit a record while keeping the list visible; sequential review of items | Primary creation flows with many fields on mobile (becomes full screen anyway) |
| **Full page** | Long or complex task, needs its own URL, can be shared/bookmarked, has its own sub-navigation | Tiny edits that force a round trip away from context |
| **Tabs** | Parallel views of the **same object**, users switch between them, each tab is substantial | Sequential steps (use a stepper), or content users need to compare side by side |
| **Sections on one page** | Related content users scan together, total length is manageable | Very long pages where users need only one part; independently loading heavy regions |
| **Separate pages in nav** | Distinct objects or jobs | Views of one object split up because the page got long |

Quick tests:
- *Would a user send this to a colleague?* → it needs a URL (page, or drawer/tab reflected in the URL).
- *Does the user need to see what's behind it while doing it?* → inline, drawer, or popover, not modal.
- *Could it take more than a minute or have unsaved work?* → not a modal, or a modal with draft protection.
- *Is it step 2 of something?* → stepper or flow, not tabs.

### 4. Rank actions

For each screen, classify actions:

| Tier | Treatment | Rule |
|---|---|---|
| Primary | Visible, prominent; at most one per region | The action most users came to take |
| Secondary | Visible, lower emphasis | Common but not the main job |
| Tertiary | Overflow menu, context menu, or keyboard shortcut | Rare, advanced, or bulk |
| Destructive | Separated from primary; never the default button | See `destructive-actions` |

Do not make an action hover-only if it is the primary or only way to do a task — touch and keyboard users cannot hover.

### 5. Apply progressive disclosure

- Default view covers the ~80% case; advanced options behind "Advanced", "More options", or a secondary page.
- Disclosure must be discoverable: a labeled control, not a hidden gesture.
- Do not hide options whose current value affects what the user sees; show the value even if editing is deferred ("Visibility: Private · Change").
- Remember disclosure state when users repeatedly expand the same thing.

### 6. Set density

Decide based on use: **scan and compare** (tables, dense lists, power users, daily use) vs. **understand and decide** (onboarding, settings explanations, infrequent tasks). Density is an IA decision before it is a visual one: it determines how much appears per view and what moves to detail views.

### 7. Validate the structure

- **Findability walk:** for the top 5–10 tasks, write the click path. More than 3 steps for a frequent task is a flag.
- **Label check:** would a new user predict what is behind each nav label?
- **Growth check:** where would the next three likely features go? If the answer is "another top-level item", the structure is brittle.

## Checklist

- [ ] Object map with relationships and verbs exists
- [ ] Tasks ranked by frequency × importance
- [ ] Every feature has one canonical home
- [ ] Container choice (inline/popover/modal/drawer/page/tab/section) is justified per feature
- [ ] Nothing that users would link to lives only in an un-addressable modal or tab
- [ ] One primary action per region; destructive actions separated
- [ ] No primary task is hover-only or hidden behind disclosure
- [ ] Labels use user vocabulary
- [ ] Top tasks reachable within ~3 steps
- [ ] Structure has room for foreseeable features

## Common Mistakes

- **Navigation mirrors the database or API** (`/entities`, `/configurations`) rather than user jobs.
- **Modal for everything,** including multi-step creation forms that lose all input on an accidental outside click.
- **Tabs used as a wizard** — users can jump to step 3 without step 1.
- **Settings as one giant page,** or split into so many tabs that search is the only way to find anything.
- **Same feature in three places with three different behaviors.**
- **Selected tab and filters not in the URL,** so sharing a link shows the colleague something else.
- **"More" menu as a dumping ground** for important actions that did not fit.

## Example

**Request:** "Add the ability to set up webhooks."

- **Object:** Webhook (url, events, secret, status, delivery log) belongs to Workspace; configured by admins; used rarely; debugged under pressure.
- **Home:** Settings → Developers → Webhooks (grouped with API keys, since the same user manages both).
- **List:** full page with table; primary action **Add webhook**.
- **Create:** modal — 3 fields, short, context irrelevant — *but* reveals the signing secret once after creation, so the success state stays in the modal until copied.
- **Detail / delivery log:** full page at `/settings/developers/webhooks/:id` — debugged during incidents and shared with colleagues.
- **Advanced:** retry policy and custom headers under "Advanced" in the edit page.
- **Contextual entry:** failed-delivery banner on the workspace home for admins, linking to the detail page.

## Implementation Notes

- Route structure should reflect the IA; nested routes for nested objects (`/projects/:id/tasks/:taskId`).
- Drawers and modals that represent a record can be routes rendered over the parent, preserving linkability.
- Use query parameters for view state (tab, filters, sort) when shareability matters; keep it out of the URL when it would leak or create noise.
- A command menu complements navigation for power users; it does not replace a scannable structure.

## Output Expectations

Produce:

1. **Object map** — objects, relationships, verbs, frequency, roles.
2. **Structure map** — navigation hierarchy (text tree) with canonical homes.
3. **Placement decisions** — `Feature | Container | Rationale | URL?`.
4. **Action hierarchy** per key screen.
5. **Disclosure plan** — what is default, what is advanced, how it is revealed.
6. **Findability walk** for top tasks, with any path over 3 steps flagged.
