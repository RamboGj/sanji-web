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
import { onCreateArbitrageBot } from '@/services/api/arbitrage'
import { Paragraph } from '@/components/atoms/Paragraph'
import { onNotify } from '@/utils/alert'

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
        await createSnipeBot({
          privateKey: data.privateKey,
        })
        await onCreateArbitrageBot()

        push('/')
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
        <Heading variant="h1">Finish setup</Heading>

        <form
          className="mt-8 flex w-full max-w-[512px] flex-col gap-y-8 border border-gray500/10 bg-gray800/60 p-4 lg:px-10 lg:py-12"
          onSubmit={handleSubmit(onSendPrivateKey)}
        >
          <Paragraph className="text-gray400" variant="p2">
            Configure your Sniper Bot private key. You must initialize a new
            wallet (Phantom) and fund it with WSOL and SOL. DO NOT USE EXISTING
            WALLETS.
          </Paragraph>

          <Input
            {...register('privateKey')}
            error={errors.privateKey}
            id="privateKey"
            placeholder="Your private key..."
            label="Private key"
            tooltipContent="We need your wallet's private key in order to make transactions without calling a message signing request everytime. Once your BOT can run on automatic pilot, it would not be possible to call a signing request"
          />

          <Button type="submit" variant="primary" isLoading={isPending}>
            <Button.Label>Create account</Button.Label>
          </Button>
        </form>
      </div>
    </div>
  )
}
