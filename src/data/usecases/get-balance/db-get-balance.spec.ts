import { DbGetBalance } from './db-get-balance';
import { BalanceModel } from '../../../domain/models/balance';
import { GetBalanceRepository } from '../../protocols/get-balance-repository'

const makeSut = (): any => {
  class GetBalanceRepositoryStub implements GetBalanceRepository {
    async getBalance (): Promise<BalanceModel> {
      const fakeBalance = {
        value: 1
      }
      return new Promise(resolve => resolve(fakeBalance))
    }
  }

  const getBalanceRepositoryStub = new GetBalanceRepositoryStub()
  const sut = new DbGetBalance(getBalanceRepositoryStub)
  return {
    sut,
    getBalanceRepositoryStub
  }
}

describe('DbGetBalance Usecase', () => {
  test('Should throw if GetBalanceRepository throws', async () => {
    const { sut, getBalanceRepositoryStub } = makeSut()
    jest.spyOn(getBalanceRepositoryStub, 'getBalance').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.get()
    await expect(promise).rejects.toThrow()
  })
})
