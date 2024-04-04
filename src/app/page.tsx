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
import { useState } from 'react'
import { TurnOnSnipeModal } from '@/components/molecules/TurnOnSnipeModal'
import { CreateSnipeModal } from '@/components/molecules/CreateSnipeModal'
import { DeleteSnipeModal } from '@/components/molecules/DeleteSnipeModal'
import { SnipeCard } from '@/components/molecules/SnipeCard'
import { ConfigModal } from '@/components/molecules/ConfigModal'
import Link from 'next/link'

type ModalOpenProps =
  | 'create-snipe'
  | 'config'
  | 'delete-snipe'
  | 'turn-on-snipe'
  | 'config'
  | 'none'

export default function Home() {
  const [tab, setTab] = useState<string>('global')
  const [modalOpen, setModalOpen] = useState<ModalOpenProps>('none')
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
      <div className="w-full h-full">
        <Header />

        <main className="w-full px-[50px] mt-20 max-w-[1592px] mx-auto pb-[200px]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-[108px] h-[108px] bg-purple600 flex items-center justify-center rounded-[20px]">
                <Image src={robotIcon} alt="Robot Icon" />
              </div>

              <div className="flex flex-col gap-[10px]">
                <Heading className="leading-none" variant="h1">
                  BOT 001
                </Heading>
                <div className="w-[282px]">
                  <Link href="/activity">
                    <Button>
                      <Button.Label>View Activity</Button.Label>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
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

          <div className="w-full h-px bg-gray600 mt-6" />

          <div className="mt-10">
            <Heading variant="h2">Snipes</Heading>

            <div className="w-full rounded-xl bg-gray800 border border-gray600">
              <Tabs.Root defaultValue="global">
                <Tabs.List className="py-3 px-8 flex items-center gap-12">
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

                <div className="w-full h-px bg-gray600" />

                <Tabs.Content value="global">
                  <ul className="flex flex-col items-stretch py-10 px-8 gap-10">
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
                  <ul className="flex flex-col items-stretch py-10 px-8 gap-10">
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
