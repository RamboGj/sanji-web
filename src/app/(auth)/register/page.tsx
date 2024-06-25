'use client'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { signup } from '@/services/api/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'

import { setCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'
import { useRouter } from 'next/navigation'

const registerSchema = z
  .object({
    email: z
      .string()
      .includes('@' && '.', {
        message: 'Invalid e-mail',
      })
      .min(5, 'Invalid e-mail')
      .max(99, 'Invalid e-mail'),
    password: z
      .string()
      .min(8, 'Your password must contain at least 8 characters')
      .max(99, 'Your password is too long'),
    confirmPassword: z
      .string()
      .min(8, 'Your password must contain at least 8 characters')
      .max(99, 'Your password is too long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Your passwords must be the same',
  })

type RegisterSchemaData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const { push } = useRouter()

  const [isPending, startTranstion] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaData>({
    defaultValues: {
      email: '',
      confirmPassword: '',
      password: '',
    },
    resolver: zodResolver(registerSchema),
  })

  async function onRegister(data: RegisterSchemaData) {
    startTranstion(async () => {
      try {
        const { email, password } = data

        const response = await signup({ email, password })

        console.log(response.data.token)

        if (response.data.token) {
          setCookie(COOKIES_KEY.JWT, response.data.token)

          push('/setup')
        }

        console.log('response', response)
        console.log('status', response.status)
      } catch (err) {
        if (isAxiosError(err)) {
          console.log('err', err)
          toast.error(err.response?.data.message)
        }
      }
    })
  }

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center justify-center py-24">
        <Heading variant="h1">Create Account</Heading>

        <form
          className="mt-8 w-full max-w-[512px] border border-gray500/10 bg-gray800/60 p-4 lg:px-10 lg:py-12"
          onSubmit={handleSubmit(onRegister)}
        >
          <div className="mb-8 flex flex-col gap-y-4">
            <Input
              {...register('email')}
              error={errors.email}
              label="Email"
              id="email"
              placeholder="johndoe@gmail.com"
              type="email"
            />
            <Input
              {...register('password')}
              autoComplete="off"
              error={errors.password}
              label="Password"
              id="password"
              placeholder="johndoe123@"
              type="string"
            />
            <Input
              {...register('confirmPassword')}
              error={errors.confirmPassword}
              autoComplete="off"
              label="Confirm password"
              id="confirmPassword"
              placeholder="johndoe123@"
              type="string"
            />
          </div>
          <Button type="submit" variant="primary" isLoading={isPending}>
            <Button.Label>Register</Button.Label>
          </Button>
        </form>
      </div>
    </div>
  )
}
