import { AccountModel } from '../../../domain/models/user'
import { MissingParamError } from '../../errors/missing-param-error'
import { ServerError } from '../../errors/server-error'
import { badRequest } from '../../helpers/http-helper'
import { Validation } from '../../protocols/validation'
import { SignupController } from './signup'

const makeSut = (): any => {
  const fakeRequest = {
    body: {
      name: 'any_name',
      user: 'any_value',
      password: 'any_password'
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

  class AddAccount implements AddAccount {
    async add (AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 1,
        name: 'any_name',
        user: 'any_value',
        password: 'any_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccount()
  const sut = new SignupController(validationSpy, addAccountSpy)
  return {
    sut,
    validationSpy,
    fakeRequest,
    addAccountSpy
  }
}

describe('Signup Controller', () => {
  test('Should return 400 if Validation return Missing Param', async () => {
    const { sut, validationSpy, fakeRequest } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_param'))
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_param')))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy, fakeRequest } = makeSut()
    const addSpy = jest.spyOn(addAccountSpy, 'add')
    await sut.handle(fakeRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      user: 'any_value',
      password: 'any_password'
    })
  })

  test('Should return 500 if addAccount return throws', async () => {
    const { sut, addAccountSpy, fakeRequest } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
