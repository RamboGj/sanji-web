'use client'

import { getProvider } from '@/utils/solana'
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
        push('/')
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
      push('/auth')
    })
  }, [provider])

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
