import { AUTHOR, REPO_URL, SITE_NAME, SITE_URL } from './content/site'
import { getSkill, GROUPS, SKILLS } from './content/skills'

const HOME_DESCRIPTION = `${SKILLS.length} agent skills for how interfaces behave: states, failures, flows, focus, and recovery — not just how they look. Each skill produces a concrete artifact. Install with npx skills or as a Claude Code plugin.`

const PERSON = { '@type': 'Person', name: AUTHOR.name, url: AUTHOR.site, sameAs: [AUTHOR.url] } as const

type Head = {
  title: string
  description: string
  /** Canonical path, e.g. "/" or "/skills/interface-states" — the prerenderer resolves it against SITE_URL. */
  path: string
  type: 'website' | 'article'
  /** false only for pages that should not be indexed (404). */
  index: boolean
  jsonLd: object[]
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}

export function headFor(pathname: string): Head {
  const match = pathname.match(/^\/skills\/([^/]+)\/?$/)
  if (match) {
    const skill = getSkill(match[1])
    if (skill) {
      const group = GROUPS.find((g) => g.id === skill.group)
      const path = `/skills/${skill.name}`
      return {
        title: `${skill.name} · ${SITE_NAME}`,
        description: skill.summary,
        path,
        type: 'article',
        index: true,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            headline: skill.name,
            name: skill.name,
            description: skill.summary,
            articleSection: group?.title,
            about: skill.description,
            inLanguage: 'en',
            url: `${SITE_URL}${path}`,
            author: PERSON,
            publisher: PERSON,
            isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
            isAccessibleForFree: true,
          },
          breadcrumbs([
            { name: 'Home', path: '/' },
            { name: 'Skills', path: '/#skills' },
            { name: skill.name, path },
          ]),
        ],
      }
    }
    return { title: `Skill not found · ${SITE_NAME}`, description: HOME_DESCRIPTION, path: pathname, type: 'website', index: false, jsonLd: [] }
  }

  if (pathname === '/' || pathname === '') {
    return {
      title: `${SITE_NAME}: how interfaces behave`,
      description: HOME_DESCRIPTION,
      path: '/',
      type: 'website',
      index: true,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          description: HOME_DESCRIPTION,
          inLanguage: 'en',
          publisher: PERSON,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: SITE_NAME,
          description: HOME_DESCRIPTION,
          url: `${SITE_URL}/`,
          codeRepository: REPO_URL,
          programmingLanguage: 'Markdown',
          license: 'https://opensource.org/licenses/MIT',
          author: PERSON,
          keywords: 'agent skills, AI coding agent, UX, interface design, Claude Code, Cursor, Codex, SKILL.md',
        },
      ],
    }
  }

  return { title: `Page not found · ${SITE_NAME}`, description: HOME_DESCRIPTION, path: pathname, type: 'website', index: false, jsonLd: [] }
}
