import React from 'react'
import { Input } from 'antd'
import '../../../../style/search.less'
interface SearchProps {
  name?: string
}
const { Search } = Input
const onSearch = (value: string) => {
  return '123'
}

const SearchComponent: React.FC<SearchProps> = ({ name = 'search' }) => {
  return (
    <div style={{ width: '580px', display: 'flex', alignItems: 'center' }}>
      <Search placeholder='请输入内容' onSearch={onSearch} enterButton />
    </div>
  )
}

export default SearchComponent
