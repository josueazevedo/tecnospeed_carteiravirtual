import { CategoryModel } from '../../../domain/models/category'
import { UpdateCategoryModel } from '../../../domain/usecases/categories/update-category'
import { UpdateCategoryRepository } from '../../protocols/categories/update-category-repository'
import { DbUpadateCategory } from './db-update-category'

const makeSut = (): any => {
  class UpdateCategoryRepositoryStub implements UpdateCategoryRepository {
    async update (category: UpdateCategoryModel): Promise<CategoryModel> {
      const fakeCategory = {
        id: 1,
        name: 'new_name'
      }
      return new Promise(resolve => resolve(fakeCategory))
    }
  }

  const updateCategoryRepositoryStub = new UpdateCategoryRepositoryStub()
  const sut = new DbUpadateCategory(updateCategoryRepositoryStub)
  return {
    sut,
    updateCategoryRepositoryStub
  }
}

describe('DbUpdateCategory Usecase', () => {
  test('Should call UpdateCategoryRepository with correct values', async () => {
    const { sut } = makeSut()
    const upSpy = jest.spyOn(sut, 'update')
    const categoryData = {
      id: 1,
      name: 'new_name'
    }
    await sut.update(categoryData)
    expect(upSpy).toHaveBeenCalledWith(categoryData)
  })
})
