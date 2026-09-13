# Product

## Platform

web

## Stack

React + TypeScript + Vite + Tailwind CSS + lucide-react (user-specified). The site lives in `site/` inside this repo and reads `skills/*/SKILL.md` at build time. Every route is pre-rendered to static HTML so it works on any host; the deploy target is undecided.

## Users

Frontend, full-stack, design, and product engineers who use AI coding agents (Claude Code, Cursor, Codex, Copilot, and similar). They arrive from GitHub, a skills directory, or a shared link. Their job is to decide in a minute or two whether these skills are worth installing, then copy the command.

Secondary: indie hackers, startup teams, and developers without formal UX training.

## Product Purpose

Interface Skills is an open-source pack of 12 agent skills (SKILL.md files) about interface behavior: states, failures, flows, structure, content, input methods, and recovery. The website presents the pack. It shows every skill, lets visitors read each one in full, and gives copyable install commands for the whole pack and for each skill.

Success means a visitor installs the pack, or a specific skill, with confidence in what they are getting.

## Positioning

"UI patterns teach you how interfaces look. Interface Skills teaches you how they behave."

Most existing skill collections focus on visual polish. Each skill here covers one behavioral problem and ends in a defined artifact: state matrix, action spec, focus map, completeness scorecard, and so on. The skills are designed to hand off to each other, with `feature-completeness` as the entry point.

## Operating Context

- Install paths:
  - `npx skills add aviralj02/interface-skills` (all skills; flags `-g`, `--skill <name>`, `-a <agent>`, `--list`)
  - Claude Code: `/plugin marketplace add aviralj02/interface-skills` then `/plugin install interface-skills@interface-skills`
  - Manual: clone the repo and copy the skill folders
- Repo: https://github.com/aviralj02/interface-skills
- A comparable catalog is ui-skills.com. Its skill pages show the name, author, description, an install command with copy, then the rendered SKILL.md.

## Capabilities and Constraints

- 12 skills in 6 categories:
  - **Interface States:** interface-states, async-interactions, destructive-actions
  - **UX Structure:** user-flows, information-architecture
  - **Content & Communication:** ux-writing, content-resilience
  - **Responsive & Adaptive:** responsive-behavior
  - **Interaction Engineering:** focus-management
  - **Product-Level:** feature-completeness, design-system-evolution, pattern-consistency
- Every skill has frontmatter (`name`, `description`) and the same nine sections: Purpose, When to Use, Core Principles, Workflow, Checklist, Common Mistakes, Example, Implementation Notes, Output Expectations.
- 4 worked examples live in `examples/` (dashboard, tables, forms, onboarding).
- The home page's primary action is installing the whole pack. Individual skill pages render the full SKILL.md with per-skill install commands and a table of contents.
- The site must never drift from the skill files. Content is read from the repo, never copied by hand.

## Brand Commitments

- Name: Interface Skills. Author: Aviral Jain (github.com/aviralj02, heyaviral.com). License: MIT.
- The user asked for a minimal, clean UI and lucide icons.

## Evidence on Hand

- The 12 SKILL.md files, 4 worked examples, and README in this repo.
- There are no install counts, stars, testimonials, or users to cite yet. Do not invent any.

## Product Principles

1. Behavior before decoration. The site should demonstrate the kind of care the skills teach.
2. Show the skill, don't describe it. Full content is one click away.
3. The install command is always within reach.
4. The repo is the source of truth for all content.

## Accessibility & Inclusion

The site should model what the skills teach: keyboard access, visible focus, a copy action with announced feedback, correct focus on route changes, and survival of long content at narrow widths.
