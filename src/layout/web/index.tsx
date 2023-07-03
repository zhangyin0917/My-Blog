import React, { type FC } from 'react'
import { Outlet } from 'react-router-dom'
interface WebLayoutProps {
  title?: string
}

const WebLayout: FC<WebLayoutProps> = ({ title = '网页前端' }) => {
  return (
    <div>
      <span>{title}</span>
      <Outlet />
    </div>
  )
}

export default WebLayout
