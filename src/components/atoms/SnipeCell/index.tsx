import { ComponentProps } from 'react'
import { Paragraph } from '../Paragraph'
import { VariantProps, tv } from 'tailwind-variants'
import { InfoTooltip } from '../InfoTooltip'

const snipeCell = tv({
  slots: {
    container: 'flex flex-col gap-1.5 lg:gap-0',
    content: 'leading-none',
  },
  variants: {
    highlight: {
      default: {
        content: 'text-gray400',
      },
      green: {
        content: 'text-green200',
      },
      red: {
        content: 'text-danger500',
      },
    },
  },
})

interface SnipeCellProps
  extends VariantProps<typeof snipeCell>,
    ComponentProps<'div'> {
  title: string
  value: string
  cellDescription?: string
}

export function SnipeCell({
  title,
  value,
  className,
  highlight = 'default',
  cellDescription,
  ...rest
}: SnipeCellProps) {
  const { container, content } = snipeCell({ className, highlight })

  return (
    <div className={container()} {...rest}>
      <div className="flex items-center gap-2">
        <Paragraph className="leading-none text-gray300">{title}</Paragraph>
        <div className="hidden lg:block">
          <InfoTooltip
            content={cellDescription || 'Place Cell description here.'}
          />
        </div>
      </div>
      <Paragraph variant="p2" className={content()}>
        {value}
      </Paragraph>
    </div>
  )
}
