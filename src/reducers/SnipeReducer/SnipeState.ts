export interface SnipeProps {
  _id: string
  running: boolean
  quoteAmount: string
  useSnipeList: boolean
  minPoolSize: string
  checkIfMintIsRenounced: boolean
  autoSell: boolean
  maxSellRetries: number
  autoSellDelay: number
  gasLevel: 'Low' | 'Medium' | 'High' | 'Maximum'
  snipeList: string | null
}

export interface SnipeState {
  isLoading: boolean
  snipe: SnipeProps
}

export const SnipeInitialState: SnipeState = {
  snipe: {
    _id: '',
    quoteAmount: '0',
    minPoolSize: '0',
    checkIfMintIsRenounced: false,
    autoSell: false,
    useSnipeList: false,
    snipeList: null,
    maxSellRetries: 0,
    autoSellDelay: 0,
    gasLevel: 'Low',
    running: false,
  },
  isLoading: false,
}
