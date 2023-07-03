import React from 'react'

interface EditComponentProps {
  name?: string
}
const AdminEdit: React.FC<EditComponentProps> = ({ name = '文章' }) => {
  return <div>{name}</div>
}

export default AdminEdit
