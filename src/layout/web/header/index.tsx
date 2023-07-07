import React from 'react'
import '../../../style/webHeader.less'
import Logo from './logo'
import Search from './search'
import NavBar from './nav'
import UserInfo from './userInfo'
// import { Row, Col } from 'antd'

interface WebHeaderProps {
  name?: string
}

// const responsiveLeft = { xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24 }
// const responsiveRight = { xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0 }
const WebHeader: React.FC<WebHeaderProps> = ({ name = '导航栏' }) => {
  return (
    <div className='web_header'>
      <Logo />
      <Search />
      <NavBar />
      <UserInfo />
    </div>
  )
}

export default WebHeader
