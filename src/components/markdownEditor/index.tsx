import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import ReactMarkdownEditorLite from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css' // 引入编辑器样式
import MarkdownIt from 'markdown-it' // 引入 markdown-it
import instance from '../../untils/axios'
import { message } from 'antd'
import ReactDOMServer from 'react-dom/server'
import SyntaxHighCom from '../SyntaxHigh'
interface MarkdownProps {
  markdown: (value: string) => void
}

const MarkdownEditor: React.FC<MarkdownProps> = ({ markdown }) => {
  const [content, setContent] = useState('')
  const handleImageUpload = async (file: File) => {
    // eslint-disable-next-line no-async-promise-executor
    return await new Promise(async (resolve, reject) => {
      const maxSize = 1024 * 1024 // 1MB
      if (file.size > maxSize) {
        message.error('图片大小超过限制')
        return
      }
      // 创建FormData表单
      const formData = new FormData()
      formData.append('image', file)
      const result = await instance.post('api/rich_editor_upload', formData)
      if (result.data.errno === 0) {
        resolve(result.data.data.url)
      }
    })
  }
  useEffect(() => {
    if (content) {
      markdown(content)
    }
  }, [content])

  const mdParser = new MarkdownIt()
  // 把markdown文本转换为Html渲染在预览区
  const renderHTML = (text: string) => {
    const html = mdParser.render(text)

    // 更改预览区图片的大小
    const modifiedHtml = html.replace(
      /<img/g,
      '<img style="display: block; margin: 0 auto; max-width: 100%; max-height: 300px;"'
    )
    // 由于makdownit把markdown文本渲染为html元素的时候会把<>渲染为 lt； 防治html标签的渲染   处理html实体编码
    const unescapedHtml = modifiedHtml.replace(/lt;/g, '<').replace(/&gt;/g, '>')
    // 使用react-syntax-highlighter来高亮代码块
    const final = unescapedHtml.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/g, (match, p2: string) => {
      // 使用ReactDOMServer.renderToString()将React组件转换为字符串
      const codeHighlighter = ReactDOMServer.renderToString(<SyntaxHighCom>{p2}</SyntaxHighCom>)
      return codeHighlighter
    })
    return final
  }

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text)
  }
  return (
    <div>
      <ReactMarkdownEditorLite
        style={{ height: '450px' }}
        value={content}
        name='textrea'
        renderHTML={renderHTML} // 传递 renderHTML 函数
        onChange={handleEditorChange}
        onImageUpload={async (file: File) => await handleImageUpload(file)}
      />
    </div>
  )
}

export default MarkdownEditor
