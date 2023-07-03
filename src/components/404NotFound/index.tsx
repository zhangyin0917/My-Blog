import React from 'react'
import { Button } from 'antd'
import { HomeOutlined } from '@ant-design/icons'
import '../../style/NotFoundPage.less'

export default function NotFoundPage() {
  return (
    <div className='not-found-page'>
      <HomeOutlined className='home-icon' />
      <h1>404 - 资源未找到</h1>
      <Button type='primary' href='/'>
        返回首页
      </Button>
    </div>
  )
}
