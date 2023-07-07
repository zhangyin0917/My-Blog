import React from 'react'
import { Menu } from 'antd'
// import { useNavigate } from 'react-router-dom'
import NavBarList from './navList'
interface NavBarProps {
  name?: string
}

const NavBar: React.FC<NavBarProps> = ({ name = '导航菜单' }) => {
  // const navigate = useNavigate()
  const onClick = (item: any) => {
    console.log(item)
  }
  return (
    <div>
      <Menu
        style={{ height: '60px', paddingLeft: '50px', lineHeight: '60px' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode='horizontal'
        theme='light'
        items={NavBarList}
        onClick={onClick} // 点击子菜单触发
      />
    </div>
  )
}

export default NavBar
