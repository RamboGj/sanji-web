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
import { setCookie } from 'cookies-next'

export default function AuthPage() {
  const { push } = useRouter()

  async function onConnect() {
    if (typeof window !== 'undefined') {
      const provider = getProvider()

      try {
        const resp = await provider.connect()
        setCookie('@sanji:public-key', resp.publicKey.toString())
        console.log('push')
        push('/')
      } catch (err) {
        // { code: 4001, message: 'User rejected the request.' }
      }
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Header />
      <div className="mt-32 flex-1 lg:mt-[200px]">
        <div className="flex w-full max-w-[465px] flex-col items-center rounded-[24px] px-8 py-10 lg:border lg:border-gray500 lg:bg-gray700">
          <Heading className="text-center leading-tight" variant="h2">
            Connect your wallet
          </Heading>
          <Paragraph variant="p1" className="mb-[100px] mt-3 text-center">
            Sign in with your phantom wallet in order to enter the dapp
          </Paragraph>
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
