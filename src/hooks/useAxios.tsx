import { useState, useEffect } from 'react'

import instance from '../untils/axios'
import { type AxiosRequestConfig, type Method } from 'axios'

export interface UseAxiosOptions extends AxiosRequestConfig {
  url: string
  method: string
  data?: any
}

export const useAxios = <T = any,>(
  { url, method, data, ...options }: UseAxiosOptions,
  type?: number,
  isModle?: boolean
) => {
  const [response, setResponse] = useState<T | null>(null)
  const [error, setError] = useState(null)
  const [isLoding, setIsLoading] = useState<boolean>(true)
  const [trigger, setTrigger] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    const AxiosData = async () => {
      try {
        const res = await instance({ url, method, data, ...options })
        setResponse(res.data)
        setIsLoading(false)
      } catch (err: any) {
        setError(err)
      }
    }

    void AxiosData()
  }, [isModle, type, url, method, JSON.stringify(data), JSON.stringify(options)])

  return { response, error, isLoding }
}
