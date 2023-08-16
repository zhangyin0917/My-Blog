import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'
import { message } from 'antd'
import { get } from './config'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
})

instance.interceptors.request.use(
  async config => {
    if (config.url !== '/api/captcha' && config.url !== '/api/login') {
      const { token } = get('userInfo')
      if (token) {
        config.headers.Authorization = token
      }
    }
    return config
  },
  async err => {
    throw err
  }
)

instance.interceptors.response.use(
  async config => {
    if (config.data.status === 1) {
      message.error(config.data.message)
    }
    return config
  },
  async (err: AxiosError) => {
    console.log('ceshi', err)

    message.error(err.message)
    throw err
  }
)

export default instance
