// import Layout from '../layout/admin'
import React from 'react'
import lazy from '../../components/lazy'
import AdminLayout from '../../layout/admin'
import PrviteRoutes from '../../components/RolePermissions'

const Home = lazy(async () => await import('../../view/admin/home'))
const Edit = lazy(async () => await import('../../view/admin/article/add'))
const Add = lazy(async () => await import('../../view/admin/article/add'))
const Manager = lazy(async () => await import('../../view/admin/article/manager'))
const User = lazy(async () => await import('../../view/admin/user'))

export default {
  path: '/admin',
  element: (
    <PrviteRoutes roles={['admin']}>
      <AdminLayout />
    </PrviteRoutes>
  ),
  children: [
    {
      path: '',
      element: (
        <PrviteRoutes roles={['admin']}>
          <Home />
        </PrviteRoutes>
      ),
    },
    {
      path: 'article/edit/:id',
      element: (
        <PrviteRoutes roles={['admin']}>
          <Edit />
        </PrviteRoutes>
      ),
    },
    {
      path: 'article/add',
      element: (
        <PrviteRoutes roles={['admin']}>
          <Add />
        </PrviteRoutes>
      ),
    },
    {
      path: 'article/manager',
      element: (
        <PrviteRoutes roles={['admin']}>
          <Manager />
        </PrviteRoutes>
      ),
    },
    {
      path: 'user',
      element: (
        <PrviteRoutes roles={['admin']}>
          <User />
        </PrviteRoutes>
      ),
    },
  ],
}
