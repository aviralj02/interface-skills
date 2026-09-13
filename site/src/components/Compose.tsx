import { Link } from 'react-router'

type Node = { name: string; role: string; children?: Node[] }

const TREE: Node = {
  name: 'feature-completeness',
  role: 'what’s missing?',
  children: [
    { name: 'user-flows', role: 'the journey', children: [{ name: 'information-architecture', role: 'where things live' }] },
    {
      name: 'interface-states',
      role: 'every state of each surface',
      children: [
        { name: 'async-interactions', role: 'every action’s lifecycle' },
        { name: 'content-resilience', role: 'real content at the extremes' },
        { name: 'ux-writing', role: 'words for each state' },
      ],
    },
    { name: 'destructive-actions', role: 'safeguards and recovery' },
    { name: 'focus-management', role: 'keyboard continuity' },
    { name: 'responsive-behavior', role: 'sizes and input' },
  ],
}

function Branch({ node, root = false }: { node: Node; root?: boolean }) {
  return (
    <li
      className={
        root
          ? ''
          : 'relative pl-6 before:absolute before:top-0 before:bottom-0 before:left-0 before:border-l before:border-ink-3/50 before:transition-colors last:before:bottom-auto last:before:h-[1.0625rem] after:absolute after:top-[1.0625rem] after:left-0 after:w-4 after:border-t after:border-ink-3/50 after:transition-colors has-[>div:is(:hover,:focus-within)]:after:border-accent last:has-[>div:is(:hover,:focus-within)]:before:border-accent'
      }
    >
      <div className="group/node flex flex-wrap items-baseline gap-x-3 py-1">
        <Link to={`/skills/${node.name}`} className="font-mono text-[0.875rem] text-ink transition-colors hover:text-accent">
          {node.name}
        </Link>
        <span className="text-[0.8125rem] text-ink-3 transition-colors group-hover/node:text-ink-2">{node.role}</span>
      </div>
      {node.children && (
        <ul className="ml-2">
          {node.children.map((c) => (
            <Branch key={c.name} node={c} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function Compose() {
  return (
    <div className="min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:p-7">
      <p className="mb-3 text-[0.8125rem] font-medium text-ink-2">Per feature</p>
      <ul aria-label="How the skills hand off per feature" className="overflow-x-auto">
        <Branch node={TREE} root />
      </ul>
      <p className="mt-6 mb-3 border-t border-line pt-5 text-[0.8125rem] font-medium text-ink-2">Across the product</p>
      <ul aria-label="How the skills hand off across the product" className="overflow-x-auto">
        <Branch
          root
          node={{ name: 'pattern-consistency', role: 'same situation, same behavior', children: [{ name: 'design-system-evolution', role: 'encode the rule once' }] }}
        />
      </ul>
    </div>
  )
}
