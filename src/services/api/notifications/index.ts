import { api } from '..'
import { API_ENDPOINTS } from '../endpoints'

export async function getNotifications(): Promise<unknown> {
  const response = await api(API_ENDPOINTS.GET_ALL_NOTIFICATIONS, {
    method: 'GET',
  })

  const data = response.data

  return data
}
