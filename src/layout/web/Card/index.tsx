import React from 'react'
import { Layout } from 'antd'
import '../../../style/Sider_box.less'

const { Sider } = Layout
interface SiderProps {
  name?: string
}

const SiderComonent: React.FC<SiderProps> = ({ name = '侧边栏' }) => {
  return (
    <Sider
      className='Sider_box'
      width={330}
      style={{
        background: '#fff',
        overflow: 'hidden',
      }}>
      {name}
    </Sider>
  )
}

export default SiderComonent
