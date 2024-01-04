import React, { useEffect, useState } from 'react'
import { Input, Button, Col, Row, Space, message } from 'antd'
import TableData from '../../../components/table'
import instance from '../../../untils/axios'

interface TagProp {
  name?: string
}
interface DataItem {
  type_id: number
  typeName: string
  typeState?: number
}

const Categrate: React.FC<TagProp> = ({ name }) => {
  const [data, setData] = useState<DataItem[]>()
  const [inputValue, setInputValue] = useState('')
  const getBlogType = async () => {
    const result = await instance.post('/api/getBlogType')
    if (result.data.status === 0) {
      const newResult = result.data.data.filter((item: DataItem) => item.typeState === 0)
      setData(newResult)
    }
  }
  const handleAddBlogType = async () => {
    if (inputValue) {
      const getaddBlogType = await instance.post('/api/addBlogType', {
        typename: inputValue,
      })
      if (getaddBlogType.data.status === 0) {
        getBlogType()
        setInputValue('')
        message.success(getaddBlogType.data.message)
      }
      return
    }
    message.error('请输入添加的内容')
  }

  useEffect(() => {
    getBlogType()
  }, [])
  return (
    <>
      <Space direction='vertical' size='large' style={{ display: 'flex' }}>
        <Row>
          <Col span={14}>
            <Input
              value={inputValue}
              allowClear
              status={inputValue ? 'warning' : 'error'}
              onChange={e => setInputValue(e.target.value)}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Button onClick={handleAddBlogType} style={{ marginRight: '10px' }} type='primary'>
              新增
            </Button>
          </Col>
        </Row>
        <TableData data={data as DataItem[]} onDelete={getBlogType} />
      </Space>
    </>
  )
}

export default Categrate
