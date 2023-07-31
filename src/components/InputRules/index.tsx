import React, { useState } from 'react'
import { Form } from 'antd'
export const InputRules = () => {
  const [form] = Form.useForm()
  const [username, setUserName] = useState('')
  const [usernameHelp, setUserNameHelp] = useState('')
  const [passwordHelp, SetPasswordHelp] = useState('')
  const [password, SetPassword] = useState('')
  const [email, SetEmail] = useState('')
  const [emailHelp, SetEmailHelp] = useState('')
  const [confirPsw, SetConfirPsw] = useState('')
  const [confirPswHelp, SetConfirPswHelp] = useState('')
  const [pswMessage, SetPasswordMeSSage] = useState('')

  const [isReload, SetisReload] = useState(false)

  const reloade = (PswValue: boolean) => {
    SetisReload(PswValue)
    if (isReload) {
      setUserName('')
      setUserNameHelp('')
      SetPassword('')
      SetPasswordHelp('')
      SetConfirPswHelp('')
      SetPasswordMeSSage('')
      SetEmail('')
      SetEmailHelp('')
      SetConfirPsw('')
      SetConfirPswHelp('')
    }
  }

  const eventB = (e: any) => {
    const { name, value } = e.target
    switch (name) {
      case 'username':
        if (!value) {
          setUserName('error')
          setUserNameHelp('未输入')
        } else if (value.length > 10) {
          setUserName('error')
          setUserNameHelp('用户名不超过10位')
        } else {
          setUserName('success')
          setUserNameHelp('输入中...')
        }
        break
      case 'password':
        if (!value) {
          SetPassword('error')
          SetPasswordHelp('未输入')
        } else {
          SetPassword('success')
          SetPasswordMeSSage(value)
          SetPasswordHelp('输入中...')
        }
        break
      case 'email':
        if (!value) {
          SetEmail('error')
          SetEmailHelp('未输入')
        } else {
          SetEmail('success')
          SetEmailHelp('输入中...')
        }
        break
      case 'confirPsw':
        if (value === pswMessage && pswMessage !== '') {
          SetConfirPsw('success')
          SetConfirPswHelp('校对成功')
        } else if (pswMessage === '') {
          SetConfirPsw('error')
          SetConfirPswHelp('未校验')
        } else {
          SetConfirPsw('error')
          SetConfirPswHelp('两次密码不一致')
        }
        break
    }
  }

  return {
    reloade,
    eventB,
    username,
    password,
    email,
    confirPsw,
    usernameHelp,
    passwordHelp,
    emailHelp,
    confirPswHelp,
  }
}
