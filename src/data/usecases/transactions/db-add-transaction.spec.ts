import { TransactionModel } from '../../../domain/models/transaction'
import { AddTransactionModel } from '../../../domain/usecases/transactions/add-transaction'
import { addTransactionRepository } from '../../protocols/transactions/add-transaction-repository'
import { DbAddTransaction } from './db-add-transaction'

const makeSut = (): any => {
  class AddTransactionRepositoryStub implements addTransactionRepository {
    async add (transaction: AddTransactionModel): Promise<TransactionModel> {
      const fakeTransaction = {
        id: 1,
        value: 1,
        operation: 'in',
        notes: 'any_notes'
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
      operation: 'valid_operation',
      notes: 'any_notes'
    }
    await sut.add(transactionData)
    expect(addSpy).toHaveBeenCalledWith(transactionData)
  })

  test('Should throw if addTransactionRepository throws', async () => {
    const { sut, addTransactionRepositoryStub } = makeSut()
    jest.spyOn(addTransactionRepositoryStub, 'add').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const transactionData = {
      value: 1,
      operation: 'valid_operation',
      notes: 'any_notes'
    }
    const promise = sut.add(transactionData)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an transaction on success', async () => {
    const { sut } = makeSut()
    const transactionData = {
      value: 1,
      operation: 'in',
      notes: 'any_notes'
    }
    const newTransaction = await sut.add(transactionData)
    expect(newTransaction).toEqual({
      id: 1,
      value: 1,
      operation: 'in',
      notes: 'any_notes'
    })
  })
})
