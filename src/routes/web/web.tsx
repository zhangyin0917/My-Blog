import React from 'react'
import lazy from '../../components/lazy'
import WebLayout from '../../layout/web'
import PrviteRoutes from '../../components/RolePermissions'
const About = lazy(async () => await import('../../view/web/about'))
const Archives = lazy(async () => await import('../../view/web/archives'))
const Categories = lazy(async () => await import('../../view/web/categories'))
const Tag = lazy(async () => await import('../../view/web/tag'))
// const About = lazy(async () => await import('../../view/web/about'))
// const About = lazy(async () => await import('../../view/web/about'))
// const About = lazy(async () => await import('../../view/web/about'))

export default {
  path: '/',
  name: 'home',
  element: (
    <PrviteRoutes roles={['user', 'admin']}>
      <WebLayout />
    </PrviteRoutes>
  ),

  children: [
    {
      path: 'user',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <About />
        </PrviteRoutes>
      ),
    },
    {
      path: 'article/:id',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <Archives />
        </PrviteRoutes>
      ),
    },
    {
      path: 'article',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <Archives />
        </PrviteRoutes>
      ),
    },
    {
      path: 'categories',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <Categories />
        </PrviteRoutes>
      ),
    },
    {
      path: 'categories:name',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <Tag />
        </PrviteRoutes>
      ),
    },
    {
      path: 'tags/:name',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <Tag />
        </PrviteRoutes>
      ),
    },
    {
      path: 'about',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <About />
        </PrviteRoutes>
      ),
    },

    // { path: '/github', component: GITHUB.enable && lazy(() => import('@/components/GithubLogining')) },
    // { path: '/about', component: lazy(() => import('@/views/web/about')) },
    // { path: '*', component: lazy(() => import('@/components/404')) },
  ],
}
