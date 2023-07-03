import React from 'react'

interface UserComponentProps {
  name?: string
}
const AdminUser: React.FC<UserComponentProps> = ({ name = '用户' }) => {
  return <div>{name}</div>
}

export default AdminUser
