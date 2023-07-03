import React from 'react'

interface ArticleComponentProps {
  name?: string
}
const WebArticle: React.FC<ArticleComponentProps> = ({ name = '网页文章' }) => {
  return <div>{name}</div>
}

export default WebArticle
