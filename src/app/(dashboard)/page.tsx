import OverviewClientPage from '@/components/pages/OverviewClientPage'

import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getSession() {
  const jwt = cookies().get(COOKIES_KEY.JWT)

  if (!jwt) {
    redirect('/login')
  }
}

export default async function OverviewPage() {
  await getSession()

  return <OverviewClientPage />
}
