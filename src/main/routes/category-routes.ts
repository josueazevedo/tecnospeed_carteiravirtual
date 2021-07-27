import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeCreateCategoryController } from '../factories/create-category-controller-factory'

export default (router: Router): void => {
  router.post('/category', adaptRoute(makeCreateCategoryController()))
}
