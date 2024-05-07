export enum SnipeActionType {
  SNIPE_SAVE,
  SNIPE_TOGGLE_LOADING,
  // SNIPE_UPDATE_CONFIG,
  // SNIPE_UPDATE_SNIPE_LIST,
}

export type SnipeAction = {
  type: SnipeActionType.SNIPE_TOGGLE_LOADING
}
// | {
//     type: SnipeActionType.SNIPE_SAVE
//     payload: string
//     // payload: Pick<SnipeState, 'snipe'>
//   }
// | {
//     type: SnipeActionType.SNIPE_SAVE
//     payload: Partial<SnipeState>
//   }
// | {
//     type: SnipeActionType.SNIPE_UPDATE_SNIPE_LIST
//     payload: string
//   }
