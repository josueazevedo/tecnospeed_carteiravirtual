import { TransactionModel } from '../../../domain/models/transaction'
import { AddTransactionModel } from '../../../domain/usecases/add-transaction'
import { addTransactionRepository } from '../../protocols/add-transaction-repository'
import { DbAddTransaction } from './db-add-transaction'

const makeSut = (): any => {
  class AddTransactionRepositoryStub implements addTransactionRepository {
    async add (transaction: AddTransactionModel): Promise<TransactionModel> {
      const fakeTransaction = {
        id: 1,
        value: 1,
        operation: 'in'
      }
      return new Promise(resolve => resolve(fakeTransaction))
    }
  }

  const addTransactionRepositoryStub = new AddTransactionRepositoryStub()
  const sut = new DbAddTransaction(addTransactionRepositoryStub)
  return {
    sut,
    addTransactionRepositoryStub
  }
}

describe('DbAddTransaction Usecase', () => {
  test('Should call AddTransactionRepository with correct values', async () => {
    const { sut } = makeSut()
    const addSpy = jest.spyOn(sut, 'add')
    const transactionData = {
      value: 1,
      operation: 'valid_operation'
    }
    await sut.add(transactionData)
    expect(addSpy).toHaveBeenCalledWith(transactionData)
  })

  test('Should throw if addTransactionRepository throws', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    jest.spyOn(addTransactionRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const transactionData = {
      value: 1,
      operation: 'valid_operation'
    }
    const promise = sut.add(transactionData)
    await expect(promise).rejects.toThrow()
  })
})
