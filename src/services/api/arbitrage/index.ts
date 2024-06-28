import { getCookie } from 'cookies-next'
import { api } from '..'
import { COOKIES_KEY } from '@/utils/cookies'
import { ArbitrageBotProps } from '@/reducers/ArbitrageReducer/ArbitrageState'

export interface ExchangeProps {
  exchangeName?: string
  apiKey?: string
  secret?: string
}

export interface ArbitrageTradingParams {
  tradingMode?: string
  profitTakingCriteria?: {
    percentage?: number
    absoluteValueUSD?: number
  }
  operationTimeout?: number
}

export interface ArbitrageNotificationSettings {
  telegram?: {
    enabled?: boolean
    apiKey?: string
    chatId?: string
  }
}

interface GetArbitrageBotLogsParamsProps {
  botId: string
}

interface ToggleArbitrageBotResultProps {
  isActive: boolean
  message: string
}

interface GetArbitrageBotByIdParamsProps {
  botId: string
}

interface ToggleArbitrageBotParamsProps {
  botId: string
}

export interface UpdateArbitrageBotBodyProps {
  exchangeAPIKeys?: ExchangeProps[]
  tradingParameters?: ArbitrageTradingParams
  notificationSettings?: ArbitrageNotificationSettings
}

interface UpdateArbitrageBotParamsProps {
  body: Partial<UpdateArbitrageBotBodyProps>
  botId: string
}

function getArbitrageBotInitializeParams(userId: string) {
  const ARBITRAGE_BOT_INTIALIZE_PARAMS = {
    userId,
    exchangeAPIKeys: [],
    tradingParameters: {
      tradingMode: 'classic',
      profitTakingCriteria: {
        percentage: 0.5,
        absoluteValueUSD: 50,
      },
      operationTimeout: 300,
    },
    notificationSettings: {
      telegram: {
        enabled: false,
        apiKey: '',
        chatId: '',
      },
    },
  }

  return ARBITRAGE_BOT_INTIALIZE_PARAMS
}

export async function onCreateArbitrageBot(): Promise<unknown> {
  const token = getCookie(COOKIES_KEY.JWT)
  const userId = getCookie(COOKIES_KEY.USER_ID)

  const initializeParams = getArbitrageBotInitializeParams(String(userId))

  const response = await api(`/v1/arbitrage`, {
    method: 'POST',
    data: initializeParams,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data
  console.log('data', data)

  return data
}

export async function onGetArbitrageBotLogs({
  botId,
}: GetArbitrageBotLogsParamsProps): Promise<unknown> {
  const token = getCookie(COOKIES_KEY.JWT)

  const response = await api(`/v1/arbitrage/logs/${botId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data

  return data
}

export async function onGetArbitrageBotData(): Promise<unknown> {
  const token = getCookie(COOKIES_KEY.JWT)

  const response = await api(`/v1/arbitrage/active`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data

  return data
}

export async function onGetArbitrageBotDataById({
  botId,
}: GetArbitrageBotByIdParamsProps): Promise<unknown> {
  const token = getCookie(COOKIES_KEY.JWT)

  const response = await api(`/v1/arbitrage/${botId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data

  return data
}

export async function onUpdateArbitrageBotData({
  body,
  botId,
}: UpdateArbitrageBotParamsProps): Promise<ArbitrageBotProps> {
  const token = getCookie(COOKIES_KEY.JWT)

  const response = await api(`/v1/arbitrage/${botId}`, {
    method: 'PUT',
    data: body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data

  return data
}

export async function toggleArbitrageBot({
  botId,
}: ToggleArbitrageBotParamsProps): Promise<ToggleArbitrageBotResultProps> {
  const token = getCookie(COOKIES_KEY.JWT)

  const response = await api(`/v1/arbitrage/toggle/${botId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = response.data

  return data
}
