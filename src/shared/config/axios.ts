import axios, { type AxiosInstance } from 'axios'

const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_OMDB_API_KEY

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

apiClient.interceptors.request.use(
  (config) => {
    if (API_KEY && API_KEY.length > 0) {
      config.params = config.params || {}
      config.params.apikey = API_KEY
    }
    return config
  },
  (error) => Promise.reject(error)
)

