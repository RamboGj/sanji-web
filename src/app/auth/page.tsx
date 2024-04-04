/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Image from 'next/image'
import phenom from '@/assets/phantom-logo.png'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import { Footer } from '@/components/atoms/Footer'
import { Header } from '@/components/atoms/Header'
import { getProvider } from '@/utils/solana'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { push } = useRouter()

  async function onConnect() {
    const provider = getProvider()

    try {
      const resp = await provider.connect()
      console.log('resp', resp)
      console.log(resp.publicKey.toString())
      push('/')
    } catch (err) {
      // { code: 4001, message: 'User rejected the request.' }
    }
  }

  return (
    <main className="w-full flex items-center flex-col min-h-screen">
      <Header />
      <div className="mt-[200px] flex-1">
        <div className="max-w-[465px] w-full flex flex-col items-center px-8 py-10 bg-gray700 border border-gray500 rounded-[24px]">
          <Heading variant="h2">Connect your wallet</Heading>
          <Paragraph className="mt-3 text-center mb-[100px]">
            Sign in with your phantom wallet in order to enter the dapp
          </Paragraph>

          {/* <Paragraph className="mt-3 text-center">STATUS: {status}</Paragraph>
          <Paragraph className="mt-3 text-center">account: {account}</Paragraph>
          <Paragraph className="mt-3 text-center">chain: {chain}</Paragraph> */}

          <Button variant="ghost" onClick={onConnect}>
            <Button.Icon>
              <Image src={phenom} height={26} alt="Phantom Wallet Logo" />
            </Button.Icon>
          </Button>
        </div>
      </div>
      <Footer />
    </main>
  )
}
