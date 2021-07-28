import { ListModel } from '../../models/list-model'

export interface GetTransactionsPeriod {
  getTransactions: (page: number, perpage: number) => Promise<ListModel>
}
