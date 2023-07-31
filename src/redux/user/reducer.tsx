import * as TYPES from '../type'
import { get, save, remove } from '../../untils/config'
import { type AppActions, type UserInfo } from '../type'
let defaultState: UserInfo = {
  username: '',
  role: '',
  email: '',
  phone: '',
  avatar: '',
}

// 从本地获取，防治数据丢失
const userInfo = get('userInfo')
if (userInfo) {
  defaultState = { ...defaultState, ...userInfo }
}

const UserReducer = (state = defaultState, action: AppActions) => {
  const { type, payload } = action
  switch (type) {
    case TYPES.USER_LOGUIN:
      const { data, token } = payload
      const { username, email, phone, avatar, role } = data
      save('userInfo', { username, email, phone, avatar, token, role })
      return { ...state, username, role, email, phone, avatar }
    case TYPES.USER_LOGIN_OUT:
      remove('userInfo')
      return { ...state, username: '', email: '', phone: '', avatar: '', role: '', token: '' }
    default:
      return state
  }
}
export default UserReducer
