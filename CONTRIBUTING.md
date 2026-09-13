# Contributing

Thanks for helping make interfaces behave better.

## What belongs here

A skill belongs in this collection if it helps someone decide **how an interface behaves**: its states, failures, flows, structure, content handling, input methods, or recovery paths.

Skills about visual style, animation craft, or a specific brand aesthetic belong in other collections.

Before proposing a new skill, check [ui-skills.com](https://www.ui-skills.com/skills) and [skills.sh](https://skills.sh). If a good skill already exists, link to it instead of duplicating it.

## Skill structure

```text
skills/<skill-name>/
├── SKILL.md          required
└── references/       optional, for detail loaded on demand
```

### Frontmatter (required)

```yaml
---
name: skill-name            # lowercase, hyphens, matches folder name
description: >-             # ≤ 1024 chars. What it does + when to use it + trigger phrases + what it is NOT for
---
```

Agents only see the description when deciding whether to load a skill. So write it for matching: name the situations and the phrases users actually say, and state the boundary with neighboring skills.

### Body sections

Every skill uses these sections, in this order:

1. **Purpose**: the problem this skill solves
2. **When to Use**: specific situations, plus the boundary with sibling skills
3. **Core Principles**: 5–7 rules, each specific enough to check
4. **Workflow**: numbered steps that produce the output
5. **Checklist**: yes/no verifications
6. **Common Mistakes**: what developers and agents actually get wrong
7. **Example**: one concrete worked example, usually a table
8. **Implementation Notes**: framework-neutral code guidance, naming libraries only as examples
9. **Output Expectations**: the exact artifacts the agent must produce

Keep `SKILL.md` under ~500 lines. Move long reference material into `references/`.

## Quality bar

- **Specific:** "Define the user's next action for every error state", not "handle errors gracefully".
- **Actionable:** every skill produces an artifact (matrix, table, map, report, plan).
- **Composable:** refer to sibling skills by name when handing off. Don't repeat their content.
- **Framework-neutral:** principles first. Code examples should translate to React, Vue, Svelte, or plain HTML.
- **Evidence-based review:** when a skill reviews existing code, it asks for file and line references and says so when it couldn't verify something.

## Testing a skill

1. Run `node scripts/validate.mjs`.
2. Try the skill on a real prompt with and without it loaded. It should surface problems the agent missed without it.
3. Include the before/after in your PR description.
