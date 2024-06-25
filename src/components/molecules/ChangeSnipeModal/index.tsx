import { Button } from '@/components/atoms/Button'
import { Heading } from '@/components/atoms/Heading'
import { XCircle } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog'
import { Dispatch, useState, useTransition } from 'react'
import { ModalProps } from '@/@types/app'
import { Label } from '@/components/atoms/Label'
import { SnipeState } from '@/reducers/SnipeReducer/SnipeState'
import {
  SnipeAction,
  SnipeActionType,
} from '@/reducers/SnipeReducer/SnipeActions'
import { updateSnipeBot } from '@/services/api/snipe'
import { isAxiosError } from 'axios'
import toast from 'react-hot-toast'

interface ChangeSnipeModalProps extends ModalProps {
  dispatch: Dispatch<SnipeAction>
  state: SnipeState
}

export function ChangeSnipeModal({
  state,
  onClose,
  dispatch,
}: ChangeSnipeModalProps) {
  const [isPending, startTransition] = useTransition()
  const [snipeConfig, setSnipeConfig] = useState<string>(
    state?.snipe?.snipeList || '',
  )

  async function onUpdateSnipeList() {
    startTransition(async () => {
      try {
        const response = await updateSnipeBot({
          body: {
            snipeList: snipeConfig,
          },
          botId: state.snipe._id,
        })

        dispatch({
          type: SnipeActionType.SNIPE_SAVE,
          payload: {
            snipeList: response.data.snipeList,
          },
        })

        toast.success('Snipe list configuration successfully updated.')
        onClose()
      } catch (err) {
        if (isAxiosError(err)) {
          console.log('err', err)
          toast.error(err.response?.data.message)
        }
      }
    })
  }

  const defaultValue = snipeConfig
    .split('\\n')
    .filter((element) => {
      return element.length > 0
    })
    .join('\n')

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-gray900/80" />
      <Dialog.Content className="text-purple50 fixed left-[50%] top-[50%] z-50 w-full max-w-[596px] translate-x-[-50%] translate-y-[-50%] rounded-[20px] border border-gray600 bg-gray900 px-9 pb-12 pt-6 focus:outline-none">
        <div className="flex items-center justify-between">
          <div className="h-6 w-6 opacity-0" />
          <Dialog.Title asChild>
            <Heading variant="h3" className="leading-none">
              Change Snipes
            </Heading>
          </Dialog.Title>
          <Dialog.Close onClick={onClose}>
            <XCircle size={32} className="text-yellow600" color="#ED7A14" />
          </Dialog.Close>
        </div>

        <div className="mt-4 h-px w-full bg-gray500" />

        <div className="mt-8 flex w-full flex-col gap-2">
          <Label
            tooltipContent="Follow the example below and write one snipe LP per line"
            label="Snipe settings"
            htmlFor="snipeSettings"
          />
          <textarea
            defaultValue={defaultValue}
            value={defaultValue}
            onChange={(e) => {
              setSnipeConfig(e.target.value)
            }}
            className="text-purple50 focus:border-purple500 w-full resize-none overflow-y-scroll whitespace-pre-wrap rounded-lg border border-transparent bg-gray600 px-4 py-3 font-medium transition duration-500 placeholder:text-gray400 focus:bg-gray700 focus:outline-none"
            placeholder={`EGGoorE6ULqPzJYVZNSmUrNkLqJtSjbbt9iCjr5AarCF\nLP:USDC-SOL\nLP:SOL-WIF\nLP:WIF-SOL`}
            name="snipeSettings"
            id="snipeSettings"
            rows={10}
          />
        </div>

        <div className="mt-12 flex flex-col items-stretch gap-4">
          <Button
            variant="primary"
            isLoading={isPending}
            onClick={onUpdateSnipeList}
          >
            <Button.Label>Save</Button.Label>
          </Button>
          <Button variant="ghost" onClick={onClose}>
            <Button.Label>Cancel</Button.Label>
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
