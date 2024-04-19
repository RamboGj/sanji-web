import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { ModalProps } from '@/@types/app'
import { Label } from '@/components/atoms/Label'

export function CreateSnipeModal({ onClose }: ModalProps) {
  const [snipeConfig, setSnipeConfig] = useState<string>('')

  function handleSave() {
    const textWithNewlines = snipeConfig.replace(/\n/g, '\\n') // Replace line breaks with \n
    console.log('textWithNewlines', textWithNewlines)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-gray900/80" />
      <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 text-purple50 focus:outline-none">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 opacity-0" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              Change Snipes
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-purple500" />
          </Dialog.Close>
        </div>

        <div className="mt-4 h-px w-full bg-gray500" />

        <div className="mt-8 flex w-full flex-col gap-2">
          <Label
            tooltipContent="Follow the example below and write one snipe LP per line"
            label="Snipe settings"
            htmlFor="snipeSettings"
          />
          <textarea
            value={snipeConfig}
            onChange={(e) => {
              setSnipeConfig(e.target.value)
            }}
            className="w-full overflow-y-scroll whitespace-pre-wrap rounded-lg border border-transparent bg-gray600 px-4 py-3 font-medium text-purple50 transition duration-500 placeholder:text-gray400 focus:border-purple500 focus:bg-gray700 focus:outline-none"
            placeholder={`EGGoorE6ULqPzJYVZNSmUrNkLqJtSjbbt9iCjr5AarCF\nLP:USDC-SOL\nLP:SOL-WIF\nLP:WIF-SOL`}
            name="snipeSettings"
            id="snipeSettings"
            rows={10}
          />
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-4">
          <Button variant="primary" onClick={handleSave}>
            <Button.Label>Save</Button.Label>
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <Button.Label>Cancel</Button.Label>
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
