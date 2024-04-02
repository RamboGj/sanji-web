import { ErrorMessage } from '@hookform/error-message'
import React, { ComponentProps } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const inputStyles = tv({
  slots: {
    container: 'flex flex-col gap-1',
    labelText: 'font-montserrat font-medium',
    errorText: 'text-red-500 text-sm font-montserrat',
    input:
      'rounded-lg font-medium border border-transparent placeholder:text-gray500 text-white py-3 px-8 focus:outline-none transition duration-500',
  },
  variants: {
    variant: {
      primary: {
        input:
          'bg-gray900 focus:outline-none hover:bg-gray900/60 focus:border-green200 focus:drop-shadow-lightGreen2',
      },
      secondary: {
        input:
          'bg-[#070D13] focus:outline-none hover:bg-[#070D13]/60 focus:border-green200 focus:drop-shadow-lightGreen2',
      },
    },
  },
})

interface InputProps
  extends ComponentProps<'input'>,
    VariantProps<typeof inputStyles> {
  errors?: FieldErrors
  error?: FieldError
  label: string
  id: string
  variant?: 'primary' | 'secondary'
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { variant = 'primary', className, label, error, id, errors, ...rest },
    ref,
  ) => {
    const { container, input, labelText, errorText } = inputStyles({
      className,
      variant,
    })

    return (
      <div className={container()}>
        <label className={labelText()} htmlFor={id}>
          {label}
        </label>
        <input
          {...rest}
          className={twMerge(
            input(),
            error ? 'border-danger500 drop-shadow-danger' : '',
          )}
          ref={ref}
          id={id}
        />
        {error ? (
          <ErrorMessage
            errors={errors}
            name={id}
            message={error.message}
            render={() => <p className={errorText()}>{error?.message}</p>}
          />
        ) : null}
      </div>
    )
  },
)

export default Input
