'use server'

import OverviewClientPage from '@/components/pages/OverviewClientPage'
import { API_ENDPOINTS } from '@/services/api/endpoints'
import { verifyToken } from '@/services/session'
import { verifySubscription } from '@/services/subscription'

async function getNotifications() {
  verifyToken()
  const { isActive } = await verifySubscription()

  console.log('isActive', isActive)

  const response = await fetch(API_ENDPOINTS.GET_ALL_NOTIFICATIONS, {
    method: 'GET',
    cache: 'no-cache',
  })

  const data = await response.json()

  return {
    data,
    isActive,
  }
}

export default async function OverviewPage() {
  const { data: notifications, isActive } = await getNotifications()

  return (
    <OverviewClientPage
      subscriptionActive={isActive}
      notifications={notifications.data}
    />
  )
}
