'use client'

import { ModalOpenProps } from '@/components/pages/DashboardClientPage'
import { api } from '@/services/api'
import { COOKIES_KEY } from '@/utils/cookies'
import { BotDataProps } from '@/utils/types'
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

  const { push } = useRouter()

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response.status === 401) {
          console.log('interceptor')
          push('/auth')
          deleteCookie(COOKIES_KEY.JWT)
          deleteCookie(COOKIES_KEY.PUBLIC_KEY)
        }
        return Promise.reject(error)
      },
    )

    return () => api.interceptors.response.eject(interceptor)
  }, [])

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
