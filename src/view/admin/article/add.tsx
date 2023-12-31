import React, { useEffect, useState, useRef } from 'react'
import { Form, Input, Select, Button, Row, Col, message, Space } from 'antd'
import { FormItem } from '../../../components/Public/SignModel'
import instance from '../../../untils/axios'
import tagRender from '../../../components/tag'
import MarkdownEditor from '../../../components/markdownEditor'
import useBus from '../../../hooks/useBus'
import ImageProview from './Image'
import CoverImgUpload from '../../../components/coverImgUpload'

const AdminEdit: React.FC = () => {
  const [options, SetOptions] = useState([])
  const [tagOptions, setTagOptions] = useState<any>([])
  const [categrateValue, setCategrateValue] = useState('')
  const [coverImg, setCoverImg] = useState('')
  const [markDownValue, setMarkDownValue] = useState<string>()

  const [form] = Form.useForm()
  const markdownRef = useRef(null)
  const bus = useBus()
  const getBlogType = async () => {
    try {
      const result = await instance.post('/api/getBlogType')
      if (result.data.status === 0) {
        const filteredOptions = result.data.data.filter((type: any) => type.typeState === 0)
        const resultDate = filteredOptions.map((item: any) => ({ label: item.typeName, value: item.type_id }))
        SetOptions(resultDate)
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  const getMarkdownValue = (value: string) => {
    setMarkDownValue(value)
  }
  const getTag = async () => {
    try {
      const tagResult = await instance.get('/api/getTag')
      if (tagResult.data.status === 0) {
        const mappedOptions = tagResult.data.data.map((item: any) => ({
          value: item.tag_id,
          label: item.tag_name,
        }))
        setTagOptions(mappedOptions)
      }
    } catch (error: any) {
      console.log(error)
    }
  }
  const handleSetCoverImg = (imgUrl: string) => {
    setCoverImg(imgUrl) // 更新 coverImg 状态
  }

  const getNowTime = () => {
    const date = new Date()
    const month = date.getMonth() + 1
    const newMonth = month < 10 ? '0' + month : month
    const day = date.getDate()
    const newDay = day < 10 ? '0' + day : day
    const hours = date.getHours()
    const newHours = hours < 10 ? '0' + hours : hours
    const minutes = date.getMinutes()
    const newMinutes = minutes < 10 ? '0' + minutes : minutes
    const seconds = date.getSeconds()
    const newSeconds = seconds < 10 ? '0' + seconds : seconds
    const time = `${date.getFullYear()}-${newMonth}-${newDay} ${newHours}:${newMinutes}:${newSeconds}`
    return time
  }

  const handleAddBlog = async () => {
    const { title, tags } = await form.validateFields()
    if (markDownValue && coverImg && tags && title && categrateValue) {
      const blogInfo = {
        title,
        markDownValue,
        coverImg,
        categrateValue,
        tags,
        creteTime: getNowTime(),
      }
      try {
        const addBlogResult = await instance.post('/api/addBlog', blogInfo)
        console.log(addBlogResult)
        if (addBlogResult.data.status === 0) {
          message.success(addBlogResult.data.message)
          setCategrateValue('')
          setCoverImg('')
          setMarkDownValue('')
          form.resetFields(['title', 'tags']) // 清空 title 和 tags 字段
        }
      } catch (err) {}
    } else {
      message.error('请填写所有必要的信息')
    }
  }

  useEffect(() => {
    getBlogType()
    getTag()
  }, [])
  return (
    <Form form={form}>
      <FormItem label='标题' name='title'>
        <Input />
      </FormItem>
      <FormItem label='分类' name='categrate'>
        <Row gutter={25}>
          <Col span={15}>
            <Select style={{ width: 120 }} onChange={label => setCategrateValue(label)} options={options} />
          </Col>
          <Col span={3}>
            <ImageProview image={coverImg} />
          </Col>
          <Col span={6}>
            <Space wrap>
              <CoverImgUpload />
              <Button style={{ marginRight: '15px' }} onClick={e => bus?.emit('openCoverImgeModel', handleSetCoverImg)}>
                选择封面
              </Button>
              <Button type='primary' onClick={handleAddBlog}>
                发布
              </Button>
            </Space>
          </Col>
        </Row>
      </FormItem>
      <FormItem label='标签' name='tags'>
        <Select mode='multiple' tagRender={tagRender} style={{ width: '100%' }} options={tagOptions} />
      </FormItem>
      <FormItem>
        <MarkdownEditor markdown={getMarkdownValue} />
      </FormItem>
    </Form>
  )
}

export default AdminEdit
