import Image from 'next/image'
import sanji from '@/assets/logo.png'
import Link from 'next/link'

export function AuthHeader() {
  return (
    <header className="flex h-[100px] w-full justify-center border-b border-gray500/10 bg-black">
      <nav className="flex w-full max-w-[1592px] items-center justify-center px-4 lg:px-[50px]">
        <Link href="/">
          <Image src={sanji} alt="Sanji logo" />
        </Link>
      </nav>
    </header>
  )
}
