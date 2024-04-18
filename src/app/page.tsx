import DashboardClientPage from '@/components/pages/DashboardClientPage'

// async function onGetCookies() {
//   const response = cookies().get(COOKIES_KEY.PUBLIC_KEY)

//   if (response) {
//     await new Promise((resolve) => {
//       setTimeout(() => {
//         resolve('resolve')
//         return response
//       }, 2500)
//     })
//   } else {
//     console.log('ENTERED')

//     redirect('/auth')
//   }
// }

export default async function Home() {
  // await onGetCookies()

  return <DashboardClientPage />
}
