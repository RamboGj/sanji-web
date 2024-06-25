'use client'

import { Heading } from '@/components/atoms/Heading'
import { useTransition } from 'react'
import Input from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createSnipeBot } from '@/services/api/snipe'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

const setupSchema = z.object({
  privateKey: z
    .string()
    .min(10, 'Invalid private key')
    .max(199, 'Invalid private key'),
})

type SetupSchemaData = z.infer<typeof setupSchema>

export default function SetupPage() {
  const [isPending, startTransition] = useTransition()

  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupSchemaData>({
    defaultValues: {
      privateKey: '',
    },
    resolver: zodResolver(setupSchema),
  })

  async function onSendPrivateKey(data: SetupSchemaData) {
    startTransition(async () => {
      try {
        const response = await createSnipeBot({
          privateKey: data.privateKey,
        })

        if (response.data) push('/')
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
        <Heading variant="h1">Finish setup</Heading>

        <form
          className="mt-8 w-full max-w-[512px] border border-gray500/10 bg-gray800/60 p-4 lg:px-10 lg:py-12"
          onSubmit={handleSubmit(onSendPrivateKey)}
        >
          <Input
            {...register('privateKey')}
            error={errors.privateKey}
            id="privateKey"
            placeholder="Your private key..."
            label="Private key"
            tooltipContent="We need your wallet's private key in order to make transactions without calling a message signing request everytime. Once your BOT can run on automatic pilot, it would not be possible to call a signing request"
          />

          <Button type="submit" variant="primary" isLoading={isPending}>
            <Button.Label>Create bot</Button.Label>
          </Button>
        </form>
      </div>
    </div>
  )
}
