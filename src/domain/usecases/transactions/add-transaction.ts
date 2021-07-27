import { TransactionModel } from '../models/transaction'

export interface AddTransactionModel {
  value: number
  operation: string
  notes?: string
}

export interface AddTransaction {
  add: (transaction: AddTransactionModel) => Promise<TransactionModel>
}
