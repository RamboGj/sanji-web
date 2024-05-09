import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function getSnipeBot() {
  const jwt = cookies().get(COOKIES_KEY.JWT)

  if (!jwt) {
    redirect('/auth')
  }

  const response = await fetch('https://api.natoshi.app/v1/bot/active', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt.value}`,
    },
    cache: 'no-cache',
  })

  const data = await response.json()

  if (data.message === 'User not found with the provided token') {
    cookies().delete(COOKIES_KEY.JWT)
    cookies().delete(COOKIES_KEY.PUBLIC_KEY)

    redirect('/auth')
  }

  return data
}
