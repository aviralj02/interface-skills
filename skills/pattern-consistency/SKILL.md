---
name: pattern-consistency
description: Audit whether an interface behaves consistently — how destructive actions confirm, how modals close, how loading, empty, and error states look, when validation fires, how success is confirmed, what terms and labels are used, how dates and numbers are formatted, and where primary actions sit. Inventories each behavior across the product, identifies variants, chooses a canonical pattern with rationale, and produces a migration plan. Use when a product has grown across teams or AI-generated features, when similar features feel different, before extracting a design system, or when users report that the same action works differently in different places. Triggers on "inconsistent", "consistency audit", "every modal behaves differently", "standardize", "UX debt". Not for visual token consistency alone (spacing, colors).
---

# Pattern Consistency

## Purpose

Users learn an interface once and expect that knowledge to transfer. When deleting a comment asks for confirmation, deleting a file shows an undo toast, and deleting a project does neither, users cannot build a model of the product. This skill finds behavioral inconsistencies, decides which variant should win, and plans the convergence.

Visual consistency (spacing, color, radius) matters, but this skill is about **behavior and language**: what happens, when, and what it is called.

## When to Use

- A codebase built by multiple people, teams, or agents over time
- Before a design system or component library effort (feeds `design-system-evolution`)
- After a round of rapid feature work
- Users or reviewers notice "it works differently over there"

## Core Principles

1. **Consistency is about expectations, not sameness.** Different situations may deserve different patterns; the same situation should not.
2. **Inventory before opinions.** Collect every variant with its location before choosing a winner.
3. **Canonical choices need a rule, not a preference.** "Use undo for recoverable deletes, confirmation for irreversible" is a rule. "Use the one in settings" is not.
4. **Intentional exceptions are documented.** An exception with a reason is a pattern; one without is drift.
5. **Converge incrementally, prioritized by user impact.**

## Workflow

### 1. Choose the audit categories

Behavioral categories to inventory:

| Category | What to compare |
|---|---|
| Destructive actions | confirm vs undo vs nothing; button labels; placement |
| Dialogs & overlays | close on Escape, on outside click, close button presence, unsaved-change guard, focus return |
| Loading | first-load treatment (skeleton/spinner/none), refetch treatment, button pending state |
| Empty states | presence, structure, action |
| Errors | inline vs toast vs page; retry presence; wording |
| Form validation | when it fires (on blur / on change / on submit); error placement; required-field marking |
| Success feedback | toast vs inline vs redirect vs nothing |
| Saving model | explicit Save button vs autosave; unsaved change indicators |
| Action placement | primary action location (top-right, bottom, sticky footer); order of Cancel/Confirm |
| Navigation | where detail views open (page/drawer/modal); back behavior; what's in the URL |
| Tables & lists | sorting, selection, bulk actions, pagination vs infinite scroll, row click behavior |
| Terminology | names for the same object or verb (delete/remove, workspace/organization) |
| Formatting | dates (relative/absolute, format), numbers, currency, time zones, name display |
| Permissions | hidden vs disabled vs explained |
| Keyboard | shortcuts, Enter-to-submit, Escape behavior |

Pick the categories relevant to the product; don't audit everything at once.

### 2. Inventory variants

For each category, find every instance. In code, search for signals:

| Category | Search signals |
|---|---|
| Destructive | `delete`, `remove`, `destroy`, `confirm(`, `window.confirm`, dialog components with "danger"/"destructive" variants |
| Dialogs | dialog/modal component imports; `onClickOutside`, `closeOnOverlayClick`, `onEscapeKeyDown` props |
| Loading | `isLoading`, `isPending`, `Spinner`, `Skeleton`, `Loader` usages |
| Errors | `toast.error`, `catch`, error boundary components, `ErrorMessage`/`Alert` usages |
| Validation | form library `mode`/`reValidateMode` settings, `onBlur` validation handlers |
| Terminology | grep the UI strings/i18n catalog for synonyms |
| Formatting | `toLocaleDateString`, `format(`, `Intl.`, date library calls, hard-coded formats |

