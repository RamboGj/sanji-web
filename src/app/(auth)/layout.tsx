import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { Montserrat } from 'next/font/google'

import '../globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--montserrat',
})

export const metadata: Metadata = {
  title: 'Sanji | Authentication',
  description: 'Authenticate in sanji app in order to join our platform.',
  openGraph: {
    type: 'website',
    title: 'Sanji',
    url: '',
    siteName: 'Sanji',
    description: 'Authenticate in sanji app in order to join our platform.',
  },
  twitter: {
    siteId: 'Sanji',
    title: 'Sanji',
    description: 'Authenticate in sanji app in order to join our platform.',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className + ` bg-gray900`}>{children}</body>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { backgroundColor: '#181410', color: '#FFFFFF' },
        }}
      />
    </html>
  )
}
