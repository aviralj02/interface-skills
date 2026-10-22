---
name: reduced-motion
description: Make every animation, transition, scroll effect, and autoplaying element respect prefers-reduced-motion, and prove that the reduced path still works — content visible, transitions finished, end events and timers resolved, focus and scroll correct. Inventories all motion (CSS, JS, animation libraries, canvas, video, View Transitions), classifies each as vestibular, non-vestibular, or essential, decides its reduced behavior, and hunts the bugs that only appear when motion is off. Produces a motion inventory with a reduced behavior and a verified result per item. Use when adding or reviewing animation, parallax, page transitions, carousels, scroll-linked or entrance effects, Framer Motion, GSAP, or Lottie, or when something breaks or vanishes with reduced motion on. Triggers on "prefers-reduced-motion", "reduced motion", "reduce motion", "vestibular", "motion sensitivity", "animation accessibility", "parallax", "autoplay". Not for designing the animations themselves, and not a full WCAG audit.
---

# Reduced Motion

## Purpose

Some people get dizzy, nauseous, or distracted by motion on screen, so they turn on "reduce motion" in their operating system. Agents add motion everywhere and test none of it with that setting on. The result is two kinds of failure. Either the motion plays anyway, or the app breaks when it doesn't: entrance animations leave content invisible, modals never unmount because `transitionend` never fires, and carousels freeze mid-slide. This skill makes the reduced path a first-class, tested path: every motion has a defined calm alternative, and nothing depends on motion actually running.

## When to Use

- Adding any animation, transition, parallax, scroll-linked effect, page or view transition, carousel, or autoplaying media
- Reviewing a UI that uses CSS keyframes, Framer Motion, GSAP, react-spring, Lottie, canvas or WebGL loops, or `scrollIntoView({ behavior: 'smooth' })`
- A bug report where content is missing, a dialog won't close, or a flow stalls only for some users (often people with reduced motion on)
- Before shipping a motion-heavy landing page or a redesign

Scope: **how motion behaves when the user asks for less**, within the area you were asked to work on: a component, a page, or a diff. For a whole app, inventory first, report, and fix in priority order rather than all at once. For focus order and screen reader announcements, use an accessibility audit; this skill only checks that reducing motion does not break them. For what the UI shows while work is pending, use `async-interactions`. For the states of a surface, use `interface-states`.

## Core Principles

1. **Reduce, don't remove meaning.** Replace vestibular motion (movement through space, scaling, zooming, rotating, parallax) with an instant change or a short opacity crossfade. Keep motion that carries information, such as a progress bar or a spinner, and keep it small and slow.
2. **The resting state must be the visible, correct state.** An element's style with no animation running must show the content in its final place. Animations decorate the path to that state; they never hold content hostage.
3. **Nothing waits on motion.** Logic that waits for `transitionend`, `animationend`, an animation library's `onComplete`, or a timer matched to an animation's duration must still run when the motion is skipped.
4. **Fix in place, with the codebase's own tools.** Change only motion that plays under reduce or breaks under reduce. Reuse the project's existing reduced-motion helper, hook, Tailwind variants, or library setting. Add a shared helper only when new JavaScript needs one that doesn't exist yet. Don't migrate working motion to a new pattern, rewrite animations, or add dependencies to satisfy this skill.
5. **Read the preference live.** Users change the setting while the page is open. Render-time values must subscribe to changes, and handlers must read the value at call time.
6. **Motion that plays on its own must also be stoppable.** Anything that moves for longer than 5 seconds without user action (carousels, marquees, background video) needs a pause control for everyone, not only reduced-motion users.
7. **Verified with the setting on, not inferred from the code.** Every inventory row is checked in a browser emulating `reduce`.

## Workflow

### 1. Find every source of motion

Search the area in scope, then confirm by using the UI. Note any reduced-motion helper, hook, or setting the project already has; fixes reuse it. Motion hides in more places than `@keyframes`:

