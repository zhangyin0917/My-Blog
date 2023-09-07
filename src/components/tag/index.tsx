import React from 'react'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import { Tag } from 'antd'

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props

  const getRandomColor = () => {
    const colors = ['gold', 'lime', 'green', 'cyan', 'blue', 'purple', 'pink'] // 可以添加更多颜色
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
  }

  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }
  const backgroundColor = getRandomColor() // 获取随机颜色
  return (
    <Tag
      color={backgroundColor}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}>
      {label}
    </Tag>
  )
}

export default tagRender
