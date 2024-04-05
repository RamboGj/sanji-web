import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { AppContextProvider } from './contexts/AppContext'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--montserrat',
})

export const metadata: Metadata = {
  title: 'Phenom',
  description: 'Generated by create next app',
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
      </AppContextProvider>
    </html>
  )
}
