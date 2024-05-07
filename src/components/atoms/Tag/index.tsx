import { ComponentProps } from 'react'
import { VariantProps, tv } from 'tailwind-variants'

const tagStyles = tv({
  slots: {
    container: 'flex h-6 w-fit items-center rounded-[24px] border px-[10px]',
    labelText: 'text-xs font-medium',
  },
  variants: {
    feedback: {
      success: {
        container: 'border-green200/10 bg-[#0E1512]',
        labelText: 'text-xs font-medium text-green200',
      },
      error: {
        container: 'border-danger500/10 bg-[#120909]',
        labelText: 'text-xs font-medium text-danger500',
      },
    },
  },
})

interface TagProps
  extends ComponentProps<'div'>,
    VariantProps<typeof tagStyles> {
  label?: string
}

export function Tag({ label, feedback, className, ...rest }: TagProps) {
  const { container, labelText } = tagStyles({ className, feedback })

  return (
    <div className={container()} {...rest}>
      <span className={labelText()}>{label}</span>
    </div>
  )
}
