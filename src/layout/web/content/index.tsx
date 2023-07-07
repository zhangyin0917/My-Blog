import React from 'react'
import { Layout } from 'antd'
import '../../../style/Content.less'
import { Outlet } from 'react-router-dom'
const { Content } = Layout
interface ContentProps {
  name?: string
}

const ContentPage: React.FC<ContentProps> = ({ name = '内容' }) => {
  return (
    <Content className='Content_page'>
      <Outlet />
    </Content>
  )
}

export default ContentPage
