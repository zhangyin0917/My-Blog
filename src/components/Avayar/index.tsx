import React from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
interface AvatarProps {
  icon?: string
}

const AvatarComponent: React.FC<AvatarProps> = ({ icon = '头像' }) => {
  return <Avatar size='large' src={icon} icon={<UserOutlined />} />
}

export default AvatarComponent
