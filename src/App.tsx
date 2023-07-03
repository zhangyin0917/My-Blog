import React from 'react'
import './style/App.less'

import { Routes, Route } from 'react-router-dom'
import type IRoutes from './routes/type'
import routes from './routes'

function App() {
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
    <Routes>
      <Route>{renderRoutes(routes)}</Route>
    </Routes>
  )
}

export default App
