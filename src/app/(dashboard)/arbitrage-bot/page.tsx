import ArbitrageBotClientPage from '@/components/pages/ArbitrageBotClientPage'
import { API_ENDPOINTS } from '@/services/api/endpoints'
import { verifyToken } from '@/services/session'
import { verifySubscription } from '@/services/subscription'
import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getArbitrageBot() {
  const jwt = verifyToken()
  verifySubscription()

  const response = await fetch(
    `${API_ENDPOINTS.GET_ARBITRAGE_BOT}/667a1b8ba7d10ad24e7dcbf7`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: 'no-cache',
    },
  )

  const data = await response.json()

  console.log('ARBITRAGE PORRA', data)

  if (data.message === 'User not found with the provided token') {
    cookies().delete(COOKIES_KEY.JWT)
    cookies().delete(COOKIES_KEY.SUBSCRIPTION)
    cookies().delete(COOKIES_KEY.USER_ID)
    redirect('/login')
  }

  return data
}

export default async function ArbitrageBotPage() {
  // const data = await getArbitrageBot()
  await getArbitrageBot()
  return <ArbitrageBotClientPage />
}