| Layer | Look for |
|---|---|
| CSS | `animation`, `@keyframes`, `transition` on `transform`/`opacity`/`filter`/`clip-path`, `scroll-behavior: smooth`, `scroll-snap` with momentum, `view-transition-name`, `animation-timeline` (scroll-driven) |
| Utility classes | Tailwind `animate-*`, `transition-*`, `duration-*`, and whether `motion-safe:` / `motion-reduce:` variants exist |
| JS (DOM) | `element.animate(`, `requestAnimationFrame`, `setInterval` that advances slides, `scrollIntoView({ behavior: 'smooth' })`, `scrollTo({ behavior })`, `document.startViewTransition` |
| Libraries | Framer Motion (`motion.`, `animate`, `AnimatePresence`), GSAP (`gsap.to`, ScrollTrigger), react-spring, auto-animate, Lottie, Swiper, Embla, AOS-style reveal-on-scroll |
| Media | `<video autoplay>`, animated GIF/WebP/APNG, canvas or WebGL render loops, background video heroes |
| Event dependencies | `transitionend`, `animationend`, `onAnimationComplete`, `onComplete`, `setTimeout` used to remove or swap elements after an animation |

### 2. Classify each motion

| Class | Examples | Reduced behavior |
|---|---|---|
| **Vestibular** (movement through space) | parallax, slide-ins, zoom, scale-on-enter, rotating or spinning decoration, page transitions that pan, scroll-jacking, smooth scrolling over long distances | Remove the movement. Show the end state instantly, or crossfade opacity in ≤ 200ms |
| **Non-vestibular** (in-place change) | color and opacity fades, small hover shifts of a few pixels, underline draws, skeleton shimmer | Usually keep, shortened; drop any translate or scale component |
| **Essential** (motion carries information) | progress bars, loading spinners, drag feedback, a playing video the user started | Keep the information. Slow it down or make it static (e.g. a pulsing dot instead of a spinning ring), but never remove the signal |
| **Autoplay** (moves without user action) | carousels, marquees, background video, looping Lottie, animated hero illustrations | Off by default under reduce: show a static first or poster frame and a play control. For everyone: a pause control if it runs longer than 5s |

### 3. Write the reduced behavior per item

For each inventory row, state exactly what the user sees with `reduce` on: the end state, an opacity fade, or a static frame. Write "same, shortened to 150ms" only for non-vestibular rows. Don't write "disabled" without saying what appears instead.

### 4. Hunt the reduced-path bugs

These are the failures that only exist when motion is off. Check every row against each one:

| Hazard | How it breaks | Fix |
|---|---|---|
| **Hidden resting state** | Element is `opacity: 0` or translated off-screen in its base style and the animation reveals it; with the animation removed it stays invisible | Make the base style visible; put the hidden start state inside the animation's `from` with `animation-fill-mode: both`, or inside the motion-allowed media query |
| **End event never fires** | `transition: none` means `transitionend` never fires, so a dialog never unmounts, a toast never clears, or a state machine waits forever | Don't depend on the event alone: call the completion directly when reduced, use a 0.01ms duration instead of `none` so the event still fires, or add a timeout fallback |
| **Library callback skipped** | `onComplete` / `onAnimationComplete` never runs when the library's reduced mode skips the tween | Confirm the library still calls completion with zero duration (GSAP and Framer Motion do when duration is 0); otherwise run the follow-up yourself |
| **Timer tied to duration** | `setTimeout(remove, 300)` still waits 300ms, or worse, a duration constant becomes 0 and races the render | Derive durations from one function that returns 0 under reduce, and run the follow-up on the next frame |
| **Reveal-on-scroll observer** | IntersectionObserver adds a `.visible` class that starts the animation; with motion off, the class never applies, or applies only to a stuck hidden style | Content is visible without the class; the class only adds motion |
| **Stuck scroll position** | Smooth `scrollIntoView` replaced by nothing, so the user never reaches the target; or scroll-jacking that ignores the setting | Use `behavior: reduced ? 'auto' : 'smooth'`; never drop the scroll itself |
| **Focus lost in a skipped transition** | Focus is moved in an `onComplete` that never runs, so a keyboard user is stranded after a dialog opens or a route changes | Move focus independently of the animation's end |
| **Layout jump** | The animated version reserved space during a transition; the instant version jumps or overlaps | Check the final layout at rest, not mid-animation |
| **Stale preference** | Value read once on mount; the user toggles the setting and nothing changes until reload | Subscribe to the media query's `change` event |
| **Server render mismatch** | Server assumes motion and the client hides content before hydrating; or a hydration warning appears because the server can't know the preference | Render the motion-agnostic visible state on the server; apply motion only after the client reads the preference |

### 5. Fix with the smallest change that holds

Fix only rows with a problem: vestibular or autoplay motion that plays under reduce, or a break risk from step 4. Rows that already behave are recorded and left alone. For each fix, prefer the most local option:

