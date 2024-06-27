export interface ArbitrageBotProps {
  tradingParameters: {
    profitTakingCriteria: { percentage: number; absoluteValueUSD: number }
    tradingMode: 'classic' | 'neutral-delta'
    operationTimeout: number
  }
  notificationSettings: {
    telegram: { enabled: boolean; apiKey: string; chatId: string }
  }
  _id: string
  userId: string
  isActive: boolean
  exchangeAPIKeys: {
    exchangeName: string
    apiKey: string
    secret: string
  }[]
  __v: number
}

export interface ArbitrageState {
  isLoading: boolean
  arbitrage: ArbitrageBotProps
}

export const ArbitrageInitialState: ArbitrageState = {
  arbitrage: {
    tradingParameters: {
      profitTakingCriteria: { percentage: 0, absoluteValueUSD: 0 },
      tradingMode: 'classic',
      operationTimeout: 300,
    },
    notificationSettings: {
      telegram: { enabled: false, apiKey: '', chatId: '' },
    },
    _id: '',
    userId: '',
    isActive: false,
    exchangeAPIKeys: [],
    __v: 0,
  },
  isLoading: false,
}
