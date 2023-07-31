import React, { useState } from 'react'
import { type ReactElement } from 'react'
import NotPromissionsPage from '../NotPermissions'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

interface Role {
  children?: ReactElement
  roles: string[]
}
const PrviteRoutes: React.FC<Role> = ({ children, roles }) => {
  const userInfo = useSelector((state: any) => state.user)
  const navigate = useNavigate()
  const { role, token } = userInfo
  const [defaultRole, setDefultRoles] = useState('user')
  if (roles.includes(role || defaultRole)) {
    return children
  }
  return <NotPromissionsPage />
}

export default PrviteRoutes
