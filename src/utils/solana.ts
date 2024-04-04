export const isPhantomInstalled = window.phantom?.solana?.isPhantom

export function getProvider() {
  if ('phantom' in window) {
    const provider = window.phantom?.solana

    if (provider?.isPhantom) {
      return provider
    }
  }

  return null
}

export async function onDisconnect() {
  const provider = getProvider()

  await provider.disconnect()
}
