---
name: ux-writing
description: Write interface copy that tells users what happened, why, and what to do next — error messages, empty states, loading and progress text, confirmations, success messages, button labels, helper text, permission and disabled explanations, and notifications. Works from a state matrix or flow and produces a copy deck keyed to each state, plus a terminology glossary. Use when writing or reviewing error messages, "something went wrong" text, empty states, confirmation dialogs, button labels, toasts, or form validation messages. Triggers on "error message", "microcopy", "UX copy", "button label", "empty state text", "confirmation text", "what should this say". Not for marketing copy, brand voice, or removing AI-sounding prose.
---

# UX Writing

## Purpose

Interface copy is part of the behavior. A message that says "Error" leaves the user with the same problem and less trust. This skill writes copy that is tied to specific states and actions, so each message explains the situation and gives the user a way forward.

This skill focuses on **behavioral copy** — the words that appear because something happened. It absorbs the "error-messages" topic as its most important section.

## When to Use

- A state matrix, flow, or action spec exists and each state needs words
- Reviewing existing errors, empty states, confirmations, or toasts
- Button and link labels are vague ("OK", "Submit", "Click here")
- The same concept is named differently across the product

## Core Principles

1. **Say what happened, what it means for the user, and what they can do.** In that order, in as few words as possible.
2. **Be specific to the situation.** "We couldn't save your changes" beats "Something went wrong". The system usually knows more than it says.
3. **Answer the anxious question first.** For failures: *is my work safe?* For destructive actions: *what exactly will be lost?*
4. **Labels are verbs that describe the outcome.** "Delete project", "Send invite", "Save draft" — the user should know the result before clicking.
5. **Don't blame, don't joke about failures.** "You entered an invalid date" → "Enter a date in DD/MM/YYYY format". No "Oops!" when someone lost work.
6. **One term per concept, everywhere.** If it is a "workspace" in the nav, it is not an "organization" in the error.
7. **Copy must survive translation and length.** Avoid concatenated strings, idioms, and text baked into layouts that cannot grow.

## Workflow

### 1. Collect the moments

Start from the state matrix (`interface-states`), flow (`user-flows`), or action spec (`async-interactions`). List every moment that needs copy: state, trigger, audience, and what the user can do next.

### 2. Write errors with the error formula

For every error, answer:

| Question | Why it matters |
|---|---|
| What failed? | In the user's terms: "your changes", "the payment", "the upload of report.pdf" |
| Is the user's data safe? | The first fear. Say "Your draft is saved" when true. |
| Why (if useful and known)? | Only when it changes what the user does: "The file is over 25 MB" |
| What can they do? | Retry, fix a field, try later (with when), contact someone (with how) |

Levels:

- **Bad:** "Something went wrong."
- **Better:** "We couldn't save your changes. Check your connection and try again."
- **Best (context known):** "Couldn't save — you're offline. Your changes are kept on this device and will sync when you reconnect."

Error copy by type:

| Type | Pattern | Example |
|---|---|---|
| Validation | What is needed, not what is wrong | "Enter an email address like name@example.com" |
| Network / timeout | What failed + data safety + retry | "Couldn't load comments. Retry" |
| Server (5xx) | Not their fault + retry or wait | "Our server had a problem saving this. Your text is still here — try again in a moment." |
| Not found | What is missing + where to go | "This project was deleted or you don't have access. Go to all projects" |
| Permission | Who can do it + how to get access | "Only admins can change billing. Ask Priya (owner) for access." |
| Rate limit | When they can try again | "Too many attempts. Try again in 5 minutes." |
| Conflict | What changed + choices | "Ana edited this while you were working. Review changes" |
| Partial | What succeeded, what didn't, what to do | "18 of 20 files uploaded. 2 were too large. See details" |

Never show raw error codes or exception text as the main message. Include a reference id in secondary text when support may need it.

### 3. Write empty states by reason

| Reason | Structure | Example |
|---|---|---|
| First use | What this area is for + the action that fills it | "Invoices you send will appear here. **Create invoice**" |
| No results | Echo the criteria + how to broaden | "No invoices match 'acme' in Paid. **Clear filters**" |
| Cleared / done | Acknowledge + where things went | "All caught up. Archived notifications are in **Archive**." |
| No permission | Why + how to get access | "You don't have access to invoices. **Request access**" |

