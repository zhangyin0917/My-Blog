import React from 'react'

interface CategoriesComponentProps {
  name?: string
}
const WebCategories: React.FC<CategoriesComponentProps> = ({ name = '网页分类' }) => {
  return <div>{name}</div>
}

export default WebCategories
