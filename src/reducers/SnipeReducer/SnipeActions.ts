import { SnipeProps } from './SnipeState'

export enum SnipeActionType {
  SNIPE_SAVE,
  SNIPE_TOGGLE_LOADING,
}

export type SnipeAction =
  | {
      type: SnipeActionType.SNIPE_TOGGLE_LOADING
    }
  | {
      type: SnipeActionType.SNIPE_SAVE
      payload: Partial<SnipeProps>
    }
