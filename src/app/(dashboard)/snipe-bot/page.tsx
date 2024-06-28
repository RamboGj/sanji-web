import SnipeBotClientPage from '@/components/pages/SnipeBotClientPage'
import { SnipeProps } from '@/reducers/SnipeReducer/SnipeState'
import { API_ENDPOINTS } from '@/services/api/endpoints'
import { verifyToken } from '@/services/session'
import { verifySubscription } from '@/services/subscription'
import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getSnipeBot() {
  const jwt = verifyToken()
  verifySubscription()

  const response = await fetch(API_ENDPOINTS.GET_SNIPE_BOT, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    cache: 'no-cache',
  })

  const data = await response.json()

  if (data.message === 'User not found with the provided token') {
    cookies().delete(COOKIES_KEY.JWT)
    cookies().delete(COOKIES_KEY.USER_ID)
    redirect('/login')
  }

  return data
}

export default async function SnipeBotPage() {
  const data: SnipeProps = await getSnipeBot()

  return <SnipeBotClientPage data={data} />
}
