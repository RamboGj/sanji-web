'use client'

import 'react-loading-skeleton/dist/skeleton.css'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { Tag } from '@/components/atoms/Tag'

import * as Dialog from '@radix-ui/react-dialog'
import { useState } from 'react'
import { ChangePasswordModal } from '../molecules/ChangePasswordModal'

export interface NotificationsProps {
  subscriptionActive: boolean
  notifications: {
    _id: string
    date: number
    content: string
    __v: number
  }[]
}

export default function OverviewPage({
  notifications,
  subscriptionActive,
}: NotificationsProps) {
  console.log('notifications', notifications)
  console.log('subscriptionActive', subscriptionActive)

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false)

  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full items-stretch gap-x-7">
        <div className="w-full max-w-5xl flex-col border border-gray500/10 bg-gray800/60 p-6">
          <div className="flex w-full items-start justify-between">
            <div>
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <Heading variant="h2">My account</Heading>
                <Tag
                  label={
                    subscriptionActive
                      ? 'Subscription active'
                      : 'Subscription inactive'
                  }
                  feedback={subscriptionActive ? 'success' : 'error'}
                />
              </div>
            </div>
          </div>
          <div className="mt-20 flex gap-5">
            <Dialog.Root open={isChangePasswordModalOpen}>
              <Button
                onClick={() => setIsChangePasswordModalOpen(true)}
                variant="primary"
              >
                <Button.Label>Change password</Button.Label>
              </Button>

              <ChangePasswordModal
                onClose={() => setIsChangePasswordModalOpen(false)}
              />
            </Dialog.Root>

            <Button variant="ghost">
              <Button.Label>View my subscription</Button.Label>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex flex-col">
          <Heading variant="h3">Announcements</Heading>

          <div className="h-px w-full bg-gray500/10" />
          {/* <TableSkeleton /> */}

          <table className="w-full divide-y-[1px] divide-gray500/10">
            <thead>
              <tr className="grid grid-cols-4 place-items-start py-4 lg:grid-cols-6">
                <th className="col-span-1 content-start items-start justify-start text-xs lg:col-span-2 lg:text-base">
                  Date
                </th>
                <th className="col-span-2 text-xs lg:col-span-4 lg:text-base">
                  Announcement
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-[1px] divide-gray500/10">
              {notifications.map(({ _id, content, date }) => {
                const formattedDate = new Date(date * 1000).toLocaleDateString(
                  'en-US',
                  {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',

                    hour: '2-digit',
                    minute: '2-digit',
                  },
                )

                return (
                  <tr
                    key={_id}
                    className="grid cursor-pointer grid-cols-4 py-4 transition-colors duration-300 lg:grid-cols-6"
                  >
                    <td className="col-span-1 text-xs lg:col-span-2 lg:text-base">
                      {formattedDate}
                    </td>
                    <td className="col-span-3 text-xs lg:col-span-4 lg:text-base">
                      {content}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
