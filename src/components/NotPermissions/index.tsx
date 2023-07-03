import React from 'react'
import { Button, Result } from 'antd'
import { FrownOutlined } from '@ant-design/icons'
import '../../style/NoPermissionPage.less'
import { useNavigate } from 'react-router-dom'
interface NotPermissionPageProps {
  message?: string
}

const NotPromissionsPage: React.FC<NotPermissionPageProps> = ({ message = '你没有权限访问页面' }) => {
  const navigate = useNavigate()
  const handleGoHomeClick = () => {
    // 这里添加返回首页的逻辑
    navigate('/')
  }

  return (
    <Result
      className='no-permission-page__result'
      icon={<FrownOutlined />}
      title='无访问权限'
      subTitle={message}
      extra={
        <Button type='primary' onClick={handleGoHomeClick}>
          返回首页
        </Button>
      }
    />
  )
}
export default NotPromissionsPage
