import { TransactionModel } from '../../../domain/models/transaction'
import { AddTransactionModel } from '../../../domain/usecases/transactions/add-transaction'

export interface addTransactionRepository {
  add: (transaction: AddTransactionModel) => Promise<TransactionModel>
}
