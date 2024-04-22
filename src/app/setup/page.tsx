'use client'

import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import { useState } from 'react'
import Input from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'
import '@solana/wallet-adapter-react-ui/styles.css'

export default function SetupPage() {
  const [privateKey, setPrivateKey] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const { push } = useRouter()

  async function onSendPrivateKey() {
    setIsLoading(true)

    const jwt = getCookie(COOKIES_KEY.JWT)

    try {
      await axios('https://api.natoshi.app/v1/bot', {
        method: 'POST',
        data: {
          privateKey,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then(() => {
        push('/')
      })
    } catch (err) {
      setError('Invalid private key.')
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="mt-32 flex max-w-lg flex-col gap-5 lg:mt-[200px]">
        <div className="flex w-full flex-col items-center rounded-[24px] px-8 py-10 lg:border lg:border-gray500 lg:bg-gray700">
          <Heading className="text-center leading-tight" variant="h2">
            Finish setup
          </Heading>
          <Paragraph variant="p1" className="mb-12 mt-3 text-center">
            Input your private key in order to make transactions inside Sanji
            App.
          </Paragraph>

          <div className="flex w-full flex-col items-start gap-2">
            <Input
              id="private-key-input"
              placeholder="Your private key..."
              label="Private key"
              tooltipContent="We need your wallet private key in order to make transactions without calling a message signing request everytime. Once your BOT can run on automatic pilot, it would not be possible to call a signing request"
              value={privateKey}
              onChange={(e) => {
                setPrivateKey(e.target.value)
              }}
            />
            <span className="text-sm text-danger600">{error}</span>
          </div>

          <div className="mt-12 w-full">
            <Button isLoading={isLoading} onClick={onSendPrivateKey}>
              <Button.Label>Create bot</Button.Label>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
