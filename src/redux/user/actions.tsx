import instance from '../../untils/axios'
import * as TYPES from '../type'
import { type Dispatch } from 'redux'
import { type AppActions } from '../type'
import { message } from 'antd'

export const LoginIn = (params: object) => {
  // return
  return async (dispatch: Dispatch<AppActions>) => {
    const res = await instance.post('/api/login', params)
    if (res.data.status === 0) {
      dispatch({
        type: TYPES.USER_LOGUIN,
        payload: res.data,
      })
      message.success('登录成功')
      return
    }
    message.error(res.data.message)
  }
}

export const register = (params: object) => {
  return async (dispatch: Dispatch<AppActions>) => {
    const result = await instance.post('/api/reguser', params)
    if (result.data.status === 0) {
      message.success(result.data.message)
      return
    }
    message.error(result.data.message)
  }
}

export const loginout = () => {
  return async (dispatch: Dispatch<AppActions>) => {
    dispatch({
      type: TYPES.USER_LOGIN_OUT,
    })
  }
}
