export const REPO = 'aviralj02/interface-skills'
export const REPO_URL = `https://github.com/${REPO}`
export const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/main`
export const AUTHOR = { name: 'Aviral Jain', url: 'https://github.com/aviralj02', site: 'https://heyaviral.com' }
/** Canonical origin, no trailing slash. Used for canonical links, OG/Twitter tags, JSON-LD, and the sitemap. */
export const SITE_URL = 'https://skills.heyaviral.com'
export const SITE_NAME = 'Interface Skills'

export type InstallMethod = {
  id: string
  label: string
  lines: string[]
  note?: string
}

export function packInstall(): InstallMethod[] {
  return [
    { id: 'npx', label: 'npx skills', lines: [`npx skills add ${REPO}`], note: 'Works with Claude Code, Cursor, Codex, Copilot, OpenCode, and more.' },
    {
      id: 'claude',
      label: 'Claude Code',
      lines: [`/plugin marketplace add ${REPO}`, '/plugin install interface-skills@interface-skills'],
      note: 'Run inside Claude Code. Updates arrive through /plugin.',
    },
    {
      id: 'manual',
      label: 'Manual',
      lines: [`git clone ${REPO_URL}.git`, 'cp -r interface-skills/skills/* ~/.claude/skills/'],
      note: 'Copy into any agent’s skills directory.',
    },
  ]
}

export function skillInstall(name: string): InstallMethod[] {
  const dir = `~/.claude/skills/${name}`
  return [
    { id: 'npx', label: 'npx skills', lines: [`npx skills add ${REPO} --skill ${name}`], note: 'Installs only this skill. Add -g to install globally.' },
    {
      id: 'claude',
      label: 'Claude Code',
      lines: [`/plugin marketplace add ${REPO}`, '/plugin install interface-skills@interface-skills'],
      note: 'The plugin installs the full pack, including this skill.',
    },
    {
      id: 'manual',
      label: 'Manual',
      lines: [`mkdir -p ${dir}`, `curl -fsSL ${RAW_BASE}/skills/${name}/SKILL.md -o ${dir}/SKILL.md`],
      note: 'Downloads the single SKILL.md file.',
    },
  ]
}
