import { CategoryModel } from '../../../domain/models/category'
import { AddCategoryModel } from '../../../domain/usecases/categories/add-category'

export interface AddCategoryRepository {
  add: (transaction: AddCategoryModel) => Promise<CategoryModel>
}
