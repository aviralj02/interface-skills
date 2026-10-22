import { Link } from 'react-router'

type Node = { name: string; role: string; children?: Node[] }

const TREE: Node = {
  name: 'feature-completeness',
  role: 'what’s missing?',
  children: [
    {
      name: 'interface-states',
      role: 'every state of each surface',
      children: [{ name: 'async-interactions', role: 'every action’s lifecycle' }],
    },
    { name: 'destructive-actions', role: 'safeguards and recovery' },
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
      <ul aria-label="How the skills hand off" className="overflow-x-auto">
        <Branch node={TREE} root />
      </ul>
    </div>
  )
}
