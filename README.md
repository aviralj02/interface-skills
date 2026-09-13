# Interface Skills

> UI patterns teach you how interfaces look. Interface Skills teaches you how they behave.

A collection of agent skills for building interfaces that hold up once people actually use them. The skills cover states, failures, flows, structure, content, and recovery.

Each skill is a `SKILL.md` file that follows the open [Agent Skills](https://agentskills.io) format. They work with Claude Code, Codex, Cursor, and any other agent that loads skills. You can also read them as checklists yourself.

## Why

Agents and developers often ship interfaces that look finished in a screenshot but fall apart in real use. Common failures:

- A request fails and the screen goes blank
- A new user lands on an empty page with no way forward
- A double-click creates two orders
- Deleting a row sends keyboard focus back to the top of the page
- A 90-character company name breaks the card layout
- Refreshing at step 4 of a wizard starts it over

Most UI skill collections focus on visual quality. These skills focus on behavior.

## The skills

| Skill | What it produces | Use when |
|---|---|---|
| [`feature-completeness`](skills/feature-completeness/SKILL.md) | Scorecard across 8 paths + ranked gaps routed to other skills | "Is this done?" — **start here** |
| [`interface-states`](skills/interface-states/SKILL.md) | State matrix + state model | Any surface that renders data |
| [`user-flows`](skills/user-flows/SKILL.md) | Flow diagram, step table, interruption table | Anything multi-step or entered from links |
| [`information-architecture`](skills/information-architecture/SKILL.md) | Object map, structure map, placement decisions | "Where should this go?" "Modal or page?" |
| [`async-interactions`](skills/async-interactions/SKILL.md) | Action spec per operation | Save, submit, upload, sync, search-as-you-type |
| [`ux-writing`](skills/ux-writing/SKILL.md) | Copy deck keyed to states, error map, glossary | Errors, empty states, confirmations, labels |
| [`content-resilience`](skills/content-resilience/SKILL.md) | Content contract + stress fixtures | Components showing data you don't control |
| [`responsive-behavior`](skills/responsive-behavior/SKILL.md) | Transformation matrix per size class | Anything that must work on phone and desktop |
| [`destructive-actions`](skills/destructive-actions/SKILL.md) | Inventory with severity → safeguard | Delete, overwrite, revoke, bulk actions |
| [`focus-management`](skills/focus-management/SKILL.md) | Focus map + live region plan | Dialogs, deletions, SPA routes, form errors |
| [`pattern-consistency`](skills/pattern-consistency/SKILL.md) | Variant inventory, canonical rules, migration plan | Product feels different in different places |
| [`design-system-evolution`](skills/design-system-evolution/SKILL.md) | Extraction report with abstraction verdicts | Duplicated components, "should I abstract this?" |

## How they compose

```text
feature-completeness                (what's missing?)
    ├── user-flows                  (journey across screens)
    │     └── information-architecture  (where things live)
    ├── interface-states            (every state of each surface)
    │     ├── async-interactions    (every action's lifecycle)
    │     ├── content-resilience    (real content at the extremes)
    │     └── ux-writing            (words for each state)
    ├── destructive-actions         (safeguards and recovery)
    ├── focus-management            (keyboard + screen reader continuity)
    └── responsive-behavior         (sizes and input modalities)

pattern-consistency → design-system-evolution   (at product scale)
```

Each skill works on its own. Their outputs use shared vocabulary (state matrix, action spec, error kinds), so the output of one skill can feed straight into the next.

## Install

### Skills CLI (Claude Code, Cursor, Codex, Copilot, OpenCode, and more)

```bash
# Install all skills into the current project
npx skills add aviralj02/interface-skills

# Install globally (available in every project)
npx skills add aviralj02/interface-skills -g

# Pick specific skills
npx skills add aviralj02/interface-skills --skill interface-states feature-completeness

# Target a specific agent
npx skills add aviralj02/interface-skills -a claude-code

# See what's in the pack without installing
npx skills add aviralj02/interface-skills --list
```

To update later, run `npx skills update`. To uninstall, run `npx skills remove <skill-name>`.

### Claude Code plugin

```text
/plugin marketplace add aviralj02/interface-skills
/plugin install interface-skills@interface-skills
```

### Manual

```bash
git clone https://github.com/aviralj02/interface-skills.git
cp -r interface-skills/skills/* ~/.claude/skills/
```

Or copy individual folders from [`skills/`](skills/) into your agent's skills directory (`.claude/skills/` for a single project).

## Usage

Ask for the outcome. The skill descriptions are written so agents load the right skill automatically:

- "Is the export feature ready to ship?" → `feature-completeness`
- "What states does this dashboard need?" → `interface-states`
- "Should webhook settings be a modal or a page?" → `information-architecture`
- "Users are creating duplicate orders" → `async-interactions`

You can also name a skill directly: "Use destructive-actions on the project settings page."

## Worked examples

- [Why your dashboard feels incomplete](examples/dashboard.md)
- [The states every data table needs](examples/tables.md)
- [How to design async form submission properly](examples/forms.md)
- [Designing onboarding as a flow, not a carousel](examples/onboarding.md)

## Works alongside

These skills handle behavior. For visual craft, pair them with a visual skill collection. See [ui-skills.com](https://www.ui-skills.com/skills) for a catalog.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Run `node scripts/validate.mjs` before opening a PR.

## Author

Created by [Aviral Jain](https://github.com/aviralj02) · [heyaviral.com](https://heyaviral.com)

## License

[MIT](LICENSE)
