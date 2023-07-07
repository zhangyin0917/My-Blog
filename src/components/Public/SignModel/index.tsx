import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button } from 'antd'
import GithubSign from '../../../config'
import { GithubOutlined } from '@ant-design/icons'

const { enable } = GithubSign.GithubSign

function FormItem(props: any) {
  const { children, ...rest } = props
  return <Form.Item {...rest}>{children}</Form.Item>
}

const SignModel: React.FC = props => {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [type, setType] = useState('login')
  const [checkNick, setCheckNick] = useState(false)
  const [form] = Form.useForm()
  useEffect(() => {
    form
      .validateFields(['username', 'password', 'SurePassword', 'Email'])
      .then(values => {
        console.log('Success:', values)
      })
      .catch(errorInfo => {
        console.log('Failed:', errorInfo)
      })
  }, [checkNick, form])

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = () => {
    console.log(123)
  }

  const githubLogin = () => {
    console.log(456)
  }
  return (
    <Modal title={type} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} layout='horizontal'>
        {type === 'login' ? (
          <>
            <FormItem label='用户名' name='username' rules={[{ required: true, message: 'Username is required' }]}>
              <Input placeholder='请输入用户名' />
            </FormItem>
            <FormItem label='密码' name='password' rules={[{ required: true, messsage: 'Password is required' }]}>
              <Input.Password placeholder='请输入密码' visibilityToggle />
            </FormItem>
          </>
        ) : (
          <>
            <FormItem label='用户名' name='username' rules={[{ required: true, message: 'Username is required' }]}>
              <Input placeholder='请输入用户名' />
            </FormItem>
            <FormItem label='密码' name='password' rules={[{ required: true, message: 'Password is required' }]}>
              <Input.Password placeholder='请输入密码' visibilityToggle />
            </FormItem>
            <FormItem
              label='确认密码'
              name='SurePassword'
              rules={[{ required: true, message: 'Password is required' }]}>
              <Input.Password placeholder='请输入密码' visibilityToggle />
            </FormItem>
            <FormItem
              label='邮箱'
              name='Email'
              rules={[
                { type: 'email', message: 'The inpit is not valid E-mail!' },
                { required: true, message: 'Please input your E-mail' },
              ]}>
              <Input placeholder='请输入邮箱' />
            </FormItem>
          </>
        )}
      </Form>
      <Button type='primary' block onClick={handleSubmit}>
        {type}
      </Button>

      {enable && (
        <Button block icon={<GithubOutlined />} style={{ marginTop: 10 }} onClick={githubLogin}>
          github
        </Button>
      )}
    </Modal>
  )
}

export default SignModel
