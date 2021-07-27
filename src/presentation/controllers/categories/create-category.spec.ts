import { CategoryModel } from '../../../domain/models/category'
import { AddCategory, AddCategoryModel } from '../../../domain/usecases/add-category'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest } from '../../helpers/http-helper'
import { Validation } from '../../protocols/validation'
import { CreateCategoryController } from './create-category'

const makeSut = (): any => {
  const fakeRequest = {
    body: {
      name: 'any_name'
    }
  }
  class AddCategoryStub implements AddCategory {
    async add (transaction: AddCategoryModel): Promise<CategoryModel> {
      const fakeCategory = {
        id: 1,
        name: 'any_name'
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
  const addCategoryStub = new AddCategoryStub()
  const sut = new CreateCategoryController(validationSpy, addCategoryStub)
  return {
    sut,
    validationSpy,
    addCategoryStub,
    fakeRequest
  }
}

describe('Create Transaction Controller', () => {
  test('Should return 400 if Validation return Missing Param', async () => {
    const { sut, validationSpy, fakeRequest } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })

  test('Should return 500 if AddCategory return throws', async () => {
    const { sut, addCategoryStub, fakeRequest } = makeSut()
    jest.spyOn(addCategoryStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddCategory with correct values', async () => {
    const { sut, addCategoryStub, fakeRequest } = makeSut()
    const addSpy = jest.spyOn(addCategoryStub, 'add')
    await sut.handle(fakeRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name'
    })
  })

  test('Should return 200 if data is provided', async () => {
    const { sut, fakeRequest } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 1,
      name: 'any_name'
    })
  })
})
