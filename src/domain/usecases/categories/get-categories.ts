import { CategoryModel } from '../../models/category'

export interface GetCategories {
  getCategories: () => Promise<CategoryModel[]>
}
