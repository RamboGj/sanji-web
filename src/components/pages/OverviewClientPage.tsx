'use client'

import 'react-loading-skeleton/dist/skeleton.css'

import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { CaretRight, CircleNotch, Power } from '@phosphor-icons/react'
import { ArrowCounterClockwise } from '@phosphor-icons/react/dist/ssr'
import { useEffect, useReducer } from 'react'
import { TableSkeleton } from '@/components/skeletons/OverviewSkeleton/TableSkeleton'
import { Tag } from '@/components/atoms/Tag'
import { snipeReducer } from '@/reducers/SnipeReducer/SnipeReducer'
import { SnipeInitialState } from '@/reducers/SnipeReducer/SnipeState'
import { SnipeActionType } from '@/reducers/SnipeReducer/SnipeActions'

export default function OverviewClientPage() {
  const [state, dispatch] = useReducer(snipeReducer, SnipeInitialState)

  function handleRefresh() {
    dispatch({ type: SnipeActionType.SNIPE_TOGGLE_LOADING })

    setTimeout(() => {
      dispatch({ type: SnipeActionType.SNIPE_TOGGLE_LOADING })
    }, 3000)
  }

  useEffect(() => {
    dispatch({ type: SnipeActionType.SNIPE_TOGGLE_LOADING })
  }, [])

  return (
    <main className="flex w-full flex-col gap-y-7 p-6">
      <div className="flex w-full items-stretch gap-x-7">
        <div className="flex w-full flex-1 flex-col border border-gray500/10 bg-gray800/60 p-6">
          <div className="flex w-full items-start justify-between">
            <div>
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:gap-4">
                <Heading variant="h2">Root Instance</Heading>
                <Tag
                  label={state.snipe.running ? 'RUNNING' : 'OFFLINE'}
                  feedback={state.snipe.running ? 'success' : 'error'}
                />
              </div>
              <div className="mt-2 flex flex-col">
                <span className="text-base font-medium">
                  Running instances:{' '}
                  <strong className="text-yellow600">2</strong>
                </span>
                <span className="text-base font-medium">
                  Offline instances:{' '}
                  <strong className="text-yellow600">1</strong>
                </span>
              </div>
            </div>
            <div
              className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border ${state.snipe.running ? 'border-gray500' : 'border-green200'}`}
            >
              <Power
                size={24}
                color={state.snipe.running ? '#524D48' : '#47FFBB'}
              />
            </div>
          </div>
          <div className="mt-12 flex gap-5">
            <Button variant="primary">
              <Button.Label>Manage instances</Button.Label>
            </Button>
            <Button variant="ghost">
              <Button.Label>Discover</Button.Label>
            </Button>
          </div>
        </div>

        <div className="hidden h-full min-w-[466px] flex-col justify-between border border-gray500/10 bg-gray800/60 p-6 lg:flex">
          <div className="flex items-start justify-between">
            <Heading variant="h2">Balance</Heading>

            <div
              role="button"
              onClick={handleRefresh}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
            >
              {state.isLoading ? (
                <CircleNotch
                  className="animate-spin"
                  size={24}
                  color="#ED7A14"
                />
              ) : (
                <ArrowCounterClockwise size={24} color="#ED7A14" />
              )}
            </div>
          </div>

          <div className="mt-[10px] flex items-center gap-4">
            <span className="text-[1.25rem] text-white">32 $SOL</span>
            <Tag label="+ 27%" feedback="success" />
          </div>

          <div className="mt-auto block">
            <Button className="mt-auto">
              <Button.Label>View transactions</Button.Label>
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 border border-gray500/10 bg-gray800/60 p-6">
        <div className="flex flex-col">
          <header className="mb-3 flex items-center justify-between">
            <Heading variant="h3">Your Instances</Heading>

            <div
              role="button"
              onClick={handleRefresh}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[4px] border border-yellow600 transition-colors duration-300 hover:border-yellow700"
            >
              {state.isLoading ? (
                <CircleNotch
                  className="animate-spin"
                  size={24}
                  color="#ED7A14"
                />
              ) : (
                <ArrowCounterClockwise size={24} color="#ED7A14" />
              )}
            </div>
          </header>

          <div className="h-px w-full bg-gray500/10" />

          {state.isLoading ? (
            <TableSkeleton />
          ) : (
            <table className="w-full divide-y-[1px] divide-gray500/10">
              <thead>
                <tr className="grid grid-cols-4 place-items-start py-4 lg:grid-cols-6">
                  <th className="col-span-1 content-start items-start justify-start text-xs lg:text-base">
                    Instance
                  </th>
                  <th className="col-span-1 text-xs lg:text-base">Incoming</th>
                  <th className="col-span-1 text-xs lg:text-base">Status</th>
                  <th className="col-span-1 lg:col-span-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y-[1px] divide-gray500/10">
                <tr className="grid cursor-pointer grid-cols-4 py-4 transition-colors duration-300 hover:bg-gray700 lg:grid-cols-6">
                  <td className="col-span-1 text-xs lg:text-base">
                    Instance Snipe
                  </td>
                  <td className="col-span-1 text-xs lg:text-base">Incoming</td>
                  <td className="col-span-1 text-xs lg:text-base">Status</td>
                  <td className="col-span-1 grid place-content-end place-items-end content-center lg:col-span-3">
                    <CaretRight />
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}
