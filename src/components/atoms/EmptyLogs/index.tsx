import { ComponentProps } from 'react'
import { Paragraph } from '../Paragraph'
import { Warning } from '@phosphor-icons/react'

interface EmptyLogProps extends ComponentProps<'div'> {}

export function EmptyLog({ ...rest }: EmptyLogProps) {
  return (
    <div className="flex items-center justify-center gap-x-2 p-8" {...rest}>
      <Warning className="animate-pulse" fill="#B45309" size={24} />
      <Paragraph className="text-gray400">BOT is not running...</Paragraph>
    </div>
  )
}
