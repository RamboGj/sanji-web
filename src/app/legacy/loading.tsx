import { DashboardPageMobileSkeleton } from '@/components/skeletons/DashboardPageMobileSkeleton'
import { DashboardPageSkeleton } from '@/components/skeletons/DashboardPageSkeleton'

export default function DashboardPageLoading() {
  return (
    <>
      <DashboardPageSkeleton />
      <DashboardPageMobileSkeleton />
    </>
  )
}
