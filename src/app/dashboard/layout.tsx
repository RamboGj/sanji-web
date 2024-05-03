import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import '../globals.css'
import { Header } from '@/components/atoms/Header'
import { Aside } from '@/components/atoms/Aside'
import { AppContextProvider } from '@/contexts/AppContext'
import { SolanaContextProvider } from '@/contexts/SolanaContext'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--montserrat',
})

export const metadata: Metadata = {
  title: 'Sanji',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <SolanaContextProvider>
          <body className={montserrat.className + ` bg-gray900`}>
            <Header />
            <div className="flex">
              <Aside />
              {children}
            </div>
          </body>
          <Toaster position="top-right" />
        </SolanaContextProvider>
      </AppContextProvider>
    </html>
  )
}
