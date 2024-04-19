import { Info } from '@phosphor-icons/react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { tv } from 'tailwind-variants'

const tooltip = tv({
  slots: {
    trigger:
      'bg-gray800 border-[0.5px] border-gray600 w-6 h-6 flex items-center justify-center rounded-[6px] hover:bg-gray700',
    contentContainer:
      'px-4 py-2 max-w-[320px] bg-gray700 rounded-lg border border-gray600 text-purple50 text-sm z-50',
  },
})

interface InfoTooltipProps extends Tooltip.TooltipProps {
  content: string
}

export function InfoTooltip({ content, ...rest }: InfoTooltipProps) {
  const { contentContainer, trigger } = tooltip()

  return (
    <Tooltip.Provider delayDuration={500} {...rest}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div role="button" className={trigger()}>
            <Info className="text-gray400" size={16} />
          </div>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className={contentContainer()} sideOffset={5}>
            {content}
            <Tooltip.Arrow className="fill-gray700" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
