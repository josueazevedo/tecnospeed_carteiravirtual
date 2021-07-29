import { ListModel } from '../../models/list-model'

export interface GetTransactionsPeriodCsv {
  getTransactions: (startdate: string, enddate: string) => Promise<ListModel>
}
