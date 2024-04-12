import { ActivityPageMobileSkeleton } from '@/components/skeletons/ActivityPageMobileSkeleton'
import { ActivityPageSkeleton } from '@/components/skeletons/ActivityPageSkeleton'

export default function ActivityPageLoading() {
  return (
    <>
      <ActivityPageSkeleton />
      <ActivityPageMobileSkeleton />
    </>
  )
}
