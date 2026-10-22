# Interface Skills

> Teach your agent the parts it skips.

**[skills.heyaviral.com](https://skills.heyaviral.com)** — browse every skill, or install directly with `npx skills add aviralj02/interface-skills`.

Small, focused agent skills by [Aviral Jain](https://heyaviral.com). Every skill installs on its own, so you can add only what your agent is missing, or take the whole set in one command.

The first collection is **interface behavior**: four skills for building interfaces that hold up once people actually use them. They cover what agents most often skip: unfinished features, missing states, broken async actions, and motion that ignores reduced-motion settings. More collections, for work beyond interfaces, will join as they are written.

Each skill is a `SKILL.md` file that follows the open [Agent Skills](https://agentskills.io) format. They work with Claude Code, Codex, Cursor, and any other agent that loads skills. You can also read them as checklists yourself.

## Why

Agents and developers often ship interfaces that look finished in a screenshot but fall apart in real use. Common failures:

- A request fails and the screen goes blank
- A new user lands on an empty page with no way forward
- A refetch wipes good data off the screen
- A double-click creates two orders
- A save fails silently and the user's input is gone
- One click deletes a project with no undo

Most UI skill collections focus on visual quality. These skills focus on behavior, and only on the parts agents reliably get wrong without help.

## The skills

| Skill | What it produces | Use when |
|---|---|---|
| [`feature-completeness`](skills/feature-completeness/SKILL.md) | Scorecard across 8 paths + ranked gaps routed to other skills | "Is this done?" — **start here** |
| [`interface-states`](skills/interface-states/SKILL.md) | State matrix + state model | Any surface that renders data |
| [`async-interactions`](skills/async-interactions/SKILL.md) | Action spec per operation | Save, submit, upload, sync, search-as-you-type |
| [`reduced-motion`](skills/reduced-motion/SKILL.md) | Motion inventory with a verified reduced behavior per item | Any animation, parallax, carousel, or page transition |

## How they compose

```text
feature-completeness              (what's missing?)
    ├── interface-states          (every state of each surface)
    │     └── async-interactions  (every action's lifecycle)
    └── reduced-motion            (calm motion that never breaks)
```

Each skill works on its own. Their outputs use shared vocabulary (state matrix, action spec, error kinds), so the output of one skill can feed straight into the next. Gaps outside these four (focus, copy, mobile layout, unguarded deletes) get a concrete fix in the `feature-completeness` scorecard rather than a separate skill.

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
- "Users are creating duplicate orders" → `async-interactions`
- "Make the animations respect reduced motion" → `reduced-motion`

You can also name a skill directly: "Use interface-states on the billing page."

## Worked examples

- [Why your dashboard feels incomplete](examples/dashboard.md)
- [The states every data table needs](examples/tables.md)
- [How to design async form submission properly](examples/forms.md)

## Works alongside

These skills handle behavior. For visual craft, pair them with a visual skill collection. See [ui-skills.com](https://www.ui-skills.com/skills) for a catalog.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Run `node scripts/validate.mjs` before opening a PR.

## Author

Created by [Aviral Jain](https://github.com/aviralj02) · [heyaviral.com](https://heyaviral.com)

## License

[MIT](LICENSE)
