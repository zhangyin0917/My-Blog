import React from 'react'
import { Dropdown, Button, Menu, type MenuProps, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import AppAvatar from '../../../../components/Avayar'
import '../../../../style/LoginInfo_style.less'
import useBus from '../../../../hooks/useBus'
import { loginout } from '../../../../redux/user/actions'
import { type AppDispatch } from '../../../../redux/type'
import { ImageTransform, get } from '../../../../untils/config'
import { useNavigate } from 'react-router-dom'
import { type RootState } from '../../../../redux/rootReducer'

const UserInfoPage: React.FC = () => {
  const bus = useBus()
  const userInfo = useSelector((state: RootState) => state.user)
  const { role, avatar, username } = userInfo
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const getPopupContainer = (triggerNode: { parentNode: any }) => {
    return triggerNode.parentNode
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: role === 'admin' && (
        <Menu.Item>
          <span> 导入文章</span>
        </Menu.Item>
      ),
    },
    {
      key: '2',
      label: role === 'admin' && (
        <Menu.Item>
          <span onClick={() => navigate('/admin')}> 后台管理</span>
        </Menu.Item>
      ),
    },
    {
      key: '3',
      label: (
        <Menu.Item>
          <span onClick={async e => await dispatch(loginout())}>退出登录</span>
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
            <AppAvatar icon={ImageTransform(avatar)} />
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
