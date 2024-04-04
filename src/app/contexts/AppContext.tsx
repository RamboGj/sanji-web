'use client'

import { ReactNode, createContext } from 'react'

interface AppContextProps {}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextProps)

export function AppContextProvider({ children }: AppContextProviderProps) {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
