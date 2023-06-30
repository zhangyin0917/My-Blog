import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: '',
  timeout: 1000,
})

instance.interceptors.request.use(
  async config => {
    return await Promise.resolve(config)
  },
  async err => {
    return await Promise.reject(err)
  }
)

instance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return await Promise.resolve(response)
  },
  async (err: AxiosError) => {
    return await Promise.reject(err)
  }
)

export default instance
