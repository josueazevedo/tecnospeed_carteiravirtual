import { TransactionModel } from '../../models/transaction'

export interface AddTransactionModel {
  value: number
  operation: string
  notes?: string
  category_id?: number
}

export interface AddTransaction {
  add: (transaction: AddTransactionModel) => Promise<TransactionModel>
}
