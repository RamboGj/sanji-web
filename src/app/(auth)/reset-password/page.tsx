'use client'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { requestPasswordReset } from '@/services/api/auth'
import { onNotify } from '@/utils/alert'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import Link from 'next/link'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .includes('@' && '.', {
      message: 'Invalid e-mail',
    })
    .min(5, 'Invalid e-mail')
    .max(99, 'Invalid e-mail'),
})

type ForgotPasswordSchemaData = z.infer<typeof forgotPasswordSchema>

export default function RequestResetPasswordPage() {
  const [isPending, startTranstion] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchemaData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onRequestResetPassword(data: ForgotPasswordSchemaData) {
    startTranstion(async () => {
      try {
        const result = await requestPasswordReset({
          email: data.email,
        })

        if (result.message) {
          onNotify(
            'success',
            'An email was sent to your mail box. Check it in order to change your password.',
          )
        }
      } catch (err) {
        if (isAxiosError(err)) {
          onNotify('error', err.response?.data.message)
        }
      }
    })
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-center py-24">
        <Heading variant="h1">Send reset password e-mail</Heading>

        <form
          className="mt-8 w-full max-w-[512px] border border-gray500/10 bg-gray800/60 p-4 lg:px-10 lg:py-12"
          onSubmit={handleSubmit(onRequestResetPassword)}
        >
          <div className="mb-8">
            <Input
              {...register('email')}
              error={errors.email}
              label="Email"
              id="email"
              placeholder="johndoe@gmail.com"
              type="email"
            />
          </div>
          <Button type="submit" variant="primary" isLoading={isPending}>
            <Button.Label>Send code</Button.Label>
          </Button>
        </form>
        <Link
          className="font-regular mt-4 block text-sm text-yellow600 transition-colors duration-300 hover:text-yellow600/70"
          href="/login"
        >
          Go back
        </Link>
      </div>
    </div>
  )
}
