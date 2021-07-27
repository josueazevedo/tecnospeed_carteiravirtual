import { CategoryModel } from '../../models/category'

export interface AddCategoryModel {
  name: string
}

export interface AddCategory {
  add: (transaction: AddCategoryModel) => Promise<CategoryModel>
}
