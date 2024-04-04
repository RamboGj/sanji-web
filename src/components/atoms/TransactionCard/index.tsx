import Link from 'next/link'
import { ComponentProps } from 'react'
import { tv } from 'tailwind-variants'
import { Paragraph } from '../Paragraph'

const transactionCard = tv({
  slots: {
    container:
      'bg-gray900 border border-gray600 rounded-[16px] p-8 flex items-center justify-between',
    dataContainer: 'flex items-stretch gap-12',
    dataItemContainer: 'flex flex-col gap-1.5',
  },
})

interface TransactionCardProps extends ComponentProps<'div'> {
  date?: string
  amount?: string
  fee?: string
  type?: string
  from?: string
  to?: string
  transactionUrl?: string
}

export function TransactionCard({
  className,
  transactionUrl,
  date = '04/04/2024 16:32',
  amount = '0.27 SOL',
  type = 'SOL TRANSFER',
  fee = '0.0001 SOL',
  from = '9B5X...Ns6g',
  to = '9B5X...Ns6g',
  ...rest
}: TransactionCardProps) {
  const { container, dataContainer, dataItemContainer } = transactionCard({
    className,
  })

  const data = [
    {
      title: 'Date',
      value: date,
    },
    {
      title: 'Amount',
      value: amount,
    },
    {
      title: 'Fee',
      value: fee,
    },
    {
      title: 'Type',
      value: type,
    },
    {
      title: 'From',
      value: from,
    },
    {
      title: 'To',
      value: to,
    },
  ]

  return (
    <div className={container()} {...rest}>
      <ul className={dataContainer()}>
        {data.map(({ title, value }) => {
          return (
            <li key={`${title}-${value}`}>
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
        className="text-purple600 hover:text-purple700 transition-colors duration-300 text-lg"
        href={transactionUrl || '#'}
      >
        View in block explorer
      </Link>
    </div>
  )
}
