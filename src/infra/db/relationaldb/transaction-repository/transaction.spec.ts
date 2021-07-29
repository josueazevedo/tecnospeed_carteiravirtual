import { Category } from '../models/category'
import { Transaction } from '../models/transaction'
import { TransactionRelacionalRepository } from './transaction'

describe('Transaction RelationalDB', () => {
  beforeAll(async () => {
    await Transaction.destroy({ where: {} })
    await Category
  })

  beforeEach(async () => {
    await Transaction.destroy({ where: {} })
    await Category.destroy({ where: {} })
  })

  test('Should return an transaction on success', async () => {
    const sut = new TransactionRelacionalRepository()
    const category = await Category.create({ name: 'any_name' }, { raw: true })
    const transaction = await sut.add({
      value: 1,
      operation: 'in',
      notes: 'any_notes',
      category_id: category.id
    })
    expect(transaction).toBeTruthy()
    expect(transaction.id).toBeTruthy()
    expect(transaction.value).toBe('1')
    expect(transaction.operation).toBe('in')
    expect(transaction.notes).toBe('any_notes')
    expect(transaction.category_id).toBe(category.id)
  })

  test('Should return an balance on success', async () => {
    const sut = new TransactionRelacionalRepository()
    const category = await Category.create({ name: 'any_name' }, { raw: true })
    await sut.add({
      value: 20,
      operation: 'in',
      notes: 'any_notes',
      category_id: category.id
    })
    await sut.add({
      value: 5,
      operation: 'out',
      notes: 'any_notes',
      category_id: category.id
    })
    const balance = await sut.getBalance()
    expect(balance).toBeTruthy()
    expect(balance.value).toBe('15')
  })

  test('Should return transactions on success', async () => {
    const sut = new TransactionRelacionalRepository()
    const category = await Category.create({ name: 'any_name' }, { raw: true })
    await sut.add({
      value: 20,
      operation: 'in',
      notes: 'any_notes',
      category_id: category.id
    })
    await sut.add({
      value: 5,
      operation: 'out',
      notes: 'any_notes',
      category_id: category.id
    })
    const transaction = await sut.getTransactions(0, 2, '2020-01-01', '3022-01-01')
    expect(transaction).toBeTruthy()
    expect(transaction.count).toBe(2)
  })

  test('Should return transactions from date interval on success', async () => {
    const sut = new TransactionRelacionalRepository()
    const category = await Category.create({ name: 'any_name' }, { raw: true })
    await sut.add({
      value: 20,
      operation: 'in',
      notes: 'any_notes',
      category_id: category.id
    })
    await sut.add({
      value: 5,
      operation: 'out',
      notes: 'any_notes',
      category_id: category.id
    })
    const transaction = await sut.getTransactionsFilterDate('2020-01-01', '3050-01-01')
    expect(transaction).toBeTruthy()
    expect(transaction.count).toBe(2)
  })
})
