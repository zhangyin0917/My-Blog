import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'
import config from '../config'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
})

instance.interceptors.request.use(
  async config => {
    return config
  },
  async err => {
    return await Promise.reject(err)
  }
)

instance.interceptors.response.use(
  async config => {
    return config
  },
  async (err: AxiosError) => {
    return await Promise.reject(err)
  }
)

export default instance
