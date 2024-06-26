import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function verifySubscription() {
  const subscription = cookies().get(COOKIES_KEY.SUBSCRIPTION)
  const jwt = cookies().get(COOKIES_KEY.JWT)

  const isActive = subscription?.value === 'active'

  if (!isActive && !jwt) redirect('/blocked')
}
