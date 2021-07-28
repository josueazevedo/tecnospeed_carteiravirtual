import { CategoryRelacionalRepository } from '../../../infra/db/relationaldb/category-repository/category'
import { UpdateCategoryController } from '../../../presentation/controllers/categories/update-category'
import { RequiredFieldValidation } from '../../../presentation/validation/validators/required-field-validation'

export const makeUpadateCategoryController = (): UpdateCategoryController => {
  const validation = new RequiredFieldValidation('name')
  const updateCategory = new CategoryRelacionalRepository()
  const updateCategoryController = new UpdateCategoryController(validation, updateCategory)
  return updateCategoryController
}
