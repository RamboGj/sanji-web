import DashboardClientPage from '@/components/pages/(legacy)/DashboardClientPage'
import { COOKIES_KEY } from '@/utils/cookies'
import { BotDataProps } from '@/utils/types'
import { deleteCookie } from 'cookies-next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function onFetchBotData() {
  const jwt = cookies().get(COOKIES_KEY.JWT)

  if (!jwt) {
    // redirect('/auth')
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
    deleteCookie(COOKIES_KEY.JWT)
    deleteCookie(COOKIES_KEY.PUBLIC_KEY)
    // redirect('/auth')
  }

  return data
}

export default async function Home() {
  const data: BotDataProps = await onFetchBotData()

  return <DashboardClientPage data={data} />
}
