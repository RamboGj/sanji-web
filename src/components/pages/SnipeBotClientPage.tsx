'use client'

import * as Dialog from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import 'react-loading-skeleton/dist/skeleton.css'

import { Heading } from '@/components/atoms/Heading'
import { Funnel, Gear, Pencil, Power } from '@phosphor-icons/react'
import { useReducer, useState } from 'react'
import { ChangeSnipeModal } from '@/components/molecules/ChangeSnipeModal'
import { ConfigModal } from '@/components/molecules/ConfigModal'
import { SnipeProps } from '@/reducers/SnipeReducer/SnipeState'
import { snipeReducer } from '@/reducers/SnipeReducer/SnipeReducer'
import { Paragraph } from '../atoms/Paragraph'
import { api } from '@/services/api'
import { COOKIES_KEY } from '@/utils/cookies'
import { getCookie } from 'cookies-next'
import { onNotify } from '@/utils/alert'
import { Tag } from '../atoms/Tag'
import Skeleton from 'react-loading-skeleton'
import { SnipeActionType } from '@/reducers/SnipeReducer/SnipeActions'

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
  const [isConfigModalOpen, setIsConfigModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

  const [snipesTab, setSnipesTab] = useState<string>('yourSnipes')

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

  async function onToggleBot() {
    dispatch({ type: SnipeActionType.SNIPE_TOGGLE_LOADING })

    const jwt = getCookie(COOKIES_KEY.JWT)
    try {
      await api(`https://api.natoshi.app/v1/bot/toggle/${state.snipe._id}`, {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => {
        if (res.data.message.includes('stopped')) {
          onNotify('success', 'BOT successfully turned off.')
          dispatch({
            type: SnipeActionType.SNIPE_SAVE,
            payload: {
              running: false,
            },
          })
        } else {
          onNotify('success', 'BOT successfully turned on.')
          dispatch({
            type: SnipeActionType.SNIPE_SAVE,
            payload: {
              running: true,
            },
          })
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const snipes =
    state.snipe.snipeList && state.snipe.snipeList.length > 0
      ? state.snipe.snipeList.split('\n')
      : []

  console.log('snipes', snipes)

  const snipeTabs = [
    {
      label: 'Your snipes',
      value: 'yourSnipes',
    },
    {
      label: 'Alpha snipes',
      value: 'alphaSnipes',
    },
  ]

  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex w-full items-start justify-between ">
          <div>
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
              <Heading variant="h2">Snipe Instance</Heading>
              {state.isLoading ? (
                <Skeleton
                  baseColor="#221E1B"
                  highlightColor="#524D48"
                  width={80}
                  height={20}
                  borderRadius={24}
                />
              ) : (
                <Tag
                  label={state.snipe.running ? 'RUNNING' : 'OFFLINE'}
                  feedback={state.snipe.running ? 'success' : 'error'}
                />
              )}
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

            <div
              role="button"
              onClick={onToggleBot}
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border ${state.snipe.running ? 'border-gray500' : 'border-green200'}`}
            >
              <Power
                size={24}
                color={state.snipe.running ? '#524D48' : '#47FFBB'}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex-1 border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex flex-col">
          <header className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Heading variant="h3">Your Snipes</Heading>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild className="flex">
                  <div
                    role="button"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
                  >
                    <Funnel size={24} color="#ED7A14" />
                  </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="text-purple50 z-50 max-w-[320px] rounded-lg border border-gray500/10 bg-gray800 text-sm"
                    sideOffset={5}
                  >
                    <div className="flex cursor-pointer flex-col">
                      {snipeTabs.map(({ label, value }) => {
                        const isActive = snipesTab === value

                        return (
                          <span
                            role="button"
                            onClick={() => {
                              setSnipesTab(value)
                            }}
                            key={value}
                            className={`select-none rounded-t-lg px-12 py-4 transition-colors duration-300 hover:bg-gray700 ${isActive ? 'text-yellow600' : ''}`}
                          >
                            {label}
                          </span>
                        )
                      })}
                    </div>
                    <DropdownMenu.Arrow className="fill-gray700" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
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

              {/* <div
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
              </div> */}
            </div>
          </header>

          <div className="h-px w-full bg-gray500/10" />

          <ul className="flex flex-col divide-y-[1px] divide-gray500/10">
            {snipes && snipes.length > 0 ? (
              snipes.map((item: string) => {
                return (
                  <li key={item} className="p-3">
                    {item}
                  </li>
                )
              })
            ) : (
              <div className="flex w-full items-center justify-center p-12">
                <Paragraph className="text-gray500">No snipes found</Paragraph>
              </div>
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}
