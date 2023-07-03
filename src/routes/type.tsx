import { type ReactElement } from 'react'

interface IRoutes {
  path: string
  element: ReactElement
  children?: IRoutes[]
}

export default IRoutes
