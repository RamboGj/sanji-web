'use client'

import 'react-loading-skeleton/dist/skeleton.css'
// import Skeleton from 'react-loading-skeleton'

import { Heading } from '@/components/atoms/Heading'
import { Gear, Power } from '@phosphor-icons/react'

import * as Dialog from '@radix-ui/react-dialog'
import { useReducer, useState, useTransition } from 'react'
import { ConfigArbitrageModal } from '@/components/molecules/ConfigArbitrageModal'
import { ArbitrageBotProps } from '@/reducers/ArbitrageReducer/ArbitrageState'
import { arbitrageReducer } from '@/reducers/ArbitrageReducer/ArbitrageReducer'
import Skeleton from 'react-loading-skeleton'
import { Tag } from '../atoms/Tag'
import { isAxiosError } from 'axios'
import { onNotify } from '@/utils/alert'
import { toggleArbitrageBot } from '@/services/api/arbitrage'

interface ArbitrageBotClientPageProps {
  data: ArbitrageBotProps
}

export default function ArbitrageBotClientPage({
  data,
}: ArbitrageBotClientPageProps) {
  const [isPending, startTransition] = useTransition()

  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false)

  const [state, dispatch] = useReducer(arbitrageReducer, {
    arbitrage: data,
    isLoading: false,
  })

  async function onToggleBot() {
    startTransition(async () => {
      try {
        const response = await toggleArbitrageBot({
          botId: state.arbitrage._id,
        })

        console.log('response', response)

        // if (response.data.message.includes('stopped')) {
        //   onNotify('success', 'BOT successfully turned off.')
        //   dispatch({
        //     type: ArbitrageActionType.ARBITRAGE_SAVE,
        //     payload: {
        //       isActive: false,
        //     },
        //   })
        // } else {
        //   onNotify('success', 'BOT successfully turned on.')
        //   dispatch({
        //     type: ArbitrageActionType.ARBITRAGE_SAVE,
        //     payload: {
        //       isActive: true,
        //     },
        //   })
        // }
      } catch (err) {
        if (isAxiosError(err)) {
          console.log('err', err)
          onNotify('error', err.response?.data.message)
        }
      }
    })
  }

  console.log('state', state)
  console.log('dispatch', dispatch)

  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex w-full items-start justify-between ">
          <div>
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
              <Heading variant="h2">Arbitrage Instance</Heading>
              {isPending ? (
                <Skeleton
                  baseColor="#221E1B"
                  highlightColor="#524D48"
                  width={80}
                  height={20}
                  borderRadius={24}
                />
              ) : (
                <Tag
                  label={state.arbitrage.isActive ? 'RUNNING' : 'OFFLINE'}
                  feedback={state.arbitrage.isActive ? 'success' : 'error'}
                />
              )}
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
            <div
              role="button"
              onClick={onToggleBot}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border ${state.arbitrage.isActive ? 'border-gray500' : 'border-green200'}`}
            >
              <Power
                size={24}
                color={state.arbitrage.isActive ? '#524D48' : '#47FFBB'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-1 flex-col border border-gray500/10 bg-gray800/60 p-6"></div>
    </main>
  )
}
