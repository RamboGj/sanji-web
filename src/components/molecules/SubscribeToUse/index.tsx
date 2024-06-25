import { Paragraph } from '@/components/atoms/Paragraph'
import { LockSimple } from '@phosphor-icons/react'
import Link from 'next/link'
import { ComponentProps } from 'react'

interface SubscribeToUse extends ComponentProps<'div'> {}

export function SubscribeToUse({ children, ...rest }: SubscribeToUse) {
  return (
    <div className="relative h-full w-full" {...rest}>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex justify-center bg-gray800/60 backdrop-blur-md">
        <div className="flex flex-col items-center py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow500">
            <LockSimple size={32} weight="bold" fill="#120D09" />
          </div>

          <Paragraph className="mt-4" variant="p2">
            In order to get access to the entire platform you should subscribe.
          </Paragraph>

          <Link
            className="mt-12 font-bold text-yellow500 transition-colors duration-300 hover:text-yellow500/70"
            href={'#'}
          >
            Subscribe now
          </Link>
        </div>
      </div>
      {children}
    </div>
  )
}