If the app runs, walk the equivalent flows side by side and record what happens.

Record:

| Category | Variant | Where (route / file) | Count |
|---|---|---|---|
| Delete | `window.confirm("Are you sure?")` | comments, tags | 2 |
| Delete | custom dialog "Delete X?" | projects, members | 2 |
| Delete | undo toast | tasks | 1 |
| Delete | no safeguard | files | 1 |

### 3. Classify each difference

- **Justified variation:** different situation warrants a different pattern (irreversible project delete vs recoverable task delete). Document the rule.
- **Drift:** same situation, different behavior. Needs convergence.
- **Defect:** a variant that is harmful regardless of consistency (no safeguard on irreversible delete). Fix first.

### 4. Choose canonical patterns

For each drift, pick the canonical pattern using, in order:

1. The variant that best serves users in that situation (consult the relevant skill: `destructive-actions`, `interface-states`, `async-interactions`, `ux-writing`, `focus-management`)
2. The variant closest to platform conventions
3. The most common variant (cheaper migration)

Write the rule: **situation → pattern**, plus allowed exceptions.

### 5. Plan the migration

Prioritize by impact:

- **P0:** defects (data loss risk, inaccessible behavior)
- **P1:** drift in high-traffic flows or core actions
- **P2:** drift in secondary areas
- **P3:** terminology and formatting cleanups

For each item: what changes, where, and whether a shared component or utility should be created first so the fix sticks (hand off to `design-system-evolution`).

### 6. Prevent regression

- Encode rules in shared components (a `ConfirmDestructive` or `useUndoableDelete`), lint rules (ban `window.confirm`), i18n glossary checks, or a PR checklist.
- Document patterns where contributors and agents will read them (a `PATTERNS.md`, the design system docs, or agent instructions).

## Checklist

- [ ] Audit categories chosen and scoped
- [ ] Every variant recorded with location and count
- [ ] Differences classified as justified, drift, or defect
- [ ] Canonical pattern chosen with a written situation → pattern rule
- [ ] Exceptions documented with reasons
- [ ] Migration prioritized by user impact
- [ ] Regression prevention defined (component, lint, docs, checklist)

## Common Mistakes

- **Standardizing on the most common variant even when it's the worst one.**
- **Forcing sameness across different situations** — confirming every delete because some deletes need confirmation.
- **Auditing visuals only** while dialogs close three different ways.
- **Producing a report with no canonical decision,** so nothing changes.
- **Fixing instances one by one without a shared component,** so drift returns next sprint.
- **Ignoring terminology,** which is the cheapest and most visible inconsistency to fix.

## Example

**Category: dialog closing behavior**

| Variant | Where | Escape | Outside click | Unsaved guard | Focus return |
|---|---|---|---|---|---|
| A | Create project | closes | closes (loses input) | no | no |
| B | Edit member | closes | ignored | no | yes |
| C | Billing address | ignored | closes | yes | yes |
| D | Confirm delete | closes | ignored | n/a | yes |

**Rule chosen:**
- Escape always closes; if there is unsaved input, show "Discard changes?" first.
- Outside click closes only dialogs with no input (informational, confirmations); ignored for forms.
- Focus returns to trigger in all cases.

**Migration:** A (P0 — data loss on outside click), C (P1 — Escape broken), B (P2 — add unsaved guard). Implement once in the shared `Dialog` wrapper via a `hasUnsavedChanges` prop; remove per-dialog overrides.

## Implementation Notes

- The most durable fix is a shared primitive with the rule built in and escape hatches that require a reason.
- Terminology: centralize in the i18n catalog and add a glossary check in CI for banned synonyms.
- For AI-generated codebases, add the canonical rules to the agent's instructions file so new features follow them.

## Output Expectations

Produce:

1. **Scope** — categories audited and what was examined (routes, files, flows).
2. **Variant inventory** per category — `Variant | Where | Count`.
3. **Classification** — justified / drift / defect for each difference.
4. **Canonical rules** — situation → pattern, with exceptions.
5. **Migration plan** — prioritized items with locations and the shared primitive to introduce.
6. **Regression prevention** steps.
