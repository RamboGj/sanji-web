import { Heading } from '@/components/atoms/Heading'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function SnipeBotPageSkeleton() {
  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full flex-col border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex w-full items-start justify-between ">
          <div className="flex items-center gap-4">
            <Heading variant="h2">Snipe Instance</Heading>
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={98}
              height={20}
              borderRadius={24}
            />
          </div>
          <div className="item-center flex gap-x-4">
            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={32}
              height={32}
              borderRadius={4}
            />

            <Skeleton
              baseColor="#221E1B"
              highlightColor="#524D48"
              width={32}
              height={32}
              borderRadius={4}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex-1 border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex flex-col">
          <header className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Heading variant="h3">Your Snipes</Heading>
              <Skeleton
                baseColor="#221E1B"
                highlightColor="#524D48"
                width={32}
                height={32}
                borderRadius={4}
              />
            </div>

            <div className="flex items-center gap-x-4">
              <Skeleton
                baseColor="#221E1B"
                highlightColor="#524D48"
                width={32}
                height={32}
                borderRadius={4}
              />

              <Skeleton
                baseColor="#221E1B"
                highlightColor="#524D48"
                width={32}
                height={32}
                borderRadius={4}
              />
            </div>
          </header>

          <div className="h-px w-full bg-gray500/10" />

          <ul className="flex flex-col divide-y-[1px] divide-gray500/10">
            <li className="p-3">
              <Skeleton
                baseColor="#221E1B"
                highlightColor="#524D48"
                width={320}
                height={24}
                borderRadius={4}
              />
            </li>
            <li className="p-3">
              <Skeleton
                baseColor="#221E1B"
                highlightColor="#524D48"
                width={320}
                height={24}
                borderRadius={4}
              />
            </li>
            <li className="p-3">
              <Skeleton
                baseColor="#221E1B"
                highlightColor="#524D48"
                width={320}
                height={24}
                borderRadius={4}
              />
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
