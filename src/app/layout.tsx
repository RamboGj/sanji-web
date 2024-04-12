import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { AppContextProvider } from './contexts/AppContext'
import { Toaster } from 'react-hot-toast'
import './globals.css'

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
    images: [
      {
        url: '../assets/og.png',
        width: 1200,
        height: 600,
        alt: 'Sanji opengraph image',
      },
    ],
  },
  twitter: {
    siteId: 'Sanji',
    title: 'Sanji',
    description:
      'Welcome to our platform, where users can harness the power of automated bots to configure "snipes" on the Solana blockchain. Snipes are tailored settings that enable users to mark specific assets and execute purchases at opportune moments, securing coins at lower prices. Join us to streamline your cryptocurrency trading experience and maximize your investment potential on Solana',
    images: {
      url: '../assets/og.png',
      width: 1200,
      height: 600,
      alt: 'Sanji opengraph image',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <AppContextProvider>
        <body className={montserrat.className + ` bg-gray900`}>{children}</body>
        <Toaster position="top-right" />
      </AppContextProvider>
    </html>
  )
}
