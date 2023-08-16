import React, { useState } from 'react'

import { Layout, Menu, Button, theme } from 'antd'
import MenuLeft from './mentLeft'
import AdminContent from './content'
import AdminHeader from './header'
import BreadItems from './breadItem'
const AdminLayout: React.FC = () => {
  const [views, SetView] = useState(false)
  const [BreadItem, SetBreadItem] = useState('')
  return (
    <Layout style={{ height: '100vh' }}>
      <MenuLeft views={views} breadItem={SetBreadItem}></MenuLeft>
      <Layout style={{ background: '#f0f2f5' }}>
        <AdminHeader collapseds={SetView} />
        <BreadItems breadcrumbs={BreadItem || ' 首页'} />
        <AdminContent />
      </Layout>
    </Layout>
  )
}

export default AdminLayout
