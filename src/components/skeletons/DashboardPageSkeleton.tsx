'use client'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

import { Header } from '../atoms/Header'
import { Footer } from '../atoms/Footer'
import { Heading } from '../atoms/Heading'

export function DashboardPageSkeleton() {
  const skeletonsMock = Array.from({ length: 3 })
  const skeletonsItemsMock = Array.from({ length: 8 })

  return (
    <div className="w-full h-full">
      <Header />

      <main className="w-full px-[50px] mt-[76px] max-w-[1592px] mx-auto pb-[200px]">
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

        <div className="w-full h-px bg-gray600 mt-6" />

        <div className="mt-10">
          <Heading variant="h2">Snipes</Heading>

          <div className="w-full rounded-xl bg-gray800 border border-gray600">
            <div className="py-3 px-8 flex items-center gap-12 text-purple50">
              <Heading className="text-purple50" variant="h3">
                Global
              </Heading>
              <Heading className="text-purple50" variant="h3">
                Active
              </Heading>
            </div>
            <div className="w-full h-px bg-gray600" />

            <ul className="flex flex-col items-stretch py-10 px-8 gap-10">
              {skeletonsMock.map((_, index) => {
                return (
                  <li key={index}>
                    <div className="bg-gray900 rounded-xl border border-gray600 p-8">
                      <header className="w-full flex items-center justify-between">
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
                            baseColor="#1E1A22"
                            highlightColor="#37323C"
                            width={54}
                            height={30}
                            borderRadius={4}
                          />
                        </div>
                      </header>
                      <ul className="grid grid-cols-5 gap-y-8 mt-6">
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

      <Footer />
    </div>
  )
}
