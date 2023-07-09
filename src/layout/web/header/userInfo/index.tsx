import React from 'react'
import { Dropdown, Button, Menu, type MenuProps } from 'antd'
import AppAvatar from '../../../../components/Avayar'
import '../../../../style/LoginInfo_style.less'
import useBus from '../../../../hooks/useBus'
interface UserInfo {
  name?: string
}

const UserInfoPage: React.FC<UserInfo> = ({ name = 'userInfo' }) => {
  const role: number = 1
  const username: string = ''
  const bus = useBus()

  const getPopupContainer = (triggerNode: { parentNode: any }) => {
    return triggerNode.parentNode
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: role === 1 && (
        <Menu.Item>
          <span> 导入文章</span>
        </Menu.Item>
      ),
    },
    {
      key: '2',
      label: role === 1 && (
        <Menu.Item>
          <span> 后台管理</span>
        </Menu.Item>
      ),
    },
    {
      key: '3',
      label: (
        <Menu.Item>
          <span> 退出登录</span>
        </Menu.Item>
      ),
    },
  ]

  return (
    <div className='LoginInfo_style'>
      {username ? (
        <Dropdown
          autoAdjustOverflow
          getPopupContainer={getPopupContainer}
          placement='bottom'
          menu={{ items }}
          trigger={['click', 'hover']}>
          <div>
            <AppAvatar />
          </div>
        </Dropdown>
      ) : (
        <>
          <Button type='primary' size='small' ghost onClick={e => bus?.emit('openSignModal', 'login')}>
            登录
          </Button>
          <Button size='small' danger onClick={e => bus?.emit('openSignModal', 'register')}>
            注册
          </Button>
        </>
      )}
    </div>
  )
}

export default UserInfoPage
