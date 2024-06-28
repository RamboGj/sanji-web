import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import Input from '@/components/atoms/Input'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import { ModalProps } from '@/@types/app'
import { Label } from '@/components/atoms/Label'
import { Switch } from '@/components/atoms/Switch'
import { Dispatch } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { onNotify } from '@/utils/alert'
import {
  ArbitrageBotProps,
  ArbitrageState,
} from '@/reducers/ArbitrageReducer/ArbitrageState'
import {
  ArbitrageAction,
  ArbitrageActionType,
} from '@/reducers/ArbitrageReducer/ArbitrageAction'
import {
  UpdateArbitrageBotBodyProps,
  onUpdateArbitrageBotData,
} from '@/services/api/arbitrage'
import { isAxiosError } from 'axios'

const configSchema = z.object({
  tradingMode: z.enum(['classic', 'neutral-delta']).optional(),
  profitCriteriaPercentage: z.string().optional(),
  profitCriteriaAbsoluteUSD: z.string().optional(),
  profitCriteriaTimeout: z.string().optional(),

  telegramNotificationEnabled: z.boolean().optional(),
  telegramNotificationApiKey: z.string().optional(),
  telegramNotificationChatID: z.string().optional(),

  kucoinAPIKey: z.string().optional(),
  kucoinSecretKey: z.string().optional(),

  binanceAPIKey: z.string().optional(),
  binanceSecretKey: z.string().optional(),

  okxAPIKey: z.string().optional(),
  okxSecretKey: z.string().optional(),

  poliniexAPIKey: z.string().optional(),
  poliniexSecretKey: z.string().optional(),
})

type ConfigArbitrageSchemaData = z.infer<typeof configSchema>

interface ConfigArbitrageModalProps extends ModalProps {
  data: ArbitrageBotProps | null
  dispatch: Dispatch<ArbitrageAction>
  state: ArbitrageState
}

