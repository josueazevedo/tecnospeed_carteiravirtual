import { CategoryModel } from '../../../domain/models/category'
import { AddCategoryModel } from '../../../domain/usecases/add-category'
import { AddCategoryRepository } from '../../protocols/add-category-repository'
import { DbAddCategory } from './db-add-category'

const makeSut = (): any => {
  class AddCategoryRepositoryStub implements AddCategoryRepository {
    async add (category: AddCategoryModel): Promise<CategoryModel> {
      const fakeCategory = {
        id: 1,
        name: 'any_name'
      }
      return new Promise(resolve => resolve(fakeCategory))
    }
  }

  const addCategoryRepositoryStub = new AddCategoryRepositoryStub()
  const sut = new DbAddCategory(addCategoryRepositoryStub)
  return {
    sut,
    addCategoryRepositoryStub
  }
}

describe('DbAddCategory Usecase', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut } = makeSut()
    const addSpy = jest.spyOn(sut, 'add')
    const categoryData = {
      name: 'any_name'
    }
    await sut.add(categoryData)
    expect(addSpy).toHaveBeenCalledWith(categoryData)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositoryStub } = makeSut()
    jest.spyOn(addCategoryRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const categoryData = {
      name: 'any_name'
    }
    const promise = sut.add(categoryData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an category on success', async () => {
    const { sut } = makeSut()
    const categoryData = {
      name: 'any_name'
    }
    const newCategory = await sut.add(categoryData)
    expect(newCategory).toEqual({
      id: 1,
      name: 'any_name'
    })
  })
})
