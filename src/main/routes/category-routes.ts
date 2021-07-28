import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeCreateCategoryController } from '../factories/categories/create-category-controller-factory'
import { makeUpadateCategoryController } from '../factories/categories/update-category-controller-factory'

export default (router: Router): void => {
  router.post('/category', adaptRoute(makeCreateCategoryController()))
  router.put('/category', adaptRoute(makeUpadateCategoryController()))
}
