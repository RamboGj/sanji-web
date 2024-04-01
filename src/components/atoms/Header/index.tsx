import Image from 'next/image'
import phenom from '@/assets/phantom-logo.png'

export function Header() {
  return (
    <header className="w-full bg-gray700 px-[50px] h-[72px] flex items-center">
      <Image src={phenom} alt="Phentom logo" />
    </header>
  )
}
