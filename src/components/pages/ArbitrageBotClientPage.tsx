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
import { Paragraph } from '../atoms/Paragraph'

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
      } catch (err) {
        if (isAxiosError(err)) {
          console.log('err', err)
          onNotify('error', err.response?.data.message)
        }
      }
    })
  }

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
                <div className="flex gap-x-3">
                  <Tag
                    label={state.arbitrage.isActive ? 'RUNNING' : 'OFFLINE'}
                    feedback={state.arbitrage.isActive ? 'success' : 'error'}
                  />
                  <Tag
                    label={
                      state.arbitrage.notificationSettings.telegram.enabled
                        ? 'TELEGRAM NOTIFICATIONS ENABLED'
                        : 'TELEGRAM NOTIFICATIONS DISABLED'
                    }
                    feedback={
                      state.arbitrage.notificationSettings.telegram.enabled
                        ? 'success'
                        : 'error'
                    }
                  />
                </div>
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
                state={state}
                data={state.arbitrage}
                dispatch={dispatch}
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
      <div className="flex h-full w-full flex-1 flex-col gap-y-6 border border-gray500/10 bg-gray800/60 p-6">
        <Paragraph className="text-gray300">
          Please be aware of the following key points regarding the API keys and
          secrets you provide:
        </Paragraph>

        <Paragraph className="text-gray300">
          Security Responsibility: You are responsible for the secure handling
          of your API keys. Our platform ensures their secure storage and usage,
          but we are not liable for any misuse or unauthorized access outside
          our application.
        </Paragraph>

        <Paragraph className="text-gray300">API Key Management:</Paragraph>

        <div>
          <Paragraph className="text-gray300">
            Use API keys with minimal necessary permissions.
          </Paragraph>
          <Paragraph className="text-gray300">
            Regularly monitor your exchange account activities.
          </Paragraph>
          <Paragraph className="text-gray300">
            Immediately revoke and replace keys if you suspect any unauthorized
            access.
          </Paragraph>
        </div>
      </div>
    </main>
  )
}
