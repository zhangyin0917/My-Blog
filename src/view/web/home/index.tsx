import React from 'react'

interface HomeComponentProps {
  name?: string
}
const WebHome: React.FC<HomeComponentProps> = ({ name = '网页首页' }) => {
  return <div>{name}</div>
}

export default WebHome
