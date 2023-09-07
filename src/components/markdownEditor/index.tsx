import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import ReactMarkdownEditorLite from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css' // 引入编辑器样式
import MarkdownIt from 'markdown-it' // 引入 markdown-it
import instance from '../../untils/axios'
import { message } from 'antd'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism'

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
  const renderHTML = (text: string) => {
    return mdParser.render(text)
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
