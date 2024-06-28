import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { ModalProps } from '@/@types/app'
import { useTransition } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { isAxiosError } from 'axios'
import { onNotify } from '@/utils/alert'
import { changePassword } from '@/services/api/auth'

const changePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Your password must contain at least 8 characters')
      .max(99, 'Your password is too long'),
    confirmNewPassword: z
      .string()
      .min(8, 'Your password must contain at least 8 characters')
      .max(99, 'Your password is too long'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Your passwords must be the same',
  })

type ChangePasswordSchemaData = z.infer<typeof changePasswordSchema>

interface ChangePasswordModalProps extends ModalProps {}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaData>({
    defaultValues: {
      confirmNewPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(changePasswordSchema),
  })

  async function onChangePassword(data: ChangePasswordSchemaData) {
    startTransition(async () => {
      try {
        await changePassword({
          password: data.newPassword,
        })

        onNotify('success', 'Password successfully changed.')

        onClose()
      } catch (err) {
        if (isAxiosError(err)) {
          console.log('err', err)
          onNotify('error', err.response?.data.message)
        }
      }
    })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-gray900/80" />
      <Dialog.Content className="text-purple50 fixed left-[50%] top-[50%] z-50 w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 focus:outline-none">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 opacity-0" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              Change Password
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-yellow500" />
          </Dialog.Close>
        </div>

        <div className="mt-4 h-px w-full bg-gray500" />

        <form onSubmit={handleSubmit(onChangePassword)}>
          <div className="mt-5 flex flex-col gap-y-6">
            <Input
              {...register('newPassword')}
              error={errors.newPassword}
              type="string"
              label="New password"
              id="newPassword"
              placeholder="johndoe123"
            />
            <Input
              {...register('confirmNewPassword')}
              error={errors.confirmNewPassword}
              type="string"
              label="Confirm new password"
              id="confirmNewPassword"
              placeholder="johndoe123"
            />
          </div>
          <div className="mt-5 flex">
            <Button isLoading={isPending} type="submit" variant="primary">
              <Button.Label>Change password</Button.Label>
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
