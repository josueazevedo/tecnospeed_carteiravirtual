import { Transaction } from '../models/transaction'
import { TransactionRelacionalRepository } from './transaction'

describe('Transaction RelationalDB', () => {
  beforeAll(async () => {
    await Transaction.destroy({ where: {} })
  })

  test('Should return an transaction on success', async () => {
    const sut = new TransactionRelacionalRepository()
    const transaction = await sut.add({
      value: 1,
      operation: 'in',
      notes: 'any_notes'
    })
    expect(transaction).toBeTruthy()
    expect(transaction.id).toBeTruthy()
    expect(transaction.value).toBe('1')
    expect(transaction.operation).toBe('in')
    expect(transaction.notes).toBe('any_notes')
  })
})
