import React, { useEffect, useState } from 'react'
import ReactMarkdownEditorLite from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css' // 引入编辑器样式
import MarkdownIt from 'markdown-it' // 引入 markdown-it
import instance from '../../untils/axios'

const MarkdownEditor: React.FC = () => {
  const [content, setContent] = useState('')
  const handleImageUpload = async (file: File) => {
    // 检查图片的大小
    const maxSize = 1024 * 1024 // 1MB
    if (file.size > maxSize) {
      alert('图片大小超过限制')
    }
    // 创建FormData表单
    const formData = new FormData()
    formData.append('image', file)
    // console.log(content)

    // try {
    //   const result = await instance.post('api/rich_editor_upload', formData)
    //   const imgUrl: string = result.data.data.url
    //   console.log(imgUrl)

    //   // 将图片插入到编辑器中
    //   const newContent: string = `${content}![Alt Text](${imgUrl})\n`
    //   setContent(newContent)
    // } catch (error) {
    //   console.log(error)
    // }
  }
  useEffect(() => {
    const imgUrl =
      'https://th.bing.com/th/id/R.466bb61cd7cf4e8b7d9cdf645add1d6e?rik=YRZKRLNWLutoZA&riu=http%3a%2f%2f222.186.12.239%3a10010%2fwmxs_161205%2f002.jpg&ehk=WEy01YhyfNzzQNe1oIqxwgbTnzY7dMfmZZHkqpZB5WI%3d&risl=&pid=ImgRaw&r=0'
    const newContent: string = `${content}![Alt Text](${imgUrl})\n`
    setContent(newContent)
  }, [])

  // 定义 renderHTML 函数，将 Markdown 转换为 HTML
  const mdParser = new MarkdownIt()
  const renderHTML = (text: string) => mdParser.render(text)

  // 处理编辑器内容变化
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
