import { CategoryModel } from '../../domain/models/category'
import { AddCategoryModel } from '../../domain/usecases/add-category'

export interface AddCategoryRepository {
  add: (transaction: AddCategoryModel) => Promise<CategoryModel>
}
