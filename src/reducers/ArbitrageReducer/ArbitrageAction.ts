import { ArbitrageBotProps } from './ArbitrageState'

export enum ArbitrageActionType {
  ARBITRAGE_SAVE,
  ARBITRAGE_TOGGLE_LOADING,
}

export type ArbitrageAction =
  | {
      type: ArbitrageActionType.ARBITRAGE_TOGGLE_LOADING
    }
  | {
      type: ArbitrageActionType.ARBITRAGE_SAVE
      payload: Partial<ArbitrageBotProps>
    }
