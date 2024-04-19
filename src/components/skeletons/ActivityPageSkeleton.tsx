'use client'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'
import { Heading } from '../atoms/Heading'
import { ClientWrapper } from '../atoms/ClientWrapper'
import { CaretLeft } from '@phosphor-icons/react'

import Link from 'next/link'

export function ActivityPageSkeleton() {
  const skeletonsMock = Array.from({ length: 3 })
  const skeletonsItemsMock = Array.from({ length: 5 })

  return (
    <div className="hidden h-full w-full lg:block">
      <main className="mx-auto mt-20 w-full max-w-[1592px] px-[50px] pb-[200px]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Link href={'/'}>
              <div className="transtion flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-purple600 duration-300 hover:bg-purple700">
                <ClientWrapper>
                  <CaretLeft size={24} color="#FFF" />
                </ClientWrapper>
              </div>
            </Link>

            <Heading className="leading-none" variant="h1">
              Activity
            </Heading>
          </div>
        </div>

        <div className="mt-6 h-px w-full bg-gray600" />

        <div className="mt-10">
          <div className="flex w-full flex-col gap-y-5 rounded-xl border border-gray600 bg-gray800 px-8 py-7">
            {skeletonsMock.map((_, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-[16px] border border-gray600 bg-gray900 p-8"
                >
                  <ul className="grid grid-cols-3 gap-8 lg:grid-cols-5">
                    {skeletonsItemsMock.map((_, index) => {
                      return (
                        <li key={index} className="col-span-1">
                          <div className="flex flex-col gap-1.5">
                            <Skeleton
                              baseColor="#1E1A22"
                              highlightColor="#37323C"
                              width={128}
                              height={16}
                              borderRadius={4}
                            />
                            <Skeleton
                              baseColor="#1E1A22"
                              highlightColor="#37323C"
                              width={98}
                              height={16}
                              borderRadius={4}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <Skeleton
                    baseColor="#1E1A22"
                    highlightColor="#37323C"
                    width={202}
                    height={16}
                    borderRadius={4}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
