'use client'

import 'react-loading-skeleton/dist/skeleton.css'
// import Skeleton from 'react-loading-skeleton'

import { Heading } from '@/components/atoms/Heading'
import { Gear, Power } from '@phosphor-icons/react'

import * as Dialog from '@radix-ui/react-dialog'
import { useReducer, useState } from 'react'
import { ConfigArbitrageModal } from '@/components/molecules/ConfigArbitrageModal'
import { ArbitrageBotProps } from '@/reducers/ArbitrageReducer/ArbitrageState'
import { arbitrageReducer } from '@/reducers/ArbitrageReducer/ArbitrageReducer'

interface ArbitrageBotClientPageProps {
  data: ArbitrageBotProps
}

export default function ArbitrageBotClientPage({
  data,
}: ArbitrageBotClientPageProps) {
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false)

  const [state, dispatch] = useReducer(arbitrageReducer, {
    arbitrage: data,
    isLoading: false,
  })

  console.log('state', state)
  console.log('dispatch', dispatch)

  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex w-full items-start justify-between ">
          <div>
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
              <Heading variant="h2">Arbitrage Instance</Heading>
              <div className="flex h-6 w-fit items-center rounded-[24px] border border-green200/10 bg-[#0E1512] px-[10px]">
                <span className="text-xs font-medium text-green200">
                  Running
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-x-3">
            <Dialog.Root open={isConfigModalOpen}>
              <Dialog.Trigger onClick={() => setIsConfigModalOpen(true)}>
                <div
                  role="button"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
                >
                  <Gear size={24} color="#ED7A14" />
                </div>
              </Dialog.Trigger>
              <ConfigArbitrageModal
                onClose={() => {
                  setIsConfigModalOpen((prev) => !prev)
                }}
              />
            </Dialog.Root>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-green200">
              <Power size={24} color="#47FFBB" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-1 flex-col border border-gray500/10 bg-gray800/60 p-6"></div>
    </main>
  )
}
