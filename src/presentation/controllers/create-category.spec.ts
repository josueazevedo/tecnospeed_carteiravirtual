import { MissingParamError } from '../errors/missing-param-error'
import { badRequest } from '../helpers/http-helper'
import { Validation } from '../protocols/validation'
import { CreateCategoryController } from './create-category'

const makeSut = (): any => {
  const fakeRequest = {
    body: {
      name: 'any_name'
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
  const sut = new CreateCategoryController(validationSpy)
  return {
    sut,
    validationSpy,
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
})
