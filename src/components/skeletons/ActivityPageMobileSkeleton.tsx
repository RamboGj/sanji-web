'use client'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

import { Header } from '../atoms/Header'
import { Footer } from '../atoms/Footer'
import { Heading } from '../atoms/Heading'
import { ClientWrapper } from '../atoms/ClientWrapper'
import { CaretLeft } from '@phosphor-icons/react'

import Link from 'next/link'

export function ActivityPageMobileSkeleton() {
  const skeletonsMock = Array.from({ length: 3 })
  const skeletonsItemsMock = Array.from({ length: 6 })

  return (
    <div className="h-full w-full lg:hidden">
      <Header />
      <main className="mx-auto mt-20 w-full max-w-[1592px] px-5 pb-20">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Link href={'/'}>
              <div className="transtion flex h-7 w-7 items-center justify-center rounded-lg bg-purple600 duration-300 hover:bg-purple700">
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

        <div className="mt-5">
          <div className="flex w-full flex-col gap-y-4">
            {skeletonsMock.map((_, index) => {
              return (
                <div
                  key={index}
                  className="rounded-[16px] border border-gray600 bg-gray900 p-6"
                >
                  <ul className="grid grid-cols-3 gap-x-8 gap-y-4">
                    {skeletonsItemsMock.map((_, index) => {
                      return (
                        <li key={index} className="col-span-1">
                          <div className="flex flex-col items-center">
                            <Skeleton
                              baseColor="#1E1A22"
                              highlightColor="#37323C"
                              width={60}
                              height={12}
                              borderRadius={4}
                            />
                            <Skeleton
                              baseColor="#1E1A22"
                              highlightColor="#37323C"
                              width={42}
                              height={10}
                              borderRadius={4}
                            />
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="mx-auto mt-8 flex w-full justify-center">
                    <Skeleton
                      baseColor="#1E1A22"
                      highlightColor="#37323C"
                      width={156}
                      height={14}
                      borderRadius={4}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
