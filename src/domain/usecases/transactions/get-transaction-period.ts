import { ListModel } from '../../models/list-model'

export interface GetTransactionsPeriod {
  getTransactions: (page: number, perpage: number, startdate: string, enddate: string) => Promise<ListModel>
}
