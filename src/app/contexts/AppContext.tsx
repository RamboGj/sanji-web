'use client'

import { ModalOpenProps } from '@/components/pages/DashboardClientPage'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
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
