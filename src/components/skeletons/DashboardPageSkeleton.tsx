'use client'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

import { Heading } from '../atoms/Heading'

export function DashboardPageSkeleton() {
  const skeletonsMock = Array.from({ length: 3 })
  const skeletonsItemsMock = Array.from({ length: 8 })

  return (
    <div className="hidden h-full w-full lg:block">
      <main className="mx-auto mt-[76px] w-full max-w-[1592px] px-4 pb-[200px] lg:px-[50px]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Skeleton
              baseColor="#1E1A22"
              highlightColor="#37323C"
              width={108}
              height={108}
              borderRadius={20}
            />

            <div className="flex flex-col gap-[10px]">
              <Skeleton
                baseColor="#1E1A22"
                highlightColor="#37323C"
                width={550}
                height={40}
                borderRadius={8}
              />
              <Skeleton
                baseColor="#1E1A22"
                highlightColor="#37323C"
                width={282}
                height={52}
                borderRadius={8}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Skeleton
              baseColor="#1E1A22"
              highlightColor="#37323C"
              width={52}
              height={52}
              borderRadius={8}
            />
            <Skeleton
              baseColor="#1E1A22"
              highlightColor="#37323C"
              width={52}
              height={52}
              borderRadius={8}
            />
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gray600" />

        <div className="mt-10">
          <Heading variant="h2">Snipes</Heading>

          <div className="mt-5 w-full rounded-xl border border-gray600 bg-gray800">
            <div className="flex items-center gap-12 px-8 py-3 text-purple50">
              <Heading className="text-purple50" variant="h3">
                Global
              </Heading>
              <Heading className="text-purple50" variant="h3">
                Active
              </Heading>
            </div>
            <div className="h-px w-full bg-gray600" />

            <ul className="flex flex-col items-stretch gap-10 px-8 py-10">
              {skeletonsMock.map((_, index) => {
                return (
                  <li key={index}>
                    <div className="rounded-xl border border-gray600 bg-gray900 p-8">
                      <header className="flex w-full items-center justify-between">
                        <Skeleton
                          baseColor="#1E1A22"
                          highlightColor="#37323C"
                          width={340}
                          height={32}
                          borderRadius={4}
                        />
                        <div className="flex items-center gap-3">
                          <Skeleton
                            baseColor="#1E1A22"
                            highlightColor="#37323C"
                            width={30}
                            height={30}
                            borderRadius={4}
                          />
                          <Skeleton
                            width={54}
                            height={30}
                            borderRadius={4}
                            baseColor="#1E1A22"
                            highlightColor="#37323C"
                          />
                        </div>
                      </header>
                      <ul className="mt-6 grid grid-cols-5 gap-y-8">
                        {skeletonsItemsMock.map((_, index) => {
                          return (
                            <li key={index} className="col-span-1">
                              <div className="flex flex-col gap-1.5">
                                <Skeleton
                                  baseColor="#1E1A22"
                                  highlightColor="#37323C"
                                  width={128}
                                  height={18}
                                  borderRadius={4}
                                />
                                <Skeleton
                                  baseColor="#1E1A22"
                                  highlightColor="#37323C"
                                  width={98}
                                  height={18}
                                  borderRadius={4}
                                />
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
