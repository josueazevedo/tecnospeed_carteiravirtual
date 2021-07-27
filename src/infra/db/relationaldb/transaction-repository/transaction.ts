import { addTransactionRepository } from '../../../../data/protocols/add-transaction-repository'
import { TransactionModel } from '../../../../domain/models/transaction'
import { AddTransactionModel } from '../../../../domain/usecases/add-transaction'
import { Transaction } from '../models/transaction'

export class TransactionRelacionalRepository implements addTransactionRepository {
  async add (transaction: AddTransactionModel): Promise<TransactionModel> {
    const newTransaction = await Transaction.create(transaction, { raw: true })
    return newTransaction
  }
}
