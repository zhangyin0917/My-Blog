import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../../untils/axios'
import '../../../style/container.css'
import '../../../style/articleDetail.less'
import MarkdownIt from 'markdown-it'
// import 'markdown-it/dist/markdown-it.css'
import MarkdownItHighlight from 'markdown-it-highlightjs'
import 'highlight.js/styles/github.css' // 导入代码高亮样式
const WebArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const md = new MarkdownIt() // 创建MarkdownIt实例
  md.use(MarkdownItHighlight) // 使用markdown-it-highlightjs插件

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

  return (
    <div className='art_deta'>
      {articledetail && (
        <>
          <h1>{articledetail.blog_title}</h1>
          <div dangerouslySetInnerHTML={{ __html: md.render(articledetail.blog_content) }}></div>
          <span>{articledetail.typeInfo.typeName}</span>
          <span>{articledetail.userInfo.username}</span>
        </>
      )}
    </div>
  )
}

export default WebArticle
