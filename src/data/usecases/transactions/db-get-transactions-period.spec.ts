import { ListModel } from '../../../domain/models/list-model'
import { GetTransactionsPeriodRepository } from '../../protocols/transactions/get-transactions-period-repository'
import { DbGetTransactionsPeriod } from './db-get-transactions-period'

const makeSut = (): any => {
  class GetTransactionsPeriodRepositoryStub implements GetTransactionsPeriodRepository {
    async getTransactions (page: number, perpage: number): Promise<ListModel> {
      const fakeTransactions = {
        total: 0,
        data: [0],
        totalPages: 0,
        currentPage: 0
      }
      return new Promise(resolve => resolve(fakeTransactions))
    }
  }

  const getTransactionsPeriodRepositoryStub = new GetTransactionsPeriodRepositoryStub()
  const sut = new DbGetTransactionsPeriod(getTransactionsPeriodRepositoryStub)
  return {
    sut,
    getTransactionsPeriodRepositoryStub
  }
}

describe('DbGetTransactionsList Usecase', () => {
  test('Should throw if DbGetTransactionsPeriod throws', async () => {
    const { sut, getTransactionsPeriodRepositoryStub } = makeSut()
    jest.spyOn(getTransactionsPeriodRepositoryStub, 'getTransactions').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getTransactions()
    await expect(promise).rejects.toThrow()
  })
})
