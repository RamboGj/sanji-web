'use client'

import Image from 'next/image'

import robotIcon from '@/assets/robot.svg'

import * as Tabs from '@radix-ui/react-tabs'
// import * as Switch from '@radix-ui/react-switch'

import { Footer } from '@/components/atoms/Footer'
import { Header } from '@/components/atoms/Header'
import { Heading } from '@/components/atoms/Heading'
import { Button } from '@/components/atoms/Button'
import { GearSix, Info } from '@phosphor-icons/react'
import { Switch } from '@/components/atoms/Switch'
import { useState } from 'react'

export default function Home() {
  const snipesMock = Array.from({ length: 4 })

  const [isChecked, setIsChecked] = useState<boolean>(false)

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

  return (
    <div className="w-full h-full">
      <Header />

      <main>
        <div>
          <div>
            <Switch
              checked={isChecked}
              onCheckedChange={(e) => {
                setIsChecked(e)
              }}
            />
            <div>
              <Image src={robotIcon} alt="Robot Icon" />
            </div>

            <div>
              <Heading variant="h1">BOT 001</Heading>
              <Button>
                <Button.Label>View Activity</Button.Label>
              </Button>
            </div>
          </div>

          <div>
            <GearSix />
          </div>
        </div>

        <div />

        <div>
          <Heading variant="h2">Snipes</Heading>

          <div>
            <Tabs.Root defaultValue="global">
              <Tabs.List>
                <Tabs.Trigger value="global">Global</Tabs.Trigger>
                <Tabs.Trigger value="active">Active</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="global">
                <ul>
                  {snipesMock.map((item, index) => {
                    return (
                      <li key={index}>
                        <div>
                          <div>
                            <Heading variant="h3">Snipe $TokenX</Heading>
                            <Switch />
                          </div>
                          <div>
                            {attributesMock.map(({ title, value }) => {
                              return (
                                <div key={title}>
                                  <div>
                                    <span>{title}</span>
                                    <div>
                                      <Info />
                                    </div>
                                    <span>{value}</span>
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
              <Tabs.Content value="active"></Tabs.Content>
            </Tabs.Root>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
