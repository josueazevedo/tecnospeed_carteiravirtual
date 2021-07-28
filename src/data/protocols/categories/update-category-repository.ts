import { CategoryModel } from '../../../domain/models/category'
import { UpdateCategoryModel } from '../../../domain/usecases/categories/update-category'

export interface UpdateCategoryRepository {
  update: (category: UpdateCategoryModel) => Promise<CategoryModel>
}
