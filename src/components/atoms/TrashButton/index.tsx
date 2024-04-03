import { Trash } from '@phosphor-icons/react'
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'

const trashButton = tv({
  slots: {
    container:
      'w-[30px] h-[30px] rounded-[6px] bg-gray800 flex items-center justify-center border-[0.5px] border-danger600 group group-hover:border-danger500 transition-colors duration-300',
    icon: 'text-danger600 group-hover:text-danger500',
  },
})

interface TrashButtonProps extends ComponentProps<'div'> {}

export function TrashButton({ className, ...rest }: TrashButtonProps) {
  const { container, icon } = trashButton({ className })

  return (
    <div className={container()} role="button" {...rest}>
      <Trash size={20} className={icon()} />
    </div>
  )
}
