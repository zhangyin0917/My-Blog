import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../../../untils/axios'
import '../../../style/container.css'
import '../../../style/articleDetail.less'
import MarkdownIt from 'markdown-it'
import ReactHtmlParser from 'react-html-parser'
import ReactDOMServer from 'react-dom/server'
import SyntaxHighCom from '../../../components/SyntaxHigh'
const WebArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const md = new MarkdownIt() // 创建MarkdownIt实例
  const [codeHighigh, setCodeHighigh] = useState<string>()
  const [articledetail, setArticleDetail] = useState<any>()
  const getArticledetails = async (id: string) => {
    try {
      const Results = await instance.get(`/api/getBlogById?id=${id}`)
      if (Results.data.status === 0) {
        // 将博客文本内容转换为HTML元素
        console.log(Results.data)

        const blogContent = md.render(Results.data.data.blog_content)
        const final = blogContent.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, p2: string) => {
          // 使用ReactDOMServer.renderToString()将React组件转换为字符串
          const codeHighlighter = ReactDOMServer.renderToString(<SyntaxHighCom>{p2}</SyntaxHighCom>)
          return codeHighlighter
        })
        setCodeHighigh(final)
        setArticleDetail(Results.data.data)
      }
    } catch (err) {}
  }

  useEffect(() => {
    if (id) {
      getArticledetails(id)
    }
  }, [id])

  const addTagHtml = (item: string[]) => {
    return item.map((item: string, key: any) => {
      return (
        <a
          key={key}
          style={{
            border: '1px solid #eaeaef',
            backgroundColor: '#fff',
            color: '#5094d5',
            borderRadius: '2px',
            fontSize: '12px',
            padding: '3px 6px',
            height: '25px',
            marginLeft: '5px',
          }}>
          {item}
        </a>
      )
    })
  }

  return (
    <div className='art_deta'>
      {articledetail && (
        <>
          <h1>{articledetail.blog_title}</h1>
          <div
            style={{
              backgroundColor: '#ede4e4',
              height: '50px',
              padding: '6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div>
              <span>{articledetail.userInfo.username}</span>
              <span style={{ marginLeft: '15px', color: '#999aaa' }}>2023-09-09 08:34:52</span>
              <span style={{ marginLeft: '15px', color: '#999aaa' }}>发布</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1, listStyle: 'none', marginLeft: '15px' }}>
              <span style={{ color: '#999aaa' }}>分类专栏：</span>
              <a
                style={{
                  border: '1px solid #eaeaef',
                  backgroundColor: '#fff',
                  color: '#5094d5',
                  borderRadius: '2px',
                  fontSize: '12px',
                  padding: '3px 6px',
                  height: '25px',
                }}>
                {articledetail.typeInfo.typeName}
              </a>
              <span style={{ marginLeft: '5px', color: '#999aaa' }}>文章标题：</span>
              {addTagHtml(articledetail.BlogTags)}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: codeHighigh as string }}></div>
        </>
      )}
    </div>
  )
}

export default WebArticle
