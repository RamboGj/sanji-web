export interface OverviewInstanceProps {
  id: number
  name: string
  profit: number
  status: string
}

export interface OverviewState {
  rootInstance: {
    isRunning: boolean
    runningCount: number
    offlineCount: number
  }
  balance: {
    value: number
    profit: number
  }
  instances: OverviewInstanceProps[]
}
