import { CategoryModel } from '../../models/category'

export interface UpdateCategoryModel {
  name: string
}

export interface UpdateCategory {
  update: (transaction: UpdateCategoryModel) => Promise<CategoryModel>
}
