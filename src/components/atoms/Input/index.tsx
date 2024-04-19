// import { ErrorMessage } from '@hookform/error-message'
import React, { ComponentProps } from 'react'
// import { FieldError, FieldErrors } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import { Label } from '../Label'
import { FieldError } from 'react-hook-form'

const inputStyles = tv({
  slots: {
    container: 'w-full flex flex-col gap-2',
    labelText: 'font-medium text-base lg:text-lg',
    errorText: 'text-red500 text-sm font-montserrat',
    input:
      'rounded-lg font-medium bg-gray600 border border-transparent placeholder:text-gray400 focus:bg-gray700 focus:border-purple500 text-purple50 py-3 px-4 focus:outline-none transition duration-500',
  },
})

interface InputProps extends ComponentProps<'input'> {
  error?: FieldError
  label: string
  id: string
  tooltipContent?: string
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, tooltipContent = '', error, id, ...rest }, ref) => {
    const { container, input } = inputStyles({
      className,
    })

    return (
      <div className={container()}>
        <Label label={label} tooltipContent={tooltipContent} htmlFor={id} />

        <input
          {...rest}
          className={twMerge(input(), error ? ' border-danger500' : '')}
          ref={ref}
          id={id}
        />
        {error ? <div></div> : null}
      </div>
    )
  },
)

export default Input
