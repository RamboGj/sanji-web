'use client'

import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import {
  WalletMultiButton,
  useWalletModal,
  WalletModal,
} from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import '@solana/wallet-adapter-react-ui/styles.css'
import { Warning } from '@phosphor-icons/react'

export default function AuthPage() {
  const { connect } = useWallet()
  const { setVisible, visible } = useWalletModal()

  async function onConnect() {
    setVisible(true)
    try {
      await connect()
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <div className="mt-32 flex max-w-[465px] flex-col gap-5 lg:mt-[200px]">
        <div className="flex w-full items-start gap-1.5 rounded-xl border border-[#431407]/60 bg-[#431407]/15 p-4">
          <Warning fill="#B45309" size={24} />
          <span className="text-sm text-gray400">
            We strongly recommend you to create a new wallet in order to use
            Sanji App.
          </span>
        </div>
        <div className="flex w-full flex-col items-center rounded-[24px] px-8 py-10 lg:border lg:border-gray500 lg:bg-gray700">
          <Heading className="text-center leading-tight" variant="h2">
            Connect your wallet
          </Heading>
          <Paragraph variant="p1" className="mb-[100px] mt-3 text-center">
            Sign in with your phantom wallet in order to enter the dapp
          </Paragraph>

          <WalletMultiButton className="w-full" onClick={onConnect} />
          {visible ? <WalletModal /> : null}
        </div>
      </div>
    </main>
  )
}
