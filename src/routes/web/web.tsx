import React from 'react'
import lazy from '../../components/lazy'
import WebLayout from '../../layout/web'
import PrviteRoutes from '../../components/RolePermissions'
const About = lazy(async () => await import('../../view/web/about'))
const Archives = lazy(async () => await import('../../view/web/archives'))
const Categories = lazy(async () => await import('../../view/web/categories'))
const Tag = lazy(async () => await import('../../view/web/tag'))
const Home = lazy(async () => await import('../../view/web/home'))
const Article = lazy(async () => await import('../../view/web/article'))
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
      path: '',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <Home />
        </PrviteRoutes>
      ),
    },
    {
      path: 'article/:id',
      element: (
        <PrviteRoutes roles={['user', 'admin']}>
          <Article />
        </PrviteRoutes>
      ),
    },
    {
      path: 'archives',
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