export function ConfigArbitrageModal({
  onClose,
  state,
  dispatch,
}: ConfigArbitrageModalProps) {
  const arbitrage = state?.arbitrage

  const binance = state.arbitrage.exchangeAPIKeys.find(
    (exchange) => exchange.exchangeName === 'binance',
  )
  const kucoin = state.arbitrage.exchangeAPIKeys.find(
    (exchange) => exchange.exchangeName === 'kucoin',
  )
  const okx = state.arbitrage.exchangeAPIKeys.find(
    (exchange) => exchange.exchangeName === 'okx',
  )
  const poliniex = state.arbitrage.exchangeAPIKeys.find(
    (exchange) => exchange.exchangeName === 'poliniex',
  )

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConfigArbitrageSchemaData>({
    defaultValues: {
      tradingMode: arbitrage?.tradingParameters.tradingMode,
      profitCriteriaAbsoluteUSD: String(
        arbitrage?.tradingParameters.profitTakingCriteria.absoluteValueUSD,
      ),
      profitCriteriaPercentage: String(
        arbitrage?.tradingParameters.profitTakingCriteria.percentage,
      ),
      profitCriteriaTimeout: String(
        arbitrage?.tradingParameters.operationTimeout,
      ),

      telegramNotificationEnabled:
        arbitrage?.notificationSettings.telegram.enabled || false,
      telegramNotificationApiKey:
        arbitrage?.notificationSettings.telegram.apiKey,
      telegramNotificationChatID:
        arbitrage?.notificationSettings.telegram.chatId,

      kucoinAPIKey: kucoin?.apiKey,
      kucoinSecretKey: kucoin?.secret,

      binanceAPIKey: binance?.apiKey,
      binanceSecretKey: binance?.secret,

      okxAPIKey: okx?.apiKey,
      okxSecretKey: okx?.secret,

      poliniexAPIKey: poliniex?.apiKey,
      poliniexSecretKey: poliniex?.secret,
    },
    resolver: zodResolver(configSchema),
  })

  async function onSubmit(formData: ConfigArbitrageSchemaData) {
    const body: UpdateArbitrageBotBodyProps = {
      exchangeAPIKeys: [
        {
          exchangeName: 'binance',
          apiKey: formData.binanceAPIKey,
          secret: formData.binanceSecretKey,
        },
        {
          exchangeName: 'kucoin',
          apiKey: formData.kucoinAPIKey,
          secret: formData.kucoinSecretKey,
        },
        {
          exchangeName: 'okx',
          apiKey: formData.okxAPIKey,
          secret: formData.okxSecretKey,
        },
        {
          exchangeName: 'poliniex',
          apiKey: formData.poliniexAPIKey,
          secret: formData.poliniexSecretKey,
        },
      ],
      tradingParameters: {
        tradingMode: formData.tradingMode,
        profitTakingCriteria: {
          percentage: Number(formData.profitCriteriaPercentage),
          absoluteValueUSD: Number(formData.profitCriteriaAbsoluteUSD),
        },
        operationTimeout: Number(formData.profitCriteriaTimeout),
      },
      notificationSettings: {
        telegram: {
          enabled: formData.telegramNotificationEnabled,
          apiKey: formData.telegramNotificationApiKey,
          chatId: formData.telegramNotificationChatID,
        },
      },
    }

    try {
      const response = await onUpdateArbitrageBotData({
        body,
        botId: state.arbitrage._id,
      })

      dispatch({
        type: ArbitrageActionType.ARBITRAGE_SAVE,
        payload: {
          ...response,
        },
      })

      onClose()
      onNotify('success', 'BOT successfully updated.')
    } catch (err) {
      if (isAxiosError(err)) {
        console.log('error config modal', err)
        onNotify('error', err.response?.data.message)
      }
    }
  }

  const tradingMode = watch('tradingMode')
  const telegramNotificationEnabled = watch('telegramNotificationEnabled')

  const tradingModeOptions: {
    title: string
    value: 'classic' | 'neutral-delta'
  }[] = [
    {
      title: 'Classic',
      value: 'classic',
    },
    {
      title: 'Neutral delta',
      value: 'neutral-delta',
    },
  ]

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 overflow-y-auto bg-gray900/80" />

      <Dialog.Content className="fixed left-[50%] top-[50%] z-50 max-h-[90vh] w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 focus:outline-none">
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

        <form
          onSubmit={handleSubmit(onSubmit, (err) => {
            console.log('err', err)
          })}
        >
          <div className="mt-8">
            <Label
              label="Trading mode"
              tooltipContent="Place Cell description here."
            />

            <div className="mt-3 flex flex-wrap gap-3">
              {tradingModeOptions.map(({ title, value }) => {
                const isChecked = tradingMode === value

                return (
                  <div key={title} className="flex items-center gap-1">
                    <Checkbox.Root
                      onClick={() => setValue('tradingMode', value)}
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

          <div className="mt-8">
            <Label
              label="Profit criteria"
              tooltipContent="Place Cell description here."
            />

            <div className="mt-4 flex flex-col gap-8 lg:flex-row">
              <Input
                {...register('profitCriteriaPercentage')}
                error={errors.profitCriteriaPercentage}
                type="number"
                label="%"
                id="profitCriteriaPercentage"
                placeholder="20"
              />

              <Input
                {...register('profitCriteriaAbsoluteUSD')}
                error={errors.profitCriteriaAbsoluteUSD}
                type="number"
                label="USD"
                id="profitCriteriaAbsoluteUSD"
                placeholder="100"
              />

              <Input
                {...register('profitCriteriaTimeout')}
                error={errors.profitCriteriaTimeout}
                type="string"
                label="USD"
                id="profitCriteriaAbsoluteUSD"
                placeholder="100"
              />
            </div>
          </div>

          <div className="mt-12">
            <div className="flex flex-col gap-3">
              <Label label="Telegram notifications" />
              <Switch
                checked={telegramNotificationEnabled}
                onClick={() => {
                  setValue(
                    'telegramNotificationEnabled',
                    !telegramNotificationEnabled,
                  )
                }}
              />
            </div>

            {telegramNotificationEnabled ? (
              <div className="mt-4 flex flex-col gap-y-4">
                <Input
                  {...register('telegramNotificationApiKey')}
                  error={errors.telegramNotificationApiKey}
                  type="string"
                  label="Telegram API Key"
                  id="telegramNotificationApiKey"
                  placeholder="0xfb...213"
                  tooltipContent="Your telegram API key."
                />
                <Input
                  {...register('telegramNotificationChatID')}
                  error={errors.telegramNotificationChatID}
                  type="string"
                  label="Telegram Chat ID"
                  id="telegramNotificationChatID"
                  placeholder="9213183120321"
                  tooltipContent="Your telegram chat ID."
                />
              </div>
            ) : null}
          </div>

          <div className="mt-12">
            <div className="flex flex-col gap-y-6">
              <div>
                <Heading variant="h3">Binance</Heading>
                <div className="mt-4 flex flex-col gap-y-4">
                  <Input
                    {...register('binanceAPIKey')}
                    error={errors.binanceAPIKey}
                    type="string"
                    label="Binance API Key"
                    id="binanceAPIKey"
                    placeholder="API key"
                    tooltipContent="Your binance api key."
                  />
                  <Input
                    {...register('binanceSecretKey')}
                    error={errors.binanceSecretKey}
                    type="string"
                    label="Binance Secret ID"
                    id="binanceSecretKey"
                    placeholder="Secret key"
                    tooltipContent="Your binance secret key."
                  />
                </div>
              </div>

              <div>
                <Heading variant="h3">Kucoin</Heading>
                <div className="mt-4 flex flex-col gap-y-4">
                  <Input
                    {...register('kucoinAPIKey')}
                    error={errors.kucoinAPIKey}
                    type="string"
                    label="Kucoin API Key"
                    id="kucoinAPIKey"
                    placeholder="API key"
                    tooltipContent="Your Kucoin api key."
                  />
                  <Input
                    {...register('kucoinSecretKey')}
                    error={errors.kucoinSecretKey}
                    type="string"
                    label="Kucoin Secret ID"
                    id="kucoinSecretKey"
                    placeholder="Secret key"
                    tooltipContent="Your Kucoin secret key."
                  />
                </div>
              </div>

              <div>
                <Heading variant="h3">OKX</Heading>
                <div className="mt-4 flex flex-col gap-y-4">
                  <Input
                    {...register('okxAPIKey')}
                    error={errors.okxAPIKey}
                    type="string"
                    label="OKX API Key"
                    id="okxAPIKey"
                    placeholder="API key"
                    tooltipContent="Your OKX api key."
                  />
                  <Input
                    {...register('okxSecretKey')}
                    error={errors.okxSecretKey}
                    type="string"
                    label="OKX Secret ID"
                    id="okxSecretKey"
                    placeholder="Secret key"
                    tooltipContent="Your OKX secret key."
                  />
                </div>
              </div>

              <div>
                <Heading variant="h3">Poliniex</Heading>
                <div className="mt-4 flex flex-col gap-y-4">
                  <Input
                    {...register('poliniexAPIKey')}
                    error={errors.poliniexAPIKey}
                    type="string"
                    label="Poliniex API Key"
                    id="poliniexAPIKey"
                    placeholder="API key"
                    tooltipContent="Your Poliniex api key."
                  />
                  <Input
                    {...register('poliniexSecretKey')}
                    error={errors.poliniexSecretKey}
                    type="string"
                    label="Poliniex Secret ID"
                    id="poliniexSecretKey"
                    placeholder="Secret key"
                    tooltipContent="Your Poliniex secret key."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-y-6">
            <Button isLoading={false} type="submit" variant="primary">
              <Button.Label>Save</Button.Label>
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
