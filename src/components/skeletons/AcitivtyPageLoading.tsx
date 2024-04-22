import { ActivityPageMobileSkeleton } from '@/components/skeletons/ActivityPageMobileSkeleton'
import { ActivityPageSkeleton } from '@/components/skeletons/ActivityPageSkeleton'

export default function ActivityPageLoadingSkeleton() {
  return (
    <>
      <ActivityPageSkeleton />
      <ActivityPageMobileSkeleton />
    </>
  )
}
