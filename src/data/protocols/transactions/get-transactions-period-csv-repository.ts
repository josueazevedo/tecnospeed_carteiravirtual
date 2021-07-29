export interface GetTransactionsPeriodCsvRepository {
  getTransactionsFilterDate: (startDate: string, endDate: string) => Promise<any>
}
