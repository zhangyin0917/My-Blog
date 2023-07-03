import React from 'react'

interface TagComponentProps {
  name?: string
}
const WebTag: React.FC<TagComponentProps> = ({ name = '关于我自己' }) => {
  return <div>{name}</div>
}

export default WebTag
