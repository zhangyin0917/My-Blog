import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Button, message } from 'antd'
import GithubSign from '../../../config'
import { GithubOutlined } from '@ant-design/icons'
import { useListener } from '../../../hooks/useBus'
import { useAxios, type UseAxiosOptions } from '../../../hooks/useAxios'
import { LoginIn, register } from '../../../redux/user/actions'
import { useDispatch } from 'react-redux'
import { type AppDispatch } from '../../../redux/type'
import { InputRules } from '../../InputRules'

const { enable } = GithubSign.GithubSign
function FormItem(props: any) {
  const { children, ...rest } = props
  return <Form.Item {...rest}>{children}</Form.Item>
}

const SignModel: React.FC = props => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [type, setType] = useState('login')
  const [form] = Form.useForm()
  const [count, setCount] = useState(0)
  const [targetValue, SetargetValue] = useState('success')
  const dispatch = useDispatch<AppDispatch>()
  const {
    reloade,
    eventB,
    username,
    usernameHelp,
    password,
    passwordHelp,
    email,
    emailHelp,
    confirPsw,
    confirPswHelp,
  } = InputRules()
  const { response, isLoding, error } = useAxios(
    {
      url: '/api/captcha',
      method: 'GET',
    },
    count,
    isModalOpen
  )
  const Captalrs = response?.data
  useListener('openSignModal', type => {
    form.resetFields(['username', 'password', 'Email', 'confirPsw', 'captcha'])
    setType(type)
    setIsModalOpen(true)
  })
  useEffect(() => {
    // 打开弹窗清空输入框
    // form
    //   .validateFields(['username', 'password', 'captcha', 'Email'])
    //   .then(values => {})
    //   .catch(errorInfo => {})
    // 打开弹窗清空验证判断
    reloade(true)
  }, [type, form, isModalOpen])

  // 监听表格校验是否是正确状态
  const isFormValid = () => {
    if (type !== 'login') {
      const vars = [username, password, email, confirPsw]
      const allEqual = vars.every(value => value === targetValue)
      if (allEqual) {
        return true
      }
      return false
    }
    const vars = [username, password]
    const allEqual = vars.every(value => value === targetValue)
    if (allEqual) {
      return true
    }
    return false
  }

  const handleSubmit = async () => {
    if (type === 'login' && isFormValid()) {
      const values = await form.validateFields()
      dispatch(LoginIn(values)).then(res => {
        setIsModalOpen(false)
      })
      return
    }
    if (type !== 'login' && isFormValid()) {
      const values = await form.validateFields()
      const { confirPsw, ...newValues } = values
      dispatch(register(newValues))

      return
    }
    message.error('未输入或表单输入有误')
  }

  const githubLogin = () => {
    console.log(456)
  }
  return (
    <Modal title={type} keyboard open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
      <Form form={form} layout='horizontal'>
        {type === 'login' ? (
          <>
            <FormItem label='用户名' name='username' hasFeedback validateStatus={username} help={usernameHelp}>
              <Input placeholder='请输入用户名' name='username' onChange={eventB} />
            </FormItem>
            <FormItem
              style={{ paddingLeft: '15px' }}
              label='密码'
              name='password'
              hasFeedback
              validateStatus={password}
              help={passwordHelp}>
              <Input.Password placeholder='请输入密码' name='password' onChange={eventB} visibilityToggle />
            </FormItem>
            <FormItem label='验证码' name='captcha' rules={[{ required: true, message: '验证码是必填项' }]}>
              <div style={{ width: '300px', height: '34px' }}>
                <Input placeholder='请输入验证码' style={{ width: '180px' }} />
                {Captalrs && (
                  <span
                    onClick={() => setCount(count => count + 1)}
                    dangerouslySetInnerHTML={{ __html: Captalrs }}
                    style={{ float: 'right' }}
                  />
                )}
              </div>
            </FormItem>
          </>
        ) : (
          <>
            <FormItem label='用户名' name='username' hasFeedback validateStatus={username} help={usernameHelp}>
              <Input placeholder='请输入用户名' name='username' onChange={eventB} />
            </FormItem>
            <FormItem label='密码' name='password' hasFeedback validateStatus={password} help={passwordHelp}>
              <Input.Password placeholder='请输入密码' name='password' visibilityToggle onChange={eventB} />
            </FormItem>
            <FormItem label='确认密码' name='confirPsw' hasFeedback validateStatus={confirPsw} help={confirPswHelp}>
              <Input.Password placeholder='请再次输入密码' name='confirPsw' visibilityToggle onChange={eventB} />
            </FormItem>

            <FormItem label='邮箱' name='email' hasFeedback validateStatus={email} help={emailHelp}>
              <Input placeholder='请输入邮箱' name='email' onChange={eventB} />
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
