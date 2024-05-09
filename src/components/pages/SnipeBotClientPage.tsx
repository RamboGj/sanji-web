'use client'

import * as Dialog from '@radix-ui/react-dialog'

import { Heading } from '@/components/atoms/Heading'
import {
  ArrowCounterClockwise,
  CircleNotch,
  Funnel,
  Gear,
  Pencil,
  Power,
} from '@phosphor-icons/react'
import { useEffect, useReducer, useState } from 'react'
import { ChangeSnipeModal } from '@/components/molecules/ChangeSnipeModal'
import { ConfigModal } from '@/components/molecules/ConfigModal'
import { SnipeProps } from '@/reducers/SnipeReducer/SnipeState'
import { snipeReducer } from '@/reducers/SnipeReducer/SnipeReducer'
import { Paragraph } from '../atoms/Paragraph'

interface SnipeBotClientPageProps {
  data: SnipeProps
}

export default function SnipeBotClientPage({
  data: {
    _id,
    autoSell,
    autoSellDelay,
    checkIfMintIsRenounced,
    gasLevel,
    maxSellRetries,
    minPoolSize,
    quoteAmount,
    running,
    snipeList,
    useSnipeList,
  },
}: SnipeBotClientPageProps) {
  const [refreshing, setRefreshing] = useState<boolean>(false)
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

  const [state, dispatch] = useReducer(snipeReducer, {
    snipe: {
      _id,
      quoteAmount,
      minPoolSize,
      checkIfMintIsRenounced,
      autoSell,
      useSnipeList,
      snipeList,
      maxSellRetries,
      autoSellDelay,
      gasLevel,
      running,
    },
    isLoading: false,
  })

  function handleRefresh() {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
    }, 3000)
  }

  useEffect(() => {
    console.log('state.snipes.list', state)
  }, [state])

  const snipes = state?.snipe?.snipeList?.split('\n')

  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex w-full items-start justify-between ">
          <div>
            <div className="flex items-center gap-4">
              <Heading variant="h2">Snipe Instance</Heading>
              <div className="flex h-6 w-fit items-center rounded-[24px] border border-green200/10 bg-[#0E1512] px-[10px]">
                <span className="text-xs font-medium text-green200">
                  Running
                </span>
              </div>
            </div>
          </div>
          <div className="item-center flex gap-x-4">
            <Dialog.Root open={isConfigModalOpen}>
              <Dialog.Trigger onClick={() => setIsConfigModalOpen(true)}>
                <div
                  role="button"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
                >
                  <Gear size={24} color="#ED7A14" />
                </div>
              </Dialog.Trigger>
              <ConfigModal
                dispatch={dispatch}
                state={state}
                data={state.snipe}
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
      <div className="w-full flex-1 border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex flex-col">
          <header className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Heading variant="h3">Your Snipes</Heading>
              <div
                role="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
              >
                <Funnel size={24} color="#ED7A14" />
              </div>
            </div>

            <div className="flex items-center gap-x-4">
              <Dialog.Root open={isEditModalOpen}>
                <Dialog.Trigger onClick={() => setIsEditModalOpen(true)}>
                  <div
                    role="button"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
                  >
                    <Pencil size={24} color="#ED7A14" />
                  </div>
                </Dialog.Trigger>
                <ChangeSnipeModal
                  dispatch={dispatch}
                  state={state}
                  onClose={() => setIsEditModalOpen((prev) => !prev)}
                />
              </Dialog.Root>

              <div
                role="button"
                onClick={handleRefresh}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
              >
                {refreshing ? (
                  <CircleNotch
                    className="animate-spin"
                    size={24}
                    color="#ED7A14"
                  />
                ) : (
                  <ArrowCounterClockwise size={24} color="#ED7A14" />
                )}
              </div>
            </div>
          </header>

          <div className="h-px w-full bg-gray500/10" />

          <ul className="flex flex-col divide-y-[1px] divide-gray500/10">
            {snipes ? (
              snipes.map((item: string) => {
                return (
                  <li key={item} className="p-3">
                    {item}
                  </li>
                )
              })
            ) : (
              <div className="flex w-full items-center justify-center p-12">
                <Paragraph>No snipes found</Paragraph>
              </div>
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}
