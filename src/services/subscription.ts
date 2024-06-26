import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export function verifySubscription() {
  const subscription = cookies().get(COOKIES_KEY.SUBSCRIPTION)

  const isActive = subscription?.value === 'active'

  if (!isActive) redirect('/blocked')
}
