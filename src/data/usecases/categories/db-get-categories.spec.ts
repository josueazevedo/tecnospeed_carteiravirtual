import { CategoryModel } from '../../../domain/models/category'
import { GetCategoryRepository } from '../../protocols/categories/get-categories-repository'
import { DbGetCategories } from './db-get-categories'

const makeSut = (): any => {
  class GetBalanceRepositoryStub implements GetCategoryRepository {
    async getCategories (): Promise<CategoryModel[]> {
      const fake = [
        {
          id: 1,
          name: 'any_name'
        }
      ]
      return new Promise(resolve => resolve(fake))
    }
  }

  const getCategoriesRepositoryStub = new GetBalanceRepositoryStub()
  const sut = new DbGetCategories(getCategoriesRepositoryStub)
  return {
    sut,
    getCategoriesRepositoryStub
  }
}

describe('DbGetCategory Usecase', () => {
  test('Should throw if GetCategoryRepository throws', async () => {
    const { sut, getCategoriesRepositoryStub } = makeSut()
    jest.spyOn(getCategoriesRepositoryStub, 'getCategories').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getCategories()
    await expect(promise).rejects.toThrow()
  })
})
