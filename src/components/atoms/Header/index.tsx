import { logo } from '@/utils/images'
import Image from 'next/image'

export function Header() {
  return (
    <header className="flex h-[66px] items-center border-b border-gray500/10 bg-gray800/60 px-4">
      <Image src={logo} alt="Sanji logo" />
    </header>
  )
}
