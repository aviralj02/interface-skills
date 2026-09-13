import { Link as LinkIcon } from 'lucide-react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import { Link } from 'react-router'
import remarkGfm from 'remark-gfm'
import { SKILL_NAMES } from '../content/skills'
import { slugify, textOf } from '../lib/slug'
import { CopyButton } from './CopyButton'

function Heading({ level, children }: { level: 2 | 3; children?: ReactNode }) {
  const id = slugify(textOf(children))
  const Tag = level === 2 ? 'h2' : 'h3'
  return (
    <Tag id={id} className="group relative">
      {children}
      <a href={`#${id}`} className="ml-2 inline-flex align-middle text-ink-3 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100">
        <LinkIcon aria-hidden size={level === 2 ? 16 : 14} strokeWidth={1.75} />
        <span className="sr-only">Link to this section</span>
      </a>
    </Tag>
  )
}

const components: Components = {
  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
  code: ({ className, children, ...rest }: ComponentPropsWithoutRef<'code'>) => {
    const text = textOf(children)
    // Inline references to sibling skills become links.
    if (!className && SKILL_NAMES.has(text)) {
      return (
        <Link to={`/skills/${text}`} className="no-underline">
          <code>{text}</code>
        </Link>
      )
    }
    return (
      <code className={className} {...rest}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => {
    const text = textOf(children).replace(/\n$/, '')
    const lang = /language-(\w+)/.exec(
      (children as { props?: { className?: string } } | undefined)?.props?.className ?? '',
    )?.[1]
    return (
      <div className="group/code relative rounded-xl border border-line bg-well">
        <div className="flex items-center justify-between border-b border-line py-1 pr-1 pl-4">
          <span className="font-mono text-[0.75rem] text-ink-3">{lang ?? 'text'}</span>
          <CopyButton text={text} label="Copy code" />
        </div>
        <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[0.8125rem] leading-[1.65] text-ink">{children}</pre>
      </div>
    )
  },
  table: ({ children }) => (
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[34rem] border-collapse text-left text-[0.875rem] leading-snug">{children}</table>
    </div>
  ),
  th: ({ children }) => <th className="border-b border-line-strong py-2 pr-4 align-bottom font-semibold text-ink">{children}</th>,
  td: ({ children }) => <td className="border-b border-line py-2 pr-4 align-top text-ink-2">{children}</td>,
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="doc">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  )
}
