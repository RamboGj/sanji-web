import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const paragraph = tv({
  base: 'leading-0 text-purple50 font-medium',
  variants: {
    variant: {
      p1: 'text-lg',
      p2: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'p1',
  },
})

interface ParagraphProps
  extends ComponentProps<'p'>,
    VariantProps<typeof paragraph> {}

export function Paragraph({ variant, className, ...rest }: ParagraphProps) {
  const paragraphClassName = paragraph({ variant, className })

  return <p className={paragraphClassName} {...rest} />
}
