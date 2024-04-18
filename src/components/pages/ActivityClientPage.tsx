'use client'

import { Footer } from '@/components/atoms/Footer'
import { Heading } from '@/components/atoms/Heading'
import { TransactionCard } from '@/components/atoms/TransactionCard'
import { CaretLeft } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MobileBottomNavigation } from '../atoms/MobileBottomNavigation'

export function ActivityClientPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const txMocks = Array.from({ length: 10 })

  console.log('isLoading', isLoading)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  return (
    <div className="relative h-full w-full">
      <main className="mx-auto mt-20 w-full max-w-[1592px] px-5 pb-[200px] lg:px-[50px]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Link href={'/'}>
              <div className="transtion flex h-7 w-7 items-center justify-center rounded-lg bg-purple600 duration-300 hover:bg-purple700 lg:h-[52px] lg:w-[52px]">
                <CaretLeft size={24} color="#FFF" />
              </div>
            </Link>

            <Heading className="leading-none" variant="h1">
              Activity
            </Heading>
          </div>
        </div>

        <div className="mt-6 hidden h-px w-full bg-gray600 lg:block" />

        <div className="mt-5 lg:mt-10">
          <div className="flex w-full flex-col gap-y-5 rounded-xl lg:border lg:border-gray600 lg:bg-gray800 lg:px-8 lg:py-7">
            {txMocks.map((it, index) => {
              return <TransactionCard key={index} />
            })}
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNavigation />
    </div>
  )
}
