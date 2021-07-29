import { ListModel } from '../../models/list-model'

export interface GetTransactionsPeriodCsv {
  getTransactionsFilterDate: (startdate: string, enddate: string) => Promise<ListModel>
}
