import { AddCategoryRepository } from '../../../../data/protocols/add-category-repository'
import { CategoryModel } from '../../../../domain/models/category'
import { AddCategoryModel } from '../../../../domain/usecases/add-category'
import { Category } from '../models/category'

export class CategoryRelacionalRepository implements AddCategoryRepository {
  async add (category: AddCategoryModel): Promise<CategoryModel> {
    const newCategory = await Category.create(category, { raw: true })
    return newCategory
  }
}
