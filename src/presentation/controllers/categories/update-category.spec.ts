import { CategoryModel } from '../../../domain/models/category'
import { AddCategoryModel } from '../../../domain/usecases/categories/add-category'
import { UpdateCategory } from '../../../domain/usecases/categories/update-category'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest } from '../../helpers/http-helper'
import { Validation } from '../../protocols/validation'
import { UpdateCategoryController } from './update-category'

const makeSut = (): any => {
  const fakeRequest = {
    body: {
      id: 1,
      name: 'new_name'
    }
  }
  class UpdateCategoryStub implements UpdateCategory {
    async update (category: AddCategoryModel): Promise<CategoryModel> {
      const fakeCategory = {
        id: 1,
        name: 'new_name'
      }
      return new Promise(resolve => resolve(fakeCategory))
    }
  }
  class ValidationSpy implements Validation {
    error: Error = null
    input: any
    validate (input: string): Error {
      this.input = input
      return this.error
    }
  }
  const validationSpy = new ValidationSpy()
  const updateCategoryStub = new UpdateCategoryStub()
  const sut = new UpdateCategoryController(validationSpy, updateCategoryStub)
  return {
    sut,
    validationSpy,
    updateCategoryStub,
    fakeRequest
  }
}

describe('Update Category Controller', () => {
  test('Should return 400 if Validation return Missing Param', async () => {
    const { sut, validationSpy, fakeRequest } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })
})
