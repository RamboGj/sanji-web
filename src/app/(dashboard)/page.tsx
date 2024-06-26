import OverviewClientPage from '@/components/pages/OverviewClientPage'
import { verifyToken } from '@/services/session'
import { verifySubscription } from '@/services/subscription'

async function getSession() {
  verifyToken()
  verifySubscription()
}

export default async function OverviewPage() {
  await getSession()

  return <OverviewClientPage />
}
