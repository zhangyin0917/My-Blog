import React, { type ReactElement } from 'react'
import { HomeFilled, DatabaseFilled, PieChartFilled, SmileFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'
export interface NavList {
  key: string
  icon: ReactElement
  label: ReactElement
}

const NavBarList: NavList[] = [
  {
    key: '1',
    icon: <HomeFilled />,
    label: <Link to='/'>首页</Link>,
  },
  {
    key: '2',
    icon: <PieChartFilled />,
    label: <Link to='/archives'>归档</Link>,
  },
  {
    key: '3',
    icon: <DatabaseFilled />,
    label: <Link to='/categories'>分类</Link>,
  },
  {
    key: '4',
    icon: <SmileFilled />,
    label: <Link to='/about'>关于</Link>,
  },
]

export default NavBarList