- **CSS:** a `@media (prefers-reduced-motion: reduce)` override, or a `motion-reduce:` / `motion-safe:` variant, on that component. Use the opt-in pattern (`no-preference`) for motion you are writing now, not as a migration of motion that works.
- **JavaScript:** read the preference through the project's existing helper or hook. If none exists and new code needs one, add the helper and hook from Implementation Notes once, in a shared place, and use them only where you are fixing something.
- **Libraries:** if a library animates many places, its single global reduced-motion setting is the smallest fix. One line at the root beats editing every call site.
- **Media:** no `autoplay` under reduce; a poster or first frame plus a visible play control.
- **Global safety net:** propose it; don't add it silently. It changes every animation on the site, including non-vestibular ones, so it needs the owner's agreement.

### 6. Verify with the setting on

Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering → "Emulate CSS media feature", or the test runner) and walk every flow in the inventory: load, navigate, open and close every overlay, submit, scroll to every section. Then toggle the setting **while the page is open** and repeat one flow. Record the result per row.

## Checklist

- [ ] Every source of motion found in step 1 is in the inventory, including JS, library, media, and smooth-scroll motion
- [ ] Every row has a class and a concrete reduced behavior (not just "disabled")
- [ ] No vestibular motion plays under reduce
- [ ] Essential motion still conveys its information under reduce
- [ ] Every element's resting style is visible and correctly placed with all animation off
- [ ] Nothing waits on `transitionend` / `animationend` / `onComplete` without a reduced path or a fallback
- [ ] Focus moves correctly after overlays and route changes with motion off
- [ ] Smooth scrolling becomes instant scrolling; the scroll still happens
- [ ] Autoplay is off under reduce; anything moving over 5s has a pause control for everyone
- [ ] JS reads the preference at call time in handlers and subscribes to changes for rendering
- [ ] The server renders visible content without depending on the preference
- [ ] Every row verified in a browser emulating `reduce`, plus one live toggle

## Common Mistakes

- **`animation: none` on a fade-in whose base style is `opacity: 0`.** The content is now permanently invisible, exactly for the users who turned motion down.
- **Treating reduced motion as "no animation at all."** Removing the progress bar or the loading spinner hides state; the instruction is to reduce motion, not information.
- **`transition: none` on a dialog that unmounts on `transitionend`.** It never closes.
- **Checking `matchMedia` once in a module-level constant.** It's stale after the user changes the setting and wrong during server rendering.
- **Fixing CSS and forgetting JS.** The stylesheet is clean, but `element.animate`, GSAP timelines, and smooth `scrollIntoView` still move everything.
- **Blanket `* { animation: none !important }`.** Kills `animationend`, breaks every component that listens for it, and removes essential motion too.
- **Lottie or canvas loops that keep running** because they never check the preference; only CSS was audited.
- **Testing by reading the code.** Hidden resting states and stuck promises only show up in a browser with the setting on.
- **Rewriting the motion system to fix three bugs.** Converting every animation to a new pattern, replacing a library, or consolidating every `matchMedia` call is a refactor, not this job. Fix the rows that fail, and list anything larger as a recommendation.

## Example

**Motion inventory: a marketing landing page**

| Motion | Where | Class | Reduced behavior | Break risk found | Verified |
|---|---|---|---|---|---|
| Hero parallax on scroll and pointer | `Hero.tsx:40` | Vestibular | Static image; parallax variables stay 0 | none: the hook exits early under reduce | ✓ |
| Headline fade-up on load | `index.css:120` | Vestibular | Shown in place, no rise | **Hidden resting state**: base style was `opacity: 0`. Fixed by moving the start state into `from` with `fill-mode: both` | ✓ |
| Logo marquee (infinite scroll) | `Logos.tsx:12` | Autoplay | Static row, wraps to two lines | Had no pause for anyone: added a pause button | ✓ |
| Feature cards slide in on scroll | `Reveal.tsx:8` | Vestibular | Visible on load, no slide | **Reveal-on-scroll**: content only appeared once `.in-view` was added; base style now visible | ✓ |
| Pricing toggle number roll | `Price.tsx:30` | Non-vestibular | Instant number swap | none | ✓ |
| Signup dialog scale-in | `Dialog.tsx:55` | Vestibular | 120ms opacity fade only | **End event**: unmount waited on `transitionend`; now unmounts directly when reduced | ✓ |
| "Back to top" smooth scroll | `Footer.tsx:18` | Vestibular | Instant jump to top | none; the scroll itself is kept | ✓ |
| Upload progress bar | `Upload.tsx:70` | Essential | Bar still fills; no shimmer | none | ✓ |
| Background hero video | `Hero.tsx:12` | Autoplay | Poster frame + play button | `autoplay` attribute was unconditional: now set only when motion is allowed | ✓ |

