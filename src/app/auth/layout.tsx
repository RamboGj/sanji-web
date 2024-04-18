import { Metadata } from 'next'
import { ReactNode } from 'react'

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
  return children
}
