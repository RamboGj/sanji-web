'use client'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { signin } from '@/services/api/auth'
import { onNotify } from '@/utils/alert'
import { COOKIES_KEY } from '@/utils/cookies'
import { zodResolver } from '@hookform/resolvers/zod'
import { isAxiosError } from 'axios'
import { setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginSchema = z.object({
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
})

type LoginSchemaData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { push } = useRouter()

  const [isPending, startTranstion] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  async function onLogin(data: LoginSchemaData) {
    startTranstion(async () => {
      try {
        const response = await signin({
          email: data.email,
          password: data.password,
        })

        if (response.data.token) {
          setCookie(COOKIES_KEY.JWT, response.data.token)
          setCookie(
            COOKIES_KEY.SUBSCRIPTION,
            response.data.user.subscriptionStatus,
          )
          setCookie(COOKIES_KEY.USER_ID, response.data.user._id)
          push('/')
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
        <Heading variant="h1">Sign in</Heading>

        <form
          className="mt-8 w-full max-w-[512px] border border-gray500/10 bg-gray800/60 p-4 lg:px-10 lg:py-12"
          onSubmit={handleSubmit(onLogin)}
        >
          <div className="mb-8 flex flex-col gap-y-4">
            <Input
              {...register('email')}
              error={errors.email}
              label="Email"
              id="email"
              placeholder="johndoe@gmail.com"
            />
            <Input
              {...register('password')}
              autoComplete="off"
              error={errors.password}
              label="Password"
              id="password"
              placeholder="johndoe123@"
              type="password"
            />
          </div>
          <Button type="submit" variant="primary" isLoading={isPending}>
            <Button.Label>Sign in</Button.Label>
          </Button>
        </form>
        <div className="mt-4 flex w-full max-w-[512px] flex-col items-start gap-y-2">
          <span className="flex gap-x-1 text-sm font-normal">
            {"Don't"} have an account?
            <Link
              className="text-yellow600 transition-colors duration-300 hover:text-yellow600/70"
              href="/register"
            >
              Create one
            </Link>
          </span>
          <Link
            className="font-regularblock text-sm text-white transition-colors duration-300 hover:text-gray300"
            href="/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </div>
  )
}
