'use client'

import Image from 'next/image'
import robotIcon from '@/assets/robot.svg'

import * as Tabs from '@radix-ui/react-tabs'
import * as Dialog from '@radix-ui/react-dialog'
import { Footer } from '@/components/atoms/Footer'
import { Header } from '@/components/atoms/Header'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import { Gear, Plus } from '@phosphor-icons/react'
import { useContext, useState } from 'react'
import { TurnOnSnipeModal } from '@/components/molecules/TurnOnSnipeModal'
import { CreateSnipeModal } from '@/components/molecules/CreateSnipeModal'
import { DeleteSnipeModal } from '@/components/molecules/DeleteSnipeModal'
import { SnipeCard } from '@/components/molecules/SnipeCard'
import { ConfigModal } from '@/components/molecules/ConfigModal'
import Link from 'next/link'
import { AppContext } from '@/app/contexts/AppContext'
import { MobileBottomNavigation } from '../atoms/MobileBottomNavigation'

export type ModalOpenProps =
  | 'create-snipe'
  | 'config'
  | 'delete-snipe'
  | 'turn-on-snipe'
  | 'config'
  | 'none'

export default function DashboardClientPage() {
  const [tab, setTab] = useState<string>('global')
  const { modalOpen, setModalOpen } = useContext(AppContext)

  const snipesMock = Array.from({ length: 4 })

  function onClose() {
    setModalOpen('none')
  }

  const attributesMock = [
    {
      title: 'Minting address',
      value: '0X...F9b',
    },
    {
      title: 'Quote amount',
      value: '299 $SOL',
    },
    {
      title: 'Mint is renounced',
      value: 'true',
    },
    {
      title: 'Minimum pool size',
      value: '1000 $SOL',
    },
    {
      title: 'Gas bid',
      value: 'low',
    },
    {
      title: 'Auto sell',
      value: 'false',
    },
    {
      title: 'Sell delay',
      value: '370ms',
    },
    {
      title: 'Sell retries',
      value: '5',
    },
  ]

  const tabsTrigger = [
    {
      value: 'global',
      title: 'Global',
    },
    {
      value: 'active',
      title: 'Active',
    },
  ]

  return (
    <>
      <div className="relative h-full w-full">
        <Header />

        <main className="mx-auto mt-20 w-full max-w-[1592px] px-5 pb-[200px] lg:px-[50px]">
          <div className="flex items-center justify-between lg:items-start">
            <div className="flex items-center gap-5">
              <div className="hidden h-[108px] w-[108px] items-center justify-center rounded-[20px] bg-purple600 lg:flex">
                <Image src={robotIcon} alt="Robot Icon" />
              </div>

              <div className="flex flex-col gap-[10px]">
                <Heading className="leading-none" variant="h1">
                  BOT 001
                </Heading>
                <Link className="hidden w-[282px] lg:flex" href="/activity">
                  <Button>
                    <Button.Label>View Activity</Button.Label>
                  </Button>
                </Link>
              </div>
            </div>

            <div
              role="button"
              onClick={() => setModalOpen('create-snipe')}
              className="lg:hidden"
            >
              <span className="text-[1.25rem] text-purple500">Add</span>
            </div>
            <div className="hidden items-center gap-4 lg:flex">
              <div className="w-[52px]">
                <Button onClick={() => setModalOpen('create-snipe')}>
                  <Button.Icon>
                    <Plus color="#FAF5FF" size={35} weight="bold" />
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
          </div>

          <div className="mt-6 hidden h-px w-full bg-gray600 lg:block" />

          <div className="mt-6 lg:mt-10">
            <Heading className="hidden lg:flex" variant="h2">
              Snipes
            </Heading>

            <div className="w-full rounded-xl lg:mt-5 lg:border lg:border-gray600 lg:bg-gray800">
              <Tabs.Root defaultValue="global">
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

                <Tabs.Content value="global">
                  <ul className="flex flex-col items-stretch gap-5 py-5 lg:gap-10 lg:px-8 lg:py-10">
                    {snipesMock.map((it, index) => {
                      return (
                        <li key={index}>
                          <SnipeCard
                            onOpenDeleteModal={() =>
                              setModalOpen('delete-snipe')
                            }
                            onOpenTurnOnModal={() =>
                              setModalOpen('turn-on-snipe')
                            }
                            data={attributesMock}
                            title="Snipe TokenX"
                          />
                        </li>
                      )
                    })}
                  </ul>
                </Tabs.Content>
                <Tabs.Content value="active">
                  <ul className="flex flex-col items-stretch gap-5 py-5 lg:gap-10 lg:py-10">
                    <SnipeCard
                      onOpenDeleteModal={() => setModalOpen('delete-snipe')}
                      data={attributesMock}
                      title="Snipe TokenX"
                      onOpenTurnOnModal={() => setModalOpen('turn-on-snipe')}
                    />
                  </ul>
                </Tabs.Content>
              </Tabs.Root>
            </div>
          </div>
        </main>

        <Footer />

        <MobileBottomNavigation />
      </div>

      <Dialog.Root open={modalOpen !== 'none'}>
        {modalOpen === 'create-snipe' ? (
          <CreateSnipeModal onClose={onClose} />
        ) : null}
        {modalOpen === 'delete-snipe' ? (
          <DeleteSnipeModal onClose={onClose} />
        ) : null}
        {modalOpen === 'turn-on-snipe' ? (
          <TurnOnSnipeModal onClose={onClose} />
        ) : null}
        {modalOpen === 'config' ? <ConfigModal onClose={onClose} /> : null}
      </Dialog.Root>
    </>
  )
}
