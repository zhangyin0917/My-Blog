import React, { useEffect, useState } from 'react'
import { Form, Input, Select, message, type SelectProps, Tag } from 'antd'
import { FormItem } from '../../../components/Public/SignModel'
import instance from '../../../untils/axios'
import tagRender from '../../../components/tag'
import MarkdownEditor from '../../../components/markdownEditor'

const AdminEdit: React.FC = () => {
  // const options: SelectProps['options'] = []
  const [options, SetOptions] = useState([])
  const tagOptions = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }]

  const handleProvinceChange = (value: string) => {
    console.log(value)
  }

  const getBlogType = async () => {
    try {
      const result = await instance.post('/api/getBlogType')
      console.log(result)
      if (result.data.status === 0) {
        const filteredOptions = result.data.data.filter((type: any) => type.typeState === 0)
        SetOptions(filteredOptions)
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBlogType()
  }, [])
  return (
    <Form>
      <FormItem label='标题'>
        <Input />
      </FormItem>
      <FormItem label='分类'>
        <Select
          defaultValue='请选择'
          style={{ width: 120 }}
          onChange={handleProvinceChange}
          options={options.map((item: any) => ({ label: item.typeName, value: item.type_id }))}
        />
      </FormItem>
      <FormItem label='标签'>
        <Select
          mode='multiple'
          tagRender={tagRender}
          defaultValue={['gold', 'cyan']}
          style={{ width: '100%' }}
          options={tagOptions}
        />
      </FormItem>
      <FormItem>
        <MarkdownEditor />
      </FormItem>
    </Form>
  )
}

export default AdminEdit
