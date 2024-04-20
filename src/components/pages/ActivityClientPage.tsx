/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Heading } from '@/components/atoms/Heading'
import { CaretLeft } from '@phosphor-icons/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { MobileBottomNavigation } from '../atoms/MobileBottomNavigation'
// import { COOKIES_KEY } from '@/utils/cookies'
// import { getCookie } from 'cookies-next'
import ReconnectingWebSocket from 'reconnecting-websocket'

export function ActivityClientPage() {
  const [logs, setLogs] = useState<any>([])

  useEffect(() => {
    // const jwt = getCookie(COOKIES_KEY.JWT)

    const wsUrl = `wss://api.natoshi.app/v1/bot/logs?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9eyJpYXQiOjE3MTM2MTk1MjMsImV4cCI6MTcxMzcwNTkyMywic3ViIjoiNjYyMmE5MmJjOTM3YjVlY2Q2NTI1MWQ1In0dEvuZbTmlw8WVjUzhYtABdZ5jYARMaQUYefIshX0MM`

    const websocket = new ReconnectingWebSocket(wsUrl)

    console.log('websocket', websocket)

    websocket.onopen = () => console.log('WebSocket connected')
    websocket.onmessage = (event) => {
      console.log('event', event)
      setLogs((prevLogs: any) => [...prevLogs, event.data])
    }
    websocket.onerror = (error) => console.error('WebSocket error:', error)

    return () => {
      websocket.close()
    }
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
            <p>{logs}</p>
          </div>
        </div>
      </main>

      <MobileBottomNavigation />
    </div>
  )
}
