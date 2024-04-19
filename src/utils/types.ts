export interface BotDataProps {
  _id: string
  quoteAmount: number
  commitmentLevel: 'finalized'
  minPoolSize: number
  checkIfMintIsRenounced: boolean
  autoSell: boolean
  useSnipeList: boolean
  snipeList: string | null
  maxSellRetries: number
  autoSellDelay: number
  gasLevel: 'Low' | 'Medium' | 'High' | 'Maximum'
}
