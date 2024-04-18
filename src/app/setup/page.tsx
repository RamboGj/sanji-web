'use client'

import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import '@solana/wallet-adapter-react-ui/styles.css'
import { useState } from 'react'
import Input from '@/components/atoms/Input'
import { Button } from '@/components/atoms/Button'

export default function SetupPage() {
  const [privateKey, setPrivateKey] = useState<string>('')

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="mt-32 flex max-w-[465px] flex-col gap-5 lg:mt-[200px]">
        <div className="flex w-full flex-col items-center rounded-[24px] px-8 py-10 lg:border lg:border-gray500 lg:bg-gray700">
          <Heading className="text-center leading-tight" variant="h2">
            Finish setup
          </Heading>
          <Paragraph variant="p1" className="mb-12 mt-3 text-center">
            Sign in with your phantom wallet in order to enter the dapp
          </Paragraph>

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
          <div className="mt-12 w-full">
            <Button isLoading>
              <Button.Label>Create bot</Button.Label>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
