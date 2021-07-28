export interface TransactionModel {
  id: number
  value: number
  operation: string
  notes?: string
  category_id?: number
}
