import React, { useState } from 'react'
import { Layout } from 'antd'

import CalendarSidebar from '../../../components/sidebarProps'
const { Sider } = Layout

const RightSider: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date)
    // 在这里可以处理选中日期后的逻辑，比如加载相应的博客内容等
  }
  return (
    <Sider
      className='Sider_box'
      width={330}
      style={{
        background: '#ede4e4',
        overflow: 'hidden',
      }}>
      {/* <CalendarSidebar selectedDate={selectedDate} onSelectDate={handleSelectDate} /> */}
    </Sider>
  )
}

export default RightSider
