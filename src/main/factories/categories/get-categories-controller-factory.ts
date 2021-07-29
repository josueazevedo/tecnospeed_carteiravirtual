import { DbGetCategories } from '../../../data/usecases/categories/db-get-categories'
import { CategoryRelacionalRepository } from '../../../infra/db/relationaldb/category-repository/category'
import { GetCategoryController } from '../../../presentation/controllers/categories/get-category'

export const makeGetCategoryController = (): GetCategoryController => {
  const getRepository = new CategoryRelacionalRepository()
  const getCategoriesDB = new DbGetCategories(getRepository)
  const getCategoryController = new GetCategoryController(getCategoriesDB)
  return getCategoryController
}
