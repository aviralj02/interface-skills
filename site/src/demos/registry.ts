// Interactive before/after demos: one skill, two panes, same UI with and without it.
// Data only, so head.ts, the prerenderer, and the router can all read it without pulling in components.
export const DEMO_PATHS = {
  destructiveActions: "/demo/destructive-actions",
} as const;

export const DEMOS = [
  {
    path: DEMO_PATHS.destructiveActions,
    skill: "destructive-actions",
    title: "destructive-actions, with and without the skill",
    description:
      'The same delete buttons in the same app, side by side: the default "Are you sure?" dialog versus undo, consequence-specific confirmation, type-to-confirm, and delayed deletion.',
  },
] as const;
