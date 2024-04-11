import { CheckCircle, XCircle } from '@phosphor-icons/react'
import { ComponentProps, ReactNode } from 'react'
import { Toast } from 'react-hot-toast'
import { tv } from 'tailwind-variants'
import { Paragraph } from '../Paragraph'

const alert = tv({
  base: 'max-w-sm w-full rounded-xl bg-gray800 px-4 py-5 flex items-center gap-4',
})

export interface AlertProps extends ComponentProps<'div'> {
  variant: 'error' | 'success'
  message: string
  t: Toast
}

type IconsMapping = {
  [K in AlertProps['variant']]: ReactNode
}

const iconsMapping: IconsMapping = {
  success: <CheckCircle size={24} fill="#4ade80" weight="bold" />,
  error: <XCircle size={24} fill="#FF3232" weight="bold" />,
}

export function Alert({
  variant = 'success',
  message = 'Hello alert!',
  className,
  t,
}: AlertProps) {
  const alertStyle = alert({
    className: `${t.visible ? 'animate-enter' : '' + ` ${className}`}`,
  })

  return (
    <div className={alertStyle}>
      {iconsMapping[variant]}
      <Paragraph variant="p2">{message}</Paragraph>
    </div>
  )
}