**Ship blockers before the fix:** invisible headline and feature cards, and a signup dialog that never closed, all for reduced-motion users only.

## Implementation Notes

**CSS: opt in to motion** (preferred for new code):

```css
.card { opacity: 1; transform: none; } /* the resting state is the final state */

@media (prefers-reduced-motion: no-preference) {
  .card { animation: card-in 400ms ease-out both; }
  @keyframes card-in { from { opacity: 0; transform: translateY(12px); } }
}
```

Tailwind: `motion-safe:animate-…` and `motion-reduce:transition-none` map to the same queries.

**CSS: global safety net**, only with the owner's agreement (see step 5):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

`0.01ms` rather than `none` is deliberate: animations jump to their end state, and `animationend` / `transitionend` still fire, so listeners keep working. It's a net, not a design. It also flattens non-vestibular fades and can't reach JS, canvas, or video motion.

**JavaScript: one call-time helper**, added only if the project has none. Use it in event handlers, timers, and animation callbacks, where a value captured at render could be stale, and in any non-component function:

```ts
const QUERY = "(prefers-reduced-motion: reduce)";

/** Call-time read. SSR-safe: returns false (animate) when there is no window, matching the pre-hydration render. */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && (window.matchMedia?.(QUERY).matches ?? false);
}
```

**JavaScript: one subscribing hook** for values used while rendering, so a mid-session toggle re-renders. The React shape is below; Vue, Svelte, and Solid have direct equivalents (a ref or store updated from the same `change` listener):

```ts
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => false);
}
```

**Durations and completions from one place**, so nothing waits on motion that didn't run:

```ts
export const motionMs = (ms: number) => (prefersReducedMotion() ? 0 : ms);

// Don't rely on transitionend alone:
function close() {
  if (prefersReducedMotion()) return unmount();
  el.addEventListener("transitionend", unmount, { once: true });
  setTimeout(unmount, motionMs(300) + 50); // fallback if the event never fires
  el.classList.add("closing");
}
```

**Libraries:** use one global switch, at the root. Examples:
- Framer Motion: `<MotionConfig reducedMotion="user">`, which drops transform and layout animation and keeps opacity.
- GSAP: `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` condition.
- Lottie: `goToAndStop(lastFrame, true)`.
- Carousels: `autoplay: !prefersReducedMotion()`.

**Canvas, WebGL, and `requestAnimationFrame` loops:** check the preference before starting the loop. When reduced, draw one static frame and stop; restart if the setting changes.

**Smooth scroll:** `el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" })`. Keep the scroll; drop only the glide.

**Testing:**
- **Playwright:** `await page.emulateMedia({ reducedMotion: "reduce" })`, then assert key content `toBeVisible()` and that overlays close.
- **Puppeteer:** `page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }])`.
- **Unit tests:** stub `window.matchMedia` so it returns `matches: true`.
- **OS settings, for manual checks:**
  - macOS: Accessibility → Display → Reduce motion.
  - Windows: Accessibility → Visual effects → Animation effects off.
  - iOS: Accessibility → Motion.
  - Android: Remove animations.

## Output Expectations

Produce:

1. **Motion inventory**: `Motion | Where (file:line) | Class | Reduced behavior | Break risk found | Verified` for every source of motion in scope.
2. **Fixes** for every row that fails, as minimal code changes or exact instructions with file and line. Leave passing rows untouched. Anything bigger than a local fix (a global safety net, a library-wide setting, a shared helper) is listed as a recommendation with its blast radius unless the user asked for it.
3. **The switch used**: which existing helper, hook, variant, or library setting the fixes rely on, or the one added because none existed, and where it lives.
4. **Verification record**: how `reduce` was emulated, the flows walked, the result of the live toggle, and any test added (for example a Playwright test that runs the key flows with `reducedMotion: "reduce"`).

Say plainly which rows could not be verified in a browser, and mark them `unverified` rather than passing them.
