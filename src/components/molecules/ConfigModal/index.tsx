import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalProps } from '@/@types/app'
import { getProvider } from '@/utils/solana'
import { deleteCookie } from 'cookies-next'

export function ConfigModal({ onClose }: ModalProps) {
  function handleDisconnect() {
    if (typeof window !== 'undefined') {
      const provider = getProvider()

      provider.disconnect()
      deleteCookie('@sanji:public-key')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-gray900/80" />
      <Dialog.Content className="fixed left-[50%] top-[50%] w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 text-purple50 focus:outline-none">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 opacity-0" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              CONFIGURATION
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-purple500" />
          </Dialog.Close>
        </div>

        <div className="mt-4 h-px w-full bg-gray500" />

        <div className="mt-5 flex flex-col gap-y-6">
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

        <div className="mt-12 flex flex-col items-stretch gap-4">
          <Button variant="danger" onClick={handleDisconnect}>
            <Button.Label>Sign out</Button.Label>
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
