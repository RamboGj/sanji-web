'use client'

import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import { LockSimple } from '@phosphor-icons/react'
import Link from 'next/link'

export default function BlockedPage() {
  return (
    <div className="flex h-full w-full justify-center py-24">
      <div className="mt-8 flex w-full max-w-[512px] flex-col items-center border border-gray500/10 bg-gray800/60 p-4 lg:px-10 lg:py-12">
        <Heading variant="h1">Access Locked</Heading>

        <div className="flex flex-col items-center py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow500">
            <LockSimple size={32} weight="bold" fill="#120D09" />
          </div>

          <Paragraph className="mt-4 text-center" variant="p2">
            In order to get access to the entire platform you should subscribe.
          </Paragraph>

          <Link
            className="mt-12 font-bold text-yellow500 transition-colors duration-300 hover:text-yellow500/70"
            href={'#'}
          >
            Subscribe now
          </Link>
        </div>
      </div>
    </div>
  )
}
