import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.natoshi.app/',
  headers: {
    'Content-Type': 'application/json',
  },
})
