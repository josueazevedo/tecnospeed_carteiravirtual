import { ListModel } from '../../../domain/models/list-model'
import { GetTransactionsPeriod } from '../../../domain/usecases/transactions/get-transaction-period'
import { ServerError } from '../../errors/server-error'
import { Validation } from '../../protocols/validation'
import { GetTransactionsListController } from './get-transactions-list'

const makeSut = (): any => {
  class GetTransactionsPeriodStub implements GetTransactionsPeriod {
    async getTransactions (page: number, perpage: number): Promise<ListModel> {
      const fakeTransactions = {
        total: 0,
        data: [],
        totalPages: 0,
        currentPage: 0
      }
      return new Promise(resolve => resolve(fakeTransactions))
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
  const getTransactionsPeriodStub = new GetTransactionsPeriodStub()
  const sut = new GetTransactionsListController(validationSpy, getTransactionsPeriodStub)
  return {
    sut,
    getTransactionsPeriodStub
  }
}

describe('Get Transactions Period Csv Controller', () => {
  test('Should return 500 if getTransactions return throws', async () => {
    const { sut, getTransactionsPeriodStub } = makeSut()
    jest.spyOn(getTransactionsPeriodStub, 'getTransactions').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if no throws', async () => {
    const { sut } = makeSut()
    const anyRequest = {
      query: {
        page: 0,
        perpage: 2
      }
    }
    const httpResponse = await sut.handle(anyRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      total: 0,
      data: [],
      totalPages: 0,
      currentPage: 0
    })
  })
})
