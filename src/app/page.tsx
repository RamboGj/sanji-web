import DashboardClientPage from '@/components/pages/DashboardClientPage'
import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'

async function onGetCookies() {
  const response = cookies().get(COOKIES_KEY.PUBLIC_KEY)

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('response', response)
      resolve('resolve')
      return response
    }, 2500)
  })
}

export default async function Home() {
  await onGetCookies()

  return <DashboardClientPage />
}
