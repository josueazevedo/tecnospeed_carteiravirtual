import { AddCategoryRepository } from '../../../../data/protocols/categories/add-category-repository'
import { UpdateCategoryRepository } from '../../../../data/protocols/categories/update-category-repository'
import { CategoryModel } from '../../../../domain/models/category'
import { AddCategoryModel } from '../../../../domain/usecases/categories/add-category'
import { UpdateCategoryModel } from '../../../../domain/usecases/categories/update-category'
import { Category } from '../models/category'

export class CategoryRelacionalRepository implements AddCategoryRepository, UpdateCategoryRepository {
  async add (category: AddCategoryModel): Promise<CategoryModel> {
    const newCategory = await Category.create(category, { raw: true })
    return newCategory
  }

  async update (category: UpdateCategoryModel): Promise<CategoryModel> {
    const selectCategory = await Category.findByPk(category.id)
    if (selectCategory) {
      selectCategory.name = category.name
      const save = await selectCategory.save()
      const upCategory = save.toJSON() as CategoryModel
      return upCategory
    }
    return null
  }
}
