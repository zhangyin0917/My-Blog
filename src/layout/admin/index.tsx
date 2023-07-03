import React, { type FC } from 'react'
import { Outlet } from 'react-router-dom'

interface AdminLayoutProps {
  title?: string
}

const AdminLayout: FC<AdminLayoutProps> = ({ title = 'buju' }) => {
  return (
    <div>
      <span>{title}</span>
      <Outlet />
    </div>
  )
}

export default AdminLayout
