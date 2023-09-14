import React from 'react'
import { Layout, Avatar, Space, Tag, Card, Divider } from 'antd'
import '../../../style/Sider_box.less'
import { AntDesignOutlined } from '@ant-design/icons'
import Avatars from '../../../config'
const { Src } = Avatars.Avatars
const { Sider } = Layout
interface SiderProps {
  name?: string
}

const itemProps = ['HTML5', 'CSS3', 'JavaScript', 'Vue系列', 'React系列', 'Node']

const SiderComonent: React.FC<SiderProps> = ({ name = '侧边栏' }) => {
  const addTageStay = (item: string[]) => {
    return item.map((item: string, key: any) => {
      return (
        <li
          key={key}
          style={{
            border: '1px solid #eaeaef',
            backgroundColor: '#fff',
            color: '#5094d5',
            borderRadius: '2px',
            fontSize: '12px',
            padding: '3px 6px',
            height: '25px',
            listStyle: 'none',
          }}>
          {item}
        </li>
      )
    })
  }

  return (
    <Sider
      className='Sider_box'
      width={330}
      style={{
        background: '#ede4e4',
        overflow: 'hidden',
      }}>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          height: '255px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar src={Src} size={200} icon={<AntDesignOutlined />} />
      </div>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#999aaa',
          // alignItems: 'center',
        }}>
        张殷&nbsp;|&nbsp;155****6275
        <br />
        前端开发&nbsp;|&nbsp;1907832587@qq.com
        <br />
        河南科技学院&nbsp;|&nbsp;2023届
      </div>
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
        <Divider style={{ padding: '0', margin: '0' }}>技术栈</Divider>
      </div>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: '#999aaa',
        }}>
        {addTageStay(itemProps)}
      </div>
    </Sider>
  )
}

export default SiderComonent
