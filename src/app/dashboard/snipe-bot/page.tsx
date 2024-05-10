import SnipeBotClientPage from '@/components/pages/SnipeBotClientPage'
import { SnipeProps } from '@/reducers/SnipeReducer/SnipeState'
import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getSnipeBot() {
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

export default async function SnipeBotPage() {
  const data: SnipeProps = await getSnipeBot()

  return <SnipeBotClientPage data={data} />
}
