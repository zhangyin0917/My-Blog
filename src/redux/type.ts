import { type ThunkDispatch } from 'redux-thunk'

import { type Dispatch, type AnyAction } from 'redux'
import { type RootState } from './rootReducer'

// user
export const USER_LOGUIN = 'USER_LOGIN'
export const USER_REGISTER = 'USER_REGISTER'
export const USER_LOGIN_OUT = 'USER_LOGIN_OUT'

interface UserLogin {
  type: typeof USER_LOGUIN
  payload?: any
}
interface UserRegister {
  type: typeof USER_LOGIN_OUT
  payload?: any
}

export type AppActions = UserLogin | UserRegister

type Keys = 'username' | 'role' | 'email' | 'phone' | 'avatar'
export type UserInfo = Record<Keys, string>

export type AppDispatch = ThunkDispatch<RootState, unknown, AppActions>
