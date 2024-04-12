import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const paragraph = tv({
  base: 'leading-0 text-purple50 font-medium',
  variants: {
    variant: {
      p1: 'text-xs lg:text-lg leading-none',
      p2: 'text-xs lg:text-base leading-none',
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
