import { api } from '..'

export interface ExchangeProps {
  exchangeName: string
  apiKey: string
  secret: string
}

export interface ArbitrageTradingParams {
  tradingMode: string
  profitTakingCriteria: {
    percentage: string
    absoluteValueUSD: string
  }
  operationTimeout: string
}

export interface ArbitrageNotificationSettings {
  telegram: {
    enabled: string
    apiKey: string
    chatId: string
  }
}

interface GetArbitrageBotLogsParamsProps {
  botId: string
}

interface GetArbitrageBotByIdParamsProps {
  botId: string
}

interface ToggleArbitrageBotParamsProps {
  botId: string
}

interface UpdateArbitrageBotBodyProps {
  exchangeAPIKeys: ExchangeProps[]
  tradingParameters: ArbitrageTradingParams
  notificationSettings: ArbitrageNotificationSettings
}

interface UpdateArbitrageBotParamsProps {
  body: UpdateArbitrageBotBodyProps
  botId: string
}

export async function onCreateArbitrageBot(): Promise<unknown> {
  const response = await api(`/v1/arbitrage`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer jwt_here`,
    },
  })

  const data = response.data

  return data
}

export async function onGetArbitrageBotLogs({
  botId,
}: GetArbitrageBotLogsParamsProps): Promise<unknown> {
  const response = await api(`/v1/arbitrage/logs/${botId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer jwt_here`,
    },
  })

  const data = response.data

  return data
}

export async function onGetArbitrageBotData(): Promise<unknown> {
  const response = await api(`/v1/arbitrage/active`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer jwt_here`,
    },
  })

  const data = response.data

  return data
}

export async function onGetArbitrageBotDataById({
  botId,
}: GetArbitrageBotByIdParamsProps): Promise<unknown> {
  const response = await api(`/v1/arbitrage/${botId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer jwt_here`,
    },
  })

  const data = response.data

  return data
}

export async function onUpdateArbitrageBotData({
  body,
  botId,
}: UpdateArbitrageBotParamsProps): Promise<unknown> {
  const response = await api(`/v1/arbitrage/${botId}`, {
    method: 'GET',
    data: body,
    headers: {
      Authorization: `Bearer jwt_here`,
    },
  })

  const data = response.data

  return data
}

export async function onToggleArbitrageBot({
  botId,
}: ToggleArbitrageBotParamsProps): Promise<unknown> {
  const response = await api(`/v1/arbitrage/toggle/${botId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer jwt_here`,
    },
  })

  const data = response.data

  return data
}
