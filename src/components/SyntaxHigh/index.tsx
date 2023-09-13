import React, { Children } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter' // 引入代码高亮插件
import { duotoneDark } from 'react-syntax-highlighter/dist/esm/styles/prism' // 引入样式文件
interface SyntaxHighProps {
  children?: string
}

const props = {
  language: 'javascript',

  showLineNumbers: true,
  style: duotoneDark,
}

const SyntaxHighCom: React.FC<SyntaxHighProps> = ({ children }) => {
  return <SyntaxHighlighter {...props}>{children as string}</SyntaxHighlighter>
}

export default SyntaxHighCom
