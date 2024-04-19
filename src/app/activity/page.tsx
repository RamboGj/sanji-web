import { ActivityClientPage } from '@/components/pages/ActivityClientPage'
import { COOKIES_KEY } from '@/utils/cookies'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function onGetCookies() {
  const response = cookies().get(COOKIES_KEY.JWT)

  if (response) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolve')
        return response
      }, 5000)
    })
  } else {
    redirect('/auth')
  }
}

export default async function ActivityPage() {
  await onGetCookies()

  return <ActivityClientPage />
}
