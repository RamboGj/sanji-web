import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { API_ENDPOINTS } from './api/endpoints'

export async function verifySubscription() {
  const jwt = cookies().get(COOKIES_KEY.JWT)

  const response = await fetch(API_ENDPOINTS.GET_USER_DATA, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt?.value}`,
    },
  })

  const data = await response.json()

  if (data.subscriptionStatus !== 'active' && jwt) redirect('/access-blocked')

  return {
    isActive: true,
  }
}
