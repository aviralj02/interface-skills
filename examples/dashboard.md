# Why your dashboard feels incomplete

Skills used: `feature-completeness` → `interface-states` → `async-interactions` → `responsive-behavior`

## The prompt

> Build an analytics dashboard with a revenue chart, a KPI row, and a recent orders table.

A typical first result renders four regions with mock data. It looks finished. It has one state.

## 1. feature-completeness pass

| Path | Status | Gap |
|---|---|---|
| Happy | complete | — |
| Error | missing | one failed request blanks the whole page |
| Empty | missing | new account shows `$0` everywhere and an empty chart axis |
| Loading | partial | full-page spinner on every date-range change |
| Permission | missing | "member" role can see revenue |
| Mobile | partial | table overflows; chart unreadable at 360px |
| Accessibility | partial | chart has no text alternative |
| Recovery | n/a | read-only |

## 2. interface-states: data sources and regions

```text
Dashboard
├── KPI row        GET /metrics/summary    non-blocking
├── Revenue chart  GET /metrics/revenue    non-blocking
├── Orders table   GET /orders?limit=10    non-blocking
└── Date range     URL ?range=30d          local
```

No region is blocking, so the page shell always renders.

| Region | State | UI | Next action |
|---|---|---|---|
| KPI row | Loading (first) | 4 fixed-size skeleton tiles | — |
| KPI row | Refetch (range change) | values stay, dimmed to 60%, small spinner in header | — |
| KPI row | Empty — first use | tiles show "—" with "No orders yet" under revenue | **Connect your store** |
| KPI row | Error | tiles show "—"; inline "Couldn't load metrics" | **Retry** |
| Chart | Empty — no results | axis with "No revenue in the last 7 days" | **Try 30 days** |
| Chart | Partial | today's data still processing | last point dashed + "Today is still updating" |
| Table | Stale | refetch failed | rows stay; "As of 10:42 · Retry" |
| Page | Permission denied | role = member | revenue regions replaced with "Revenue is visible to admins" |
| Page | Offline | connection lost | all regions keep data; banner "You're offline — showing last loaded data" |

## 3. async-interactions: date range change

| Aspect | Decision |
|---|---|
| Trigger | select 7d / 30d / 90d |
| Race | abort in-flight requests on new selection; ignore late responses |
| Pending UI | keep previous data, dim, header spinner after 200ms |
| URL | `?range=` updated so the view is shareable |
| Failure | revert selector to previous range; inline error with retry |

## 4. responsive-behavior

| Element | Compact | Expanded |
|---|---|---|
| KPI row | 2×2 grid | 4 across |
| Chart | 7 x-axis labels max; tap point for value | hover tooltip + keyboard point navigation |
| Orders table | card list: customer, amount, status | full table |
| Date range | select | segmented control |

## What changed

The mock-data dashboard had 1 state. The finished spec has 20+ defined states, no full-page spinner, scoped failures, a real first-use experience, a permission decision, and a mobile layout.
