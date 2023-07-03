import React from 'react'

interface HomeComponentProps {
  name?: string
}
const AdminHome: React.FC<HomeComponentProps> = ({ name = '首页' }) => {
  return <div>{name}</div>
}

export default AdminHome
