import { redirect } from 'next/navigation'

function onRedirect() {
  redirect('/dashboard/overview')
}

export default async function DashboardRoot() {
  onRedirect()

  return null
}
