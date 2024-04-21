/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Heading } from '@/components/atoms/Heading'
import { CaretLeft } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'
import { MobileBottomNavigation } from '../atoms/MobileBottomNavigation'
import { api } from '@/services/api'
import Link from 'next/link'
import { getCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'
import { TransactionCard } from '../atoms/TransactionCard'

interface ActivityProps {
  success: boolean
  message: string
  result: {
    timestamp: string
    fee: number
    fee_payer: string
    signers: string[]
    type: string
    actions: [
      {
        info: {
          sender: string
          receiver: string
          amount: number
        }
        source_protocol: '11111111111111111111111111111111'
        type: 'SOL_TRANSFER'
      },
    ]
  }[]
}

export function ActivityClientPage() {
  const [transactions, setTransactions] = useState<ActivityProps>()

  async function onFetchLogs() {
    const publicKey = getCookie(COOKIES_KEY.PUBLIC_KEY)

    console.log('publicKey', publicKey)
    api(
      `https://api.shyft.to/sol/v1/transaction/history?network=mainnet-beta&tx_num=2&account=${publicKey}&enable_raw=true`,
      {
        headers: {
          'x-api-key': 'J7Z8STyz1r_QiQfm',
        },
        method: 'GET',
      },
    )
      .then((response) => {
        console.log('responde', response)
        setTransactions(response.data)
      })
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))
  }

  useEffect(() => {
    onFetchLogs()
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
            <ul>
              {transactions?.result.map(({ actions, fee, timestamp, type }) => {
                return (
                  <TransactionCard
                    key={timestamp}
                    amount={actions[0].info.amount}
                    type={type}
                    date={timestamp}
                    fee={fee}
                    from={actions[0].info.sender}
                    to={actions[0].info.receiver}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </main>

      <MobileBottomNavigation />
    </div>
  )
}
