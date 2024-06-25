import { AxiosResponse } from 'axios'
import { api } from '..'
import { API_ENDPOINTS } from '../endpoints'

interface RegisterPayloadProps {
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

interface LoginPayloadProps {
  email: string
  password: string
}

interface LoginResultProps {
  message: string
  token: string
  user: {
    _id: string
    email: string
    password: string
    subscriptionStatus: string
    __v: number
  }
}

export async function signin({
  email,
  password,
}: LoginPayloadProps): Promise<AxiosResponse<LoginResultProps>> {
  return await api(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    data: {
      email,
      password,
    },
  })
}

export async function signup({
  email,
  password,
}: RegisterPayloadProps): Promise<AxiosResponse<RegisterResultProps>> {
  return await api(API_ENDPOINTS.REGISTER, {
    method: 'POST',
    data: {
      email,
      password,
    },
  })
}
