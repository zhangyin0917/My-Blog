import React, { useState } from 'react'

import { Layout, Menu, Button, theme } from 'antd'
import NavAdminList from './navlist'

const { Sider } = Layout

interface MenuLeftView {
  views: boolean
  breadItem: any
}

const MenuLeft: React.FC<MenuLeftView> = ({ views, breadItem }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleOnselect = (e: any) => {
    const { selectedKeys } = e
    const newValue = Number(selectedKeys.join()) - 1
    breadItem(NavAdminList[newValue].title)
  }

  return (
    <Sider style={{ background: 'white' }} trigger={null} collapsible collapsed={views}>
      <div
        style={{
          height: '64px',
          color: 'white',
          fontSize: '25px',
          textAlign: 'center',
          lineHeight: '70px',
          background: '#001529',
        }}>
        {!views ? 'AdminBlog' : ''}
      </div>
      <Menu
        style={{ fontSize: '20px' }}
        theme='light'
        mode='vertical'
        defaultSelectedKeys={['1']}
        items={NavAdminList}
        onSelect={handleOnselect}
      />
    </Sider>
  )
}

export default MenuLeft
