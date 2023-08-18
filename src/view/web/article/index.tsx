import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../../untils/axios'
const WebArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  // console.log(decodeURIComponent(data))
  const [articledetail, setArticleDetail] = useState<any>()
  const getArticledetails = async (id: string) => {
    try {
      const Results = await instance.get(`/api/getBlogById?id=${id}`)

      if (Results.data.status === 0) {
        setArticleDetail(Results.data.data)
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (id) {
      getArticledetails(id)
    }
  }, [id])
  console.log(articledetail)

  return (
    <div>
      <div>
        {articledetail && (
          <>
            <h1>{articledetail.blog_title}</h1>
            <div dangerouslySetInnerHTML={{ __html: articledetail.blog_content }}></div>
            <span>{articledetail.typeInfo.typeName}</span>
            <span>{articledetail.userInfo.username}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default WebArticle
