import { COOKIES_KEY } from '@/utils/cookies'
import { getCookie } from 'cookies-next'
import { api } from '..'
import { onNotify } from '@/utils/alert'

export async function onToggleBot(id: string) {
  const jwt = getCookie(COOKIES_KEY.JWT)
  try {
    await api(`https://api.natoshi.app/v1/bot/toggle/${id}`, {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((res) => {
      if (res.data.message.includes('stopped')) {
        onNotify('error', 'BOT successfully turned off.')
      } else {
        onNotify('success', 'BOT successfully turned on.')
      }
    })
  } catch (err) {
    console.log(err)
  }
}
