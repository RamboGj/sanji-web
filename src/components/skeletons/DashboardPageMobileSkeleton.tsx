'use client'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

import { Header } from '../atoms/Header'
import { Heading } from '../atoms/Heading'

export function DashboardPageMobileSkeleton() {
  const skeletonsMock = Array.from({ length: 3 })
  const skeletonsItemsMock = Array.from({ length: 8 })

  return (
    <div className="h-full w-full lg:hidden">
      <Header />

      <main className="mx-auto mt-20 w-full px-4 pb-20">
        <div className="flex items-center justify-between">
          <Skeleton
            baseColor="#1E1A22"
            highlightColor="#37323C"
            width={180}
            height={32}
            borderRadius={4}
          />
          <Skeleton
            baseColor="#1E1A22"
            highlightColor="#37323C"
            width={50}
            height={16}
            borderRadius={4}
          />
        </div>

        <div className="mt-6 w-full">
          <div className="flex items-center gap-8 text-purple50">
            <Heading className="text-purple50" variant="h3">
              Global
            </Heading>
            <Heading className="text-purple50" variant="h3">
              Active
            </Heading>
          </div>

          <ul className="flex flex-col items-stretch gap-5 py-5">
            {skeletonsMock.map((_, index) => {
              return (
                <li key={index}>
                  <div className="rounded-xl border border-gray600 bg-gray900 px-4 py-6">
                    <header className="flex w-full items-center justify-between">
                      <Skeleton
                        baseColor="#1E1A22"
                        highlightColor="#37323C"
                        width={135}
                        height={16}
                        borderRadius={4}
                      />
                      <Skeleton
                        baseColor="#1E1A22"
                        highlightColor="#37323C"
                        width={30}
                        height={30}
                        borderRadius={4}
                      />
                    </header>
                    <ul className="mt-6 grid grid-cols-2 gap-y-4">
                      {skeletonsItemsMock.map((_, index) => {
                        return (
                          <li key={index} className="col-span-1">
                            <Skeleton
                              baseColor="#1E1A22"
                              highlightColor="#37323C"
                              width={94}
                              height={12}
                              borderRadius={4}
                            />
                            <Skeleton
                              baseColor="#1E1A22"
                              highlightColor="#37323C"
                              width={50}
                              height={10}
                              borderRadius={4}
                            />
                          </li>
                        )
                      })}
                    </ul>
                    <div className="mt-8 flex w-full justify-center">
                      <Skeleton
                        baseColor="#1E1A22"
                        highlightColor="#37323C"
                        width={94}
                        height={18}
                        borderRadius={4}
                      />
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
    </div>
  )
}
