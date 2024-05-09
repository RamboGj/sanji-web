export interface SnipeProps {
  _id: string
  quoteAmount: number
  minPoolSize: number
  checkIfMintIsRenounced: boolean
  autoSell: boolean
  useSnipeList: boolean
  snipeList: string | null
  maxSellRetries: number
  autoSellDelay: number
  gasLevel: 'Low' | 'Medium' | 'High' | 'Maximum'
  running: boolean
}

export interface SnipeState {
  isLoading: boolean
  snipe: SnipeProps
}

export const SnipeInitialState: SnipeState = {
  snipe: {
    _id: '',
    quoteAmount: 0,
    minPoolSize: 0,
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
