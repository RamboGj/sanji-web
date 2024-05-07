'use client'

import 'react-loading-skeleton/dist/skeleton.css'
// import Skeleton from 'react-loading-skeleton'

import { Heading } from '@/components/atoms/Heading'
import { Power } from '@phosphor-icons/react'

export default function ArbitrageBotPage() {
  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex w-full items-start justify-between ">
          <div>
            <div className="flex items-center gap-4">
              <Heading variant="h2">Arbitrage Instance</Heading>
              <div className="flex h-6 w-fit items-center rounded-[24px] border border-green200/10 bg-[#0E1512] px-[10px]">
                <span className="text-xs font-medium text-green200">
                  Running
                </span>
              </div>
            </div>
          </div>
          <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-green200">
            <Power size={24} color="#47FFBB" />
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-1 flex-col border border-gray500/10 bg-gray800/60 p-6"></div>
    </main>
  )
}
