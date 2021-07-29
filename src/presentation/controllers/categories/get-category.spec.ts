import { CategoryModel } from '../../../domain/models/category'
import { GetCategories } from '../../../domain/usecases/categories/get-categories'
import { ServerError } from '../../errors/server-error'
import { GetCategoryController } from './get-category'

const makeSut = (): any => {
  class GetCategoriesStub implements GetCategories {
    async getCategories (): Promise<CategoryModel[]> {
      const fakeList = [{
        id: 1,
        name: 'any+name'
      }]
      return new Promise(resolve => resolve(fakeList))
    }
  }
  const getCategoriesStub = new GetCategoriesStub()
  const sut = new GetCategoryController(getCategoriesStub)
  return {
    sut,
    getCategoriesStub
  }
}

describe('Get Balance Controller', () => {
  test('Should return 500 if getBalance return throws', async () => {
    const { sut, getCategoriesStub } = makeSut()
    jest.spyOn(getCategoriesStub, 'getCategories').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
