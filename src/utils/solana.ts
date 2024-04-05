export const isPhantomInstalled =
  typeof window !== 'undefined' ? window.phantom?.solana?.isPhantom : null

export function getProvider() {
  if (typeof window !== 'undefined' && 'phantom' in window) {
    const provider = window.phantom?.solana

    if (provider?.isPhantom) {
      return provider
    }
  }

  return null
}

export async function onDisconnect() {
  if (typeof window !== 'undefined') {
    const provider = getProvider()

    await provider.disconnect()
  }
}
