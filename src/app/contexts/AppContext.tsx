'use client'

import { ModalOpenProps } from '@/components/pages/DashboardClientPage'
import { BotDataProps } from '@/utils/types'
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
  botData: BotDataProps | null
  setBotData: Dispatch<SetStateAction<BotDataProps | null>>
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextProps)

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [modalOpen, setModalOpen] = useState<ModalOpenProps>('none')
  const [botData, setBotData] = useState<BotDataProps | null>(null)

  return (
    <AppContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        botData,
        setBotData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
