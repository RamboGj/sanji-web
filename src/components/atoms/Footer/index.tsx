import Image from 'next/image'
import phenom from '@/assets/phantom-logo.png'

export function Footer() {
  return (
    <footer className="w-full hidden lg:flex bg-gray700 px-[50px] h-[72px] items-center">
      <Image src={phenom} alt="Phentom logo" />
    </footer>
  )
}
