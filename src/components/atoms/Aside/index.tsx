'use client'

import {
  ClockCountdown,
  Eraser,
  Globe,
  Icon,
  Target,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

export interface AsideNavigationItemProps {
  title: string
  icon: Icon
  path: string
}

export function Aside() {
  const pathname = usePathname()

  const asideItems = [
    {
      title: 'Overview',
      icon: <Globe size={24} color="#524D48" />,
      activeIcon: <Globe size={24} color="#FFFFFF" />,
      path: '/dashboard/overview',
    },
    {
      title: 'Snipe BOT',
      icon: <Target size={24} color="#524D48" />,
      activeIcon: <Target size={24} color="#FFFFFF" />,
      path: '/dashboard/snipe-bot',
    },
    {
      title: 'Arbitrage BOT',
      icon: <ClockCountdown size={24} color="#524D48" />,
      activeIcon: <ClockCountdown size={24} color="#FFFFFF" />,
      path: '/dashboard/arbitrage-bot',
    },
    {
      title: 'Scalp BOT (coming soon)',
      icon: <Eraser size={24} color="#524D48" />,
      activeIcon: <Eraser size={24} color="#FFFFFF" />,
      path: '/dashboard/scalp',
    },
  ]

  return (
    <aside className="hidden h-screen w-[300px] flex-col border-b border-r border-gray500/10 bg-gray800/60 px-4 py-8 lg:flex">
      <ul className="flex flex-col gap-y-5">
        {asideItems.map(({ icon, title, path, activeIcon }) => {
          const isActive = pathname.includes(path)

          const isComingSoon = path.includes('scalp')

          if (isComingSoon) {
            return (
              <li key={path}>
                <div
                  className={
                    'flex h-[52px] w-[270px] cursor-not-allowed items-center gap-3 rounded-[4px] bg-gray900 px-4  transition-colors duration-300'
                  }
                >
                  {icon}
                  <span className={'text-gray500'}>{title}</span>
                </div>
              </li>
            )
          } else {
            return (
              <li key={path}>
                <Link href={path}>
                  <div
                    className={twMerge(
                      'flex h-[52px] w-[270px] items-center gap-3 rounded-[4px] px-4',
                      isActive
                        ? 'bg-yellow600'
                        : 'bg-gray900  transition-colors duration-300 hover:bg-gray800',
                    )}
                  >
                    {isActive ? activeIcon : icon}
                    <span
                      className={twMerge(
                        isActive ? 'text-white' : 'text-gray500',
                      )}
                    >
                      {title}
                    </span>
                  </div>
                </Link>
              </li>
            )
          }
        })}
      </ul>
    </aside>
  )
}
