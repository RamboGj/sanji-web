import { redirect } from 'next/navigation'

function onRedirect() {
  redirect('/dashboard')
}

export default async function Root() {
  onRedirect()

  return null
}
