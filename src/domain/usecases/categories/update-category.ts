import { CategoryModel } from '../../models/category'

export interface UpdateCategoryModel {
  id: number
  name: string
}

export interface UpdateCategory {
  update: (transaction: UpdateCategoryModel) => Promise<CategoryModel>
}
