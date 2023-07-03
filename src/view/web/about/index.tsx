import React from 'react'

interface AboutComponentProps {
  name?: string
}
const WebAbout: React.FC<AboutComponentProps> = ({ name = '关于我自己' }) => {
  return <div>{name}</div>
}

export default WebAbout
