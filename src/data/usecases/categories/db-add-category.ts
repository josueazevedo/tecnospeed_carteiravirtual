import { CategoryModel } from '../../../domain/models/category'
import { AddCategory, AddCategoryModel } from '../../../domain/usecases/categories/add-category'
import { AddCategoryRepository } from '../../protocols/categories/add-category-repository'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  async add (category: AddCategoryModel): Promise<CategoryModel> {
    const newCategory = await this.addCategoryRepository.add(category)
    return newCategory
  }
}
