'use client'

import { ReactNode, createContext } from 'react'

interface AppContextProps {}

interface AppContextProviderProps {
  children: ReactNode
}

export const AppContext = createContext({} as AppContextProps)

export function AppContextProvider({ children }: AppContextProviderProps) {
  // useEffect(() => {
  //   const interceptor = api.interceptors.response.use(
  //     (response) => {
  //       return response
  //     },
  //     (error) => {
  //       if (error.response.status === 401) {
  //         // push('/auth')
  //         deleteCookie(COOKIES_KEY.JWT)
  //       }
  //       return Promise.reject(error)
  //     },
  //   )

  //   return () => api.interceptors.response.eject(interceptor)
  // }, [])

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>
}
