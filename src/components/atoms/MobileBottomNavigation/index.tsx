'use client'

import { ClockCountdown, Eraser, Globe, Target } from '@phosphor-icons/react'
import { usePathname, useRouter } from 'next/navigation'
import { ComponentProps } from 'react'

interface MobileBottomNavigationProps extends ComponentProps<'div'> {}

export function MobileBottomNavigation({
  ...rest
}: MobileBottomNavigationProps) {
  const pathname = usePathname()
  const { push } = useRouter()

  const isActivityPage = pathname.includes('activity')

  const mobileBottomNavigationItems = [
    {
      title: 'Overview',
      icon: <Globe size={24} color="#524D48" />,
      activeIcon: <Globe size={24} color="#ED7A14" />,
      path: '/dashboard/overview',
    },
    {
      title: 'Snipe',
      icon: <Target size={24} color="#524D48" />,
      activeIcon: <Target size={24} color="#ED7A14" />,
      path: '/dashboard/snipe-bot',
    },
    {
      title: 'Scalp',
      icon: <Eraser size={24} color="#524D48" />,
      activeIcon: <Eraser size={24} color="#ED7A14" />,
      path: '/dashboard/scalp-bot',
    },
    {
      title: 'Arbitrage',
      icon: <ClockCountdown size={24} color="#524D48" />,
      activeIcon: <ClockCountdown size={24} color="#ED7A14" />,
      path: '/dashboard/arbitrage-bot',
    },
  ]

  return (
    <>
      <div
        className=" fixed bottom-0 left-0 right-0 h-[72px] border-t border-gray500/10 bg-gray800 lg:hidden"
        {...rest}
      >
        <div className="flex h-full w-full items-center justify-between px-8">
          {mobileBottomNavigationItems.map(
            ({ activeIcon, icon, path, title }) => {
              const isActive = pathname.includes(path)

              return (
                <button
                  key={path}
                  onClick={() => push(path)}
                  className="flex h-[64px] flex-col items-center justify-center gap-2"
                >
                  {isActive ? activeIcon : icon}
                  <span
                    className={`${isActivityPage ? 'text-xs font-medium' : 'text-xs font-medium'}`}
                  >
                    {title}
                  </span>
                </button>
              )
            },
          )}
        </div>
      </div>
    </>
  )
}
