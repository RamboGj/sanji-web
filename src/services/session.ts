import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { jwtDecode } from 'jwt-decode'

export function verifyToken(): string {
  const jwt = cookies().get(COOKIES_KEY.JWT)

  if (!jwt) redirect('/login')

  console.log('jwt', jwt)

  const decodedToken = jwtDecode(jwt.value)

  const nowTimestamp = new Date().getTime()

  const isExpired = Number(decodedToken.exp) * 1000 < nowTimestamp

  if (isExpired) redirect('/login')

  return jwt.value
}
