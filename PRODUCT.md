# Product

## Platform

web

## Stack

React + TypeScript + Vite + Tailwind CSS + lucide-react (user-specified). The site lives in `site/` inside this repo and reads `skills/*/SKILL.md` at build time. Every route is pre-rendered to static HTML so it works on any host. Deployed at `skills.heyaviral.com` (a CNAME under the user's personal domain), host TBD (candidates: Vercel, Netlify, GitHub Pages).

## Users

Frontend, full-stack, design, and product engineers who use AI coding agents (Claude Code, Cursor, Codex, Copilot, and similar). They arrive from GitHub, a skills directory, or a shared link. Their job is to decide in a minute or two whether these skills are worth installing, then copy the command.

Secondary: indie hackers, startup teams, and developers without formal UX training.

## Product Purpose

Interface Skills is Aviral Jain's open-source catalog of agent skills (SKILL.md files). It is not limited to UI: skills are grouped into collections, and new collections for other kinds of work will be added over time. Every skill installs on its own and can be promoted on its own. The first collection, interface behavior, has 3 skills: completeness, states, and async actions. The catalog stays small on purpose: a skill earns its place only if agents reliably get its subject wrong without help. The website presents the catalog. It shows every skill, lets visitors read each one in full, and gives copyable install commands for the whole pack and for each skill.

Success means a visitor installs the pack, or a specific skill, with confidence in what they are getting.

## Positioning

"Teach your agent the parts it skips."

Each skill covers one problem agents skip without help and ends in a defined artifact (in the interface collection: completeness scorecard, state matrix, action spec). Skills within a collection hand off to each other; in the interface collection, `feature-completeness` is the entry point.

## Operating Context

- Install paths:
  - `npx skills add aviralj02/interface-skills` (all skills; flags `-g`, `--skill <name>`, `-a <agent>`, `--list`)
  - Claude Code: `/plugin marketplace add aviralj02/interface-skills` then `/plugin install interface-skills@interface-skills`
  - Manual: clone the repo and copy the skill folders
- Repo: https://github.com/aviralj02/interface-skills
- A comparable catalog is ui-skills.com. Its skill pages show the name, author, description, an install command with copy, then the rendered SKILL.md.

## Capabilities and Constraints

- 3 skills in 1 collection, **Interface behavior**: feature-completeness (the entry point), interface-states, async-interactions. Collections are defined in `site/src/content/skills.ts`.
- Every skill has frontmatter (`name`, `description`) and the same nine sections: Purpose, When to Use, Core Principles, Workflow, Checklist, Common Mistakes, Example, Implementation Notes, Output Expectations.
- 3 worked examples live in `examples/` (dashboard, tables, forms).
- The home page's primary action is installing the whole pack. Individual skill pages render the full SKILL.md with per-skill install commands and a table of contents.
- The site must never drift from the skill files. Content is read from the repo, never copied by hand.

## Brand Commitments

- Name: Interface Skills. Author: Aviral Jain (github.com/aviralj02, heyaviral.com). License: MIT.
- The user asked for lucide icons, a single centered punchline over a bright scenic photograph with parallax, and hover micro-interactions throughout the landing page.
- The look must stay minimal and elegant, never childish: a real photograph, not illustration. An illustrated garden version was rejected for looking like a play-school site.

## Evidence on Hand

- The 4 SKILL.md files, 3 worked examples, and README in this repo.
- There are no install counts, stars, testimonials, or users to cite yet. Do not invent any.

## Product Principles

1. Behavior before decoration. The site should demonstrate the kind of care the skills teach.
2. Show the skill, don't describe it. Full content is one click away.
3. The install command is always within reach.
4. The repo is the source of truth for all content.

## Accessibility & Inclusion

The site should model what the skills teach: keyboard access, visible focus, a copy action with announced feedback, correct focus on route changes, and survival of long content at narrow widths.
