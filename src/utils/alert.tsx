import toast from 'react-hot-toast'
import { Alert, AlertProps } from '@/components/atoms/Toast'

export function onNotify(type: AlertProps['variant'], message: string) {
  toast.custom((t) => <Alert t={t} message={message} variant={type} />)
}
