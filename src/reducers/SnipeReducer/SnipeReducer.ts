import { SnipeAction, SnipeActionType } from './SnipeActions'
import { SnipeState } from './SnipeState'

export function snipeReducer(state: SnipeState, action: SnipeAction) {
  switch (action.type) {
    case SnipeActionType.SNIPE_TOGGLE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      }

    // case SnipeActionType.SNIPE_SAVE:
    //   return {
    //     snipe: action.payload,
    //     isLoading: false,
    //   }
  }
}
