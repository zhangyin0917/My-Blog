import React from 'react'

interface ManagerComponentProps {
  name?: string
}
const AdminManager: React.FC<ManagerComponentProps> = ({ name = '文章管理' }) => {
  return <div>{name}</div>
}

export default AdminManager
