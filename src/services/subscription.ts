import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { API_ENDPOINTS } from './api/endpoints'

export async function verifySubscription() {
  const subscription = cookies().get(COOKIES_KEY.SUBSCRIPTION)
  const jwt = cookies().get(COOKIES_KEY.JWT)

  console.log('jwt', jwt)

  const response = await fetch(API_ENDPOINTS.GET_USER_DATA, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwt?.value}`,
    },
  })

  console.log('response', response)

  const data = await response.json()

  console.log('data', data)

  const isActive = subscription?.value === 'active'

  if (!isActive && jwt) redirect('/access-blocked')
}
