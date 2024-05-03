'use client'

import Image from 'next/image'
import robotIcon from '@/assets/robot.svg'

import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import { Gear, Target } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { ChangeSnipeModal } from '@/components/molecules/ChangeSnipeModal'
import { ConfigModal } from '@/components/molecules/ConfigModal'
import Link from 'next/link'
import { AppContext } from '@/contexts/AppContext'
import { MobileBottomNavigation } from '../atoms/MobileBottomNavigation'
import { Switch } from '../atoms/Switch'
import { Paragraph } from '../atoms/Paragraph'
import { UseSnipeListFalseWarning } from '../molecules/UseSnipeListFalseWarning'
import { BotDataProps } from '@/utils/types'
import { getCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'
import { api } from '@/services/api'
import { onNotify } from '@/utils/alert'
import { DeleteSnipeModal } from '../molecules/DeleteSnipeModal'
import { TurnOnSnipeModal } from '../molecules/TurnOnSnipeModal'

export type ModalOpenProps =
  | 'create-snipe'
  | 'config'
  | 'delete-snipe'
  | 'turn-on-snipe'
  | 'config'
  | 'none'

interface DashboardClientPageProps {
  data: BotDataProps
}

export default function DashboardClientPage({
  data,
}: DashboardClientPageProps) {
  const { modalOpen, setModalOpen, setBotData } = useContext(AppContext)

  const [tab, setTab] = useState<string>('mySnipes')
  const [isRunning, setIsRunning] = useState<boolean>(data?.running || false)

  const snipeList = data?.snipeList?.split(/\n/g).filter((element) => {
    return element.length > 0
  })

  console.log('data', data.snipeList)

  setBotData(data)

  async function onToggleBot() {
    setIsRunning((prev) => !prev)

    const jwt = getCookie(COOKIES_KEY.JWT)
    try {
      await api(`https://api.natoshi.app/v1/bot/toggle/${data._id}`, {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then((res) => {
        if (res.data.message.includes('stopped')) {
          onNotify('error', 'BOT successfully turned off.')
        } else {
          onNotify('success', 'BOT successfully turned on.')
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  function onClose() {
    setModalOpen('none')
  }

  const tabsTrigger = [
    {
      value: 'mySnipes',
      title: 'My Snipes',
    },
    {
      value: 'alpha',
      title: 'Alpha',
    },
  ]

  return (
    <>
      <div className="relative h-full w-full">
        <main className="mx-auto mt-20 w-full max-w-[1592px] px-5 pb-[200px] lg:px-[50px]">
          <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
            <div className="flex items-center gap-5">
              <div className="hidden h-[108px] w-[108px] items-center justify-center rounded-[20px] lg:flex">
                <Image src={robotIcon} alt="Robot Icon" />
              </div>

              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-6">
                  <Heading className="leading-none" variant="h1">
                    BOT {data._id.slice(0, 10) + '...'}
                  </Heading>
                  {isRunning ? (
                    <div className="hidden items-center gap-1.5 lg:flex">
                      <div className="h-3 w-3 rounded-full bg-[#47FFBB]" />
                      <span className="text-sm tracking-widest text-[#47FFBB] ">
                        RUNNING
                      </span>
                    </div>
                  ) : (
                    <div className="hidden items-center gap-1.5 lg:flex">
                      <div className="h-3 w-3 rounded-full bg-danger500" />
                      <span className="text-sm tracking-widest text-danger500 ">
                        OFFLINE
                      </span>
                    </div>
                  )}
                </div>

                <Link className="hidden w-[282px] lg:flex" href="/activity">
                  <Button>
                    <Button.Label>View Activity</Button.Label>
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col">
              <div
                role="button"
                onClick={() => setModalOpen('create-snipe')}
                className="lg:hidden"
              >
                <span className="text-[1.25rem]">Add</span>
              </div>
              <div className="flex flex-col items-end">
                <div className="hidden items-center gap-4 lg:flex">
                  <div className="w-[52px]">
                    <Button
                      onClick={() => {
                        setModalOpen('create-snipe')
                      }}
                    >
                      <Button.Icon>
                        <Target color="#FAF5FF" size={35} />
                      </Button.Icon>
                    </Button>
                  </div>
                  <div className="w-[52px]">
                    <Button onClick={() => setModalOpen('config')}>
                      <Button.Icon>
                        <Gear color="#FAF5FF" size={35} />
                      </Button.Icon>
                    </Button>
                  </div>
                </div>
                <div className="mt-[10px] flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-0">
                  <Paragraph className="w-20 lg:w-32" variant="p2">
                    {isRunning ? 'Turn off BOT' : 'Turn on BOT'}
                  </Paragraph>

                  <Switch checked={isRunning} onClick={onToggleBot} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 hidden h-px w-full bg-gray600 lg:block" />

          <div className="mt-6 lg:mt-10">
            <Heading className="hidden lg:flex" variant="h2">
              Snipes
            </Heading>

            <div className="relative w-full rounded-xl lg:mt-5 lg:border lg:border-gray600 lg:bg-gray800">
              <Tabs.Root defaultValue="mySnipes">
                <Tabs.List className="flex items-center gap-8 lg:gap-12 lg:px-8 lg:py-3">
                  {tabsTrigger.map(({ title, value }) => {
                    const isActive = value === tab

                    return (
                      <Tabs.Trigger
                        onClick={() => {
                          setTab(value)
                        }}
                        value={value}
                        key={value}
                      >
                        <Heading
                          className={
                            isActive
                              ? 'text-purple500'
                              : 'text-purple50 hover:text-purple600'
                          }
                          variant="h3"
                        >
                          {title}
                        </Heading>
                      </Tabs.Trigger>
                    )
                  })}
                </Tabs.List>

                <div className="hidden h-px w-full bg-gray600 lg:block" />

                <Tabs.Content value="mySnipes">
                  {snipeList ? (
                    <ul className="flex flex-col items-stretch gap-5 py-5 lg:gap-10 lg:px-8 lg:py-10">
                      {snipeList?.map((element, index) => {
                        return (
                          <li key={index}>
                            <div className="w-full truncate rounded-[16px] border border-gray600 bg-gray900 px-4 py-6 lg:rounded-xl lg:p-8">
                              <Heading className="text-gray400" variant="h3">
                                {element}
                              </Heading>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-stretch gap-5 py-5 lg:gap-10 lg:px-8 lg:py-10">
                      <Paragraph>No snipe found.</Paragraph>
                    </div>
                  )}
                </Tabs.Content>
                <Tabs.Content value="alpha">
                  {snipeList ? (
                    <ul className="flex flex-col items-stretch gap-5 py-5 lg:gap-10 lg:px-8 lg:py-10">
                      {snipeList?.map((element, index) => {
                        return (
                          <li key={index}>
                            <div className="rounded-[16px] border border-gray600 bg-gray900 px-4 py-6 lg:rounded-xl lg:p-8">
                              <Heading className="text-gray400" variant="h3">
                                {element}
                              </Heading>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <div className="flex flex-col items-stretch gap-5 py-5 lg:gap-10 lg:px-8 lg:py-10">
                      <Paragraph>No snipe found.</Paragraph>
                    </div>
                  )}
                </Tabs.Content>
              </Tabs.Root>
              {data.useSnipeList ? null : <UseSnipeListFalseWarning />}
            </div>
          </div>
        </main>

        <MobileBottomNavigation />
      </div>

      <Dialog.Root open={modalOpen !== 'none'}>
        {modalOpen === 'create-snipe' ? (
          <ChangeSnipeModal data={data} onClose={onClose} />
        ) : null}
        {modalOpen === 'delete-snipe' ? (
          <DeleteSnipeModal onClose={onClose} />
        ) : null}
        {modalOpen === 'turn-on-snipe' ? (
          <TurnOnSnipeModal onClose={onClose} />
        ) : null}
        {modalOpen === 'config' && typeof data !== 'undefined' ? (
          <ConfigModal data={data} onClose={onClose} />
        ) : null}
      </Dialog.Root>
    </>
  )
}
