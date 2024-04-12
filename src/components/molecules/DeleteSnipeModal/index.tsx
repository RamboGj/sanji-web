import { ModalProps } from '@/@types/app'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'

export function DeleteSnipeModal({ onClose }: ModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-gray900/80" />
      <Dialog.Content className="fixed left-[50%] top-[50%] w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 text-purple50 focus:outline-none">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 opacity-0" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              DELETE SNIPE
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle
              size={32}
              className="text-danger500 transition-colors duration-300 hover:text-danger600"
            />
          </Dialog.Close>
        </div>

        <div className="mt-4 h-px w-full bg-gray500" />

        <div className="mt-5">
          <Dialog.Description>
            <Paragraph variant="p1">
              Are you sure you want to delete this snipe? It may affect other
              users.
            </Paragraph>
          </Dialog.Description>
        </div>

        <div className="mt-20 flex flex-col items-stretch gap-4">
          <Button variant="danger" onClick={onClose}>
            <Button.Label>Delete</Button.Label>
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
