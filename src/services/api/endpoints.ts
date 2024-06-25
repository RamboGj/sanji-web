export const BASE_URL = 'https://api.natoshi.app/v1'

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/user/login`,
  REGISTER: `${BASE_URL}/user/register`,

  GET_SNIPE_BOT: `${BASE_URL}/sniper/active`,
  CREATE_SNIPE_BOT: `${BASE_URL}/sniper`,
  UPDATE_SNIPE_BOT: `${BASE_URL}/sniper`,
  TOGGLE_SNIPE_BOT: `${BASE_URL}/sniper/toggle`,
}
