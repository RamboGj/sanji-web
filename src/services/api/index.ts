import { COOKIES_KEY } from '@/utils/cookies'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: 'https://api.natoshi.app/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('ERROR on axios root', error)

    if (error.response.status === 401) {
      deleteCookie(COOKIES_KEY.JWT)
      toast.error('Your session has expired.')
      window.location.replace('/login')
    }
    return error
  },
)
