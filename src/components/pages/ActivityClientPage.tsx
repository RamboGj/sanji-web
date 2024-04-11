'use client'

import { Footer } from '@/components/atoms/Footer'
import { Header } from '@/components/atoms/Header'
import { Heading } from '@/components/atoms/Heading'
import { TransactionCard } from '@/components/atoms/TransactionCard'
import { CaretLeft } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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
    <div className="w-full h-full">
      <Header />

      <main className="w-full px-[50px] mt-20 max-w-[1592px] mx-auto pb-[200px]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Link href={'/'}>
              <div className="w-[52px] h-[52px] bg-purple600 flex items-center justify-center rounded-lg hover:bg-purple700 transtion duration-300">
                <CaretLeft size={24} color="#FFF" />
              </div>
            </Link>

            <Heading className="leading-none" variant="h1">
              Activity
            </Heading>
          </div>
        </div>

        <div className="w-full h-px bg-gray600 mt-6" />

        <div className="mt-10">
          <div className="w-full rounded-xl bg-gray800 border border-gray600 py-7 px-8 gap-y-5 flex flex-col">
            {txMocks.map((it, index) => {
              return <TransactionCard key={index} />
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
