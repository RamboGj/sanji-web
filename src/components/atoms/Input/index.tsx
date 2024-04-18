// import { ErrorMessage } from '@hookform/error-message'
import React, { ComponentProps } from 'react'
// import { FieldError, FieldErrors } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'
import { Label } from '../Label'

const inputStyles = tv({
  slots: {
    container: 'w-full flex flex-col gap-2',
    labelText: 'font-medium text-base lg:text-lg',
    errorText: 'text-red500 text-sm font-montserrat',
    input:
      'rounded-lg font-medium bg-gray600 border border-transparent placeholder:text-gray400 focus:bg-gray700 focus:border-purple500 text-purple50 py-3 px-8 focus:outline-none transition duration-500',
  },
})

interface InputProps extends ComponentProps<'input'> {
  // errors?: FieldErrors
  // error?: FieldError
  label: string
  id: string
  tooltipContent?: string
}

// eslint-disable-next-line react/display-name
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, tooltipContent = '', id, ...rest }, ref) => {
    const { container, input } = inputStyles({
      className,
    })

    return (
      <div className={container()}>
        <Label label={label} tooltipContent={tooltipContent} htmlFor={id} />

        <input
          {...rest}
          className={twMerge(
            input(),
            // error ? 'border-danger500 drop-shadow-danger' : '',
          )}
          ref={ref}
          id={id}
        />
        {/* {error ? (
          <ErrorMessage
            errors={errors}
            name={id}
            message={error.message}
            render={() => <p className={errorText()}>{error?.message}</p>}
          />
        ) : null} */}
      </div>
    )
  },
)

export default Input
