import { ModalProps } from '@/@types/app'
import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Paragraph } from '@/components/atoms/Paragraph'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'

export function DeleteSnipeModal({ onClose }: ModalProps) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gray900/80 fixed inset-0" />
      <Dialog.Content className="fixed top-[50%] left-[50%] max-w-[596px] w-full translate-x-[-50%] translate-y-[-50%] bg-gray900 px-9 pt-6 pb-12 focus:outline-none border rounded-[20px] text-purple50 border-gray600">
        <div className="flex items-center justify-between">
          <div className="opacity-0 w-6 h-6" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              DELETE SNIPE
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle
              size={32}
              className="text-danger500 hover:text-danger600 transition-colors duration-300"
            />
          </Dialog.Close>
        </div>

        <div className="w-full h-px bg-gray500 mt-4" />

        <div className="mt-5">
          <Dialog.Description>
            <Paragraph variant="p1">
              Are you sure you want to delete this snipe? It may affect other
              users.
            </Paragraph>
          </Dialog.Description>
        </div>

        <div className="flex flex-col items-stretch gap-4 mt-20">
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
