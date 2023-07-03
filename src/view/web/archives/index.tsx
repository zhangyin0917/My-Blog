import React from 'react'

interface ArchivesComponentProps {
  name?: string
}
const WebArchives: React.FC<ArchivesComponentProps> = ({ name = '存档' }) => {
  return <div>{name}</div>
}

export default WebArchives
