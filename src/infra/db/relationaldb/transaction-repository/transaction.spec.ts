import { Transaction } from '../models/transaction'
import { TransactionRelacionalRepository } from './transaction'


describe('Transaction RelationalDB', () => {
  beforeAll(async () => {
    await Transaction.destroy({ where: {} })
  })

  beforeEach(async () => {
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
  })

  test('Should return an balance on success', async () => {
    const sut = new TransactionRelacionalRepository()
    await sut.add({
      value: 20,
      operation: 'in',
      notes: 'any_notes'
    })
    await sut.add({
      value: 5,
      operation: 'out',
      notes: 'any_notes'
    })
    const balance = await sut.getBalance()
    expect(balance).toBeTruthy()
    expect(balance.value).toBe('15')
  })
})
