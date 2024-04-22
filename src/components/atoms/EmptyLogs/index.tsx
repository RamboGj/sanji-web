import { ComponentProps } from 'react'
import { Paragraph } from '../Paragraph'

interface EmptyLogProps extends ComponentProps<'div'> {}

export function EmptyLog({ ...rest }: EmptyLogProps) {
  return (
    <div className="flex items-center justify-center gap-x-2 p-8" {...rest}>
      <Paragraph className="text-gray400">No transactions found.</Paragraph>
    </div>
  )
}
