# The states every data table needs

Skills used: `interface-states` → `content-resilience` → `destructive-actions` → `focus-management` → `responsive-behavior`

## The prompt

> Add a users table with search, sort, pagination, and bulk delete.

## 1. States (interface-states)

| # | State | UI | Next action |
|---|---|---|---|
| 1 | Loading (first) | header + 8 skeleton rows at real row height | — |
| 2 | Loading (page/sort/search change) | rows stay, dimmed; header progress bar | — |
| 3 | Empty — first use | "No users yet" | **Invite users** |
| 4 | Empty — no results | "No users match 'zz'" + active filter chips | **Clear search** |
| 5 | Populated | rows | row + bulk actions |
| 6 | Error | "Couldn't load users" in table body; header and search still usable | **Retry** |
| 7 | Stale | rows stay, "Couldn't refresh · Retry" | **Retry** |
| 8 | Selection active | bulk bar replaces toolbar: "3 selected · Delete · Clear" | bulk actions |
| 9 | Permission denied | no checkboxes or row actions for non-admins | — |

## 2. Content (content-resilience)

| Field | Max | Overflow rule |
|---|---|---|
| Name | 100 | clamp 1 line in table; full in title + accessible name |
| Email | 254 | truncate middle: `maximilian.alexander…@example.com` |
| Last active | — | relative < 7 days, absolute after; exact on focus/hover |
| Role | enum | never truncate |
| Avatar | — | initials fallback via `Intl.Segmenter` |

Quantity: 0 → state 3/4; 10,000 users → server-side pagination, sort, search; "Select all" selects the page, then offers "Select all 10,000 matching".

## 3. Bulk delete (destructive-actions)

Severity: R2 (soft delete, 30-day restore) × B3 (users lose access).

- Confirm: **"Remove 3 users?"** — "They'll lose access immediately. Their content stays in the workspace. You can restore them for 30 days." Buttons: **Remove 3 users** / Cancel. Initial focus: Cancel.
- Scope across pages stated explicitly when "Select all matching" is used.
- Partial failure: "2 of 3 users removed. You can't remove the workspace owner."

## 4. Focus (focus-management)

| Event | Focus after | Announcement |
|---|---|---|
| Change page | table caption/heading | "Page 2 of 14" |
| Sort column | stays on the column header button | "Sorted by name, ascending" |
| Search results update | stays in search | "12 results" |
| Remove single user (row menu) | next row's name → previous → search field | "Sam removed. Undo" |
| Bulk remove confirmed | first remaining row, or empty state action | "3 users removed" |

## 5. Mobile (responsive-behavior)

Strategy: card list (reading > comparing). Card: avatar, name, email (middle-truncated), role badge, "⋯" menu always visible. Selection via "Select" mode button, not hover checkboxes.
