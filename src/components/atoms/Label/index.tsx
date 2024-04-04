import { ComponentProps } from 'react'
import { InfoTooltip } from '../InfoTooltip'
import { Paragraph } from '../Paragraph'

interface LabelProps extends ComponentProps<'label'> {
  label: string
  tooltipContent?: string
}

export function Label({ label, tooltipContent = '', ...rest }: LabelProps) {
  return (
    <label className="flex items-center gap-2" {...rest}>
      <Paragraph className="leading-none">{label}</Paragraph>
      {tooltipContent?.length > 0 ? (
        <InfoTooltip content={tooltipContent || ''} />
      ) : null}
    </label>
  )
}
