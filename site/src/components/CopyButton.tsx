import { Check, Copy, TriangleAlert } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type Status = 'idle' | 'copied' | 'failed'

async function writeClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  // Fallback for insecure contexts and older browsers.
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  const ok = document.execCommand('copy')
  area.remove()
  if (!ok) throw new Error('copy failed')
}

export function CopyButton({
  text,
  label = 'Copy',
  className = '',
  showLabel = false,
  compact = false,
  tone = 'muted',
  onCopied,
}: {
  tone?: 'muted' | 'accent'
  onCopied?: () => void
  text: string
  label?: string
  className?: string
  showLabel?: boolean
  /** Hide the visible label on small screens (it stays available to screen readers). */
  compact?: boolean
}) {
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copy() {
    window.clearTimeout(timer.current)
    try {
      await writeClipboard(text)
      setStatus('copied')
      onCopied?.()
    } catch {
      setStatus('failed')
    }
    timer.current = window.setTimeout(() => setStatus('idle'), 2000)
  }

  const icons = [
    { key: 'idle', Icon: Copy },
    { key: 'copied', Icon: Check },
    { key: 'failed', Icon: TriangleAlert },
  ] as const
  const visible = status === 'copied' ? 'Copied' : status === 'failed' ? 'Select and copy' : label

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={showLabel ? undefined : label}
        className={`inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[0.8125rem] font-medium transition-[color,background-color,scale] duration-150 active:scale-[0.96] motion-reduce:active:scale-100 ${
          status === 'copied'
            ? 'text-ok'
            : status === 'failed'
              ? 'text-warn'
              : tone === 'accent'
                ? 'text-accent hover:bg-accent-soft'
                : 'text-ink-3 hover:bg-well hover:text-ink'
        } ${className}`}
      >
        <span aria-hidden className="grid size-[15px] [&>*]:[grid-area:1/1]">
          {icons.map(({ key, Icon }) => (
            <Icon
              key={key}
              size={15}
              strokeWidth={1.75}
              className={`transition-[opacity,scale,filter] duration-200 ease-out-expo motion-reduce:transition-opacity ${
                status === key ? 'scale-100 opacity-100 blur-none' : 'scale-50 opacity-0 blur-[2px] motion-reduce:scale-100 motion-reduce:blur-none'
              }`}
            />
          ))}
        </span>
        {showLabel && <span className={`text-left ${compact ? 'max-sm:sr-only' : ''} sm:min-w-[4.5rem]`}>{visible}</span>}
      </button>
      <span role="status" className="sr-only">
        {status === 'copied' ? 'Copied to clipboard' : status === 'failed' ? 'Copy failed. Select the text and copy it manually.' : ''}
      </span>
    </>
  )
}
