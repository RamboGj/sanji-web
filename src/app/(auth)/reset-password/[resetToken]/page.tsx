'use client'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { resetPassword } from '@/services/api/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRouter } from 'next/navigation'
import { onNotify } from '@/utils/alert'

const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Your password must contain at least 8 characters')
      .max(99, 'Your password is too long'),
    confirmNewPassword: z
      .string()
      .min(8, 'Your password must contain at least 8 characters')
      .max(99, 'Your password is too long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmPassword'],
    message: 'Your passwords must be the same',
  })

type ResetPasswordSchemaData = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage({
  params,
}: {
  params: { resetToken: string }
}) {
  const { push } = useRouter()

  const [isPending, startTranstion] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchemaData>({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(resetPasswordSchema),
  })

  async function onResetPassword(data: ResetPasswordSchemaData) {
    startTranstion(async () => {
      try {
        const { newPassword } = data

        const response = await resetPassword({
          newPassword,
          resetToken: params.resetToken,
        })

        console.log('response', response)

        if (response) {
          push('/login')
        }
      } catch (err) {
        if (isAxiosError(err)) {
          console.log('err', err)
          onNotify('error', err.response?.data.message)
        }
      }
    })
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-center py-24">
        <Heading variant="h1">Create new password</Heading>

        <form
          className="mt-8 w-full max-w-[512px] border border-gray500/10 bg-gray800/60 p-4 lg:px-10 lg:py-12"
          onSubmit={handleSubmit(onResetPassword)}
        >
          <div className="mb-8 flex flex-col gap-y-4">
            <Input
              {...register('newPassword')}
              autoComplete="off"
              error={errors.newPassword}
              label="Password"
              id="password"
              placeholder="johndoe123@"
              type="password"
            />
            <Input
              {...register('confirmNewPassword')}
              error={errors.confirmNewPassword}
              autoComplete="off"
              label="Confirm password"
              id="confirmPassword"
              placeholder="johndoe123@"
              type="password"
            />
          </div>
          <Button type="submit" variant="primary" isLoading={isPending}>
            <Button.Label>Change password</Button.Label>
          </Button>
        </form>
      </div>
    </div>
  )
}
