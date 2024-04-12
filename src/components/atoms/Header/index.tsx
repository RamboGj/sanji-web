import Image from 'next/image'
import phenom from '@/assets/phantom-logo.png'

export function Header() {
  return (
    <header className="flex h-[72px] w-full items-center bg-gray700 px-[50px]">
      <Image src={phenom} alt="Phentom logo" />
    </header>
  )
}
