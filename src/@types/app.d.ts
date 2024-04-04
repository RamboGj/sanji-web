/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ModalProps {
  onClose: () => void
}

declare global {
  interface Window {
    phantom?: any
  }
}
