import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { ModalProps } from '@/@types/app'
import { Label } from '@/components/atoms/Label'
import { Switch } from '@/components/atoms/Switch'
import { Dispatch, useState } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onNotify } from '@/utils/alert'
import { getCookie } from 'cookies-next'
import { COOKIES_KEY } from '@/utils/cookies'
import { api } from '@/services/api'
import { SnipeProps, SnipeState } from '@/reducers/SnipeReducer/SnipeState'
import {
  SnipeAction,
  SnipeActionType,
} from '@/reducers/SnipeReducer/SnipeActions'

const configSchema = z.object({
  quoteAmount: z.string().optional(),
  privateKey: z.string().optional(),
  minimumPoolSize: z.string().optional(),
  sellDelay: z.string().optional(),
  sellRetries: z.string().optional(),
})

type ConfigSchemaData = z.infer<typeof configSchema>

interface ConfigModalProps extends ModalProps {
  data: SnipeProps | null
  dispatch: Dispatch<SnipeAction>
  state: SnipeState
}

export function ConfigModal({
  data,
  onClose,
  dispatch,
  state,
}: ConfigModalProps) {
  const [isMintRenounced, setIsMintRenounced] = useState<boolean>(
    data?.checkIfMintIsRenounced || false,
  )
  const [isAutoSell, setIsAutoSell] = useState<boolean>(data?.autoSell || false)
  const [useSnipeList, setUseSnipeList] = useState<boolean>(
    data?.useSnipeList || false,
  )
  const [gasBid, setGasBid] = useState<string>(data?.gasLevel || 'Low')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfigSchemaData>({
    defaultValues: {
      privateKey: '',
      quoteAmount: String(data?.quoteAmount) || '',
      minimumPoolSize: String(data?.minPoolSize) || '',
      sellDelay: String(data?.autoSellDelay) || '0',
      sellRetries: String(data?.maxSellRetries) || '0',
    },
    resolver: zodResolver(configSchema),
  })

  async function onSubmit(formData: ConfigSchemaData) {
    dispatch({ type: SnipeActionType.SNIPE_TOGGLE_LOADING })

    const jwt = getCookie(COOKIES_KEY.JWT)

    const hasPrivateKey =
      formData?.privateKey && formData.privateKey?.length > 0

    const body = hasPrivateKey
      ? {
          privateKey: formData.privateKey,
          quoteAmount: formData.quoteAmount?.replace(',', '.'),
          useSnipeList,
          minPoolSize: formData.minimumPoolSize?.replace(',', '.'),
          checkIfMintIsRenounced: isMintRenounced,
          autoSell: isAutoSell,
          maxSellRetries: formData.sellRetries,
          autoSellDelay: formData.sellDelay,
          gasLevel: gasBid,
        }
      : {
          quoteAmount: formData.quoteAmount?.replace(',', '.'),
          useSnipeList,
          minPoolSize: formData.minimumPoolSize?.replace(',', '.'),
          checkIfMintIsRenounced: isMintRenounced,
          autoSell: isAutoSell,
          maxSellRetries: formData.sellRetries,
          autoSellDelay: formData.sellDelay,
          gasLevel: gasBid,
        }

    try {
      await api(`https://api.natoshi.app/v1/bot/${data?._id}`, {
        method: 'PUT',
        data: body,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }).then((response) => {
        console.log('response', response)
        dispatch({ type: SnipeActionType.SNIPE_TOGGLE_LOADING })
        dispatch({ type: SnipeActionType.SNIPE_SAVE, payload: response.data })
        onClose()
        onNotify('success', 'BOT successfully updated.')
      })
    } catch (err) {
      console.log('error config modal')
    }
  }

  const gasBidMocks = [
    {
      title: 'Low',
      value: 'Low',
    },
    {
      title: 'Medium',
      value: 'Medium',
    },
    {
      title: 'High',
      value: 'High',
    },
    {
      title: 'Maximum',
      value: 'Maximum',
    },
  ]

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-gray900/80" />
      <Dialog.Content className="text-purple50 fixed left-[50%] top-[50%] z-50 w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 focus:outline-none">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 opacity-0" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              CONFIGURATION
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-purple500" />
          </Dialog.Close>
        </div>

        <div className="mt-4 h-px w-full bg-gray500" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-5 flex flex-col gap-y-6">
            <Input
              {...register('privateKey')}
              error={errors.privateKey}
              type="string"
              className="col-span-1"
              label="Private key"
              id="minting"
              placeholder="0xFbl8...Ab25"
              tooltipContent="Your wallet's private key."
            />
            <div className="col-span-1 flex flex-col gap-3">
              <Label
                label="Use snipe list"
                tooltipContent="This means the contract owner has renounced his ownership over the contract."
              />
              <Switch
                checked={useSnipeList}
                onClick={() => setUseSnipeList((prev) => !prev)}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <Input
                {...register('quoteAmount')}
                error={errors.quoteAmount}
                type="string"
                min={0}
                className="col-span-1"
                label="Quote amount"
                id="minting"
                placeholder="0.001"
                tooltipContent="Quote amount is the value in SOL you want to send for each one of your snipes."
              />
              <Input
                {...register('minimumPoolSize')}
                error={errors.minimumPoolSize}
                type="string"
                min={0}
                className="col-span-1"
                label="Minimum pool size"
                id="minting"
                placeholder="0.01"
                tooltipContent="The minimum Liquidity value in SOL you want to a LP to have. If the LP liquidity does not satisfy this field, it is gonna be skipped."
              />
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              <div className="col-span-1 flex flex-col gap-3">
                <Label
                  label="Is mint renounced?"
                  tooltipContent="This means the contract owner has renounced his ownership over the contract."
                />
                <Switch
                  checked={isMintRenounced}
                  onClick={() => setIsMintRenounced((prev) => !prev)}
                />
              </div>

              <div>
                <Label
                  label="Gas bid"
                  tooltipContent="Place Cell description here."
                />

                <div className="mt-3 flex flex-wrap gap-3">
                  {gasBidMocks.map(({ title, value }) => {
                    const isChecked = gasBid === value

                    return (
                      <div key={title} className="flex items-center gap-1">
                        <Checkbox.Root
                          onClick={() => setGasBid(value)}
                          checked={true}
                          className={`h-6 w-6 rounded-full border ${isChecked ? 'border-transparent bg-yellow600' : 'border-gray500 '}`}
                          id={value}
                        />
                        <span className="text-purple50 text-sm font-medium">
                          {title}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label label="Auto sell" tooltipContent="Auto sell" />
              <Switch
                checked={isAutoSell}
                onClick={() => setIsAutoSell((prev) => !prev)}
              />
            </div>
            {isAutoSell ? (
              <div className="grid grid-cols-2 gap-8">
                <Input
                  {...register('sellDelay')}
                  error={errors.sellDelay}
                  className="col-span-1"
                  label="Sell delay"
                  id="minting"
                  placeholder="1000"
                  type="number"
                  tooltipContent="hello tootltip"
                />
                <Input
                  {...register('sellRetries')}
                  error={errors.sellRetries}
                  className="col-span-1"
                  label="Sell retries"
                  id="minting"
                  placeholder="3"
                  type="number"
                  tooltipContent="hello tootltip"
                />
              </div>
            ) : null}
          </div>
          <div className="mt-5 flex flex-col gap-y-6">
            <Button isLoading={state.isLoading} type="submit" variant="primary">
              <Button.Label>Save</Button.Label>
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
