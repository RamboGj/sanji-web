import { AxiosResponse } from 'axios'
import { api } from '..'
import { API_ENDPOINTS } from '../endpoints'

interface AuthServiceProps {
  walletAddress: string
  signature: string
  message: string
}

export async function login({
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

export async function register({
  message,
  signature,
  walletAddress,
}: AuthServiceProps): Promise<AxiosResponse> {
  return await api(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    data: {
      walletAddress,
      signature,
      message,
    },
  })
}
