'use client'

import { getProvider } from '@/utils/solana'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useEffect } from 'react'

interface AppContextProps {}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextProps)

export function AppContextProvider({ children }: AppContextProviderProps) {
  const { push } = useRouter()

  const provider = typeof window !== 'undefined' ? getProvider() : null

  async function onVerifyIsLoggedIn() {
    const provider = getProvider()

    provider
      .connect({ onlyIfTrusted: true })
      .then(({ publicKey }: { publicKey: string }) => {
        console.log('publicKey', publicKey.toString())
        console.log(window.location.href)
      })
      .catch(() => {
        console.log('err')
        push('/auth')
      })
  }

  useEffect(() => {
    onVerifyIsLoggedIn()
  }, [])

  useEffect(() => {
    provider.on('disconnect', () => {
      deleteCookie('@sanji:public-key')
      push('/auth')
    })
  }, [provider])

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
