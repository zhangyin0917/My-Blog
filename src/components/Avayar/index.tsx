import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
interface AvatarProps {
  name?: string
}

const AvatarComponent: React.FC<AvatarProps> = ({ name = '头像' }) => {
  return <Avatar size='large' icon={<UserOutlined />} />
}

export default AvatarComponent
