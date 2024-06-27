export const BASE_URL = 'https://api.natoshi.app/v1'

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/user/login`,
  REGISTER: `${BASE_URL}/user/register`,
  REQUEST_PASSWORD_RESET: `${BASE_URL}/user/request-password-reset`,
  RESET_PASSWORD: `${BASE_URL}/user/password-reset`,

  GET_SNIPE_BOT: `${BASE_URL}/sniper/active`,
  CREATE_SNIPE_BOT: `${BASE_URL}/sniper`,
  UPDATE_SNIPE_BOT: `${BASE_URL}/sniper`,
  TOGGLE_SNIPE_BOT: `${BASE_URL}/sniper/toggle`,

  GET_ARBITRAGE_BOT: `${BASE_URL}/arbitrage/`,
}
