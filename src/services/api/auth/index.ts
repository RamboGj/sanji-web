import { AxiosResponse } from 'axios'
import { api } from '..'
import { API_ENDPOINTS } from '../endpoints'
import { getCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'

interface RegisterPayloadProps {
  email: string
  password: string
}

interface RequestPasswordResetPayloadProps {
  email: string
}

interface ResetPasswordPayloadProps {
  resetToken: string
  newPassword: string
}

interface ChangePasswordPayloadProps {
  password: string
}

interface RequestPasswordResetResultProps {
  message: string
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

export async function requestPasswordReset({
  email,
}: RequestPasswordResetPayloadProps): Promise<RequestPasswordResetResultProps> {
  const response = await api(API_ENDPOINTS.REQUEST_PASSWORD_RESET, {
    method: 'POST',
    data: {
      email,
    },
  })

  const data = response.data

  return data
}

export async function resetPassword({
  newPassword,
  resetToken,
}: ResetPasswordPayloadProps): Promise<RequestPasswordResetResultProps> {
  const response = await api(API_ENDPOINTS.REQUEST_PASSWORD_RESET, {
    method: 'POST',
    data: {
      resetToken,
      newPassword,
    },
  })

  const data = response.data

  return data
}

export async function changePassword({
  password,
}: ChangePasswordPayloadProps): Promise<RequestPasswordResetResultProps> {
  const jwt = getCookie(COOKIES_KEY.JWT)

  const response = await api(API_ENDPOINTS.CHANGE_PASSWORD, {
    method: 'POST',
    data: {
      password,
    },
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const data = response.data

  return data
}

export async function getUserData(): Promise<unknown> {
  const jwt = getCookie(COOKIES_KEY.JWT)

  const response = await api(API_ENDPOINTS.GET_USER_DATA, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const data = response.data

  return data
}
