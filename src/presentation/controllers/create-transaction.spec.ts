import { TransactionModel } from '../../domain/models/transaction'
import { AddTransaction, AddTransactionModel } from '../../domain/usecases/add-transaction'
import { InvalidParamError } from '../errors/invalid-param-error'
import { MissingParamError } from '../errors/missing-param-error'
import { ServerError } from '../errors/server-error'
import { badRequest } from '../helpers/http-helper'
import { Validation } from '../protocols/validation'
import { CreateTransactionController } from './create-transaction'

const makeSut = (): any => {
  const fakeRequest = {
    body: {
      value: 'any_value',
      operation: 'any_operation'
    }
  }
  class AddTransactionStub implements AddTransaction {
    async add (transaction: AddTransactionModel): Promise<TransactionModel> {
      const fakeTransaction = {
        id: 1,
        value: 1,
        operation: 'valid_operation'
      }
      return new Promise(resolve => resolve(fakeTransaction))
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
  const addTransactionStub = new AddTransactionStub()
  const validationSpy = new ValidationSpy()
  const sut = new CreateTransactionController(validationSpy, addTransactionStub)
  return {
    sut,
    validationSpy,
    addTransactionStub,
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

  test('Should return 400 if Validation return Invalid Param', async () => {
    const { sut, validationSpy, fakeRequest } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new InvalidParamError('any_param'))
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('any_param')))
  })

  test('Should return 500 if AddTransaction return throws', async () => {
    const { sut, addTransactionStub, fakeRequest } = makeSut()
    jest.spyOn(addTransactionStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should call AddTransaction with correct values', async () => {
    const { sut, addTransactionStub, fakeRequest } = makeSut()
    const addSpy = jest.spyOn(addTransactionStub, 'add')
    await sut.handle(fakeRequest)
    expect(addSpy).toHaveBeenCalledWith({
      value: 'any_value',
      operation: 'any_operation'
    })
  })

  test('Should return 200 if data is provided', async () => {
    const { sut, fakeRequest } = makeSut()
    const httpResponse = await sut.handle(fakeRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 1,
      value: 1,
      operation: 'valid_operation'
    })
  })
})
