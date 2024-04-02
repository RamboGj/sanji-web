import * as S from '@radix-ui/react-switch'
import { VariantProps, tv } from 'tailwind-variants'

const switchStyle = tv({
  slots: {
    root: 'w-[55px] p-1 rounded-[20px] border h-[30px] group transition-colors duration-300 disabled:bg-gray600 disabled:border-0',
    thumb:
      'w-5 h-5 rounded-full bg-gray500 block transition-transform duration-300 will-change-transform data-[state=checked]:translate-x-[24px] group-disabled:bg-gray700',
  },
  variants: {
    checked: {
      true: {
        root: 'bg-gray900 border-purple500',
        thumb: 'bg-purple500',
      },
      false: {
        root: 'bg-gray900 border-gray500 hover:border-gray300',
        thumb: 'group-hover:bg-gray300',
      },
    },
  },
})

interface LocalSwitchProps
  extends VariantProps<typeof switchStyle>,
    S.SwitchProps {}

export function Switch({ className, checked, ...rest }: LocalSwitchProps) {
  const { root, thumb } = switchStyle({ className, checked })

  return (
    <S.Root className={root()} {...rest}>
      <S.Thumb className={thumb()} />
    </S.Root>
  )
}
