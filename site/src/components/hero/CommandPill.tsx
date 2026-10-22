import { useEffect, useRef, useState } from 'react'
import { copyText } from '../../lib/clipboard'
import { CopyIcon } from '../CopyIcon'

/** The one-line install-everything command, with copy, as the hero's primary action. */
export function CommandPill({ command }: { command: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [copies, setCopies] = useState(0)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    window.clearTimeout(timer.current)
    try {
      await copyText(command)
      setState('copied')
      setCopies((n) => n + 1)
    } catch {
      setState('failed')
    }
    timer.current = window.setTimeout(() => setState('idle'), 2200)
  }

  return (
    <div className="flex max-w-full min-w-0 items-center gap-3 rounded-full border border-white/70 bg-[rgb(255_252_247/0.82)] p-1.5 pl-5 text-[#17140f] shadow-[0_1px_2px_rgb(60_40_10/0.08),0_20px_44px_-22px_rgb(60_40_10/0.5)] backdrop-blur-[2px] transition-[box-shadow,background-color] duration-300 hover:bg-[rgb(255_252_247/0.92)] max-[479px]:w-full max-[479px]:flex-col max-[479px]:rounded-[1.25rem] max-[479px]:p-2 max-[479px]:pt-3">
      <code className="min-w-0 py-2 font-mono text-[0.875rem] whitespace-nowrap max-[479px]:self-center max-[479px]:py-1 max-[479px]:text-[0.78rem] max-[359px]:text-[0.7rem]">
        <span aria-hidden className="mr-2.5 text-[#8a6a3f] select-none">
          $
        </span>
        <span key={copies} className={copies ? 'copied-flash' : ''}>
          {command}
        </span>
      </code>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-full bg-[rgb(23_20_15/0.06)] px-3.5 text-[0.875rem] font-medium text-[#17140f] transition-[background-color,scale] duration-200 hover:bg-[rgb(23_20_15/0.11)] active:scale-[0.96] motion-reduce:active:scale-100 max-[479px]:w-full"
      >
        <CopyIcon done={state === 'copied'} size={15} />
        <span>{state === 'copied' ? 'Copied' : state === 'failed' ? 'Select it' : 'Copy'}</span>
      </button>
      <span role="status" className="sr-only">
        {state === 'copied' ? 'Install command copied' : state === 'failed' ? 'Copy failed. Select the command and copy it manually.' : ''}
      </span>
    </div>
  )
}
