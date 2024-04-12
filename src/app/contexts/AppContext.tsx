'use client'

import { ModalOpenProps } from '@/components/pages/DashboardClientPage'
import { getProvider } from '@/utils/solana'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

interface AppContextProps {
  modalOpen: ModalOpenProps
  setModalOpen: Dispatch<SetStateAction<ModalOpenProps>>
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextProps)

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [modalOpen, setModalOpen] = useState<ModalOpenProps>('none')

  const { push } = useRouter()

  const provider = typeof window !== 'undefined' ? getProvider() : null

  useEffect(() => {
    provider.on('disconnect', () => {
      console.log('chamou')
      deleteCookie('@sanji:public-key')
      push('/auth')
    })
  }, [provider])

  return (
    <AppContext.Provider
      value={{
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
