// Interactive before/after demos: one skill, two panes, same UI with and without it.
// Data only, so head.ts, the prerenderer, and the router can all read it without pulling in components.
export const DEMO_PATHS = {
  destructiveActions: "/demo/destructive-actions",
  uxWriting: "/demo/ux-writing",
  interfaceStates: "/demo/interface-states",
  contentResilience: "/demo/content-resilience",
} as const;

export const DEMOS = [
  {
    path: DEMO_PATHS.destructiveActions,
    skill: "destructive-actions",
    title: "destructive-actions, with and without the skill",
    description:
      'The same delete buttons in the same app, side by side: the default "Are you sure?" dialog versus undo, consequence-specific confirmation, type-to-confirm, and delayed deletion.',
  },
  {
    path: DEMO_PATHS.uxWriting,
    skill: "ux-writing",
    title: "ux-writing, with and without the skill",
    description:
      "The same five moments in the same app, side by side: an offline save, a bad email, an empty search, a partial upload, and a locked control. Default copy versus copy that says what happened, whether your work is safe, and what to do next.",
  },
  {
    path: DEMO_PATHS.interfaceStates,
    skill: "interface-states",
    title: "interface-states, with and without the skill",
    description:
      "The same members table, side by side: independent loading/error flags that blank the screen on every refetch and throw away good data on failure, versus one state per region that keeps data visible, marks it stale, and gives every non-happy state a reason.",
  },
  {
    path: DEMO_PATHS.contentResilience,
    skill: "content-resilience",
    title: "content-resilience, with and without the skill",
    description:
      "The same activity feed, side by side: a long name that clips the timestamp off the row, a broken image icon, a mangled emoji initial, and a huge count crammed into a tiny badge, versus a feed that wraps, falls back, and stays legible at every extreme.",
  },
] as const;
