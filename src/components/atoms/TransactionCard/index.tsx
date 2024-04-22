import Link from 'next/link'
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { Paragraph } from '../Paragraph'

const transactionCard = tv({
  slots: {
    container:
      'bg-gray900 border border-gray600 rounded-[16px] p-6 lg:p-8 flex-wrap lg:flex-nowrap flex items-center justify-between',
    dataContainer: 'grid grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-4',
    dataItemContainer: 'flex flex-col gap-1.5',
  },
})

interface TransactionCardProps extends ComponentProps<'div'> {
  date?: string
  amount?: number
  fee?: number
  type?: string
  from?: string
  to?: string
  transactionUrl?: string
}

export function TransactionCard({
  className,
  transactionUrl,
  date = '04/04/2024 16:32',
  amount = 0.27,
  type = 'SOL TRANSFER',
  fee = 0.0001,
  from = '9B5X...Ns6g',
  to = '9B5X...Ns6g',
  ...rest
}: TransactionCardProps) {
  const { container, dataContainer, dataItemContainer } = transactionCard({
    className,
  })

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  function formatAddress(address: string) {
    return (
      address.slice(0, 5) +
      '...' +
      address.slice(address.length - 4, address.length)
    )
  }

  const data = [
    {
      title: 'Date',
      value: formattedDate,
    },
    {
      title: 'Amount',
      value: `${amount} $SOL`,
    },
    {
      title: 'Fee',
      value: `${fee} $SOL`,
    },
    {
      title: 'Type',
      value: type,
    },
    {
      title: 'From',
      value: formatAddress(from),
    },
    {
      title: 'To',
      value: formatAddress(to),
    },
  ]

  return (
    <div className={container()} {...rest}>
      <ul className={dataContainer()}>
        {data.map(({ title, value }) => {
          return (
            <li key={`${title}-${value}`} className="col-span-1">
              <div className={dataItemContainer()}>
                <Paragraph className="leading-none text-gray300" variant="p1">
                  {title}
                </Paragraph>
                <Paragraph className="leading-none text-gray400" variant="p2">
                  {value}
                </Paragraph>
              </div>
            </li>
          )
        })}
      </ul>
      <Link
        className="mx-auto mt-9 flex text-lg font-medium text-purple600 transition-colors duration-300 hover:text-purple700 lg:mx-0 lg:mt-0"
        href={transactionUrl || '#'}
      >
        View in block explorer
      </Link>
    </div>
  )
}
