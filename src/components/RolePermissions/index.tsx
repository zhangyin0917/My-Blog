import React from 'react'
import { type ReactElement } from 'react'
import NotPromissionsPage from '../NotPermissions'
interface Role {
  children?: ReactElement
  roles: string[]
}
const PrviteRoutes: React.FC<Role> = ({ children, roles }) => {
  const islogin = true
  const ens: string = 'admin'
  if (roles.includes(ens) && islogin) {
    return children
  }
  return <NotPromissionsPage />
}

export default PrviteRoutes
