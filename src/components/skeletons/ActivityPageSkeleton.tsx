'use client'

import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton from 'react-loading-skeleton'

import { Header } from '../atoms/Header'
import { Footer } from '../atoms/Footer'
import { Heading } from '../atoms/Heading'
import { ClientWrapper } from '../atoms/ClientWrapper'
import { CaretLeft } from '@phosphor-icons/react'

import Link from 'next/link'

export function ActivityPageSkeleton() {
  const skeletonsMock = Array.from({ length: 3 })
  const skeletonsItemsMock = Array.from({ length: 5 })

  return (
    <div className="w-full h-full">
      <Header />
      <main className="w-full px-[50px] mt-20 max-w-[1592px] mx-auto pb-[200px]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <Link href={'/'}>
              <div className="w-[52px] h-[52px] bg-purple600 flex items-center justify-center rounded-lg hover:bg-purple700 transtion duration-300">
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

        <div className="w-full h-px bg-gray600 mt-6" />

        <div className="mt-10">
          <div className="w-full rounded-xl bg-gray800 border border-gray600 py-7 px-8 gap-y-5 flex flex-col">
            {skeletonsMock.map((_, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray900 border border-gray600 rounded-[16px] p-8 flex items-center justify-between"
                >
                  <ul className="flex items-stretch gap-12">
                    {skeletonsItemsMock.map((_, index) => {
                      return (
                        <li key={index}>
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
      <Footer />
    </div>
  )
}
