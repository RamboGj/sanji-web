import { AxiosResponse } from 'axios'
import { api } from '..'
import { API_ENDPOINTS } from '../endpoints'
import { SnipeProps } from '@/reducers/SnipeReducer/SnipeState'
import { COOKIES_KEY } from '@/utils/cookies'
import { getCookie } from 'cookies-next'

export interface GetSnipeBotDataPayload {
  token: string
}

export interface CreateSnipeBotPayload {
  privateKey: string
}

export interface UpdateSnipeBotPayload {
  botId: string
  body: {
    privateKey?: string
    quoteAmount?: string
    useSnipeList?: boolean
    minPoolSize?: string
    checkIfMintIsRenounced?: boolean
    autoSell?: boolean
    maxSellRetries?: string
    autoSellDelay?: string
    gasLevel?: string
    snipeList?: string
  }
}

export interface ToggleSnipeBotPayload {
  botId: string
}

export interface ToggleSnipeBotResponse {
  message: string
}

export async function getSnipeBotData({
  token,
}: GetSnipeBotDataPayload): Promise<AxiosResponse<SnipeProps>> {
  return await api(API_ENDPOINTS.GET_SNIPE_BOT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function createSnipeBot({
  privateKey,
}: CreateSnipeBotPayload): Promise<AxiosResponse<SnipeProps>> {
  const token = getCookie(COOKIES_KEY.JWT)

  return await api(API_ENDPOINTS.CREATE_SNIPE_BOT, {
    method: 'POST',
    data: {
      privateKey,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function updateSnipeBot({
  body,
  botId,
}: UpdateSnipeBotPayload): Promise<AxiosResponse<SnipeProps>> {
  const token = getCookie(COOKIES_KEY.JWT)

  return await api(`${API_ENDPOINTS.UPDATE_SNIPE_BOT}/${botId}`, {
    method: 'PUT',
    data: {
      ...body,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export async function toggleSnipeBot({
  botId,
}: ToggleSnipeBotPayload): Promise<AxiosResponse<ToggleSnipeBotResponse>> {
  const token = getCookie(COOKIES_KEY.JWT)

  return await api(`${API_ENDPOINTS.TOGGLE_SNIPE_BOT}/${botId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}
