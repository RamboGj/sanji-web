import { ArbitrageAction, ArbitrageActionType } from './ArbitrageAction'
import { ArbitrageState } from './ArbitrageState'

export function arbitrageReducer(
  state: ArbitrageState,
  action: ArbitrageAction,
) {
  switch (action.type) {
    case ArbitrageActionType.ARBITRAGE_TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      }

    case ArbitrageActionType.ARBITRAGE_SAVE:
      return {
        arbitrage: {
          ...state.arbitrage,
          ...action.payload,
        },
        isLoading: false,
      }
  }
}
