# How to design async form submission properly

Skills used: `async-interactions` → `ux-writing` → `focus-management` → `user-flows`

## The prompt

> Build a "Create project" form: name, description, visibility, and team members.

## 1. Action spec (async-interactions)

| Aspect | Decision |
|---|---|
| Duration | p50 400ms, p99 4s |
| Idempotency | idempotency key generated when the form opens; server dedupes |
| Optimistic | **no** — server assigns id and slug; failure modes include name conflicts |
| Pending | button: spinner + "Creating…", width reserved; fields read-only; Cancel stays enabled |
| Duplicates | button ignores clicks while pending; server dedupes by key |
| Success | navigate to new project; heading "Q3 plan created" region announced |
| Validation (422) | map to fields; stay on form |
| Conflict (409, name taken) | field error on name with suggestion |
| Network/5xx | keep all input; form-level error with Retry (same key) |
| Session expired (401) | re-auth dialog; form input preserved; resubmit after sign-in |
| Leave with input | route-leave guard only if any field is dirty |

## 2. Validation timing

- Validate a field **on blur** the first time, then **on change** once it has shown an error (so the error clears as soon as it's fixed).
- Don't show "required" errors on fields the user hasn't reached.
- On submit, validate everything.

## 3. Copy (ux-writing)

| Moment | Copy |
|---|---|
| Name helper | Up to 60 characters. You can change this later. |
| Name empty | Enter a project name |
| Name taken | You already have a project called "Q3 plan". Try "Q3 plan 2" |
| Members helper | Invited members get an email. |
| Network error | Couldn't create the project — check your connection. Everything you entered is still here. **Try again** |
| Server error | Something on our side stopped the project from being created. Your input is still here. **Try again** · Ref: 7F3A |
| Submit button | Create project |

## 4. Focus (focus-management)

| Event | Focus after | Announcement |
|---|---|---|
| Open form (page) | page heading | page title |
| Submit with 2 errors | error summary: "2 fields need attention" with links | summary content |
| Activate summary link | the field | field label + error |
| Network error | form-level error message (`tabindex="-1"`) | message |
| Success | new project page `<h1>` | "Q3 plan created" |

## 5. Interruptions (user-flows)

| Interruption | Behavior |
|---|---|
| Refresh | description and name restored from local draft (low stakes, cheap) |
| Back button | leave guard if dirty |
| Double submit on two tabs | second receives the first result via idempotency key |
