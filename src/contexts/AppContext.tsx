'use client'

import { api } from '@/services/api'
import { COOKIES_KEY } from '@/utils/cookies'
import { BotDataProps } from '@/utils/types'
import { deleteCookie } from 'cookies-next'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'

interface AppContextProps {
  botData: BotDataProps | null
  setBotData: Dispatch<SetStateAction<BotDataProps | null>>
}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextProps)

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [botData, setBotData] = useState<BotDataProps | null>(null)

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.response.status === 401) {
          // push('/auth')
          deleteCookie(COOKIES_KEY.JWT)
        }
        return Promise.reject(error)
      },
    )

    return () => api.interceptors.response.eject(interceptor)
  }, [])

  return (
    <AppContext.Provider
      value={{
        botData,
        setBotData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
