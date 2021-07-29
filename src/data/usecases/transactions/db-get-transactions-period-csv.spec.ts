import { GetTransactionsPeriodCsvRepository } from '../../protocols/transactions/get-transactions-period-csv-repository'
import { DbGetTransactionsPeriodCsv } from './db-get-transactions-period-csv'

const makeSut = (): any => {
  class GetTransactionsPeriodRepositoryStub implements GetTransactionsPeriodCsvRepository {
    async getTransactionsFilterDate (startDate: string, endDate: string): Promise<any> {
      const fake = { data: 'any' }
      return new Promise(resolve => resolve(fake))
    }
  }

  const getTransactionsPeriodRepositoryStub = new GetTransactionsPeriodRepositoryStub()
  const sut = new DbGetTransactionsPeriodCsv(getTransactionsPeriodRepositoryStub)
  return {
    sut,
    getTransactionsPeriodRepositoryStub
  }
}

describe('DbGetTransactionsPeriodCsv Usecase', () => {
  test('Should throw if DbGetTransactionsPeriod throws', async () => {
    const { sut, getTransactionsPeriodRepositoryStub } = makeSut()
    jest.spyOn(getTransactionsPeriodRepositoryStub, 'getTransactionsFilterDate').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.getTransactionsFilterDate()
    await expect(promise).rejects.toThrow()
  })
})
