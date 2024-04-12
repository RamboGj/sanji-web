import Image from 'next/image'
import phenom from '@/assets/phantom-logo.png'

export function Footer() {
  return (
    <footer className="hidden h-[72px] w-full items-center bg-gray700 px-[50px] lg:flex">
      <Image src={phenom} alt="Phentom logo" />
    </footer>
  )
}
