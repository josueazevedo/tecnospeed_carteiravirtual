import { CategoryRelacionalRepository } from '../../infra/db/relationaldb/category-repository/category'
import { CreateCategoryController } from '../../presentation/controllers/create-category'
import { RequiredFieldValidation } from '../../presentation/validation/validators/required-field-validation'

export const makeCreateCategoryController = (): CreateCategoryController => {
  const validation = new RequiredFieldValidation('name')
  const addCategory = new CategoryRelacionalRepository()
  const createCategoryController = new CreateCategoryController(validation, addCategory)
  return createCategoryController
}
