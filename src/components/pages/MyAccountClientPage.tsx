'use client'

import 'react-loading-skeleton/dist/skeleton.css'

import { Heading } from '@/components/atoms/Heading'

export default function SnipeBotClientPage() {
  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex w-full items-start justify-between ">
          <div>
            <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center">
              <Heading variant="h2">My account</Heading>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
