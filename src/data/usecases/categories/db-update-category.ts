import { CategoryModel } from '../../../domain/models/category'
import { UpdateCategory, UpdateCategoryModel } from '../../../domain/usecases/categories/update-category'
import { UpdateCategoryRepository } from '../../protocols/categories/update-category-repository'

export class DbUpadateCategory implements UpdateCategory {
  constructor (
    private readonly updadteCategoryRepository: UpdateCategoryRepository
  ) {}

  async update (category: UpdateCategoryModel): Promise<CategoryModel> {
    const newCategory = await this.updadteCategoryRepository.update(category)
    return newCategory
  }
}
