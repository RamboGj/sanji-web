import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

function onRedirect() {
  const jwt = cookies().get(COOKIES_KEY.JWT)

  // if (jwt) {
  //   redirect('/dashboard/overview')
  // } else redirect('/auth')
}

export default async function DashboardRoot() {
  onRedirect()

  return null
}