### 4. Write loading and progress text

- Short waits: no text; the indicator is enough.
- Longer waits: say what is happening in the user's terms — "Importing 2,400 contacts…", not "Processing…".
- Multi-step: name the current step — "Checking file · Importing · Finishing up".
- Very long: set expectations — "This usually takes about 2 minutes. You can leave this page."

### 5. Write actions and confirmations

- **Buttons:** verb + object when the object is not obvious. Primary button text matches the dialog title's verb.
- **Confirmation dialogs:** title states the action ("Delete 3 projects?"), body states the consequence ("Their tasks and files will be permanently deleted."), buttons are the specific action and "Cancel". Never "Are you sure?" + "Yes / No".
- **Success messages:** confirm the result and the next step if any — "Invite sent to jo@acme.com" — and skip them when the change is already visible on screen.

### 6. Explain disabled and limited states

Every disabled control that users might want to use needs a reason nearby or on focus/hover (with a touch-accessible equivalent): "Add at least one item to check out", "5 of 5 seats used · Upgrade".

### 7. Build the glossary

List product nouns and verbs with the one chosen term and rejected alternatives:

| Use | Don't use | Notes |
|---|---|---|
| workspace | organization, team, account | "team" is a group inside a workspace |
| delete | remove, erase, trash | "remove" only for taking a member out of a workspace (reversible) |
| archive | hide, close | reversible |

## Checklist

- [ ] Every error states what failed and a next action
- [ ] Data safety stated wherever users could fear loss
- [ ] No "Something went wrong", "Oops", "Invalid input", "Error occurred" as the full message
- [ ] Validation messages say what is required, next to the field
- [ ] Empty states distinguished by reason with the right action each
- [ ] Button labels describe the outcome; no bare "OK" / "Yes" / "Submit" for consequential actions
- [ ] Confirmations name the object and the consequence
- [ ] Disabled controls explain why
- [ ] Long waits say what is happening and how long
- [ ] Terms match the glossary everywhere
- [ ] Strings are complete sentences in the i18n layer (no concatenation), with plural rules

## Common Mistakes

- **Generic catch-all message** for every failure class, including ones retry cannot fix.
- **Blaming the user** ("You entered an invalid value") or being cute about failures.
- **Error text that names the implementation** ("Failed to fetch", "Null reference", "422").
- **Toast for validation errors,** which disappears before the user finds the field.
- **"Are you sure?"** dialogs with Yes/No buttons that do not say what happens.
- **Empty state that tells a user with filters on to "create your first item".**
- **Concatenated strings** (`"Delete " + count + " item" + (count > 1 ? "s" : "")`) that break in other languages.

## Example

Copy deck for a file upload widget:

| State | Copy |
|---|---|
| Idle | **Drop files here or browse** · PDF, PNG, or JPG up to 25 MB |
| Dragging | Drop to upload |
| Uploading | Uploading report.pdf · 42% · Cancel |
| Success | report.pdf uploaded |
| Too large | report.pdf is 31 MB. Files must be 25 MB or smaller. |
| Wrong type | report.docx isn't supported. Upload a PDF, PNG, or JPG. |
| Network fail | Upload of report.pdf stopped — connection lost. **Retry** |
| Partial batch | 4 of 5 files uploaded. photo.heic isn't supported. |
| Quota | Your workspace has used all 10 GB. **Manage storage** |
| No permission | You can view files but not upload. Ask an editor to add files. |

## Implementation Notes

- Keep copy in the i18n layer from the start with ICU plural/select messages.
- Map error kinds (from `interface-states`/`async-interactions`) to message keys in one place; components should not invent their own error strings.
- Put helper text and errors in the accessible description of their field (`aria-describedby`), and announce async errors via a live region.
- Leave room for 30–40% longer translations in buttons and headings.

## Output Expectations

Produce:

1. **Copy deck** — `Surface / Action | State | Copy | Notes (tone, length limit, variables)`.
2. **Error message map** — error kind → message template → next action.
3. **Glossary** — chosen terms, rejected alternatives, usage notes.
4. **Rewrites** — when reviewing, show `Before | After | Why` for each problem string, with file/line when in code.
