/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const heading = tv({
  base: 'leading-none text-white font-semibold',
  variants: {
    variant: {
      h1: 'text-[1.75rem] lg:text-[2.5rem]',
      h2: 'text-2xl lg:text-[2rem]',
      h3: 'text-lg lg:text-[1.5rem] font-semibold',
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
})

interface HeadingProps
  extends ComponentProps<'h1'>,
    VariantProps<typeof heading> {}

export function Heading({ variant = 'h1', className, ...rest }: HeadingProps) {
  const headingClassName = heading({ variant, className })

  const HeadingTagMapping = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h2',
  }

  const HeadingTag: any = HeadingTagMapping[variant]

  return <HeadingTag className={headingClassName} {...rest} />
}
