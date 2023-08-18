import axios, { type AxiosInstance, type AxiosResponse, type AxiosError, type AxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { get } from './config'

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 5000,
})

instance.interceptors.request.use(
  async (config: any) => {
    const publicUrls = ['/api/captcha', '/api/login', '/api/getBlog', /^\/api\/getBlogById\?id=\d+$/]
    const isPublicUrl = publicUrls.some(urlPattern =>
      typeof urlPattern === 'string' ? config.url === urlPattern : urlPattern.test(config.url)
    )
    if (!isPublicUrl) {
      const token = get('userInfo')?.token
      if (!token) {
        message.error('请先登录')
        throw new Error('No token') // 使用throw来中止请求  抛出请求错误
      }
      config.headers.Authorization = token
    }
    return config
  },
  async err => {
    throw err // 捕获请求错误
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
    message.error(err.message)
    throw err
  }
)

export default instance
