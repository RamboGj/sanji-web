/* eslint-disable @typescript-eslint/no-explicit-any */
import Script from 'next/script'
import { Terminal } from '@xterm/xterm'

export function Terminalinternal() {
  const term = new Terminal({
    cursorBlink: true,
  })

  if (document?.getElementById('terminal') !== null) {
    term.open(document?.getElementById('terminal') as HTMLElement)
  }

  console.log(
    "document?.getElementById('terminal')",
    document?.getElementById('terminal'),
  )

  return (
    <div>
      <Script src="https://cdn.jsdelivr.net/npm/xterm@4.19.0/lib/xterm.js" />
      <div id="terminal"></div>
    </div>
  )
}
