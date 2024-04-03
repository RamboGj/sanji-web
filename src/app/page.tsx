'use client'

import Image from 'next/image'

import robotIcon from '@/assets/robot.svg'

import * as Tabs from '@radix-ui/react-tabs'
// import * as Switch from '@radix-ui/react-switch'

import { Footer } from '@/components/atoms/Footer'
import { Header } from '@/components/atoms/Header'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import { Gear, Info, Plus, Trash } from '@phosphor-icons/react'
import { Switch } from '@/components/atoms/Switch'
import { useState } from 'react'
import { Paragraph } from '@/components/atoms/Paragraph'
import { SnipeCell } from '@/components/atoms/SnipeCell'

export default function Home() {
  const [tab, setTab] = useState<string>('global')
  const snipesMock = Array.from({ length: 4 })

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

  /* <Switch
              checked={isChecked}
              onCheckedChange={(e) => {
                setIsChecked(e)
              }}
            /> */
  return (
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
                <Button>
                  <Button.Label>View Activity</Button.Label>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-[52px]">
              <Button>
                <Button.Icon>
                  <Plus color="#FAF5FF" size={35} />
                </Button.Icon>
              </Button>
            </div>
            <div className="w-[52px]">
              <Button>
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
                  {snipesMock.map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="bg-gray900 rounded-xl border border-gray600 drop-shadow-md p-8">
                          <div className="w-full flex items-center justify-between">
                            <Heading variant="h3">Snipe $TokenX</Heading>
                            <div className="flex items-center gap-2">
                              <div
                                className="w-[30px] h-[30px] rounded-[6px] bg-gray800 flex items-center justify-center border-[0.5px] border-danger600 group group-hover:border-danger500 transition-colors duration-300"
                                role="button"
                              >
                                <Trash
                                  size={20}
                                  className="text-danger600 group-hover:text-danger500"
                                />
                              </div>
                              <Switch checked={true} />
                            </div>
                          </div>
                          <div className="grid grid-cols-5 gap-y-8 mt-6">
                            {attributesMock.map(({ title, value }) => {
                              return (
                                <li key={title} className="col-span-1">
                                  <SnipeCell title={title} value={value} />
                                </li>
                              )
                            })}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </Tabs.Content>
              <Tabs.Content value="active">
                <ul className="flex flex-col items-stretch py-10 px-8 gap-10">
                  {snipesMock.map((item, index) => {
                    return (
                      <li key={index}>
                        <div className="bg-gray900 rounded-xl border border-gray600 drop-shadow-md p-8">
                          <div className="w-full flex items-center justify-between">
                            <Heading variant="h3">Snipe $TokenX</Heading>
                            <Switch checked={true} />
                          </div>
                          <div className="grid grid-cols-5 gap-y-8 mt-6">
                            {attributesMock.map(({ title, value }) => {
                              return (
                                <div key={title} className="col-span-1">
                                  <div className="flex flex-col gap-1.5">
                                    <div className="flex items-center gap-2">
                                      <Paragraph className="text-gray300 leading-none">
                                        {title}
                                      </Paragraph>
                                      <div
                                        role="button"
                                        className="bg-gray800 border-[0.5px] border-gray600 w-6 h-6 flex items-center justify-center rounded-[6px] hover:bg-gray700"
                                      >
                                        <Info
                                          className="text-gray400"
                                          size={16}
                                        />
                                      </div>
                                    </div>
                                    <Paragraph className="text-gray400 leading-none">
                                      {value}
                                    </Paragraph>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
