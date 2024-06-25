import { AxiosResponse } from 'axios'
import { api } from '..'
import { API_ENDPOINTS } from '../endpoints'

interface AuthServiceProps {
  walletAddress: string
  signature: string
  message: string
}

interface RegisterBodyProps {
  email: string
  password: string
}

interface RegisterResultProps {
  token: string
  user: {
    email: string
    password: string
    subscriptionStatus: string
    _id: string
    __v: number
  }
}

export async function signin({
  message,
  signature,
  walletAddress,
}: AuthServiceProps): Promise<AxiosResponse> {
  return await api(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    data: {
      walletAddress,
      signature,
      message,
    },
  })
}

export async function signup({
  email,
  password,
}: RegisterBodyProps): Promise<AxiosResponse<RegisterResultProps>> {
  return await api(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    data: {
      email,
      password,
    },
  })
}
