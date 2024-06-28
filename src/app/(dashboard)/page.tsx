import OverviewClientPage from '@/components/pages/OverviewClientPage'
import { API_ENDPOINTS } from '@/services/api/endpoints'
import { verifyToken } from '@/services/session'
import { verifySubscription } from '@/services/subscription'

async function getNotifications() {
  verifyToken()
  verifySubscription()

  const response = await fetch(API_ENDPOINTS.GET_ALL_NOTIFICATIONS, {
    method: 'GET',
    cache: 'no-cache',
  })

  const data = await response.json()

  return data
}

export default async function OverviewPage() {
  const { data: notifications } = await getNotifications()

  return <OverviewClientPage notifications={notifications} />
}
