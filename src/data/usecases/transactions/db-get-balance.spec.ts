import { BalanceModel } from '../../../domain/models/balance'
import { GetBalanceRepository } from '../../protocols/transactions/get-balance-repository'
import { DbGetBalance } from './db-get-balance'

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
    const promise = sut.getBalance()
    await expect(promise).rejects.toThrow()
  })

  test('Should return a balance in success', async () => {
    const { sut } = makeSut()
    const balance = await sut.getBalance()
    expect(balance).toEqual({
      value: 1
    })
  })
})
