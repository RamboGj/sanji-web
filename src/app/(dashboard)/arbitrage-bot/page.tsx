import ArbitrageBotClientPage from '@/components/pages/ArbitrageBotClientPage'
import { ArbitrageBotProps } from '@/reducers/ArbitrageReducer/ArbitrageState'
import { API_ENDPOINTS } from '@/services/api/endpoints'
import { verifyToken } from '@/services/session'
import { verifySubscription } from '@/services/subscription'
import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getArbitrageBot() {
  const jwt = verifyToken()
  verifySubscription()

  try {
    const response = await fetch(`${API_ENDPOINTS.GET_ARBITRAGE_BOT}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      cache: 'no-cache',
    })

    const data = await response.json()

    if (data.message === 'User not found with the provided token') {
      cookies().delete(COOKIES_KEY.JWT)
      cookies().delete(COOKIES_KEY.SUBSCRIPTION)
      cookies().delete(COOKIES_KEY.USER_ID)
      redirect('/login')
    }

    return data
  } catch (err) {
    cookies().delete(COOKIES_KEY.JWT)
    cookies().delete(COOKIES_KEY.SUBSCRIPTION)
    cookies().delete(COOKIES_KEY.USER_ID)
    redirect('/login')
  }
}

export default async function ArbitrageBotPage() {
  const data: ArbitrageBotProps = await getArbitrageBot()

  return <ArbitrageBotClientPage data={data} />
}
