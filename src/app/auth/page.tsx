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
    <main className="w-full flex items-center flex-col min-h-screen">
      <Header />
      <div className="mt-32 lg:mt-[200px] flex-1">
        <div className="max-w-[465px] w-full flex flex-col items-center px-8 py-10 lg:bg-gray700 lg:border lg:border-gray500 rounded-[24px]">
          <Heading className="text-center leading-tight" variant="h2">
            Connect your wallet
          </Heading>
          <Paragraph variant="p1" className="mt-3 text-center mb-[100px]">
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
