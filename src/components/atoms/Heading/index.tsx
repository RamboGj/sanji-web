/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const heading = tv({
  base: 'leading-0 text-purple50 font-bold',
  variants: {
    variant: {
      h1: 'text-[2.5rem]',
      h2: 'text-[2rem]',
      h3: 'text-[1.5rem] font-semibold',
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

  console.log('HeadingTag', HeadingTag)

  return <HeadingTag className={headingClassName} {...rest} />
}
