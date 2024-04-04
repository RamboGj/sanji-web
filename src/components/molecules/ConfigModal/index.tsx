import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalProps } from '@/@types/app'
import { getProvider } from '@/utils/solana'

export function ConfigModal({ onClose }: ModalProps) {
  async function handleDisconnect() {
    const provider = getProvider()

    provider.disconnect()
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray900/80 fixed inset-0" />
      <Dialog.Content className="fixed top-[50%] left-[50%] max-w-[596px] w-full translate-x-[-50%] translate-y-[-50%] bg-gray900 px-9 pt-6 pb-12 focus:outline-none border rounded-[20px] text-purple50 border-gray600">
        <div className="flex items-center justify-between">
          <div className="opacity-0 w-6 h-6" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              CONFIGURATION
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-purple500" />
          </Dialog.Close>
        </div>

        <div className="w-full h-px bg-gray500 mt-4" />

        <div className="flex flex-col gap-y-6 mt-5">
          <Input
            label="Private key"
            id="minting"
            placeholder="Ox..."
            tooltipContent="label hello"
          />
          <Button variant="primary" onClick={onClose}>
            <Button.Label>Save</Button.Label>
          </Button>
        </div>

        <div className="flex flex-col items-stretch gap-4 mt-12">
          <Button variant="danger" onClick={handleDisconnect}>
            <Button.Label>Sign out</Button.Label>
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
