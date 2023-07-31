import React from 'react'
import './style/App.less'

import { Routes, Route } from 'react-router-dom'
import type IRoutes from './routes/type'
import routes from './routes'
import PublicComponent from './components/Public'

function App() {
  const [data, setData] = React.useState({ field: '' })
  React.useEffect(() => {
    console.log('This will run after each render')
  }, [data])
  const renderRoutes = (route: IRoutes[]) => {
    return route.map((route, index) => {
      return (
        <Route key={index} path={route.path} element={route.element}>
          {route.children && renderRoutes(route.children)}
        </Route>
      )
    })
  }
  return (
    <>
      <Routes>
        <Route>{renderRoutes(routes)}</Route>
      </Routes>
      <PublicComponent />
    </>
  )
}

export default App
