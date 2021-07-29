import { CategoryModel } from '../../../domain/models/category'

export interface GetCategoryRepository {
  getCategories: () => Promise<CategoryModel[]>
}
