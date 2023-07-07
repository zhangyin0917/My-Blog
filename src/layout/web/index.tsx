import React, { type FC } from 'react'
import { Layout, Divider } from 'antd'
import Header from './header'
import SiderComonent from './Card'
import '../../style/Content.less'
import Content from './content'
interface WebLayoutProps {
  title?: string
}

const WebLayout: FC<WebLayoutProps> = ({ title = '网页前端' }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        <SiderComonent />
        <Divider type='vertical' />
        <Content />
      </Layout>
    </Layout>
  )
}

export default WebLayout
