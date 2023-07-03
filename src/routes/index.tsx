import adminRoutes from './admin/admin'
import webRoutes from './web/web'
import type IRoutes from './type'
import NotFoundPage from './404/index'

const routes: IRoutes[] = [adminRoutes, webRoutes, NotFoundPage]

export default routes
