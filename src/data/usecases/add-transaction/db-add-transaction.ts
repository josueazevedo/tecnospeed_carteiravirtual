import { TransactionModel } from '../../../domain/models/transaction'
import { AddTransaction, AddTransactionModel } from '../../../domain/usecases/add-transaction'
import { addTransactionRepository } from '../../protocols/add-transaction-repository'

export class DbAddTransaction implements AddTransaction {
  constructor (
    private readonly addTransactionRepository: addTransactionRepository
  ) {}

  async add (transaction: AddTransactionModel): Promise<TransactionModel> {
    const newTransaction = await this.addTransactionRepository.add(transaction)
    return newTransaction
  }
}
