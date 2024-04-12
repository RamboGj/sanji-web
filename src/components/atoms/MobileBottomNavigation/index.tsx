'use client'

import { AppContext } from '@/app/contexts/AppContext'
import { ChartLine, Gear } from '@phosphor-icons/react'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentProps, useContext } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { ConfigModal } from '@/components/molecules/ConfigModal'

interface MobileBottomNavigationProps extends ComponentProps<'div'> {}

export function MobileBottomNavigation({
  ...rest
}: MobileBottomNavigationProps) {
  const { modalOpen, setModalOpen } = useContext(AppContext)

  const pathname = usePathname()
  const { push } = useRouter()

  const isActivityPage = pathname.includes('activity')

  return (
    <>
      <div
        className="bg-gay800 fixed bottom-0 left-0 right-0 h-[72px] border-t border-gray600 bg-gray800 lg:hidden"
        {...rest}
      >
        <div className="flex h-full w-full items-center justify-center gap-24">
          <button
            onClick={() => push('/activity')}
            className="flex flex-col items-center"
          >
            <ChartLine
              size={32}
              color={isActivityPage ? '#A855F7' : '#FFFFFF'}
            />
            <span
              className={`${isActivityPage ? 'text-xs font-medium text-purple500' : 'text-xs font-medium text-purple50'}`}
            >
              Activity
            </span>
          </button>
          <button
            onClick={() => setModalOpen('config')}
            className="flex flex-col items-center"
          >
            <Gear size={32} color={'#FFFFFF'} />
            <span className="text-xs font-medium text-purple50">Settings</span>
          </button>
        </div>
      </div>
      <Dialog.Root
        key={`mobile-bottom-navigation:${pathname}-${modalOpen}`}
        open={modalOpen === 'config'}
      >
        <ConfigModal onClose={() => setModalOpen('none')} />
      </Dialog.Root>
    </>
  )
}
