import React, { type ReactElement } from 'react'
import { HomeOutlined, UnorderedListOutlined, PlusCircleOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
export interface NavList {
  key: string
  icon: ReactElement
  title: string
  label: ReactElement
}

const NavAdminList: NavList[] = [
  {
    key: '1',
    icon: <HomeOutlined />,
    title: '首页',
    label: <Link to='/admin'>首页</Link>,
  },
  {
    key: '2',
    icon: <UnorderedListOutlined />,
    title: '文章管理',
    label: <Link to='/admin/article/manager'>文章管理</Link>,
  },
  {
    key: '3',
    icon: <PlusCircleOutlined />,
    title: '文章新增',
    label: <Link to='/admin/article/add'>文章新增</Link>,
  },
  {
    key: '4',
    icon: <PlusCircleOutlined />,
    title: '分类管理',
    label: <Link to='/admin/article/categreate'>分类管理</Link>,
  },
  {
    key: '5',
    icon: <PlusCircleOutlined />,
    title: '标签管理',
    label: <Link to='/admin/article/tag'>标签管理</Link>,
  },
]

export default NavAdminList
