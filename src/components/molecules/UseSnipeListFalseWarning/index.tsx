import { Paragraph } from '@/components/atoms/Paragraph'
import { Warning } from '@phosphor-icons/react'

export function UseSnipeListFalseWarning() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-10 flex justify-center rounded-xl bg-gray900/95">
      <div className="mt-12 flex max-h-[140px] w-full max-w-[465px] flex-col items-center justify-center gap-3 rounded-xl border border-warning800/60 bg-warning800/15 px-9 text-center">
        <Warning color="#B45309" size={24} />
        <Paragraph variant="p2" className="text-gray400">
          In order to use your snipes, turn on the “use snipe list” setting in
          the “settings” modal.
        </Paragraph>
      </div>
    </div>
  )
}
