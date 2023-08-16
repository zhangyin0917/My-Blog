import React from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
const { Header, Sider, Content } = Layout
const AdminContent: React.FC = () => {
  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
        background: 'white',
      }}>
      <Outlet />
    </Content>
  )
}

export default AdminContent
