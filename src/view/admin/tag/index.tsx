import React, { useEffect, useState } from 'react'
import { Input, Button, Col, Row, Space, Table, message } from 'antd'

import instance from '../../../untils/axios'
interface TagProp {
  name?: string
}

interface DateItem {
  tag_id: number
  tag_name: string
}

const TagManger: React.FC<TagProp> = ({ name }) => {
  const [data, setData] = useState<DateItem[]>()
  const [inputValue, setInputValue] = useState('')
  const columns = [
    {
      title: 'TagId',
      dataIndex: 'tag_id',
      key: 'tag_id',
    },
    {
      title: 'TagName',
      dataIndex: 'tag_name',
      key: 'tag_name',
    },
  ]

  const getBlogTag = async () => {
    const result = await instance.get('/api/getTag')
    console.log(result)
    if (result.data.status === 0) {
      setData(result.data.data)
    }
  }

  const addBlogTag = async () => {
    if (inputValue) {
      const getAddTag = await instance.post('/api/addBlogTag', {
        tag_name: inputValue,
      })
      if (getAddTag.data.status === 0) {
        getBlogTag()
        setInputValue('')
        message.success(getAddTag.data.message)
      }
    }
    message.error('请输入添加的内容')
  }

  useEffect(() => {
    getBlogTag()
  }, [])
  return (
    <>
      <Space direction='vertical' size='large' style={{ display: 'flex' }}>
        <Row>
          <Col span={14}>
            <Input
              allowClear
              status={inputValue ? 'warning' : 'error'}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
            />
          </Col>
          <Col span={2}></Col>
          <Col span={8}>
            <Button onClick={addBlogTag} style={{ marginRight: '10px' }} type='primary'>
              新增
            </Button>
          </Col>
        </Row>
        <Table
          dataSource={data ? data.map(item => ({ ...item, key: item.tag_id.toString() })) : []}
          columns={columns}
        />
        ;
      </Space>
    </>
  )
}

export default TagManger
