import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Paragraph } from '@/components/atoms/Paragraph'
import { SnipeCell } from '@/components/atoms/SnipeCell'
import { Switch } from '@/components/atoms/Switch'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { useState } from 'react'
import { ModalProps } from '@/@types/app'

export function TurnOnSnipeModal({ onClose }: ModalProps) {
  const [isAdminsConfig, setIsAdminsConfig] = useState<boolean>(true)
  const [isAutoSell, setIsAutoSell] = useState<boolean>(false)
  const [gasBid, setGasBid] = useState<string>('low')

  const gasBidMocks = [
    {
      title: 'Low',
      value: 'low',
    },
    {
      title: 'Medium',
      value: 'medium',
    },
    {
      title: 'High',
      value: 'high',
    },
    {
      title: 'Max',
      value: 'max',
    },
  ]

  const configsMock = [
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
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray900/80 fixed inset-0" />
      <Dialog.Content className="fixed top-[50%] left-[50%] max-w-[596px] w-full translate-x-[-50%] translate-y-[-50%] bg-gray900 px-9 pt-6 pb-12 focus:outline-none border rounded-[20px] text-purple50 border-gray600">
        <div className="flex items-center justify-between">
          <div className="opacity-0 w-6 h-6" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              TURN ON SNIPE
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-purple500" />
          </Dialog.Close>
        </div>

        <div className="w-full h-px bg-gray500 mt-4" />

        <div className="flex flex-col gap-y-6 mt-5">
          <div className="flex flex-col items-start gap-y-3">
            <Paragraph variant="p1">
              Use admin’s default configuration
            </Paragraph>
            <Switch
              checked={isAdminsConfig}
              onClick={() => {
                setIsAdminsConfig((prev) => !prev)
              }}
            />
          </div>

          <div className="w-full">
            <Paragraph variant="p1">Review configuration</Paragraph>
            {isAdminsConfig ? (
              <div className="mt-4 grid grid-cols-2 gap-y-5">
                {configsMock.map(({ title, value }) => {
                  return (
                    <div key={value + title} className="col-span-1">
                      <SnipeCell
                        title={title}
                        value={value}
                        cellDescription={title + value}
                      />
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-y-7 gap-x-8">
                <div className="col-span-1">
                  <SnipeCell
                    title="Minting address"
                    value={'0X...F9b'}
                    cellDescription={'Minting address'}
                  />
                </div>
                <div className="col-span-1">
                  <SnipeCell
                    highlight={'green'}
                    title={'Mint is renounced'}
                    value={'true'}
                    cellDescription={'Mint is renounced'}
                  />
                </div>
                <div className="grid grid-cols-2 gap-x-8 col-span-2">
                  <Input
                    className="col-span-1"
                    label="Quote amount"
                    id="minting"
                    placeholder="200 $SOL"
                    tooltipContent="label hello"
                  />
                  <Input
                    className="col-span-1"
                    label="Minimum pool size"
                    id="minting"
                    placeholder="1.000 $SOL"
                    tooltipContent="label hello"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label label="Auto sell" tooltipContent="Auto sell" />
                  <Switch
                    checked={isAutoSell}
                    onClick={() => setIsAutoSell((prev) => !prev)}
                  />
                </div>
                <div>
                  <Label
                    label="Gas bid"
                    tooltipContent="Place Cell description here."
                  />

                  <div className="flex gap-3 flex-wrap mt-3">
                    {gasBidMocks.map(({ title, value }) => {
                      const isChecked = gasBid === value

                      return (
                        <div key={title} className="flex items-center gap-1">
                          <Checkbox.Root
                            onClick={() => setGasBid(value)}
                            checked={true}
                            className={`w-6 h-6 border rounded-full ${isChecked ? 'bg-purple500 border-transparent' : 'border-gray500 '}`}
                            id={value}
                          />
                          <span className="text-sm text-purple50 font-medium">
                            {title}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {isAutoSell ? (
                  <>
                    <Input
                      className="col-span-1"
                      label="Sell delay"
                      id="minting"
                      placeholder="500ms"
                      type="number"
                      tooltipContent="hello tootltip"
                    />
                    <Input
                      className="col-span-1"
                      label="Sell retries"
                      id="minting"
                      placeholder="5"
                      type="number"
                      tooltipContent="hello tootltip"
                    />
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-4 mt-12">
          <Button variant="primary" onClick={onClose}>
            <Button.Label>Turn on</Button.Label>
          </Button>
          <Dialog.Close asChild>
            <Button variant="ghost" onClick={onClose}>
              <Button.Label>Cancel</Button.Label>
            </Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
