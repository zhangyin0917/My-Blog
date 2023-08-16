import React, { useEffect, useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons'
import { Layout, Button, Avatar, Dropdown, type MenuProps, Menu } from 'antd'
import { useSelector } from 'react-redux'
import { type RootState } from '../../../redux/rootReducer'
import { ImageTransform } from '../../../untils/config'
import { useNavigate } from 'react-router-dom'
const { Header, Sider, Content } = Layout
interface MenuCollaosed {
  collapseds: any
}
const AdminHeader: React.FC<MenuCollaosed> = ({ collapseds }) => {
  const [collapsed, setCollapsed] = useState(false)
  const userInfo = useSelector((state: RootState) => state.user)
  const { avatar } = userInfo
  const navigate = useNavigate()

  useEffect(() => {
    collapseds(collapsed)
  }, [collapsed])

  const getPopupContainer = (triggerNode: { parentNode: any }) => {
    return triggerNode.parentNode
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Menu.Item>
          <span onClick={() => navigate('/')}>返回首页</span>
        </Menu.Item>
      ),
    },
  ]

  return (
    <Header style={{ padding: 0 }}>
      <Button
        type='text'
        icon={
          collapsed ? (
            <MenuUnfoldOutlined style={{ color: 'white' }} />
          ) : (
            <MenuFoldOutlined style={{ color: 'white' }} />
          )
        }
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: '16px',
          width: 64,
          height: 64,
        }}
      />
      <Dropdown
        autoAdjustOverflow
        getPopupContainer={getPopupContainer}
        placement='bottom'
        menu={{ items }}
        trigger={['click', 'hover']}>
        <Avatar
          style={{ float: 'right', marginTop: '12px' }}
          size='large'
          src={ImageTransform(avatar)}
          icon={<UserOutlined />}
        />
      </Dropdown>
    </Header>
  )
}
export default AdminHeader
