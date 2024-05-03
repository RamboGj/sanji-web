'use client'

import { Power } from '@phosphor-icons/react'

export default function OverviewPage() {
  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full gap-x-7">
        <div className="w-full flex-1 border border-gray500/10 bg-gray800/60 p-6">
          <div>
            <h1>Root Instance</h1>
            <span>Running instances: 2</span>
            <span>Offline instances: 1</span>
          </div>
          <div>
            <Power />
          </div>
        </div>

        <div className="min-w-[380px] border border-gray500/10 bg-gray800/60 p-6">
          <h1>Balance</h1>
          <div>
            <span>32 $SOL</span>
            <span>27%</span>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 border border-gray500/10 bg-gray800/60 p-6">
        <div>
          <h1>Root Instance</h1>
          <span>Running instances: 2</span>
          <span>Offline instances: 1</span>
        </div>
        <div>
          <Power />
        </div>
      </div>
    </main>
  )
}
