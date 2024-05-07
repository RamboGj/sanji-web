'use client'

import 'react-loading-skeleton/dist/skeleton.css'
// import Skeleton from 'react-loading-skeleton'

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
import { useState } from 'react'
import { ChangeSnipeModal } from '@/components/molecules/ChangeSnipeModal'
import { ConfigModal } from '@/components/molecules/ConfigModal'

export default function SnipeBotPage() {
  const [refreshing, setRefreshing] = useState<boolean>(false)

  function handleRefresh() {
    setRefreshing(true)

    setTimeout(() => {
      setRefreshing(false)
    }, 3000)
  }
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
            <Dialog.Root>
              <Dialog.Trigger>
                <div
                  role="button"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
                >
                  <Gear size={24} color="#ED7A14" />
                </div>
              </Dialog.Trigger>
              <ConfigModal data={null} onClose={() => {}} />
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
              <Dialog.Root>
                <Dialog.Trigger>
                  <div
                    role="button"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
                  >
                    <Pencil size={24} color="#ED7A14" />
                  </div>
                </Dialog.Trigger>
                <ChangeSnipeModal data={null} onClose={() => {}} />
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
            <li className="p-3">Snipe 1</li>
            <li className="p-3">Snipe 2</li>
            <li className="p-3">Snipe 3</li>
            <li className="p-3">Snipe 4</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
