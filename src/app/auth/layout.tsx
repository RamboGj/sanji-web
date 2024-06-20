import { Header } from '@/components/atoms/Header'
import { SolanaContextProvider } from '@/contexts/SolanaContext'
import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ReactNode } from 'react'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--montserrat',
})

export const metadata: Metadata = {
  title: 'Sanji | Authorization',
  description:
    'Welcome to our platform, where users can harness the power of automated bots to configure "snipes" on the Solana blockchain. Snipes are tailored settings that enable users to mark specific assets and execute purchases at opportune moments, securing coins at lower prices. Join us to streamline your cryptocurrency trading experience and maximize your investment potential on Solana',
  openGraph: {
    type: 'website',
    title: 'Sanji',
    url: '',
    siteName: 'Sanji',
    description:
      'Welcome to our platform, where users can harness the power of automated bots to configure "snipes" on the Solana blockchain. Snipes are tailored settings that enable users to mark specific assets and execute purchases at opportune moments, securing coins at lower prices. Join us to streamline your cryptocurrency trading experience and maximize your investment potential on Solana',
  },
  twitter: {
    siteId: 'Sanji',
    title: 'Sanji',
    description:
      'Welcome to our platform, where users can harness the power of automated bots to configure "snipes" on the Solana blockchain. Snipes are tailored settings that enable users to mark specific assets and execute purchases at opportune moments, securing coins at lower prices. Join us to streamline your cryptocurrency trading experience and maximize your investment potential on Solana',
  },
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <SolanaContextProvider>
      <div className={montserrat.className + ` bg-gray900`}>
        <Header />
        <div className="flex">{children}</div>
      </div>
    </SolanaContextProvider>
  )
}
