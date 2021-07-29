import { CategoryModel } from '../../../domain/models/category'
import { GetCategories } from '../../../domain/usecases/categories/get-categories'
import { GetCategoryRepository } from '../../protocols/categories/get-categories-repository'

export class DbGetCategories implements GetCategories {
  constructor (
    private readonly getCategoriesRepository: GetCategoryRepository
  ) {}

  async getCategories (): Promise<CategoryModel[]> {
    const categories = await this.getCategoriesRepository.getCategories()
    return categories
  }
}
