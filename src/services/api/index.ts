import { onNotify } from '@/utils/alert'
import { COOKIES_KEY } from '@/utils/cookies'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'

export const api = axios.create({
  baseURL: 'https://api.natoshi.app/',
  headers: {
    'Content-Type': 'application/json',
  },
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      deleteCookie(COOKIES_KEY.JWT)
      deleteCookie(COOKIES_KEY.PUBLIC_KEY)
      onNotify('error', 'Your session has expired.')
      // window.location.replace('/auth')
    }
    return error
  },
)
